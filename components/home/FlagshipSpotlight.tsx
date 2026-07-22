import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { rotkamp, soldPercent } from "@/lib/content/rotkamp";

// Spotlight für das aktuelle Projekt Rotkamp 1 (Wedemark) auf der Startseite.
// Zahlen stammen aus dem Wohnungsspiegel (lib/content/rotkamp.ts).

const f = rotkamp.facts;
const dec = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const STATS: { label: string; value: string }[] = [
  { label: "Standort", value: `${rotkamp.postalCode} ${rotkamp.city}` },
  { label: "Wohneinheiten", value: `${rotkamp.units.total} in ${f.buildings} Häusern` },
  { label: "Wohnungsgrößen", value: `${dec(f.area.min)} – ${dec(f.area.max)} m²` },
  {
    label: "Zimmer",
    value: `${f.rooms.min.toLocaleString("de-DE")} – ${f.rooms.max.toLocaleString("de-DE")}`,
  },
];

export function FlagshipSpotlight() {
  return (
    <section className="bg-green-950 text-beige-100">
      <div className="mx-auto max-w-container px-6 section">
        <Reveal>
          <p className="eyebrow text-accent-400">Aktuelles Projekt</p>
          <h2 className="mt-2 text-display-lg">
            {rotkamp.name} – {rotkamp.city}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal className="overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/rotkamp-1/visualisierung-aussen.jpg"
                alt={`Außenvisualisierung ${rotkamp.name}, ${rotkamp.postalCode} ${rotkamp.city} – Klinkerfassade mit Satteldach`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                loading="lazy"
                quality={80}
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col">
              <p className="text-lead text-beige-100/75">
                {rotkamp.units.total} Eigentumswohnungen in drei Häusern –
                Klinkerfassade, abgesetztes Dachgeschoss, Privatgärten im
                Erdgeschoss. {rotkamp.units.sold} Wohnungen sind bereits
                verkauft.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} className="border-t border-beige-100/10 pt-3">
                    <dt className="eyebrow text-muted-dark">{s.label}</dt>
                    <dd className="nums mt-1 text-heading">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-beige-100/15"
                  role="img"
                  aria-label={`${soldPercent} Prozent der Wohnungen verkauft`}
                >
                  <div
                    className="h-full rounded-full bg-accent-500"
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
                <p className="nums mt-2 text-sm text-muted-dark">
                  {soldPercent} % verkauft
                </p>
              </div>

              <div className="mt-8 pt-2">
                <Button href="/projekte" variant="primary">
                  Projekt ansehen
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
