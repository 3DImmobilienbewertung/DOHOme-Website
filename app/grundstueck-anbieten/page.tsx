import type { Metadata } from "next";

import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Grundstück anbieten",
  description:
    "Sie besitzen ein Grundstück in der Region Hannover? DOHOme entwickelt daraus Lebensräume mit Anspruch – faire Bewertung, schnelle Entscheidung, regional verwurzelt.",
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
    "Marktgerechte, nachvollziehbare Einschätzung Ihres Grundstücks – ohne Lockzahlen.",
  ],
  [
    "Schnelle Klarheit",
    "Eine erste Einschätzung erhalten Sie meist innerhalb weniger Tage.",
  ],
];

export default function GrundstueckAnbietenPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      {/* ---------------------------------------------------------------- HERO */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="eyebrow text-sage-300">Für Grundstückseigentümer</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
          Ihr Grundstück verdient die richtige Handschrift
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-beige-100/75">
          Verkaufen oder gemeinsam entwickeln – wir machen aus Ihrem Grundstück
          in der Region Hannover Lebensräume, die ein Leben lang halten.
        </p>
      </section>

      {/* ------------------------------------------------------------- ABLAUF */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <p className="eyebrow text-sage-300">So läuft es ab</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            In drei Schritten zur Entscheidung
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-beige-100/15 bg-beige-100/[0.03] p-8"
              >
                <span className="font-display text-3xl text-sage-300">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-beige-100/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------------- WARUM */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-sage-300">Warum DOHOme</p>
              <h2 className="mt-2 max-w-md font-display text-3xl md:text-4xl">
                Ein Partner, kein Zwischenhändler
              </h2>
              <p className="mt-4 max-w-md text-beige-100/70">
                Bei uns geht Ihr Grundstück nicht durch fünf Hände. Wir
                entwickeln selbst – und tragen Verantwortung für das Ergebnis.
              </p>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-2">
              {REASONS.map(([title, text]) => (
                <div key={title} className="bg-green-900 p-6 md:p-8">
                  <dt className="font-display text-xl">{title}</dt>
                  <dd className="mt-2 text-sm text-beige-100/70">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ FORMULAR */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-8 md:p-12">
            <p className="eyebrow text-sage-300">Grundstück anbieten</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">
              Erzählen Sie uns von Ihrem Grundstück
            </h2>
            <p className="mt-3 text-beige-100/70">
              Je mehr wir wissen, desto konkreter die erste Einschätzung.
              Pflichtfelder sind mit&nbsp;* markiert.
            </p>
            <LeadForm
              subject="Grundstück anbieten"
              submitLabel="Grundstück anbieten"
              withPlotFields
              className="mt-8"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
