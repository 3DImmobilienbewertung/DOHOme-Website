import { cache } from "react";
import { notFound } from "next/navigation";
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
  formatSqmRange,
  formatRooms,
  formatMonthYear,
  range,
} from "@/lib/format";
import { PHASE_LABEL, PLAN_TYPE_LABEL } from "@/lib/content/labels";
import { projectImage } from "@/lib/content/media";
import { site } from "@/lib/content/site";
import { findProject, portfolio, toSummary } from "@/lib/content/projects";
import { ProjectSections } from "@/components/projekte/ProjectSections";
import { ProjectJsonLd } from "@/components/seo/ProjectJsonLd";

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
    // Ohne Datenbank liefert die Portfolio-Registry das Projekt – die Seite
    // bleibt vollständig, statt auf die Übersicht umzuleiten.
    if (!isSupabaseConfigured()) {
      const local = findProject(slug);
      return local ? { summary: toSummary(local), plans: [] } : null;
    }

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
    // In der Registry gepflegte Projekte bleiben erreichbar, auch wenn sie in
    // der Datenbank (noch) fehlen.
    if (!summary) {
      const local = findProject(slug);
      return local ? { summary: toSummary(local), plans: [] } : null;
    }

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
  const data = await getProjectData(slug);
  if (!data) return { title: "Projekt nicht gefunden" };

  const { summary } = data;
  const project = findProject(summary.slug);
  const place = summary.city ?? "der Region Hannover";

  // Titel und Beschreibung tragen Ort und Angebot – die Projektseite ist die
  // organische Verkaufsseite und konkurriert lokal um „Eigentumswohnung <Ort>“.
  const title = `${summary.name} – Eigentumswohnungen in ${place}`;

  const parts = [
    summary.available_total > 0
      ? `${summary.available_total} von ${project?.units.total ?? summary.available_total} Wohnungen noch verfügbar`
      : "Referenzprojekt von DOHOme",
    `Wohnflächen ${formatSqmRange(summary.area_sqm_min, summary.area_sqm_max)}`,
    project?.rooms
      ? `${formatRooms(project.rooms.min)} bis ${formatRooms(project.rooms.max)} Zimmer`
      : null,
    "aus eigener Entwicklung",
  ].filter(Boolean);

  return {
    title,
    description: `${summary.name} in ${summary.postal_code ?? ""} ${place}: ${parts.join(", ")}.`
      .replace(/\s+/g, " ")
      .trim(),
    alternates: { canonical: `/projekte/${summary.slug}` },
    openGraph: {
      title,
      url: `${site.url}/projekte/${summary.slug}`,
      images: project ? [{ url: `${site.url}${project.image.src}` }] : undefined,
    },
  };
}

// Registry-Projekte vorab statisch erzeugen – schnellere Auslieferung und ein
// Build-Fehler, falls ein Slug bricht.
export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

function formatFileSize(kb: number | null): string {
  if (kb == null) return "PDF";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toLocaleString("de-DE", { maximumFractionDigits: 1 })} MB`;
}

export default async function ProjektDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getProjectData(slug);
  if (!data) notFound();

  const { summary, plans } = data;
  const hasSale = summary.available_for_sale > 0;
  const hasRent = summary.available_for_rent > 0;
  const isAvailable = summary.available_total > 0;
  const isReference = summary.phase === "abgeschlossen";

  const project = findProject(summary.slug);
  const heroImage = projectImage(summary.slug, 2400, 1400);
  const heroAlt = project?.image.alt ?? summary.name;

  return (
    <main className="bg-green-900 text-beige-100">
      {project && <ProjectJsonLd project={project} />}

      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative isolate flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Scrim nach unten gewichtet: Text steht sicher, das Gebäude behält
            oben seine echten Farben.
            Achtung: Tailwind kennt Verlaufs-Stopps nur in 5-%-Schritten –
            krumme Werte wie via-52% werden stillschweigend verworfen. */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/60 via-45% to-transparent to-85%" />

        <div className="relative mx-auto w-full max-w-container px-6 pb-16 pt-36 [text-shadow:0_1px_18px_rgba(15,36,26,0.6)]">
          {/* Breadcrumb: Besucher aus der Suche landen direkt hier und
              brauchen einen Weg zurueck ins Portfolio. */}
          <nav aria-label="Brotkrumennavigation" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-beige-100/70">
              <li>
                <Link href="/" className="transition-colors hover:text-beige-100">
                  Startseite
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/projekte"
                  className="transition-colors hover:text-beige-100"
                >
                  Projekte
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-beige-100">
                {summary.name}
              </li>
            </ol>
          </nav>

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
          <p className="mt-4 text-lg text-beige-100/85">
            {[
              summary.postal_code,
              summary.city,
              project?.district ? `· ${project.district}` : null,
            ]
              .filter(Boolean)
              .join(" ")}
          </p>
          {project?.teaser && (
            <p className="mt-4 max-w-xl text-lead text-beige-100/80">
              {project.teaser}
            </p>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------- AGGREGAT-STATS */}
      <section className="mx-auto max-w-container px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-eyebrow text-sage-300">
              {isReference ? "Fertiggestellt" : "Aktueller Stand"}
            </p>
            {/* „Ausverkauft“ passt nur zu einem laufenden Vertrieb. Eine
                abgeschlossene Referenz ist vollständig vermarktet – das ist
                eine Leistung, keine Absage. */}
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              {isAvailable
                ? `${summary.available_total} Wohnungen verfügbar`
                : isReference
                  ? "Vollständig vermarktet"
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
            label={isAvailable ? "Verfügbare Wohnungen" : "Wohneinheiten"}
            value={String(
              isAvailable
                ? summary.available_total
                : (project?.units.total ?? summary.available_total),
            )}
            hint={
              hasSale && hasRent
                ? `${summary.available_for_sale} Kauf · ${summary.available_for_rent} Miete`
                : hasSale
                  ? "zum Kauf"
                  : hasRent
                    ? "zur Miete"
                    : "gebaut und übergeben"
            }
          />
          <StatTile
            label="Wohnflächen"
            value={formatSqmRange(summary.area_sqm_min, summary.area_sqm_max)}
          />
          <StatTile
            label="Zimmer"
            value={range(summary.rooms_min, summary.rooms_max, formatRooms)}
          />
          {/* Preiskachel nur, wenn Preise gepflegt sind – sonst stünde hier ein
              nichtssagendes „—“. Ohne Preise zeigen wir den Weg zum Angebot. */}
          {hasSale && summary.sale_price_min != null ? (
            <StatTile
              label="Kaufpreis"
              value={range(summary.sale_price_min, summary.sale_price_max, formatEuro)}
              hint={
                summary.price_per_sqm_from != null
                  ? `ab ${formatEuro(summary.price_per_sqm_from)} / m²`
                  : undefined
              }
            />
          ) : hasRent && summary.rent_price_min != null ? (
            <StatTile
              label="Kaltmiete"
              value={range(summary.rent_price_min, summary.rent_price_max, formatEuro)}
              hint="pro Monat"
            />
          ) : isAvailable ? (
            <StatTile
              label="Kaufpreis"
              value="Auf Anfrage"
              hint="im persönlichen Gespräch"
            />
          ) : (
            <StatTile label="Status" value="Abgeschlossen" hint="Referenzobjekt" />
          )}
        </dl>
      </section>

      {/* Projektinhalte kommen aus der Registry – jeder Abschnitt erscheint
          nur, wenn Daten dafür gepflegt sind. */}
      {project && <ProjectSections project={project} />}

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
              {isAvailable ? "Verfügbare Wohnungen" : "Bleiben Sie informiert"}
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
