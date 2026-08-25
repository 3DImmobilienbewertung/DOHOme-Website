import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";

const reference = [
  ["319.191 €", "Kaufpreis inkl. Stellplatz"],
  ["54.262 €", "Eigenkapital inkl. Nebenkosten"],
  ["15.540 €", "degressive AfA · Jahr 1"],
  ["7.546 €", "Steuerentlastung · Jahr 1"],
  ["4.309 €", "Tilgung · Jahr 1"],
  ["21,8 %", "Eigenkapitaleffekt · Jahr 1"],
] as const;

const wealthLevers = [
  {
    number: "01",
    title: "Steuerlast senken",
    text: "5 % degressive Gebäude-AfA schaffen im ersten vollen Jahr einen besonders starken steuerlichen Hebel.",
  },
  {
    number: "02",
    title: "Miete nutzen",
    text: "Die laufende Kaltmiete trägt einen wesentlichen Teil von Zins, Tilgung und Bewirtschaftung.",
  },
  {
    number: "03",
    title: "Eigentum aufbauen",
    text: "Mit jeder Tilgung sinkt die Restschuld. Aus laufenden Zahlungen entsteht Ihr eigener Immobilienwert.",
  },
] as const;

const projectFacts = [
  ["6", "Wohnungen verfügbar"],
  ["EH 55", "energetischer Standard"],
  ["100 %", "seniorengerechte Wohnungen"],
  ["Direkt", "vom planenden Bauträger"],
] as const;

