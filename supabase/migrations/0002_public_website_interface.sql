-- ============================================================================
-- DOHOme · PMS → Website-Schnittstelle (Aggregationsschicht)
-- ----------------------------------------------------------------------------
-- Ziel: Die öffentliche Next.js-Website liest NIE einzelne Einheiten (units),
-- sondern ausschließlich projektweite Aggregate. Die Views sind die einzige
-- öffentliche Oberfläche; die Basis-Tabellen bleiben über RLS verschlossen.
--
-- Sicherheits-Architektur (der elegante Kern):
--   * units / projects erhalten KEIN Grant für die Rolle `anon`.
--   * Die Views laufen mit `security_invoker = false` (Owner-Rechte) und
--     umgehen damit RLS auf den Basistabellen – sie geben aber nur noch
--     verdichtete, nicht-sensible Kennzahlen heraus.
--   * Nur diese Views werden an `anon` / `authenticated` freigegeben.
--   => Eine Einzelwohnung ist über die öffentliche API technisch nicht
--      adressierbar; der Pflegeaufwand sinkt auf "Status pflegen, fertig".
--
-- Voraussetzung: Migration 0001 (organizations, projects, units) ist gelaufen.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1) Projektweite Pläne / Grundrisstypen (statt Einzel-Exposés pro Wohnung)
-- ----------------------------------------------------------------------------
-- Ein PDF gilt für den ganzen Grundrisstyp ("Typ A · 3 Zimmer"), nicht für
-- eine konkrete Wohnungsnummer. Dadurch ein Dokument je Typ statt je Einheit.
create table if not exists public.project_plans (
    id               uuid primary key default gen_random_uuid(),
    organization_id  uuid not null references public.organizations (id) on delete cascade,
    project_id       uuid not null references public.projects (id)      on delete cascade,

    title            text not null,                 -- z. B. "Grundrisstyp A · 3-Zimmer"
    plan_type        text not null default 'grundriss'
                       check (plan_type in ('grundriss','lageplan','baubeschreibung','energieausweis','sonstiges')),
    rooms            numeric(3,1),                  -- optional: Zimmer des Typs
    area_sqm         numeric(7,2),                  -- optional: Richtfläche des Typs
    file_url         text not null,                 -- Supabase Storage / CDN (PDF)
    file_size_kb     integer,
    sort_order       integer not null default 0,
    published        boolean not null default false,
    created_at       timestamptz not null default now(),
    updated_at       timestamptz not null default now()
);

create index if not exists project_plans_project_idx
    on public.project_plans (project_id, sort_order);

-- Mandantenfähigkeit: Tabelle bleibt RLS-geschützt (interne Pflege via PMS).
alter table public.project_plans enable row level security;

-- Interner Voll-Zugriff je Organisation – nutzt denselben Tenant-Helfer wie 0001.
create policy project_plans_tenant_rw
    on public.project_plans
    for all
    to authenticated
    using      (organization_id in (select public.current_org_ids()))
    with check (organization_id in (select public.current_org_ids()));


