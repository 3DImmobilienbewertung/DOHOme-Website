import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "Mit Neubauwohnungen Steuern sparen und Vermögen aufbauen",
  description:
    "DOHOme-Neubauwohnungen für langfristigen Vermögensaufbau: Mieteinnahmen, 5 % degressive AfA und laufende Tilgung – belegt an einer echten Referenzrechnung.",
  alternates: { canonical: "/steuern-sparen" },
};

const advantages = [
  {
    title: "Miete arbeitet mit",
    text: "10.995 € kalkulierte Jahresmiete tragen einen wesentlichen Teil der Finanzierung.",
  },
  {
    title: "Steuerlast sinkt",
    text: "15.540 € degressive AfA erzeugen im Referenzjahr 7.546 € Steuererstattung.",
  },
  {
    title: "Restschuld fällt",
    text: "4.309 € Tilgung erhöhen im Referenzjahr Ihren schuldenfreien Anteil.",
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
            <p className="eyebrow text-accent-400">Neubauwohnungen direkt vom Bauträger</p>
            <h1 className="mt-4 max-w-4xl text-display-xl">
              Aus Steuerentlastung wird Eigentum.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-beige-100/80">
              5 % AfA, laufende Miete und Tilgung wirken zusammen. Unsere echte
              Referenz zeigt 7.546 € Steuererstattung und 5.516 €
              Vermögenszuwachs im ersten Jahr – ohne Wertsteigerung.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/steuern-sparen/erstgespraech">Meine Zahlen berechnen</Button>
              <Button href="/projekte/rotkamp-1" variant="secondary">Wohnungen ansehen</Button>
            </div>
          </Reveal>
          <dl className="mt-10 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl bg-beige-100/15 backdrop-blur-sm">
            {[
              ["5 %", "degressive Gebäude-AfA"],
              ["+ 1.207 €", "Netto-Cashflow · Jahr 1"],
              ["+ 4.309 €", "Tilgung · Jahr 1"],
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
            <p className="eyebrow text-sage-300">Drei Hebel. Eine Wohnung.</p>
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
              Referenzrechnung nachvollziehen
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
            <p className="mt-5 text-beige-100/70">Planung, Bau, Verkauf und Übergabe aus einer Hand.</p>
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
          <p className="eyebrow text-green-700">Echte DOHOme-Referenz · Wohnung 3</p>
          <h2 className="mt-3 max-w-3xl text-display-lg">Keine Theorie. Durchgerechnet.</h2>
          <p className="mt-4 max-w-2xl text-sm text-ink/65">
            62,59 m², Erdgeschoss, Garten und Stellplatz. Erstes volles
            Vermietungsjahr, ohne Wertsteigerung.
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
            <Button href="/rechner">10 Jahre selbst berechnen</Button>
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950 text-beige-100">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="eyebrow text-accent-400">Vermögensaufbau mit 10 % Eigenkapital</p>
              <h2 className="mt-3 text-display-lg">
                10 % Eigenkapital. Drei Vermögenshebel.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-beige-100/70">
                Die Referenz kombiniert Mieteinnahmen, Steuerwirkung und
                Schuldabbau – bei 90 % Kaufpreisfinanzierung.
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

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-beige-100/15 md:grid-cols-3">
            {[
              ["51.723 €", "10 Jahre · ohne Wertänderung"],
              ["+ 65.348 €", "optional · 1,88 % p. a."],
              ["117.071 €", "inklusive GAG-Szenario"],
            ].map(([value, label]) => (
              <div key={label} className="bg-green-900 p-6">
                <p className="nums text-3xl text-accent-500">{value}</p>
                <p className="mt-2 text-xs text-beige-100/60">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 rounded-2xl border border-accent-500/35 bg-accent-500/10 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="font-display text-2xl md:text-3xl">
                Sie verdienen gut – nutzen Sie Ihr Einkommen bereits gezielt für den Vermögensaufbau?
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-beige-100/70">
                In 20 Minuten sehen Sie, welche verfügbare Wohnung rechnerisch
                zu Einkommen, Eigenkapital und Finanzierung passt.
              </p>
            </div>
            <Button href="/steuern-sparen/erstgespraech" className="shrink-0">
              Persönliche Rechnung anfordern
            </Button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-beige-100/45">
            Referenz: 90 % Kaufpreisfinanzierung, 4,20 % Zins, 1,50 % Tilgung,
            42 % Grenzsteuersatz plus Soli. Die 1,88 % sind ein separates
            historisches GAG-Szenario und nicht Teil der Grundrechnung.
          </p>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <div className="max-w-3xl">
              <p className="eyebrow text-accent-400">Aktuell 6 Wohnungen verfügbar</p>
              <h2 className="mt-3 max-w-2xl text-display-lg">Welche DOHOme-Wohnung passt zu Ihrem Einkommen?</h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/steuern-sparen/erstgespraech">Jetzt berechnen lassen</Button>
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
