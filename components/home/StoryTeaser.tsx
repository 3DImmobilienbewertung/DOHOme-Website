import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { storyTeaser } from "@/lib/content/story";

// Gründer-/Handwerks-Story-Anriss. Ankerziel des Hero-Scroll-Hinweises
// „Unsere Geschichte“. Wortlaut kommt zentral aus lib/content/story.ts –
// dieselbe Quelle wie die ausführliche /ueber-uns-Seite.
// scroll-mt-24: der Sprung aus dem Hero landet nicht unter dem Sticky-Header.
export function StoryTeaser() {
  return (
    <section id="geschichte" className="scroll-mt-24 bg-green-900 text-beige-100">
      <div className="mx-auto max-w-container px-6 section">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-sage-300">{storyTeaser.eyebrow}</p>
            <h2 className="mt-2 max-w-md text-display-lg">
              {storyTeaser.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="max-w-xl space-y-4 text-lead text-beige-100/75">
              <p>{storyTeaser.paragraphs[0]}</p>
              <p className="text-beige-100/60">{storyTeaser.paragraphs[1]}</p>
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