-- ----------------------------------------------------------------------------
-- 2) View: aggregierte Projekt-Zusammenfassung für die Website
-- ----------------------------------------------------------------------------
-- Eine Zeile je veröffentlichtem Projekt. Alle Kennzahlen beziehen sich auf
-- die aktuell VERFÜGBAREN Einheiten (status = 'verfuegbar'); Cluster werden –
-- wie im Datenmodell – aus (offer_type × status) abgeleitet, nicht hart kodiert.
create or replace view public.public_project_summary
with (security_invoker = false) as
select
    p.id                                                          as project_id,
    p.slug,
    p.name,
    p.phase::text                                                 as phase,
    p.is_flagship,
    p.city,
    p.postal_code,

    -- Verfügbarkeit (Gesamt sowie Kauf-/Miet-Split)
    count(u.id) filter (where u.status = 'verfuegbar')::int                                  as available_total,
    count(u.id) filter (where u.status = 'verfuegbar' and u.offer_type = 'kauf')::int        as available_for_sale,
    count(u.id) filter (where u.status = 'verfuegbar' and u.offer_type = 'miete')::int       as available_for_rent,

    -- Größen-Spanne (m²) über alle verfügbaren Einheiten
    min(u.area_sqm) filter (where u.status = 'verfuegbar')::float8                           as area_sqm_min,
    max(u.area_sqm) filter (where u.status = 'verfuegbar')::float8                           as area_sqm_max,

    -- Zimmer-Spanne
    min(u.rooms) filter (where u.status = 'verfuegbar')::float8                              as rooms_min,
    max(u.rooms) filter (where u.status = 'verfuegbar')::float8                              as rooms_max,

    -- Kaufpreise (absolut) + "ab X €/m²"
    min(u.sale_price)   filter (where u.status = 'verfuegbar' and u.offer_type = 'kauf')::float8  as sale_price_min,
    max(u.sale_price)   filter (where u.status = 'verfuegbar' and u.offer_type = 'kauf')::float8  as sale_price_max,
    min(u.price_per_sqm) filter (where u.status = 'verfuegbar' and u.offer_type = 'kauf')::float8 as price_per_sqm_from,

    -- Mietpreise (Kaltmiete)
    min(u.rent_price) filter (where u.status = 'verfuegbar' and u.offer_type = 'miete')::float8   as rent_price_min,
    max(u.rent_price) filter (where u.status = 'verfuegbar' and u.offer_type = 'miete')::float8   as rent_price_max,

    -- Frühester Bezugstermin unter den verfügbaren Einheiten
    min(u.available_from) filter (where u.status = 'verfuegbar')                              as earliest_available_from,

    p.updated_at
from public.projects p
left join public.units u on u.project_id = p.id
where p.published = true
group by p.id;


-- ----------------------------------------------------------------------------
-- 3) View: öffentliche Grundrisstypen / Downloads je Projekt
-- ----------------------------------------------------------------------------
create or replace view public.public_project_plans
with (security_invoker = false) as
select
    pl.project_id,
    pl.title,
    pl.plan_type,
    pl.rooms::float8        as rooms,
    pl.area_sqm::float8     as area_sqm,
    pl.file_url,
    pl.file_size_kb,
    pl.sort_order
from public.project_plans pl
join public.projects p on p.id = pl.project_id
where pl.published = true
  and p.published  = true;


-- ----------------------------------------------------------------------------
-- 4) Grants: NUR die Views sind öffentlich – Basistabellen bleiben intern
-- ----------------------------------------------------------------------------
grant select on public.public_project_summary to anon, authenticated;
grant select on public.public_project_plans   to anon, authenticated;

-- Bewusst KEIN `grant ... on public.units to anon;` – die Einzelwohnungen
-- sind über die öffentliche API damit nicht erreichbar.


-- ----------------------------------------------------------------------------
-- 5) SEED: Grundrisstypen für Rotkamp 1 (Demo-Downloads)
-- ----------------------------------------------------------------------------
-- file_url verweist hier auf Platzhalter – im Betrieb signierte Supabase-Storage-
-- URLs. Referenziert die festen UUIDs aus 0001 (Mandant + Projekt).
insert into public.project_plans
  (organization_id, project_id, title, plan_type, rooms, area_sqm, file_url, file_size_kb, sort_order, published)
values
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222',
   'Grundrisstyp A · 2-Zimmer','grundriss', 2.0,  62.50,
   'https://storage.dohome.de/rotkamp-1/grundriss-typ-a.pdf', 480, 1, true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222',
   'Grundrisstyp B · 3-Zimmer','grundriss', 3.5,  96.80,
   'https://storage.dohome.de/rotkamp-1/grundriss-typ-b.pdf', 520, 2, true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222',
   'Grundrisstyp C · 4-Zimmer','grundriss', 4.0, 112.40,
   'https://storage.dohome.de/rotkamp-1/grundriss-typ-c.pdf', 610, 3, true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222',
   'Lageplan & Freiflächen','lageplan', null, null,
   'https://storage.dohome.de/rotkamp-1/lageplan.pdf', 1340, 4, true),
  ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222',
   'Baubeschreibung (Auszug)','baubeschreibung', null, null,
   'https://storage.dohome.de/rotkamp-1/baubeschreibung.pdf', 880, 5, true);
