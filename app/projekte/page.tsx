import Link from "next/link";
import type { Metadata } from "next";

import {
  createPublicClient,
  type ProjectSummary,
} from "@/lib/supabase/public";
import { ProjectFinder } from "@/components/projekte/ProjectFinder";

// Aggregate alle 5 Minuten neu (ISR).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Aktuelle, geplante und abgeschlossene Bauvorhaben von DOHOme in der Region Hannover – Eigentumswohnungen und Kapitalanlagen.",
};

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

export default async function ProjekteOverviewPage() {
  const all = await getAllProjects();

  return (
    <main className="min-h-screen bg-green-900 text-beige-100">
      {/* ------------------------------------------------------------- HEADER */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="eyebrow text-sage-300">Portfolio</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
          Unsere Projekte
        </h1>
        <p className="mt-5 max-w-xl text-lg text-beige-100/75">
          Vom Leuchtturmprojekt bis zur fertiggestellten Referenz – ein
          Überblick über alle Bauvorhaben von DOHOme.
        </p>
      </section>

      {all.length === 0 ? (
        <section className="mx-auto max-w-container px-6 pb-32">
          <p className="rounded-2xl border border-beige-100/15 bg-beige-100/[0.03] p-10 text-beige-100/70">
            Aktuell sind keine Projekte veröffentlicht.
          </p>
        </section>
      ) : (
        <ProjectFinder projects={all} />
      )}

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
