import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

// Flagship-Spotlight für das Erstprojekt Rotkamp 1 (Wedemark). Bild und Preis-/
// Einheiten-Daten sind Platzhalter, bis echte Fotografie und Supabase-Aggregate
// vorliegen – dann wird dieser Block an die Live-View gekoppelt.
const STATS: { label: string; value: string; pending?: boolean }[] = [
  { label: "Standort", value: "Wedemark" },
  { label: "Einheiten", value: "—", pending: true },
  { label: "Wohnfläche", value: "—", pending: true },
  { label: "Preis ab", value: "—", pending: true },
];

export function FlagshipSpotlight() {
  return (
    <section className="bg-green-950 text-beige-100">
      <div className="mx-auto max-w-container px-6 section">
        <Reveal>
          <p className="eyebrow text-accent-400">Aktuelles Projekt</p>
          <h2 className="mt-2 text-display-lg">Rotkamp 1 – Wedemark</h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal className="overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://picsum.photos/seed/dohome-rotkamp/1600/1200"
                alt="Neubau-Visualisierung Rotkamp 1, 30900 Wedemark"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col">
              <p className="text-lead text-beige-100/75">
                Unser Erstprojekt in der Wedemark: durchdacht geschnittene
                Neubau-Einheiten in ruhiger Lage mit guter Anbindung an die
                Region Hannover.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} className="border-t border-beige-100/10 pt-3">
                    <dt className="eyebrow text-muted-dark">{s.label}</dt>
                    <dd className="mt-1 text-heading nums">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <PlaceholderTag>echte Preisliste &amp; Einheitenspiegel</PlaceholderTag>
              </div>
              <div className="mt-8 pt-2">
                <Button href="/projekte/rotkamp-1" variant="primary">
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
