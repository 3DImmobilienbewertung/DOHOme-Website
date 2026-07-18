import { Reveal } from "@/components/animation/Reveal";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { site } from "@/lib/content/site";

// Vertrauensband: harte Signale direkt unter dem Hero. Zahlen mit Kupfer-Akzent,
// unbestätigte Kennzahlen klar als Platzhalter markiert.
const STATS: { value: string; label: string; pending?: boolean }[] = [
  { value: `seit ${site.founded}`, label: "familiengeführt im Handwerk" },
  { value: "—", label: "realisierte Wohneinheiten", pending: true },
  { value: String(site.locations.length), label: "Orte in der Region Hannover" },
];

export function TrustBand() {
  return (
    <section className="bg-green-900 text-beige-100">
      <div className="mx-auto max-w-container px-6 section-sm">
        <Reveal>
          <dl className="grid gap-8 border-y border-beige-100/10 py-10 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <dd className="text-display-lg nums text-accent-500">{s.value}</dd>
                <dt className="mt-1 text-sm text-muted-dark">{s.label}</dt>
                {s.pending && (
                  <div className="mt-2">
                    <PlaceholderTag>echte Kennzahl</PlaceholderTag>
                  </div>
                )}
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted-dark">
            Wedemark · Isernhagen · Großburgwedel · Schwarmstedt · Lindwedel
          </p>
        </Reveal>
      </div>
    </section>
  );
}
