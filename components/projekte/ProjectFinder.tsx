"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import type { ProjectSummary } from "@/lib/supabase/public";
import { formatEuro, formatSqmRange, formatRooms, range } from "@/lib/format";
import { PHASE_LABEL, EMPTY_LABEL } from "@/lib/content/labels";
import { projectImage } from "@/lib/content/media";

const SEGMENTS: {
  phase: ProjectSummary["phase"];
  eyebrow: string;
  title: string;
  intro: string;
}[] = [
  {
    phase: "laufend",
    eyebrow: "Laufende Projekte",
    title: "Aktuell im Verkauf",
    intro: "Verfügbare Einheiten in laufender Entwicklung und Vermarktung.",
  },
  {
    phase: "zukuenftig",
    eyebrow: "Zukünftige Projekte",
    title: "In Planung",
    intro: "Vorhaben in Akquise und Planung – sichern Sie sich frühen Zugang.",
  },
  {
    phase: "abgeschlossen",
    eyebrow: "Abgeschlossene Projekte",
    title: "Referenzen",
    intro: "Fertiggestellte Quartiere als Beleg unserer Handschrift.",
  },
];

/**
 * Kompakte Preis-/Statuszeile für die Karten.
 *
 * Solange keine Preisliste gepflegt ist, darf hier NICHT „Referenzprojekt“
 * stehen – das würde ein laufendes Projekt als abgeschlossen ausweisen.
 * Stattdessen der ehrliche Hinweis auf das persönliche Gespräch.
 */
function priceHint(p: ProjectSummary): string {
  if (p.available_for_sale > 0 && p.price_per_sqm_from != null) {
    return `ab ${formatEuro(p.price_per_sqm_from)} / m²`;
  }
  if (p.available_for_rent > 0 && p.rent_price_min != null) {
    return `Miete ab ${formatEuro(p.rent_price_min)}`;
  }
  if (p.available_total > 0) return "Preise auf Anfrage";
  return "Referenzprojekt";
}

/** Sind überhaupt Kaufpreise gepflegt? Steuert den Budget-Filter. */
function hasPriceData(projects: ProjectSummary[]): boolean {
  return projects.some((p) => p.sale_price_min != null);
}

// ---------------------------------------------------------------- Filter-Logik

type Option = { label: string; value: number | null };

