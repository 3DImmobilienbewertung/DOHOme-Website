import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Beispielrechnung } from "@/components/projekte/Beispielrechnung";
import {
  genericCalcDefaults,
  BLANK_FIELDS,
} from "@/lib/content/beispielrechnung";

// Allgemeiner Rechner: leer, ohne Bezug zu einem konkreten Projekt.
//
// Bewusst NICHT in der Hauptnavigation. Die Website richtet sich an
// Selbstnutzer; dieser Rechner ist ein Werkzeug für Interessenten, die
// vermieten wollen – erreichbar über die Projektseite und per Direktlink.
// Indexierbar, weil er eigenständigen Nutzen hat und lokal gesucht wird.

export const metadata: Metadata = {
  title: "Vermietung durchrechnen – 10-Jahres-Rechner",
  description:
    "Kostenloser Rechner für vermietete Eigentumswohnungen: Cashflow, Tilgung, Abschreibung und Steuerwirkung über zehn Jahre. Eigene Zahlen eintragen, sofort rechnen.",
  alternates: { canonical: "/rechner" },
};

export default function RechnerPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-container px-6 pt-32 pb-10 md:pt-40 md:pb-14">
        <Reveal>
          <p className="eyebrow text-sage-300">Werkzeug</p>
          <h1 className="mt-3 max-w-3xl text-display-xl">
            Vermietung in zehn Jahren durchrechnen
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">
            Was bleibt am Monatsende übrig, wie viel Darlehen ist nach zehn
            Jahren getilgt, und wie wirkt die Abschreibung? Tragen Sie Ihre
            eigenen Zahlen ein – der Rechner arbeitet für jede Eigentumswohnung,
            nicht nur für unsere.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-container px-6 pb-16 md:pb-24">
        <Reveal>
          <Beispielrechnung
            defaults={genericCalcDefaults}
            variant="leer"
            blankFields={BLANK_FIELDS}
          />
        </Reveal>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 text-center md:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight md:text-4xl">
            Lieber gemeinsam durchgehen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-beige-100/75">
            Wir entwickeln, bauen und verkaufen unsere Wohnungen selbst – und
            besprechen die Zahlen mit Ihnen persönlich, ohne Verkaufsdruck.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="rounded-full bg-accent-500 px-8 py-4 text-sm font-medium text-green-950 transition-colors hover:bg-accent-400"
            >
              Beratung anfragen
            </Link>
            <Link
              href="/projekte"
              className="rounded-full border border-beige-100/45 px-8 py-4 text-sm font-medium transition-colors hover:bg-beige-100/10"
            >
              Verfügbare Wohnungen ansehen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
