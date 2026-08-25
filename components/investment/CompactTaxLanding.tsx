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

export function CompactTaxLanding() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="relative isolate flex min-h-[min(86vh,760px)] items-end overflow-hidden">
        <Image
          src="/images/rotkamp-1/luftbild-projekt.jpg"
          alt="Luftbild eines realisierten DOHOme-Wohnprojekts in der Wedemark"
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/80 to-green-950/15" />
        <div className="relative mx-auto w-full max-w-container px-6 pb-16 pt-36 md:pb-24">
          <Reveal>
            <p className="eyebrow text-accent-400">Neubauwohnung direkt vom Bauträger</p>
            <h1 className="mt-4 max-w-4xl text-display-xl">
              Bis zu 22 % Eigenkapitaleffekt im ersten Jahr.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-beige-100/80">
              5 % degressive AfA und laufende Tilgung machen aus einem Teil
              Ihrer Steuerlast Schritt für Schritt eigenes Immobilienvermögen.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/steuern-sparen/erstgespraech">Meine Wohnung berechnen lassen</Button>
              <Button href="/projekte/rotkamp-1" variant="secondary">Verfügbare Wohnungen</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-beige-100 text-ink">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-green-700">Referenz · Wohnung 3</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">Sechs Zahlen. Ein klarer Hebel.</h2>
            <p className="mt-4 max-w-2xl text-sm text-ink/65">
              62,59 m² im Rotkamp 1 · 90 % Kaufpreisfinanzierung · erstes volles Vermietungsjahr.
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
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <Reveal>
            <p className="eyebrow text-accent-400">Ihr Vermögensaufbau</p>
            <h2 className="mt-3 max-w-4xl text-display-lg">
              Miete trägt die Finanzierung. Steuern schaffen Spielraum. Tilgung baut Eigentum auf.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/15 md:grid-cols-3">
            {[
              ["5 % AfA", "Ein größerer Teil der Gebäudeinvestition wird in den ersten Jahren abgeschrieben."],
              ["Laufende Tilgung", "Mit jeder Rate sinkt die Restschuld und Ihr eigener Anteil an der Wohnung wächst."],
              ["Wertentwicklung", "Zusätzliches Potenzial – in unserer Referenz separat mit 1,88 % jährlich betrachtet."],
            ].map(([title, text]) => (
              <article key={title} className="bg-green-900 p-7 md:p-9">
                <h3 className="font-display text-3xl text-accent-500">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-beige-100/70">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button href="/steuern-sparen/erstgespraech">Potenzial persönlich berechnen</Button>
            <p className="max-w-xl text-sm text-beige-100/60">
              Welche Summe für Sie möglich ist, zeigen wir anhand Ihrer Wohnung,
              Finanzierung und persönlichen Ausgangslage im Erstgespräch.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
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
            <ul className="mt-6 space-y-3 text-sm text-beige-100/70">
              <li>Planung, Bau, Verkauf und Übergabe aus einer Hand</li>
              <li>Seniorengerechte Neubauwohnungen in der Wedemark</li>
              <li>Über 30 Jahre Bau- und Projektentwicklungserfahrung</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/steuern-sparen/erstgespraech">Erstgespräch anfragen</Button>
              <Link href="/projekte/rotkamp-1" className="self-center text-sm underline underline-offset-4">
                Rotkamp 1 ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
