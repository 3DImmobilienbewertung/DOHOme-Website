import { Reveal } from "@/components/animation/Reveal";
import { AnimatedStat } from "@/components/animation/AnimatedStat";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { companyStats, hasPendingStats } from "@/lib/content/company";
import { site } from "@/lib/content/site";

// Vertrauensband unter dem Hero. Zeigt belegbare Kennzahlen; solange Zahlen
// fehlen, steht dort „—" mit Platzhalter-Hinweis statt einer erfundenen Angabe.
// Das Gründungsjahr erscheint erst, wenn es bestätigt ist (site.founded).

export function TrustBand() {
  const stats = [
    ...companyStats.map((s) => ({
      value: s.value,
      unit: s.unit,
      suffix: undefined,
      label: s.label,
      pending: s.value == null,
    })),
    {
      value: 30,
      unit: undefined,
      suffix: "+",
      label: "Jahre Bauerfahrung & Projektentwicklung",
      pending: false,
    },
  ];

  return (
    <section className="bg-green-900 text-beige-100">
      <div className="mx-auto max-w-container px-6 section-sm">
        <Reveal>
          <dl className="grid gap-8 border-y border-beige-100/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="nums text-display-lg text-accent-500">
                  <AnimatedStat value={s.value} unit={s.unit} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-sm text-muted-dark">{s.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm text-muted-dark">
              {site.locations.join(" · ")}
            </p>
            {hasPendingStats && (
              <PlaceholderTag>belegte Kennzahlen folgen</PlaceholderTag>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
