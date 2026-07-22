import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";

// Gründer-/Handwerks-Story-Anriss. Ankerziel des Hero-Scroll-Hinweises
// „Unsere Geschichte“. Verweist auf die ausführliche /ueber-uns-Seite.
export function StoryTeaser() {
  return (
    <section id="geschichte" className="bg-green-900 text-beige-100">
      <div className="mx-auto max-w-container px-6 section">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-sage-300">Unsere Geschichte</p>
            <h2 className="mt-2 max-w-md text-display-lg">
              Zwei Familien, ein Anspruch: Häuser, die ein Leben lang halten.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="max-w-xl space-y-4 text-lead text-beige-100/75">
              <p>
                Der Kern von DOHOme ist Handwerk, nicht Vertrieb. Donnarumma und
                Horstmann entwickeln eigene Wohnprojekte in der Wedemark und den
                Nachbarorten – mit einem Handwerker-Netzwerk, das teils seit 30
                Jahren zusammensteht.
              </p>
              <p className="text-beige-100/60">
                Weil wir selbst bauen und selbst verantworten, entscheidet bei uns
                die Qualität – nicht die schnellste Marge.
              </p>
              <div className="pt-2">
                <Button href="/ueber-uns" variant="secondary">
                  Mehr über uns
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
