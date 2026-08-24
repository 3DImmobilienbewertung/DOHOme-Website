import { Reveal } from "@/components/animation/Reveal";

// Trägt die Marken-DNA: architektonischer Anspruch, durchdachte Grundrisse,
// Quartiersdenken, Langlebigkeit. Bewusst nüchtern formuliert – die Substanz
// überzeugt, nicht die Adjektive.

const PRINCIPLES: { title: string; text: string }[] = [
  {
    title: "Entwurf aus einer Hand",
    text: "Wir entwickeln, planen und bauen selbst. Jede Wohnung entsteht aus einem durchgehenden Entwurf – nicht aus einem Katalog.",
  },
  {
    title: "Grundrisse, die den Alltag tragen",
    text: "Belichtung, Wege, Stauraum, Rückzug. Wir planen, wie Räume tatsächlich genutzt werden – über Jahrzehnte, nicht über eine Besichtigung.",
  },
  {
    title: "Quartier statt Einzelobjekt",
    text: "Nachbarschaft, Freiraum und Anbindung gehören zum Entwurf. Was wir bauen, soll den Ort auch in zwanzig Jahren noch tragen.",
  },
  {
    title: "Auf Dauer gebaut",
    text: "Materialwahl und Konstruktion sind auf Langlebigkeit ausgelegt. Wertbeständigkeit entsteht aus Substanz – nicht aus Ausstattungslisten.",
  },
];

export function ArchitectureSection() {
  return (
    <section className="bg-beige-100 text-ink">
      <div className="mx-auto max-w-container px-6 section">
        <Reveal>
          <p className="eyebrow text-green-700">Unser Anspruch</p>
          <h2 className="mt-2 max-w-2xl text-display-lg text-green-900">
            Wie wir bauen
          </h2>
          <p className="mt-5 max-w-xl text-lead text-green-900/70">
            Wir sind Bauträger im klassischen Sinn: Wir entwickeln eigene
            Projekte und verkaufen ausschließlich Wohnungen, die wir selbst
            gebaut haben.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t border-green-900/15 pt-5">
                <dt className="text-heading text-green-900">{p.title}</dt>
                <dd className="mt-2 text-green-900/70">{p.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
