import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "WE 3: Steuern sparen und Vermögen aufbauen",
  description:
    "WE 3 in Rotkamp 1: 5 % degressive AfA, 7.546 € kalkulierte Steuererstattung und 5.516 € Vermögenszuwachs im ersten Jahr.",
  alternates: { canonical: "/steuern-sparen" },
};

const advantages = [
  {
    title: "15.540 € AfA",
    text: "5 % degressive Gebäude-AfA auf den kalkulierten Gebäudeanteil von 310.796 € im ersten vollen Vermietungsjahr.",
  },
  {
    title: "10.995 € Jahresmiete",
    text: "Kalkulierte Wohnungsmiete und Stellplatzmiete für die seniorengerechte Erdgeschosswohnung mit Terrasse und Garten.",
  },
  {
    title: "4.309 € Tilgung",
    text: "Der im ersten Jahr kalkulierte Schuldenabbau erhöht Ihr Eigentum – zusätzlich zum positiven Netto-Cashflow.",
  },
];

const example = [
  ["319.191 €", "Gesamtkaufpreis inkl. Stellplatz"],
  ["62,59 m²", "Wohnung 3 · Erdgeschoss"],
  ["916,26 €", "kalkulierte Monatsmiete inkl. Stellplatz"],
  ["310.796 €", "Gebäudeanteil laut Kalkulation"],
  ["15.540 €", "5 % AfA im ersten vollen Jahr"],
  ["7.546 €", "Steuererstattung inkl. Soli"],
] as const;

