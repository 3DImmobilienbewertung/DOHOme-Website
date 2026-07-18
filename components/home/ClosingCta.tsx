import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";

// Abschluss-Sektion der Startseite: klare Handlungsaufforderung für beide Funnel,
// unmittelbar vor dem Footer.
export function ClosingCta() {
  return (
    <section className="bg-green-900 text-beige-100">
      <div className="mx-auto max-w-container px-6 section-lg text-center">
        <Reveal>
          <p className="eyebrow text-sage-300">Sprechen wir</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-display-lg">
            Ihr Weg zum eigenen Lebensraum – oder zum fairen Grundstücksverkauf
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/kontakt" variant="primary">
              Beratung anfragen
            </Button>
            <Button href="/grundstueck-verkaufen" variant="secondary">
              Grundstück verkaufen
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
