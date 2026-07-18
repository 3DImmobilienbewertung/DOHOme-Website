import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";

// Kompakter Anleger-Einstieg auf der Startseite – holt die zweite Käuferpersona
// (Kapitalanleger) ab, die im Portal-Wettbewerb kaum bedient wird.
export function InvestorTeaser() {
  return (
    <section className="bg-beige-100 text-ink">
      <div className="mx-auto max-w-container px-6 section">
        <Reveal>
          <div className="rounded-3xl border border-green-900/10 bg-green-900/[0.03] p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              <div>
                <p className="eyebrow text-green-700">Für Kapitalanleger</p>
                <h2 className="mt-2 max-w-lg text-display-lg text-green-900">
                  Neubau, der sich rechnet
                </h2>
                <p className="mt-4 max-w-lg text-green-900/70">
                  Wertstabile Umland-Lagen, moderne Substanz und steuerliche
                  Vorteile (Sonder-AfA §7b). Wir zeigen Ihnen die verfügbaren
                  Einheiten und rechnen Ihr Szenario durch.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Button href="/kapitalanlage" variant="primary">
                  Kapitalanlage entdecken
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
