import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import {
  createPublicClient,
  isSupabaseConfigured,
  type ProjectSummary,
  type ProjectPlan,
} from "@/lib/supabase/public";
import {
  formatEuro,
  formatSqm,
  formatRooms,
  formatMonthYear,
  range,
} from "@/lib/format";
import { PHASE_LABEL, PLAN_TYPE_LABEL } from "@/lib/content/labels";
import { projectImage } from "@/lib/content/media";

// Aggregate alle 5 Minuten neu (ISR) – kein Live-DB-Hit pro Besucher,
// aber stets aktuelle Verfügbarkeiten ohne Re-Deploy.
export const revalidate = 300;

type PageProps = { params: Promise<{ slug: string }> };

// cache(): dedupliziert die Abfrage zwischen generateMetadata und der Seite
// innerhalb eines Renderings (statt vier statt zwei Queries).
const getProjectData = cache(
  async (
    slug: string,
  ): Promise<{ summary: ProjectSummary; plans: ProjectPlan[] } | null> => {
    const supabase = createPublicClient();

    const { data: summary, error: summaryError } = await supabase
      .from("public_project_summary")
      .select("*")
      .eq("slug", slug)
      .maybeSingle<ProjectSummary>();

    // DB-Fehler nicht als „nicht gefunden“ tarnen – werfen (Error-Boundary).
    if (summaryError) {
      throw new Error(`Projekt konnte nicht geladen werden: ${summaryError.message}`);
    }
    if (!summary) return null;

    const { data: plans, error: plansError } = await supabase
      .from("public_project_plans")
      .select("*")
      .eq("project_id", summary.project_id)
      .order("sort_order", { ascending: true })
      .returns<ProjectPlan[]>();

    if (plansError) {
      throw new Error(`Projektunterlagen konnten nicht geladen werden: ${plansError.message}`);
    }

    return { summary, plans: plans ?? [] };
  },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isSupabaseConfigured()) return { title: "Projekt", robots: { index: false } };
  const data = await getProjectData(slug);
  if (!data) return { title: "Projekt nicht gefunden" };

  const { summary } = data;
  return {
    title: summary.name,
    description: `${summary.name} in ${summary.city ?? "der Region Hannover"} – ${
      summary.available_total > 0
        ? `${summary.available_total} Wohneinheiten verfügbar`
        : "Referenzprojekt von DOHOme"
    }. Wohnflächen ${range(summary.area_sqm_min, summary.area_sqm_max, formatSqm)}.`,
  };
}

