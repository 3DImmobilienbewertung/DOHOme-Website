import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { InvestmentVideoPlaceholder } from "@/components/investment/InvestmentVideoPlaceholder";
import { TaxNotice } from "@/components/investment/TaxNotice";

export const metadata: Metadata = {
  title: "Steuern sparen mit einer Neubauwohnung",
  description:
    "Seniorengerechte Neubauwohnungen direkt vom Bauträger: 5 % degressive AfA prüfen, Vermietung kalkulieren und Erstgespräch vereinbaren.",
  alternates: { canonical: "/steuern-sparen" },
};

const advantages = [
  {
    title: "Kein Sanierungsstau zum Start",
    text: "Neubau statt unbekannter Altbauhistorie: moderne Gebäudetechnik, dokumentierter Zustand und kein übernommener Modernisierungsrückstand.",
  },
  {
    title: "100 % seniorengerecht",
    text: "Alltagstaugliche Grundrisse und komfortable Erschließung sprechen eine breite Zielgruppe an – heute und in späteren Lebensphasen.",
  },
  {
    title: "Direkt vom Bauträger",
    text: "Wir entwickeln, planen und bauen selbst. Sie erhalten Grundrisse, Bauinformationen und Projektstand ohne zwischengeschalteten Produktvertrieb.",
  },
];

const example = [
  ["388.000 €", "Beispiel-Kaufpreis"],
  ["77,67 m²", "Wohnfläche"],
  ["1.087 €", "Kaltmiete bei 14 €/m²"],
  ["329.800 €", "Gebäudeanteil bei 85 %"],
  ["16.490 €", "AfA im ersten vollen Jahr"],
  ["ca. 6.926 €", "AfA-Steuereffekt bei 42 %"],
] as const;

export default function SteuernSparenPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="relative isolate flex min-h-[min(86vh,760px)] items-end overflow-hidden">
        <Image
          src="/images/rotkamp-1/luftbild-projekt.jpg"
          alt="Luftbild eines realisierten DOHOme-Wohnprojekts mit Photovoltaik, Garagen und Stellplätzen"
          fill
          priority
          sizes="100vw"
          quality={84}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/80 to-green-950/15" />
        <div className="relative mx-auto w-full max-w-container px-6 pb-16 pt-36 md:pb-24">
          <Reveal>
            <p className="eyebrow text-accent-400">Neubauwohnungen in der Wedemark</p>
            <h1 className="mt-4 max-w-4xl text-display-xl">
              Steuern sparen. Neubau vermieten. Vermögen aufbauen.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-beige-100/80">
              Seniorengerechte Eigentumswohnungen direkt vom Bauträger – mit
              möglicher 5-%-AfA, modernem Gebäudestandard und klarer Kalkulation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/steuern-sparen/erstgespraech">Kostenloses Erstgespräch</Button>
              <Button href="/rechner" variant="secondary">10-Jahres-Rechner</Button>
            </div>
          </Reveal>
          <dl className="mt-10 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl bg-beige-100/15 backdrop-blur-sm">
            {[
              ["5 %", "degressive Gebäude-AfA möglich*"],
              ["6", "Wohnungen aktuell verfügbar"],
              ["100 %", "seniorengerecht geplant"],
            ].map(([value, label]) => (
              <div key={label} className="bg-green-950/75 p-4 md:p-5">
                <dd className="nums text-2xl text-accent-500 md:text-4xl">{value}</dd>
                <dt className="mt-1 text-[0.65rem] leading-snug text-beige-100/65 md:text-xs">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-sage-300">Warum DOHOme-Neubau</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">
              Drei Fakten. Keine Umwege.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 md:grid-cols-3">
            {advantages.map((item) => (
              <article key={item.title} className="bg-green-900 p-7 md:p-9">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-beige-100/70">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/steuern-sparen/neubauwohnung" variant="secondary">
              AfA und Neubau im Detail
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950/35">
        <div className="mx-auto grid max-w-container gap-10 px-6 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/bissendorfer-strasse-11/aussenansicht-strasse.jpg"
              alt="Realisierter Neubau der Donnarumma/Horstmann GmbH in der Wedemark"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-sage-300">Direkt vom Bauträger</p>
            <h2 className="mt-3 text-display-lg">Gebaut von uns. Verkauft von uns.</h2>
            <p className="mt-5 text-beige-100/70">
              Keine fremden Produkte, keine anonyme Vertriebskette. Sie sprechen
              direkt mit dem Unternehmen, das Planung, Bau und Übergabe verantwortet.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-beige-100/75">
              <li>138 Wohnungen im hinterlegten Projektportfolio</li>
              <li>Mehr als 11.200 m² realisierte und aktuelle Wohnfläche</li>
              <li>Über 30 Jahre Bau- und Projektentwicklungserfahrung</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <p className="eyebrow text-sage-300">Käufer berichten</p>
          <h2 className="mt-3 max-w-2xl text-display-lg">Erfahrungen aus erster Hand</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <InvestmentVideoPlaceholder number={1} title="Entscheidung für den Neubau" />
            <InvestmentVideoPlaceholder number={2} title="Zusammenarbeit mit DOHOme" />
            <InvestmentVideoPlaceholder number={3} title="Übergabe und Vermietung" />
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-beige-100 text-ink">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <p className="eyebrow text-green-700">Konkrete Musterrechnung</p>
          <h2 className="mt-3 max-w-3xl text-display-lg">Was 5 % AfA im ersten vollen Jahr bedeuten können.</h2>
          <p className="mt-4 max-w-2xl text-sm text-ink/65">
            Vereinfachtes Beispiel ohne Wertsteigerung. Die tatsächliche
            Steuerwirkung hängt von der persönlichen Situation ab.
          </p>
          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-green-900/15 md:grid-cols-3">
            {example.map(([value, label]) => (
              <div key={label} className="bg-white p-5 md:p-6">
                <dd className="nums text-2xl text-green-900">{value}</dd>
                <dt className="mt-1 text-xs leading-snug text-ink/60">{label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Button href="/steuern-sparen/erstgespraech">Meine Zahlen prüfen lassen</Button>
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow text-accent-400">Noch 6 Wohnungen verfügbar</p>
              <h2 className="mt-3 max-w-2xl text-display-lg">In 20 Minuten wissen Sie, ob das Modell zu Ihnen passt.</h2>
              <p className="mt-5 max-w-xl text-beige-100/70">
                Verfügbare Wohnung, mögliche Miete, Finanzierung und steuerliche
                Wirkung – konkret anhand Ihrer Zahlen.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/steuern-sparen/erstgespraech">Jetzt Erstgespräch sichern</Button>
                <Link href="/projekte/rotkamp-1" className="self-center text-sm underline underline-offset-4">
                  Rotkamp 1 ansehen
                </Link>
              </div>
            </div>
            <TaxNotice />
          </div>
        </div>
      </section>
    </main>
  );
}
