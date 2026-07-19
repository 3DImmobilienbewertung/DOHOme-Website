import { Reveal } from "@/components/animation/Reveal";
import { press, pressHighlight } from "@/lib/content/press";

// „Bekannt aus"-Vertrauensband: hervorgehobene Schlagzeile (attribuiert + Link)
// plus Medien-Reihe. Auf tiefem Grün als ruhiger Beleg-Block.
export function PressSection() {
  return (
    <section className="border-t border-beige-100/10 bg-green-950 text-beige-100">
      <div className="mx-auto max-w-container px-6 section text-center">
        <Reveal>
          <p className="eyebrow text-sage-300">Bekannt aus der Presse</p>
          <blockquote className="mx-auto mt-5 max-w-3xl text-display-lg">
            „{pressHighlight.quote}"
          </blockquote>
          <p className="mt-4 text-sm text-muted-dark">
            {pressHighlight.outlet} ·{" "}
            <a
              href={pressHighlight.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-beige-100"
            >
              Artikel lesen
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {press.map((item) => (
              <li key={item.outlet}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl text-beige-100/70 transition-colors hover:text-beige-100"
                  >
                    {item.short}
                  </a>
                ) : (
                  <span className="font-display text-xl text-beige-100/70">
                    {item.short}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