export function CompactTaxLanding() {
  return (
    <main className="bg-green-900 pb-20 text-beige-100 md:pb-0">
      <section className="relative isolate flex min-h-[min(88vh,780px)] items-end overflow-hidden">
        <Image
          src="/images/rotkamp-1/luftbild-projekt.jpg"
          alt="Luftbild eines realisierten DOHOme-Wohnprojekts in der Wedemark"
          fill
          priority
          sizes="100vw"
          quality={84}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 from-10% via-green-950/85 via-55% to-green-950/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-green-950/80 to-transparent" />
        <div className="relative mx-auto w-full max-w-container px-6 pb-14 pt-36 md:pb-20">
          <Reveal>
            <p className="eyebrow text-accent-400">Für Gutverdiener, Selbstständige und Unternehmer</p>
            <h1 className="mt-4 max-w-4xl text-display-xl">
              Sie zahlen hohe Steuern. Bauen Sie damit lieber Eigentum auf.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-beige-100/80">
              Eine vermietete DOHOme-Neubauwohnung verbindet 5 % degressive AfA,
              laufende Miete und Tilgung zu einem langfristigen Vermögensaufbau.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/steuern-sparen/erstgespraech">Mein Potenzial prüfen</Button>
              <Button href="/projekte/rotkamp-1" variant="secondary">Wohnungen ansehen</Button>
            </div>
          </Reveal>

          <div className="mt-10 grid max-w-3xl gap-px overflow-hidden rounded-2xl bg-beige-100/20 backdrop-blur-md sm:grid-cols-3">
            {[
              ["bis zu 22 %", "Eigenkapitaleffekt · Jahr 1"],
              ["5 %", "degressive Gebäude-AfA"],
              ["6", "Wohnungen aktuell verfügbar"],
            ].map(([value, label]) => (
              <div key={label} className="bg-green-950/80 p-4 md:p-5">
                <p className="nums text-2xl text-accent-500 md:text-4xl">{value}</p>
                <p className="mt-1 text-xs text-beige-100/65">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-accent-400">Der einfache Mechanismus</p>
            <h2 className="mt-3 max-w-4xl text-display-lg">
              Weniger Steuerabfluss. Mehr eigenes Immobilienvermögen.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/15 md:grid-cols-3">
            {wealthLevers.map((item) => (
              <article key={item.number} className="bg-green-900 p-7 md:p-9">
                <p className="nums text-sm text-accent-500">{item.number}</p>
                <h3 className="mt-8 font-display text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-beige-100/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-beige-100 text-ink">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-green-700">Echte Referenz · Wohnung 3 im Rotkamp 1</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">
              Was bis zu 22 % Eigenkapitaleffekt konkret bedeutet.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-ink/65">
              62,59 m² · 90 % Kaufpreisfinanzierung · erstes volles Vermietungsjahr.
            </p>
          </Reveal>
          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-green-900/15 md:grid-cols-3">
            {reference.map(([value, label]) => (
              <div key={label} className="bg-white p-5 md:p-6">
                <dd className="nums text-2xl text-green-900 md:text-3xl">{value}</dd>
                <dt className="mt-1 text-xs leading-snug text-ink/60">{label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-7 grid gap-4 rounded-2xl bg-green-900 p-6 text-beige-100 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="font-display text-2xl">7.546 € Steuerentlastung + 4.309 € Tilgung</p>
              <p className="mt-2 text-sm text-beige-100/65">
                entsprechen 21,8 % des eingesetzten Eigenkapitals von 54.262 €.
              </p>
            </div>
            <Button href="/steuern-sparen/erstgespraech">Für mich berechnen</Button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink/45">
            Referenzannahmen: 4,20 % Zins, 1,50 % Tilgung und 42 % Grenzsteuersatz.
            Die konkrete Wirkung richtet sich nach Objekt, Finanzierung und persönlicher Situation.
          </p>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto grid max-w-container gap-10 px-6 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/rotkamp-1/visualisierung-aussen.jpg"
              alt="Visualisierung des seniorengerechten Neubauprojekts Rotkamp 1 in der Wedemark"
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
              quality={88}
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-sage-300">Warum Neubau von DOHOme</p>
            <h2 className="mt-3 text-display-lg">Kein Sanierungsstau. Klare Substanz.</h2>
            <ul className="mt-7 space-y-4 text-sm text-beige-100/75">
              <li className="border-b border-beige-100/10 pb-4">Effizienzhaus-55-Standard und zweischaliges Mauerwerk</li>
              <li className="border-b border-beige-100/10 pb-4">Seniorengerechte Grundrisse für eine breite, langfristige Zielgruppe</li>
              <li className="border-b border-beige-100/10 pb-4">Planung, Bau, Verkauf und Übergabe direkt aus einer Hand</li>
              <li>Keine aufgeschobene Modernisierung aus früheren Jahrzehnten</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <p className="eyebrow text-accent-400">Rotkamp 1 · Wedemark</p>
          <h2 className="mt-3 max-w-3xl text-display-lg">Ein reales Projekt. Keine theoretische Auswahl.</h2>
          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-beige-100/15 md:grid-cols-4">
            {projectFacts.map(([value, label]) => (
              <div key={label} className="bg-green-900 p-5 md:p-7">
                <dd className="nums text-3xl text-accent-500">{value}</dd>
                <dt className="mt-2 text-xs text-beige-100/60">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-beige-100 text-ink">
        <div className="mx-auto grid max-w-container gap-8 px-6 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div>
            <p className="eyebrow text-green-700">Unverbindliches Erstgespräch · ca. 20 Minuten</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">
              Finden wir heraus, welche Wohnung zu Ihren Zahlen passt.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-ink/65">
              Sie erhalten eine persönliche Objekt- und Finanzierungsübersicht –
              verständlich, konkret und auf Basis der aktuell verfügbaren Wohnungen.
            </p>
          </div>
          <Button href="/steuern-sparen/erstgespraech" className="shrink-0">
            Erstgespräch anfragen
          </Button>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-beige-100/20 bg-green-950/95 p-3 backdrop-blur md:hidden">
        <Link
          href="/steuern-sparen/erstgespraech"
          className="block rounded-full bg-accent-500 px-6 py-3.5 text-center text-sm font-medium text-green-950"
        >
          Mein Potenzial prüfen
        </Link>
      </div>
    </main>
  );
}
