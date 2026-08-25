import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";

// Doppel-Funnel-Weiche: der strukturelle Vorteil von DOHOme (Käufer- UND
// Eigentümer-Pfad) direkt sichtbar. Auf Beige abgesetzt (60-30-10-Rhythmus),
// zwei gleichwertige, aber typografisch klar getrennte Einstiege.
const PATHS = [
  {
    eyebrow: "Für künftige Bewohner",
    title: "Sie suchen ein Zuhause",
    text: "Eigentumswohnungen aus eigener Entwicklung: durchdachte Grundrisse, hochwertige Ausführung, ruhige Lagen in der Region Hannover.",
    primary: { href: "/projekte", label: "Projekte ansehen" },
    secondary: { href: "/wohnung-mieten", label: "Wohnung mieten" },
  },
  {
    eyebrow: "Für Grundstückseigentümer",
    title: "Sie besitzen ein Grundstück",
    text: "Verkaufen oder gemeinsam entwickeln – faire Bewertung, diskret, ohne Maklerkette. Wir entwickeln selbst.",
    primary: { href: "/grundstueck-verkaufen", label: "Grundstück verkaufen" },
    secondary: { href: "/kontakt", label: "Erst sprechen" },
  },
];

export function FunnelSplit() {
  return (
    <section className="bg-beige-100 text-ink">
      <div className="mx-auto max-w-container px-6 section">
        <Reveal>
          <p className="eyebrow text-green-700">Ihr Anliegen</p>
          <h2 className="mt-2 max-w-2xl text-display-lg text-green-900">
            Zwei Wege, ein Ansprechpartner
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PATHS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-3xl bg-green-900 p-8 text-beige-100 md:p-10">
                <p className="eyebrow text-sage-300">{p.eyebrow}</p>
                <h3 className="mt-3 text-heading">{p.title}</h3>
                <p className="mt-3 text-beige-100/75">{p.text}</p>
                <div className="mt-8 flex flex-wrap gap-3 pt-2">
                  <Button href={p.primary.href} variant="primary">
                    {p.primary.label}
                  </Button>
                  <Button href={p.secondary.href} variant="secondary">
                    {p.secondary.label}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