function formatFileSize(kb: number | null): string {
  if (kb == null) return "PDF";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toLocaleString("de-DE", { maximumFractionDigits: 1 })} MB`;
}

export default async function ProjektDetailPage({ params }: PageProps) {
  const { slug } = await params;
  // Ohne Datenbank auf die Übersicht (mit „in Kürze“-Zustand) statt 500/404.
  if (!isSupabaseConfigured()) redirect("/projekte");
  const data = await getProjectData(slug);
  if (!data) notFound();

  const { summary, plans } = data;
  const hasSale = summary.available_for_sale > 0;
  const hasRent = summary.available_for_rent > 0;
  const isAvailable = summary.available_total > 0;

  // Hero-Bild kommt später aus einer project_media-Tabelle; Platzhalter via Seed.
  const heroImage = projectImage(summary.slug, 2400, 1400);

  return (
    <main className="bg-green-900 text-beige-100">
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative isolate flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={summary.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/70 to-green-900/20" />

        <div className="relative mx-auto w-full max-w-container px-6 pb-16 pt-40">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-eyebrow text-sage-300">
              {PHASE_LABEL[summary.phase]}
            </span>
            {summary.is_flagship && (
              <span className="rounded-full border border-beige-100/30 px-3 py-1 text-xs uppercase tracking-wider text-beige-100/90">
                Leuchtturmprojekt
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
            {summary.name}
          </h1>
          <p className="mt-4 text-lg text-beige-100/80">
            {[summary.postal_code, summary.city].filter(Boolean).join(" ")}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- AGGREGAT-STATS */}
      <section className="mx-auto max-w-container px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-eyebrow text-sage-300">
              Aktueller Stand
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              {isAvailable
                ? `${summary.available_total} Wohnungen verfügbar`
                : "Aktuell ausverkauft"}
            </h2>
          </div>
          {summary.earliest_available_from && isAvailable && (
            <p className="text-beige-100/70">
              Bezugsfertig ab{" "}
              <span className="text-beige-100">
                {formatMonthYear(summary.earliest_available_from)}
              </span>
            </p>
          )}
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-beige-100/10 lg:grid-cols-4">
          <StatTile
            label="Verfügbare Wohnungen"
            value={isAvailable ? String(summary.available_total) : "—"}
            hint={
              hasSale && hasRent
                ? `${summary.available_for_sale} Kauf · ${summary.available_for_rent} Miete`
                : hasSale
                  ? "zum Kauf"
                  : hasRent
                    ? "zur Miete"
                    : "Referenz"
            }
          />
          <StatTile
            label="Wohnflächen"
            value={range(summary.area_sqm_min, summary.area_sqm_max, formatSqm)}
          />
          <StatTile
            label="Zimmer"
            value={range(summary.rooms_min, summary.rooms_max, formatRooms)}
          />
          {hasSale ? (
            <StatTile
              label="Kaufpreis"
              value={range(summary.sale_price_min, summary.sale_price_max, formatEuro)}
              hint={
                summary.price_per_sqm_from != null
                  ? `ab ${formatEuro(summary.price_per_sqm_from)} / m²`
                  : undefined
              }
            />
          ) : hasRent ? (
            <StatTile
              label="Kaltmiete"
              value={range(summary.rent_price_min, summary.rent_price_max, formatEuro)}
              hint="pro Monat"
            />
          ) : (
            <StatTile label="Status" value="Abgeschlossen" hint="Referenzobjekt" />
          )}
        </dl>
      </section>

      {/* ------------------------------------------------- GRUNDRISSTYPEN / PDFs */}
      {plans.length > 0 && (
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 py-16 md:py-24">
            <p className="text-xs uppercase tracking-eyebrow text-sage-300">Grundrisstypen</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl md:text-4xl">
              Pläne &amp; Unterlagen zum Download
            </h2>
            <p className="mt-3 max-w-2xl text-beige-100/70">
              Allgemeine Grundrisstypen und Projektunterlagen – die konkrete
              Einheit stimmen wir im persönlichen Gespräch auf Ihre Wünsche ab.
            </p>

            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {plans.map((plan, i) => (
                <li key={`${plan.title}-${i}`}>
                  <a
                    href={plan.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 rounded-xl border border-beige-100/15 bg-beige-100/[0.03] p-6 transition-colors hover:border-beige-100/40 hover:bg-beige-100/[0.06]"
                  >
                    <div>
                      <span className="text-xs uppercase tracking-wider text-sage-300">
                        {PLAN_TYPE_LABEL[plan.plan_type]}
                      </span>
                      <p className="mt-1 font-display text-xl">
                        {plan.title}
                        <span className="sr-only"> (PDF, öffnet in neuem Tab)</span>
                      </p>
                      <p className="mt-1 text-sm text-beige-100/60">
                        {[
                          plan.rooms != null ? `${formatRooms(plan.rooms)} Zi.` : null,
                          plan.area_sqm != null ? formatSqm(plan.area_sqm) : null,
                          formatFileSize(plan.file_size_kb),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-beige-100/30 transition-transform group-hover:translate-y-0.5"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- CTA */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-20 md:py-28">
          <div className="rounded-3xl bg-beige-100 px-8 py-14 text-ink md:px-16 md:py-20">
            <p className="text-xs uppercase tracking-eyebrow text-green-500">
              {isAvailable ? "Jetzt sichern" : "Bleiben Sie informiert"}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
              {isAvailable
                ? "Ihre Wohnung im Projekt " + summary.name
                : "Vormerken für das nächste DOHOme-Projekt"}
            </h2>
            <p className="mt-4 max-w-xl text-ink/70">
              {isAvailable
                ? "Vereinbaren Sie ein unverbindliches Beratungsgespräch – wir zeigen Ihnen die verfügbaren Einheiten und Finanzierungsoptionen."
                : "Dieses Projekt ist vollständig vermarktet. Lassen Sie sich für kommende Bauvorhaben in der Region Hannover vormerken."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="rounded-full bg-green-700 px-8 py-4 text-sm font-medium text-beige-100 transition-colors hover:bg-green-900"
              >
                Persönliche Beratung anfragen
              </Link>
              <Link
                href="/projekte"
                className="rounded-full border border-ink/20 px-8 py-4 text-sm font-medium transition-colors hover:bg-ink/5"
              >
                Alle Projekte ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="bg-green-900 p-6 md:p-8">
      <dt className="text-xs uppercase tracking-wider text-beige-100/60">
        {label}
      </dt>
      <dd className="mt-3 font-display text-2xl leading-tight md:text-[1.75rem]">
        {value}
        {hint && (
          <span className="mt-1 block font-sans text-sm text-sage-300">
            {hint}
          </span>
        )}
      </dd>
    </div>
  );
}
