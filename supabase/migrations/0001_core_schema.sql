-- ============================================================================
-- DOHOme · PMS Kern-Schema (Single Source of Truth)
-- ----------------------------------------------------------------------------
-- Mandantenfähig ab Tag 1: jede fachliche Zeile trägt organization_id und ist
-- per Row-Level-Security isoliert. Cluster (Kauf/Miete/Reserviert/Verkauft)
-- werden NICHT gespeichert, sondern aus (offer_type × status) abgeleitet.
--
-- Ziel-Plattform: Supabase (PostgreSQL 15+). Nutzt auth.users / auth.uid().
-- Reihenfolge: ENUMs → Helfer → Tabellen → Indizes → Trigger → RLS → Seed.
-- Danach folgt 0002 (öffentliche Aggregat-Views + project_plans).
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1) ENUM-Typen
-- ----------------------------------------------------------------------------
do $$ begin
  create type public.project_phase as enum ('zukuenftig','laufend','abgeschlossen');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.offer_type as enum ('kauf','miete');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.unit_status as enum
    ('in_vorbereitung','verfuegbar','reserviert','verkauft','vermietet','zurueckgehalten');
exception when duplicate_object then null; end $$;


-- ----------------------------------------------------------------------------
-- 2) Helfer-Funktion: updated_at automatisch pflegen
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ----------------------------------------------------------------------------
-- 3) Tabellen
-- ----------------------------------------------------------------------------

-- 3.1 Mandant
create table if not exists public.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 3.2 Mitgliedschaft (n:m User ↔ Organisation, Rolle je Mandant)
create table if not exists public.memberships (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations (id) on delete cascade,
  user_id          uuid not null references auth.users (id)           on delete cascade,
  role             text not null default 'member'
                     check (role in ('owner','admin','member')),
  created_at       timestamptz not null default now(),
  unique (organization_id, user_id)
);

-- 3.3 Projekt (Portfolio-Segment via phase, Priorisierung via is_flagship)
create table if not exists public.projects (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations (id) on delete cascade,
  name             text not null,
  slug             text not null,
  phase            public.project_phase not null default 'zukuenftig',
  is_flagship      boolean not null default false,
  street           text,
  postal_code      text,
  city             text,
  planned_units    integer check (planned_units is null or planned_units >= 0),
  published        boolean not null default false,
  sort_order       integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (organization_id, slug)
);

-- 3.4 Bauteil / Haus (optionale Zwischenebene)
create table if not exists public.buildings (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations (id) on delete cascade,
  project_id       uuid not null references public.projects (id)      on delete cascade,
  name             text not null,
  address          text,
  floors           integer check (floors is null or floors >= 0),
  sort_order       integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (project_id, name)
);

-- 3.5 Wohneinheit (das fachliche Herzstück)
create table if not exists public.units (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations (id) on delete cascade,
  project_id       uuid not null references public.projects (id)      on delete cascade,
  building_id      uuid references public.buildings (id)              on delete set null,

  unit_number      text not null,
  offer_type       public.offer_type  not null,
  status           public.unit_status not null default 'in_vorbereitung',

  area_sqm         numeric(7,2) not null check (area_sqm > 0),
  rooms            numeric(3,1) not null check (rooms > 0),
  floor_label      text,
  floor_order      smallint,

  sale_price       numeric(12,2) check (sale_price    is null or sale_price    >= 0),
  rent_price       numeric(10,2) check (rent_price    is null or rent_price    >= 0),
  service_charge   numeric(10,2) check (service_charge is null or service_charge >= 0),

  -- Automatisch berechneter €/m² (nur sinnvoll bei Kauf; sonst NULL)
  price_per_sqm    numeric(12,2)
                     generated always as (round(sale_price / nullif(area_sqm, 0), 2)) stored,

  available_from   date,
  features         text[] not null default '{}',
  highlights       text,
  expose_url       text,
  published        boolean not null default false,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  unique (project_id, unit_number),

  -- Der zum Angebotstyp passende Preis muss gepflegt sein
  constraint units_price_matches_offer check (
    (offer_type = 'kauf'  and sale_price is not null) or
    (offer_type = 'miete' and rent_price is not null)
  )
);


