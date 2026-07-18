import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "Kapitalanlage",
  description:
    "Neubau als Kapitalanlage in der Region Hannover: wertstabil, steuerlich attraktiv (Sonder-AfA §7b), mit planbarer Mietnachfrage. Anlageobjekte von DOHOme.",
  alternates: { canonical: "/kapitalanlage" },
};

function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-3 inline-block rounded border border-accent-500/40 px-2 py-0.5 text-xs text-accent-400">
      Platzhalter · {children}
    </span>
  );
}

const ARGUMENTS: [string, string][] = [
  [
    "Wertstabil im Umland",
    "Neubau in gefragten Lagen der Region Hannover – die Nachfrage wächst schneller als das Angebot.",
  ],
  [
    "Steuerlich attraktiv",
    "Neubauten qualifizieren für die Sonderabschreibung nach §7b EStG zusätzlich zur linearen AfA – ein spürbarer Hebel in den ersten Jahren.",
  ],
  [
    "Planbare Mietnachfrage",
    "Familien und Pendler suchen in den Umlandgemeinden der Region Hannover – Wedemark, Isernhagen, Großburgwedel – dauerhaft Wohnraum. Geringe Leerstandsrisiken.",
  ],
  [
    "Schlüsselfertig & neu",
    "Kein Sanierungsstau, geringe Instandhaltung, moderne Energiestandards – Rendite ohne Baustellen.",
  ],
];

export default function KapitalanlagePage() {
  return (
    <main className="bg-green-900 text-beige-100">
      {/* HERO */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <Reveal>
          <p className="eyebrow text-sage-300">Für Kapitalanleger</p>
          <h1 className="mt-3 max-w-3xl text-display-xl">
            Neubau, der sich rechnet
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">
            Wertstabile Lage, moderne Substanz und steuerliche Vorteile: DOHOme-
            Neubau in der Region Hannover ist als Kapitalanlage konzipiert – nicht
            nur zum Wohnen.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/kontakt" variant="primary">
              Anlage-Beratung anfragen
            </Button>
            <Button href="/projekte" variant="secondary">
              Projekte ansehen
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ARGUMENTE */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <Reveal>
            <p className="eyebrow text-sage-300">Warum Neubau als Anlage</p>
            <h2 className="mt-2 max-w-xl text-display-lg">
              Vier Gründe, die tragen
            </h2>
          </Reveal>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-2">
            {ARGUMENTS.map(([title, text]) => (
              <div key={title} className="bg-green-900 p-6 md:p-8">
                <dt className="text-heading">{title}</dt>
                <dd className="mt-2 text-sm text-beige-100/75">{text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-2xl text-xs text-muted-dark">
            Keine Steuer- oder Anlageberatung. Steuerliche Wirkung hängt von Ihrer
            persönlichen Situation ab – bitte individuell prüfen lassen.
          </p>
        </div>
      </section>

      {/* BEISPIELRECHNUNG */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <Reveal>
            <p className="eyebrow text-sage-300">Rechenbeispiel</p>
            <h2 className="mt-2 max-w-xl text-display-lg">
              Was eine Einheit leisten kann
            </h2>
            <p className="mt-4 max-w-xl text-beige-100/75">
              Eine transparente Beispielrechnung (Kaufpreis, Mietertrag,
              AfA-Effekt) auf Basis realer Projektdaten – sobald die Zahlen für
              das Erstprojekt final sind.
            </p>
            <div className="mt-2">
              <Todo>Beispielrechnung mit echten Rotkamp-1-Kennzahlen</Todo>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-display-lg">
              Sprechen wir über Ihre Anlage
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-beige-100/75">
              Wir zeigen Ihnen die aktuell verfügbaren Einheiten und rechnen Ihr
              Szenario gemeinsam durch.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/kontakt" variant="primary">
                Anlage-Beratung anfragen
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