const ROOM_OPTIONS: Option[] = [
  { label: "Egal", value: null },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const PRICE_OPTIONS: Option[] = [
  { label: "Egal", value: null },
  { label: "bis 350.000 €", value: 350000 },
  { label: "bis 500.000 €", value: 500000 },
  { label: "bis 750.000 €", value: 750000 },
];

const AREA_OPTIONS: Option[] = [
  { label: "Egal", value: null },
  { label: "ab 60 m²", value: 60 },
  { label: "ab 90 m²", value: 90 },
  { label: "ab 120 m²", value: 120 },
];

/** Trifft ein Projekt die aktiven Facetten? Nur verfügbare Projekte matchen. */
function matchesFacets(
  p: ProjectSummary,
  rooms: number | null,
  maxPrice: number | null,
  minArea: number | null,
): boolean {
  // Ausverkaufte/Referenzprojekte gehören nicht in ein Filterergebnis – sonst
  // klickt sich der Interessent auf „Aktuell ausverkauft“. Die unfilterte
  // Übersicht (segments) zeigt Referenzprojekte weiterhin.
  if (p.available_total <= 0) return false;

  if (rooms !== null) {
    if (p.rooms_min == null || p.rooms_max == null) return false;
    if (rooms >= 4) {
      if (p.rooms_max < 4) return false;
    } else if (!(p.rooms_min <= rooms && rooms <= p.rooms_max)) {
      return false;
    }
  }
  if (maxPrice !== null) {
    if (p.sale_price_min == null || p.sale_price_min > maxPrice) return false;
  }
  if (minArea !== null) {
    if (p.area_sqm_max == null || p.area_sqm_max < minArea) return false;
  }
  return true;
}

// --------------------------------------------------------------- Komponente

export function ProjectFinder({ projects }: { projects: ProjectSummary[] }) {
  const [rooms, setRooms] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minArea, setMinArea] = useState<number | null>(null);

  const anyActive = rooms !== null || maxPrice !== null || minArea !== null;

  // Budget-Filter nur zeigen, wenn Preise vorliegen. Ohne Preisdaten könnte er
  // nie treffen und würde Interessenten in ein leeres Ergebnis führen.
  const showPriceFacet = useMemo(() => hasPriceData(projects), [projects]);

  const flagship = useMemo(
    () => projects.find((p) => p.is_flagship) ?? null,
    [projects],
  );

  const segments = useMemo(
    () =>
      SEGMENTS.map((s) => ({
        ...s,
        projects: projects.filter(
          (p) => p.phase === s.phase && p.project_id !== flagship?.project_id,
        ),
      })).filter((s) => s.projects.length > 0),
    [projects, flagship],
  );

  const matches = useMemo(
    () => projects.filter((p) => matchesFacets(p, rooms, maxPrice, minArea)),
    [projects, rooms, maxPrice, minArea],
  );

  function reset() {
    setRooms(null);
    setMaxPrice(null);
    setMinArea(null);
  }

  return (
    <>
      {/* ----------------------------------------------------- WOHNUNGSFINDER */}
      <section className="mx-auto max-w-container px-6 pb-10">
        <div className="rounded-3xl border border-beige-100/15 bg-green-700/25 p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-sage-300">Wohnungsfinder</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">
                Finden Sie Ihren Lebensraum
              </h2>
            </div>
            {anyActive && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-beige-100/30 px-5 py-2 text-sm text-beige-100/80 transition-colors hover:border-beige-100/60 hover:text-beige-100"
              >
                Filter zurücksetzen
              </button>
            )}
          </div>

          <div
            className={`mt-6 grid gap-6 ${showPriceFacet ? "md:grid-cols-3" : "md:grid-cols-2"}`}
          >
            <FacetGroup
              label="Zimmer"
              value={rooms}
              options={ROOM_OPTIONS}
              onChange={setRooms}
            />
            {showPriceFacet && (
              <FacetGroup
                label="Budget (Kauf)"
                value={maxPrice}
                options={PRICE_OPTIONS}
                onChange={setMaxPrice}
              />
            )}
            <FacetGroup
              label="Wohnfläche"
              value={minArea}
              options={AREA_OPTIONS}
              onChange={setMinArea}
            />
          </div>

          {anyActive && (
            <p className="mt-6 border-t border-beige-100/10 pt-4 text-sm text-beige-100/70">
              <span className="text-beige-100">{matches.length}</span>{" "}
              {matches.length === 1 ? "passendes Projekt" : "passende Projekte"}
            </p>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------- ERGEBNISSE */}
      {anyActive ? (
        <section className="mx-auto max-w-container px-6 pb-24 md:pb-32">
          {matches.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((p) => (
                <li key={p.project_id}>
                  <ProjectCard p={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-10 text-center">
              <p className="font-display text-2xl">
                Aktuell kein Projekt mit genau diesen Kriterien
              </p>
              <p className="mx-auto mt-3 max-w-md text-beige-100/70">
                Passen Sie die Filter an – oder lassen Sie uns Ihren
                Wunsch-Lebensraum vormerken. Wir melden uns, sobald etwas
                Passendes verfügbar wird.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-beige-100/30 px-6 py-3 text-sm transition-colors hover:bg-beige-100/10"
                >
                  Filter zurücksetzen
                </button>
                <Link
                  href="/kontakt"
                  className="rounded-full bg-beige-100 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-beige-200"
                >
                  Vormerken lassen
                </Link>
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* FLAGSHIP-SPOTLIGHT */}
          {flagship && (
            <section className="mx-auto max-w-container px-6 pb-16 md:pb-24">
              <FlagshipSpotlight p={flagship} />
            </section>
          )}

          {/* SEGMENT-GRIDS */}
          {segments.map((segment) => (
            <section key={segment.phase} className="border-t border-beige-100/10">
              <div className="mx-auto max-w-container px-6 py-16 md:py-20">
                <p className="eyebrow text-sage-300">{segment.eyebrow}</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">
                  {segment.title}
                </h2>
                <p className="mt-3 max-w-xl text-beige-100/70">
                  {segment.intro}
                </p>

                <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {segment.projects.map((p) => (
                    <li key={p.project_id}>
                      <ProjectCard p={p} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </>
      )}
    </>
  );
}

// ------------------------------------------------------------- Subkomponenten

function FacetGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number | null;
  options: Option[];
  onChange: (v: number | null) => void;
}) {
  return (
    <div>
      <p className="eyebrow text-sage-300">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt.value)}
              className={
                active
                  ? "rounded-full border border-warmwhite bg-warmwhite px-4 py-2 text-sm font-medium text-green-900"
                  : "rounded-full border border-beige-100/25 px-4 py-2 text-sm text-beige-100/80 transition-colors hover:border-beige-100/50 hover:text-beige-100"
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: ProjectSummary }) {
  return (
    <Link
      href={`/projekte/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-beige-100/15 bg-beige-100/[0.03] transition-colors hover:border-beige-100/40 hover:bg-beige-100/[0.06]"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={projectImage(p.slug, 900, 560)}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-sage-300">
          {PHASE_LABEL[p.phase]}
          {p.is_flagship && (
            <span className="rounded-full border border-beige-100/30 px-2 py-0.5 text-[0.625rem] text-beige-100/90">
              Leuchtturm
            </span>
          )}
        </span>
        <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
        <p className="mt-1 text-sm text-beige-100/60">
          {[p.postal_code, p.city].filter(Boolean).join(" ")}
        </p>

        <p className="mt-4 border-t border-beige-100/10 pt-4 text-sm text-beige-100/75">
          {p.available_total > 0 ? (
            <>
              <span className="text-beige-100">
                {p.available_total} verfügbar
              </span>
              {" · "}
              {priceHint(p)}
              {p.area_sqm_min != null && (
                <>
                  {" · "}
                  {formatSqmRange(p.area_sqm_min, p.area_sqm_max)}
                </>
              )}
            </>
          ) : (
            EMPTY_LABEL[p.phase]
          )}
        </p>
      </div>
    </Link>
  );
}

function FlagshipSpotlight({ p }: { p: ProjectSummary }) {
  return (
    <Link
      href={`/projekte/${p.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] transition-colors hover:border-beige-100/40 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/11] lg:aspect-auto">
        <Image
          src={projectImage(p.slug, 1600, 1100)}
          alt={p.name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
      </div>

      <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-beige-100/30 px-3 py-1 text-xs uppercase tracking-wider">
              Leuchtturmprojekt
            </span>
            <span className="text-xs uppercase tracking-eyebrow text-sage-300">
              {PHASE_LABEL[p.phase]}
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">{p.name}</h2>
          <p className="mt-3 text-beige-100/70">
            {[p.postal_code, p.city].filter(Boolean).join(" ")}
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-6 border-t border-beige-100/10 pt-6">
          <div>
            <dt className="text-xs uppercase tracking-wider text-beige-100/55">
              Verfügbar
            </dt>
            <dd className="mt-1 font-display text-2xl">
              {p.available_total > 0 ? p.available_total : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-beige-100/55">
              Wohnflächen
            </dt>
            <dd className="mt-1 font-display text-2xl">
              {formatSqmRange(p.area_sqm_min, p.area_sqm_max)}
            </dd>
          </div>
          {/* Ohne gepflegte Preise zeigt die dritte Kachel die Zimmerzahl –
              eine echte Information statt einer leeren Preisangabe. */}
          {p.price_per_sqm_from != null ? (
            <div>
              <dt className="text-xs uppercase tracking-wider text-beige-100/55">
                Preis
              </dt>
              <dd className="mt-1 font-display text-2xl">{priceHint(p)}</dd>
            </div>
          ) : (
            <div>
              <dt className="text-xs uppercase tracking-wider text-beige-100/55">
                Zimmer
              </dt>
              <dd className="mt-1 font-display text-2xl">
                {range(p.rooms_min, p.rooms_max, formatRooms)}
              </dd>
            </div>
          )}
        </dl>

        <span className="inline-flex items-center gap-2 text-sm text-sage-300 transition-colors group-hover:text-beige-100">
          Projekt ansehen
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14m0 0l-6-6m6 6l-6 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