-- ----------------------------------------------------------------------------
-- 4) Indizes (Tenant-Filter + Aggregations-/Filter-Pfade)
-- ----------------------------------------------------------------------------
create index if not exists memberships_user_idx   on public.memberships (user_id);
create index if not exists projects_org_idx        on public.projects (organization_id);
create index if not exists projects_phase_idx       on public.projects (phase);
create index if not exists buildings_project_idx     on public.buildings (project_id);
create index if not exists units_project_status_idx   on public.units (project_id, status);
create index if not exists units_org_idx               on public.units (organization_id);
create index if not exists units_offer_status_idx       on public.units (offer_type, status);


-- ----------------------------------------------------------------------------
-- 5) updated_at-Trigger
-- ----------------------------------------------------------------------------
create trigger trg_organizations_updated before update on public.organizations
  for each row execute function public.set_updated_at();
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.set_updated_at();
create trigger trg_buildings_updated before update on public.buildings
  for each row execute function public.set_updated_at();
create trigger trg_units_updated before update on public.units
  for each row execute function public.set_updated_at();


-- ----------------------------------------------------------------------------
-- 6) Row-Level-Security (Mandantenfähigkeit)
-- ----------------------------------------------------------------------------
-- Kanonischer Tenant-Check: liefert die organization_ids des angemeldeten
-- Nutzers. SECURITY DEFINER, damit der Zugriff auf memberships die RLS dort
-- nicht rekursiv auslöst. Diese Funktion nutzen ALLE Policies (auch 0002).
create or replace function public.current_org_ids()
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $$
  select m.organization_id
  from public.memberships m
  where m.user_id = auth.uid();
$$;

alter table public.organizations enable row level security;
alter table public.memberships   enable row level security;
alter table public.projects      enable row level security;
alter table public.buildings     enable row level security;
alter table public.units         enable row level security;

-- Organisation: Mitglieder dürfen ihren Mandanten lesen
create policy organizations_member_read on public.organizations
  for select to authenticated
  using (id in (select public.current_org_ids()));

-- Mitgliedschaften: jeder sieht nur die eigenen (Verwaltung via service_role)
create policy memberships_self_read on public.memberships
  for select to authenticated
  using (user_id = auth.uid());

-- Projekte / Bauteile / Einheiten: volle Lese-/Schreibrechte je Mandant
create policy projects_tenant_rw on public.projects
  for all to authenticated
  using      (organization_id in (select public.current_org_ids()))
  with check (organization_id in (select public.current_org_ids()));

create policy buildings_tenant_rw on public.buildings
  for all to authenticated
  using      (organization_id in (select public.current_org_ids()))
  with check (organization_id in (select public.current_org_ids()));

create policy units_tenant_rw on public.units
  for all to authenticated
  using      (organization_id in (select public.current_org_ids()))
  with check (organization_id in (select public.current_org_ids()));

-- Hinweis: anon erhält bewusst KEINE Policy auf Basistabellen.
-- Öffentlicher Lesezugriff läuft ausschließlich über die Aggregat-Views (0002).


-- ============================================================================
-- 7) SEED-DATEN · Mandant DOHOme + Leuchtturmprojekt "Rotkamp 1"
-- ----------------------------------------------------------------------------
-- Seeds laufen mit Owner-Rechten (RLS wird dabei umgangen). Feste UUIDs, damit
-- 0002 (Grundriss-Seed) sicher referenzieren kann. Idempotent via ON CONFLICT.
-- ============================================================================

-- 7.1 Mandant
insert into public.organizations (id, name, slug)
values ('11111111-1111-1111-1111-111111111111', 'DOHOme', 'dohome')
on conflict (slug) do nothing;

