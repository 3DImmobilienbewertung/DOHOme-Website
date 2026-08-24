import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import {
  companyStats,
  formatStat,
  hasPendingStats,
  teamProfiles,
} from "@/lib/content/company";
import { storyLong } from "@/lib/content/story";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "DOHOme – zwei Familien, ein Anspruch: hochwertige Wohnprojekte in der Wedemark und den Nachbarorten, entwickelt und gebaut von Donnarumma & Horstmann.",
  alternates: { canonical: "/ueber-uns" },
};

// Platzhalter-Marker: markiert Sektionen, die vor dem Launch echten Kundeninput
// (Fotos, Zahlen, Zertifikate) brauchen – nie versehentlich „fertig“ wirken.
function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-3 inline-block rounded border border-accent-500/40 px-2 py-0.5 text-xs text-accent-400">
      Platzhalter · {children}
    </span>
  );
}

export default function UeberUnsPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      {/* HERO */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <Reveal>
          <p className="eyebrow text-sage-300">Über uns</p>
          <h1 className="mt-3 max-w-3xl text-display-xl">
            Zwei Familien, ein Anspruch
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">
            Wohnungen, die ein Leben lang tragen. Donnarumma und Horstmann
            entwickeln, planen und bauen eigene Wohnprojekte in der Wedemark und
            den Nachbarorten – mit einem Handwerker-Netzwerk, das teils seit 30
            Jahren zusammensteht.
          </p>
        </Reveal>
      </section>

      {/* GESCHICHTE */}
      <section id="geschichte" className="scroll-mt-24 border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-sage-300">{storyLong.eyebrow}</p>
              <h2 className="mt-2 max-w-md text-display-lg">
                {storyLong.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="max-w-xl space-y-4 text-beige-100/75">
                {storyLong.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
                <blockquote className="mt-7 border-l border-accent-500/70 pl-5 font-display text-xl leading-relaxed text-beige-100 md:text-2xl">
                  „Ein gutes Bauprojekt misst sich nicht nur an der Substanz der
                  Wände, sondern am Gefühl der Menschen darin. Wir pflegen
                  langjährige Partnerschaften mit unseren Handwerkern – um für
                  Sie und mit Ihnen ein Zuhause zu schaffen, das verbindet.“
                </blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WERTE / PHILOSOPHIE (integriert die frühere /philosophie) */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <Reveal>
            <p className="eyebrow text-sage-300">Woran wir uns halten</p>
            <h2 className="mt-2 max-w-xl text-display-lg">Unsere Philosophie</h2>
          </Reveal>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-3">
            {storyLong.principles.map((p) => (
              <div key={p.title} className="bg-green-900 p-6 md:p-8">
                <dt className="text-heading">{p.title}</dt>
                <dd className="mt-2 text-sm text-beige-100/75">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* TEAM */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <p className="eyebrow text-sage-300">Die Menschen dahinter</p>
          <h2 className="mt-2 text-display-lg">Donnarumma &amp; Horstmann</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {teamProfiles.map((person) => (
              <article
                key={person.name}
                className="overflow-hidden rounded-2xl border border-beige-100/15 bg-green-950/35"
              >
                <div
                  className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-green-700 to-green-950"
                  role="img"
                  aria-label={`Porträtfoto von ${person.name} folgt`}
                >
                  <span className="font-display text-6xl text-beige-100/35" aria-hidden="true">
                    {person.initials}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-beige-100">
                    {person.name}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-beige-100/70">
                    {person.qualifications.map((qualification) => (
                      <li key={qualification} className="flex gap-2">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent-500/70" aria-hidden="true" />
                        <span>{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-dark">
            Porträtfotos werden nachgereicht.
          </p>
        </div>
      </section>

      {/* KOMPETENZ / E-E-A-T */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow text-sage-300">Nachweisbare Kompetenz</p>
              <h2 className="mt-2 max-w-md text-display-lg">
                Bewertung mit Sachverstand
              </h2>
              <p className="mt-4 max-w-md text-beige-100/75">
                Gerade bei Grundstücken zählt eine marktgerechte, nachvollziehbare
                Einschätzung – ohne Lockzahlen.
              </p>
              <div className="mt-2">
                <Todo>Exakte Bezeichnung der IHK-Bewertungsqualifikation</Todo>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-6 self-start">
              {companyStats.map((stat) => (
                <div key={stat.key}>
                  <dd className="nums text-display-lg text-accent-500">
                    {formatStat(stat)}
                  </dd>
                  <dt className="eyebrow mt-1 text-muted-dark">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          {hasPendingStats && (
            <div className="mt-6">
              <Todo>
                Belegbare Kennzahlen: Anzahl Projekte, Wohneinheiten,
                Gesamtwohnfläche
              </Todo>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-display-lg">
              Lernen Sie unsere Arbeit kennen
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/projekte" variant="primary">
                Projekte entdecken
              </Button>
              <Button href="/kontakt" variant="secondary">
                Kontakt aufnehmen
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
