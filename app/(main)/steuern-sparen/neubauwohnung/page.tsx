import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Neubauwohnung als Vermietungsobjekt",
  description:
    "Was eine seniorengerechte Neubauwohnung für Vermietung, laufende Kosten und steuerliche Abschreibung bedeuten kann.",
  path: "/steuern-sparen/neubauwohnung",
});

const checks = [
  ["Objektqualität", "Grundriss, Bauweise, energetischer Standard, Gemeinschaftseigentum und Ausstattung prüfen."],
  ["Vermietbarkeit", "Zielgruppen, ortsübliche Miete, Infrastruktur und realistische Nachfrage ohne Vollvermietungsgarantie bewerten."],
  ["Laufende Kosten", "Nicht umlagefähiges Hausgeld, Verwaltung und Instandhaltungsrücklage von Beginn an berücksichtigen."],
  ["Finanzierung", "Zins, Tilgung, Eigenkapital und Liquiditätsreserve auch bei veränderten Kosten belastbar kalkulieren."],
  ["Abschreibung", "Gebäudeanteil, Nutzungsbeginn und degressive AfA in der Gesamtplanung berücksichtigen."],
] as const;

export default function NeubauwohnungPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto grid max-w-container gap-12 px-6 pb-16 pt-32 md:grid-cols-2 md:items-center md:pb-24 md:pt-40">
        <div>
          <p className="eyebrow text-sage-300">Neubau als Vermietungsobjekt</p>
          <h1 className="mt-3 text-display-xl">Nicht versprechen. Vollständig rechnen.</h1>
          <p className="mt-6 text-lead text-beige-100/75">
            Eine hochwertige Neubauwohnung reduziert den technischen Startaufwand
            und nutzt bei WE 3 die degressive 5-%-Gebäude-AfA. Entscheidend ist
            aber die Gesamtrechnung aus Objekt, Miete, Finanzierung, Kosten und
            persönlicher Steuerwirkung.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/steuern-sparen/erstgespraech">Erstgespräch anfragen</Button>
            <Button href="/projekte/rotkamp-1" variant="secondary">Wohnungen ansehen</Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/rotkamp-1/wohnraum-eckfenster.jpg"
            alt="Heller Wohnraum einer Neubauwohnung im Projekt Rotkamp 1"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950/30">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <p className="eyebrow text-sage-300">Die fünf Prüfbereiche</p>
          <h2 className="mt-3 max-w-2xl text-display-lg">Was vor dem Kauf geklärt sein muss</h2>
          <ol className="mt-10 divide-y divide-beige-100/10 border-y border-beige-100/10">
            {checks.map(([title, text], index) => (
              <li key={title} className="grid gap-3 py-6 md:grid-cols-[5rem_16rem_1fr] md:items-start">
                <span className="nums text-accent-500">0{index + 1}</span>
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-beige-100/70">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 py-16 md:py-24">
          <div className="max-w-3xl rounded-2xl border border-beige-100/15 p-7 md:p-9">
            <article>
              <p className="eyebrow text-sage-300">Degressive Gebäude-AfA</p>
              <h2 className="mt-3 font-display text-3xl">5 % vom jeweiligen Restwert</h2>
              <p className="mt-4 text-sm leading-relaxed text-beige-100/70">
                Für begünstigte vermietete Neubauwohnungen beträgt die
                degressive Gebäude-AfA 5 % vom jeweiligen Restwert. Dadurch
                fällt ein größerer Teil der Abschreibung in die ersten Jahre.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