-- 7.2 Projekte – Flagship Rotkamp 1 + je ein Projekt pro Portfolio-Segment
insert into public.projects
  (id, organization_id, name, slug, phase, is_flagship, street, postal_code, city, planned_units, published, sort_order)
values
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111',
   'Rotkamp 1', 'rotkamp-1', 'laufend', true, 'Rotkamp 1', '30900', 'Wedemark', 12, true, 0),
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111',
   'Waldkante', 'waldkante-wedemark', 'laufend', false, 'Am Waldrand 4', '30900', 'Wedemark', 8, true, 1),
  ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111',
   'Leinegärten', 'leinegaerten-schwarmstedt', 'zukuenftig', false, 'Leinestraße', '29690', 'Schwarmstedt', 14, true, 2),
  ('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111',
   'Heidehöfe', 'heidehoefe-lindwedel', 'abgeschlossen', false, 'Heideweg 9', '29690', 'Lindwedel', 6, true, 3)
on conflict (organization_id, slug) do nothing;

-- 7.3 Bauteile
insert into public.buildings (id, organization_id, project_id, name, floors, sort_order)
values
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111',
   '22222222-2222-2222-2222-222222222222', 'Haus A', 3, 1),
  ('33333333-3333-3333-3333-333333333334', '11111111-1111-1111-1111-111111111111',
   '22222222-2222-2222-2222-222222222222', 'Haus B', 3, 2)
on conflict (project_id, name) do nothing;

-- 7.4 Wohneinheiten (12 Stück, realistische Mischung)
--   verfügbar Kauf: WE-03, WE-04, WE-05, WE-06, WE-07        (5)
--   verfügbar Miete: WE-10, WE-11                            (2)
--   reserviert: WE-02, WE-08                                 (2)
--   verkauft: WE-01 · vermietet: WE-09                       (2)
--   in Vorbereitung: WE-12                                   (1)
insert into public.units
  (organization_id, project_id, building_id, unit_number, offer_type, status,
   area_sqm, rooms, floor_label, floor_order,
   sale_price, rent_price, service_charge, available_from, features, highlights, published)
values
  -- Haus A
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333',
   'WE-01','kauf','verkauft',     62.50, 2.0,'EG',    0, 318000, null, 180,'2025-09-01',
   array['Gartenanteil','Fußbodenheizung'],'Gartenwohnung mit Süd-Terrasse', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333',
   'WE-02','kauf','reserviert',   84.30, 3.0,'EG',    0, 429000, null, 230,'2026-10-01',
   array['Terrasse','Fußbodenheizung','Barrierearm'],'Barrierearme 3-Zimmer mit Terrasse', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333',
   'WE-03','kauf','verfuegbar',   96.80, 3.5,'1. OG', 1, 498000, null, 260,'2026-12-01',
   array['Balkon','Aufzug','Fußbodenheizung'],'Heller Grundriss mit Loggia', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333',
   'WE-04','kauf','verfuegbar',  112.40, 4.0,'1. OG', 1, 589000, null, 300,'2026-12-01',
   array['Balkon','Aufzug','Abstellraum'],'Familienwohnung mit zwei Bädern', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333',
   'WE-05','kauf','verfuegbar',  138.60, 4.5,'2. OG', 2, 749000, null, 360,'2027-03-01',
   array['Dachterrasse','Aufzug','Fußbodenheizung'],'Penthouse mit Dachterrasse', true),

  -- Haus B
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334',
   'WE-06','kauf','verfuegbar',   48.20, 2.0,'EG',    0, 246000, null, 150,'2026-12-01',
   array['Terrasse','Stellplatz'],'Kompakte 2-Zimmer – ideal als Kapitalanlage', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334',
   'WE-07','kauf','verfuegbar',   71.50, 2.5,'1. OG', 1, 369000, null, 200,'2026-12-01',
   array['Balkon','Aufzug'],'Effizienter 2,5-Zimmer-Schnitt', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334',
   'WE-08','kauf','reserviert',  103.10, 4.0,'2. OG', 2, 539000, null, 280,'2027-01-01',
   array['Balkon','Aufzug','Gäste-WC'],'Großzügige 4-Zimmer-Familienwohnung', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334',
   'WE-09','miete','vermietet',   58.40, 2.0,'EG',    0, null, 890, 160,'2025-11-01',
   array['Terrasse','Einbauküche'],'Vermietete 2-Zimmer mit EBK', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334',
   'WE-10','miete','verfuegbar',  76.90, 3.0,'1. OG', 1, null, 1180, 210,'2026-11-01',
   array['Balkon','Aufzug','Einbauküche'],'3-Zimmer-Mietwohnung mit Balkon', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334',
   'WE-11','miete','verfuegbar',  89.70, 3.5,'2. OG', 2, null, 1390, 250,'2026-11-01',
   array['Balkon','Aufzug','Abstellraum'],'Moderne 3,5-Zimmer zur Miete', true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333334',
   'WE-12','kauf','in_vorbereitung',125.00,4.5,'3. OG',3, 689000, null, 330,'2027-06-01',
   array['Dachterrasse','Aufzug'],'Penthouse – Vermarktung in Vorbereitung', false)
