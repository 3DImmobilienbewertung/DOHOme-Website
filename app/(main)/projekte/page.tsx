import type { Metadata } from "next";

import {
  createPublicClient,
  isSupabaseConfigured,
  type ProjectSummary,
} from "@/lib/supabase/public";
import { portfolioSummaries } from "@/lib/content/projects";
import { ProjectFinder } from "@/components/projekte/ProjectFinder";
import { Button } from "@/components/ui/Button";

// Aggregate alle 5 Minuten neu (ISR).
export const revalidate = 300;

export const metadata: Metadata = {
  // Titel trägt das Suchwort, nicht nur die Rubrik: lokal wird nach
  // „Eigentumswohnung Wedemark / Region Hannover“ gesucht, nicht nach „Projekte“.
  title: "Eigentumswohnungen in der Region Hannover",
  description:
    "Wohnprojekte von DOHOme in Wedemark und der Region Hannover: Eigentumswohnungen aus eigener Entwicklung – geplant, gebaut und verkauft aus einer Hand.",
  alternates: { canonical: "/projekte" },
};

async function getAllProjects(): Promise<ProjectSummary[]> {
  // Ohne angebundene Datenbank liefert die gepflegte Portfolio-Registry die
  // Projekte. Sobald Supabase steht, übernehmen die Aggregations-Views die
  // tagesaktuellen Verfügbarkeiten.
  if (!isSupabaseConfigured()) return portfolioSummaries();

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("public_project_summary")
    .select("*")
    .order("is_flagship", { ascending: false })
    .order("name", { ascending: true })
    .returns<ProjectSummary[]>();

  // Echten Fehler NICHT verschlucken: werfen → ISR liefert die letzte gute
  // Version bzw. die Error-Boundary greift (unterscheidbar vom Leer-Zustand).
  if (error) {
    throw new Error(`Projekte konnten nicht geladen werden: ${error.message}`);
  }

  // Leere Tabelle ist kein Fehler, aber auch kein Grund, das gepflegte
  // Portfolio zu verbergen – die Registry bleibt der Rückfall.
  return data && data.length > 0 ? data : portfolioSummaries();
}

export default async function ProjekteOverviewPage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen bg-green-900 text-beige-100">
      {/* HEADER */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="eyebrow text-sage-300">Portfolio</p>
        <h1 className="mt-3 max-w-3xl text-display-xl">Unsere Projekte</h1>
        <p className="mt-5 max-w-xl text-lead text-beige-100/75">
          Vom Leuchtturmprojekt bis zur fertiggestellten Referenz – ein
          Überblick über alle Bauvorhaben von DOHOme.
        </p>
      </section>

      {projects.length === 0 ? (
        <section className="mx-auto max-w-container px-6 pb-8">
          <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-10 md:p-14">
            <p className="eyebrow text-accent-400">In Kürze</p>
            <h2 className="mt-2 max-w-2xl text-display-lg">
              Unsere Projekte gehen bald hier online
            </h2>
            <p className="mt-4 max-w-xl text-beige-100/75">
              Wir bereiten die Veröffentlichung weiterer Bauvorhaben in der
              Region Hannover vor. Lassen Sie sich vormerken – Sie erfahren als
              Erste, sobald Einheiten verfügbar sind.
            </p>
            <div className="mt-8">
              <Button href="/kontakt" variant="primary">
                Vormerken lassen
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <ProjectFinder projects={projects} />
      )}

      {/* CTA */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight md:text-4xl">
            Noch nicht das Passende gefunden?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-beige-100/75">
            Lassen Sie sich vormerken – wir informieren Sie, sobald eine passende
            Einheit verfügbar wird, und beraten Sie persönlich.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/kontakt" variant="primary">
              Beratung anfragen
            </Button>
            <Button href="/grundstueck-verkaufen" variant="secondary">
              Grundstück verkaufen
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
