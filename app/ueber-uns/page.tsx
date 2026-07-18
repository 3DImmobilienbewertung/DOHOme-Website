import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animation/Reveal";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "DOHOme – zwei Familien, ein Anspruch: Neubau in der Region Hannover, von Anfang an richtig gebaut. Donnarumma & Horstmann, familiengeführt seit 2012.",
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
            Häuser, die ein Leben lang halten. Seit {site.founded} entwickeln
            Donnarumma und Horstmann Lebensräume in der Wedemark und der Region
            Hannover – mit einem Handwerker-Netzwerk, das teils seit 30 Jahren
            zusammensteht.
          </p>
        </Reveal>
      </section>

      {/* GESCHICHTE */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-sage-300">Unsere Geschichte</p>
              <h2 className="mt-2 max-w-md text-display-lg">
                Aus dem Handwerk gewachsen
              </h2>
            </div>
            <div className="max-w-xl space-y-4 text-beige-100/75">
              <p>
                Der Kern von DOHOme ist Handwerk, nicht Vertrieb. Weil wir selbst
                bauen und selbst verantworten, entscheidet bei uns die Qualität –
                nicht die schnellste Marge.
              </p>
              <Todo>Gründer-Story beider Familien (Text vom Kunden)</Todo>
            </div>
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
            {[
              [
                "Von Anfang an richtig",
                "Kompromisslose Qualität statt Nacharbeit – gebaut, um Generationen zu tragen.",
              ],
              [
                "Ein Partner, keine Kette",
                "Sie sprechen mit den Inhabern. Verantwortung bleibt an einem Tisch.",
              ],
              [
                "Regional verwurzelt",
                "Wir kennen die Orte, Bauämter und Menschen der Region Hannover.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="bg-green-900 p-6 md:p-8">
                <dt className="text-heading">{title}</dt>
                <dd className="mt-2 text-sm text-beige-100/75">{text}</dd>
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
          <div className="mt-4">
            <Todo>Porträtfotos + Kurzvorstellung der Gründer:innen</Todo>
          </div>
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
              {[
                ["seit", String(site.founded)],
                ["Projekte", "—"],
                ["Einheiten", "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dd className="text-display-lg nums text-accent-500">{value}</dd>
                  <dt className="eyebrow mt-1 text-muted-dark">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-6">
            <Todo>Belegbare Kennzahlen (Projekte / Einheiten seit {site.founded})</Todo>
          </div>
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
