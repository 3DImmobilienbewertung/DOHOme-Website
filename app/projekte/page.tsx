import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import {
  createPublicClient,
  type ProjectSummary,
} from "@/lib/supabase/public";
import { formatEuro, formatSqm, range } from "@/lib/format";

// Aggregate alle 5 Minuten neu (ISR).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Aktuelle, geplante und abgeschlossene Bauvorhaben von DOHOme in der Region Hannover – Eigentumswohnungen und Kapitalanlagen.",
};

const PHASE_LABEL: Record<ProjectSummary["phase"], string> = {
  zukuenftig: "In Planung",
  laufend: "Im Verkauf",
  abgeschlossen: "Referenzprojekt",
};

// Sekundärzeile, wenn (noch) keine Einheit verfügbar ist – je nach Segment.
const EMPTY_LABEL: Record<ProjectSummary["phase"], string> = {
  zukuenftig: "Vermarktung startet in Kürze",
  laufend: "Aktuell reserviert – Warteliste möglich",
  abgeschlossen: "Ausverkauft · Referenzprojekt",
};

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

async function getAllProjects(): Promise<ProjectSummary[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("public_project_summary")
    .select("*")
    .order("is_flagship", { ascending: false })
    .order("name", { ascending: true })
    .returns<ProjectSummary[]>();
  return data ?? [];
}

/** Kompakte Preis-/Verfügbarkeits-Zeile für die Karten. */
function priceHint(p: ProjectSummary): string {
  if (p.available_for_sale > 0 && p.price_per_sqm_from != null) {
    return `ab ${formatEuro(p.price_per_sqm_from)} / m²`;
  }
  if (p.available_for_rent > 0 && p.rent_price_min != null) {
    return `Miete ab ${formatEuro(p.rent_price_min)}`;
  }
  return "Referenzprojekt";
}

export default async function ProjekteOverviewPage() {
  const all = await getAllProjects();
  const flagship = all.find((p) => p.is_flagship) ?? null;

  const segments = SEGMENTS.map((s) => ({
    ...s,
    projects: all.filter(
      (p) => p.phase === s.phase && p.project_id !== flagship?.project_id,
    ),
  })).filter((s) => s.projects.length > 0);

  return (
    <main className="min-h-screen bg-green-900 text-beige-100">
      {/* ------------------------------------------------------------- HEADER */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="text-xs uppercase tracking-eyebrow text-sage-300">
          Portfolio
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
          Unsere Projekte
        </h1>
        <p className="mt-5 max-w-xl text-lg text-beige-100/75">
          Vom Leuchtturmprojekt bis zur fertiggestellten Referenz – ein
          Überblick über alle Bauvorhaben von DOHOme.
        </p>
      </section>

      {all.length === 0 && (
        <section className="mx-auto max-w-container px-6 pb-32">
          <p className="rounded-2xl border border-beige-100/15 bg-beige-100/[0.03] p-10 text-beige-100/70">
            Aktuell sind keine Projekte veröffentlicht.
          </p>
        </section>
      )}

      {/* ----------------------------------------------------- FLAGSHIP-SPOTLIGHT */}
      {flagship && (
        <section className="mx-auto max-w-container px-6 pb-16 md:pb-24">
          <Link
            href={`/projekte/${flagship.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] transition-colors hover:border-beige-100/40 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/11] lg:aspect-auto">
              <Image
                src={`https://picsum.photos/seed/${flagship.slug}/1600/1100`}
                alt={flagship.name}
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
                    {PHASE_LABEL[flagship.phase]}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-4xl md:text-5xl">
                  {flagship.name}
                </h2>
                <p className="mt-3 text-beige-100/70">
                  {[flagship.postal_code, flagship.city]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </div>

              <dl className="grid grid-cols-3 gap-6 border-t border-beige-100/10 pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-beige-100/55">
                    Verfügbar
                  </dt>
                  <dd className="mt-1 font-display text-2xl">
                    {flagship.available_total > 0
                      ? flagship.available_total
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-beige-100/55">
                    Wohnflächen
                  </dt>
                  <dd className="mt-1 font-display text-2xl">
                    {range(
                      flagship.area_sqm_min,
                      flagship.area_sqm_max,
                      formatSqm,
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-beige-100/55">
                    Preis
                  </dt>
                  <dd className="mt-1 font-display text-2xl">
                    {priceHint(flagship)}
                  </dd>
                </div>
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
        </section>
      )}

      {/* -------------------------------------------------------- SEGMENT-GRIDS */}
      {segments.map((segment) => (
        <section
          key={segment.phase}
          className="border-t border-beige-100/10"
        >
          <div className="mx-auto max-w-container px-6 py-16 md:py-20">
            <p className="text-xs uppercase tracking-eyebrow text-sage-300">
              {segment.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              {segment.title}
            </h2>
            <p className="mt-3 max-w-xl text-beige-100/70">{segment.intro}</p>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {segment.projects.map((p) => (
                <li key={p.project_id}>
                  <Link
                    href={`/projekte/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-beige-100/15 bg-beige-100/[0.03] transition-colors hover:border-beige-100/40 hover:bg-beige-100/[0.06]"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={`https://picsum.photos/seed/${p.slug}/900/560`}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs uppercase tracking-eyebrow text-sage-300">
                        {PHASE_LABEL[p.phase]}
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
                                {range(p.area_sqm_min, p.area_sqm_max, formatSqm)}
                              </>
                            )}
                          </>
                        ) : (
                          EMPTY_LABEL[p.phase]
                        )}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* --------------------------------------------------------------- CTA */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight md:text-4xl">
            Sie besitzen ein Grundstück in der Region Hannover?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-beige-100/70">
            Wir entwickeln daraus Lebensräume mit Anspruch. Sprechen Sie mit uns
            über Ihr Grundstück.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/grundstueck-anbieten"
              className="rounded-full bg-beige-100 px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-beige-200"
            >
              Grundstück anbieten
            </Link>
            <Link
              href="/kontakt"
              className="rounded-full border border-beige-100/30 px-8 py-4 text-sm font-medium transition-colors hover:bg-beige-100/10"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