const financingExample = [
  ["31.919 €", "10 % Eigenkapital auf den Kaufpreis"],
  ["22.343 €", "Kaufnebenkosten (7 %)"],
  ["54.262 €", "gesamter Eigenkapitaleinsatz"],
  ["287.272 €", "Bankdarlehen bei 90 % Finanzierung"],
  ["10.995 €", "kalkulierte Jahresmiete"],
  ["4.309 €", "Tilgung im ersten Jahr"],
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
            <p className="eyebrow text-accent-400">WE 3 · Rotkamp 1 · 6 Wohnungen verfügbar</p>
            <h1 className="mt-4 max-w-4xl text-display-xl">
              Miete und Steuererstattung finanzieren Ihr Wohneigentum mit.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-beige-100/80">
              WE 3 zeigt es konkret: 54.262 € Eigenkapitaleinsatz, 7.546 €
              kalkulierte Steuererstattung und 5.516 € Vermögenszuwachs im ersten
              vollen Vermietungsjahr – ohne Wertsteigerung gerechnet.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/steuern-sparen/erstgespraech">WE-3-Kalkulation anfordern</Button>
              <Button href="/projekte/rotkamp-1" variant="secondary">Wohnung 3 ansehen</Button>
            </div>
          </Reveal>
          <dl className="mt-10 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl bg-beige-100/15 backdrop-blur-sm">
            {[
              ["7.546 €", "Steuererstattung · Jahr 1"],
              ["+ 5.516 €", "Vermögenszuwachs · Jahr 1"],
              ["16 / 22", "Wohnungen bereits verkauft"],
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
            <p className="eyebrow text-sage-300">Die drei finanziellen Hebel</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">
              Miete. Steuerwirkung. Tilgung.
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
              So wurde WE 3 berechnet
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

      <section className="border-t border-beige-100/10 bg-beige-100 text-ink">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <p className="eyebrow text-green-700">Wohnung 3 · Rotkamp 1</p>
          <h2 className="mt-3 max-w-3xl text-display-lg">Die konkrete Kalkulation für WE 3.</h2>
          <p className="mt-4 max-w-2xl text-sm text-ink/65">
            2 Zimmer, 62,59 m², Erdgeschoss, Terrasse, 28,10 m² Garten und
            Außenstellplatz. Berechnet für das erste volle Vermietungsjahr ohne
            angenommene Wertsteigerung.
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
            <Button href="/steuern-sparen/erstgespraech">Diese Kalkulation für mich prüfen</Button>
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950 text-beige-100">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="eyebrow text-accent-400">Vermögensaufbau mit 10 % Eigenkapital</p>
              <h2 className="mt-3 text-display-lg">
                Ihr Einkommen trägt die Finanzierung. Miete, Tilgung und Steuerwirkung bauen mit auf.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-beige-100/70">
                Im Beispiel werden 10 % des Kaufpreises selbst eingebracht und
                90 % finanziert. Zusätzlich fallen die Kaufnebenkosten an. Die
                Miete unterstützt den Kapitaldienst, die Tilgung reduziert die
                Restschuld und die 5-%-AfA senkt in dieser Kalkulation die
                Steuerlast. So entsteht Vermögen nicht nur aus dem eigenen
                monatlichen Beitrag.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-beige-100/15 md:grid-cols-3">
              {financingExample.map(([value, label]) => (
                <div key={label} className="bg-green-900 p-5 md:p-6">
                  <dd className="nums text-2xl text-accent-500">{value}</dd>
                  <dt className="mt-1 text-xs leading-snug text-beige-100/60">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-accent-500/30 md:grid-cols-2">
            <div className="bg-green-900 p-6 md:p-8">
              <p className="eyebrow text-sage-300">Netto-Cashflow · Jahr 1</p>
              <p className="nums mt-3 text-4xl text-accent-500">+ 1.207 €</p>
              <p className="mt-2 text-sm text-beige-100/65">nach Steuererstattung, Bankrate, Verwaltung und Rücklage</p>
            </div>
            <div className="bg-green-900 p-6 md:p-8">
              <p className="eyebrow text-sage-300">Vermögenszuwachs · Jahr 1</p>
              <p className="nums mt-3 text-4xl text-accent-500">+ 5.516 €</p>
              <p className="mt-2 text-sm text-beige-100/65">Netto-Cashflow plus 4.309 € Tilgung – ohne Wertsteigerung</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 rounded-2xl border border-accent-500/35 bg-accent-500/10 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="font-display text-2xl md:text-3xl">
                Sie verdienen gut – nutzen Sie Ihr Einkommen bereits gezielt für den Vermögensaufbau?
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-beige-100/70">
                Besonders relevant für Menschen mit stabilem, überdurchschnittlichem
                Einkommen, ausreichender Liquiditätsreserve und einem langfristigen
                Anlagehorizont. Wir zeigen Ihnen in 20 Minuten, welche der sechs
                Wohnungen rechnerisch zu Ihrem Budget passen kann.
              </p>
            </div>
            <Button href="/steuern-sparen/erstgespraech" className="shrink-0">
              Persönliche Rechnung anfordern
            </Button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-beige-100/45">
            Daten aus der Wirtschaftlichkeits- und Steuerkalkulation für WE 3:
            90 % Kaufpreisfinanzierung, 7 % Kaufnebenkosten, 4,20 % Sollzins,
            1,50 % Anfangstilgung, 42 % Grenzsteuersatz zuzüglich Soli, 35 €
            Verwaltung und 45 € Rücklage monatlich. Die Tilgung ist
            Vermögensbildung durch Schuldabbau, jedoch kein frei verfügbarer
            Ertrag. Persönliche Steuer- und Finanzierungssituation separat prüfen.
          </p>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <div className="max-w-3xl">
              <p className="eyebrow text-accent-400">16 von 22 Wohnungen verkauft</p>
              <h2 className="mt-3 max-w-2xl text-display-lg">Welche der sechs Wohnungen passt zu Ihrem Einkommen?</h2>
              <p className="mt-5 max-w-xl text-beige-100/70">
                In 20 Minuten erhalten Sie eine klare Vorauswahl mit Kaufpreis,
                Eigenkapitalbedarf, Miete, Finanzierung und Steuerwirkung.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/steuern-sparen/erstgespraech">Meine Wohnung berechnen lassen</Button>
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