on conflict (project_id, unit_number) do nothing;

-- 7.5 Einheiten der übrigen Segment-Projekte (kompakt, fürs /projekte-Demo)
--   Waldkante (laufend): 2 verfügbar + 1 verkauft · Heidehöfe (Referenz): ausverkauft
--   Leinegärten (zukünftig) bewusst ohne Einheiten → erscheint als "in Planung".
insert into public.units
  (organization_id, project_id, building_id, unit_number, offer_type, status,
   area_sqm, rooms, floor_label, floor_order,
   sale_price, rent_price, service_charge, available_from, features, highlights, published)
values
  ('11111111-1111-1111-1111-111111111111','44444444-4444-4444-4444-444444444444', null,
   'WK-01','kauf','verfuegbar',  78.00, 3.0,'EG',    0, 395000, null, 210,'2026-11-01',
   array['Garten','Wärmepumpe'],'Doppelhaushälfte mit Garten', true),
  ('11111111-1111-1111-1111-111111111111','44444444-4444-4444-4444-444444444444', null,
   'WK-02','kauf','verfuegbar',  94.50, 3.5,'1. OG', 1, 479000, null, 250,'2026-11-01',
   array['Balkon','Wärmepumpe','Photovoltaik'],'Energieeffizient mit PV-Anlage', true),
  ('11111111-1111-1111-1111-111111111111','44444444-4444-4444-4444-444444444444', null,
   'WK-03','kauf','verkauft',   110.00, 4.0,'1. OG', 1, 559000, null, 290,'2025-12-01',
   array['Garten','Carport'],'Verkaufte Familieneinheit', true),
  ('11111111-1111-1111-1111-111111111111','66666666-6666-6666-6666-666666666666', null,
   'HH-01','kauf','verkauft',   120.00, 4.5,'EG',    0, 545000, null, 300,'2024-06-01',
   array['Garten','Reihenhaus'],'Referenz – Reihenhaus', true),
  ('11111111-1111-1111-1111-111111111111','66666666-6666-6666-6666-666666666666', null,
   'HH-02','kauf','verkauft',   135.00, 5.0,'EG',    0, 599000, null, 320,'2024-06-01',
   array['Garten','Reihenhaus'],'Referenz – Reihenhaus Endhaus', true)
on conflict (project_id, unit_number) do nothing;

-- Mitgliedschaft NICHT geseedet (benötigt echte auth.users-ID). Nach dem ersten
-- Login einmalig ausführen, damit du im internen Frontend (RLS) Zugriff hast:
--
--   insert into public.memberships (organization_id, user_id, role)
--   values ('11111111-1111-1111-1111-111111111111', auth.uid(), 'owner');
