import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Beispielrechnung } from "@/components/projekte/Beispielrechnung";
import { rotkampCalcDefaults } from "@/lib/content/beispielrechnung";

// 10-Jahres-Rechner auf Basis der vollständigen WE-3-Kalkulation. Sämtliche
// Werte bleiben veränderbar; der konkrete Startfall verhindert unrealistische
// Nullannahmen und macht die Funktionsweise sofort nachvollziehbar.

export const metadata: Metadata = {
  title: "WE 3 – 10-Jahres-Rechner",
  description:
    "WE 3 in Rotkamp 1 über zehn Jahre rechnen: 2 % Mietsteigerung, Finanzierung, 5 % degressive AfA, Cashflow, Tilgung und Vermögenszuwachs.",
  alternates: { canonical: "/rechner" },
};

export default function RechnerPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-container px-6 pt-32 pb-10 md:pt-40 md:pb-14">
        <Reveal>
          <p className="eyebrow text-sage-300">WE 3 · Rotkamp 1</p>
          <h1 className="mt-3 max-w-3xl text-display-xl">
            Ihre Entwicklung über zehn Jahre
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">
            Die geprüfte WE-3-Kalkulation wird mit 2 % jährlicher Mietsteigerung,
            2 % Kostensteigerung, degressiver AfA und laufender Tilgung über zehn
            Jahre fortgeschrieben. Jeden Wert können Sie direkt verändern.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-container px-6 pb-16 md:pb-24">
        <Reveal>
          <Beispielrechnung
            defaults={rotkampCalcDefaults}
            projectName="Wohnung 3 im Rotkamp 1"
            unitNote="Startwerte: 62,59 m², Außenstellplatz, 90 % Kaufpreisfinanzierung und 2 % Mietsteigerung pro Jahr."
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
