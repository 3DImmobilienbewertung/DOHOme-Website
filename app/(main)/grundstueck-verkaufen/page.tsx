import type { Metadata } from "next";

import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "Grundstück verkaufen",
  description:
    "Grundstück verkaufen in der Wedemark und Umgebung – direkt an DOHOme, fair bewertet, diskret und ohne Maklerkette.",
  alternates: { canonical: "/grundstueck-verkaufen" },
};

const STEPS: { n: string; title: string; text: string }[] = [
  {
    n: "01",
    title: "Unverbindlich anfragen",
    text: "Sie schildern uns Lage und Eckdaten Ihres Grundstücks – in zwei Minuten über das Formular.",
  },
  {
    n: "02",
    title: "Bewertung & Konzept",
    text: "Wir prüfen Bebaubarkeit und Potenzial und entwickeln ein konkretes Nutzungs- und Wertkonzept.",
  },
  {
    n: "03",
    title: "Fairer Abschluss",
    text: "Direktkauf oder gemeinsame Entwicklung – transparent, verbindlich und ohne Maklerkette.",
  },
];

const REASONS: [string, string][] = [
  [
    "Regional verwurzelt",
    "Wir kennen die Region Hannover und ihre Bauämter – das verkürzt Wege und Entscheidungen.",
  ],
  [
    "Familiengeführt",
    "Zwei Familien, ein Wort. Sie sprechen mit Entscheidern, nicht mit einer Abteilung.",
  ],
  [
    "Faire Bewertung",
    "Ein guter, nachvollziehbarer Preis mit geprüfter Sachkunde – ohne Lockzahlen und spätere Nachverhandlungen.",
  ],
  [
    "Absolut diskret",
    "Ihre Anfrage bleibt unter uns: keine Schilder, keine Exposés ohne Ihre Freigabe.",
  ],
];

export default function GrundstueckVerkaufenPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      {/* HERO */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <Reveal>
          <p className="eyebrow text-sage-300">Für Grundstückseigentümer</p>
          <h1 className="mt-3 max-w-3xl text-display-xl">
            Ein guter Preis. Eine verlässliche Entscheidung.
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">
            Wir kaufen und entwickeln selbst. Deshalb bewerten wir Ihr Grundstück
            nachvollziehbar, erklären unser Angebot offen und halten, was wir
            zusagen – diskret und ohne Maklerkette.
          </p>
          <div className="mt-8">
            <Button href="#formular" variant="primary">
              Kostenlose Ersteinschätzung anfragen
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ABLAUF */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <Reveal>
            <p className="eyebrow text-sage-300">So läuft es ab</p>
            <h2 className="mt-2 text-display-lg">
              In drei Schritten zur Entscheidung
            </h2>
          </Reveal>
          <Reveal>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="rounded-2xl border border-beige-100/15 bg-beige-100/[0.03] p-8"
                >
                  <span className="font-display text-3xl text-accent-500">{s.n}</span>
                  <h3 className="mt-4 text-heading">{s.title}</h3>
                  <p className="mt-2 text-beige-100/75">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* WARUM */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="eyebrow text-sage-300">Warum DOHOme</p>
                <h2 className="mt-2 max-w-md text-display-lg">
                  Ein Partner, kein Zwischenhändler
                </h2>
                <p className="mt-4 max-w-md text-beige-100/75">
                  Bei uns geht Ihr Grundstück nicht durch fünf Hände. Wir
                  entwickeln selbst – und tragen Verantwortung für das Ergebnis.
                </p>
              </div>
              <dl className="grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-2">
                {REASONS.map(([title, text]) => (
                  <div key={title} className="bg-green-900 p-6 md:p-8">
                    <dt className="text-heading">{title}</dt>
                    <dd className="mt-2 text-sm text-beige-100/75">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORMULAR */}
      <section id="formular" className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <Reveal className="mx-auto max-w-2xl rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-8 md:p-12">
            <p className="eyebrow text-sage-300">Kostenlose Ersteinschätzung</p>
            <h2 className="mt-2 text-display-lg">
              Erzählen Sie uns von Ihrem Grundstück
            </h2>
            <p className="mt-3 text-beige-100/75">
              Je mehr wir wissen, desto konkreter die erste Einschätzung.
              Vertraulich behandelt. Pflichtfelder sind mit&nbsp;* markiert.
            </p>
            <LeadForm
              subject="Grundstück verkaufen"
              submitLabel="Unverbindliche Einschätzung anfordern"
              withPlotFields
              className="mt-8"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
