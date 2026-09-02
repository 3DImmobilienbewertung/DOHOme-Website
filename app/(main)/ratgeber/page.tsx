import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Ratgeber zu Bauen, Wohnen und Grundstücken",
  description:
    "Praxiswissen von DOHOme zu Projektentwicklung, Neubauwohnungen, Grundstücksverkauf und seniorengerechtem Wohnen in der Wedemark.",
  path: "/ratgeber",
});

const guides = [
  {
    href: "/ratgeber/grundstueck-an-bautraeger-verkaufen",
    eyebrow: "Grundstück",
    title: "Grundstück direkt an einen Bauträger verkaufen",
    text: "Welche Unterlagen zählen, wie ein Angebot entsteht und woran Sie einen verlässlichen Ablauf erkennen.",
  },
  {
    href: "/ratgeber/neubauwohnung-kaufen-wedemark",
    eyebrow: "Neubau",
    title: "Neubauwohnung in der Wedemark kaufen",
    text: "Die wichtigsten Fragen zu Lage, Unterlagen, Bauqualität, Gesamtkosten und Übergabe.",
  },
  {
    href: "/ratgeber/seniorengerecht-barrierefrei",
    eyebrow: "Wohnen",
    title: "Seniorengerecht oder barrierefrei?",
    text: "Welche konkreten Merkmale für den Alltag entscheidend sind und was vor der Auswahl geprüft werden sollte.",
  },
  {
    href: "/ratgeber/projektentwicklung-ablauf",
    eyebrow: "Projektentwicklung",
    title: "So entsteht ein Wohnprojekt",
    text: "Vom Grundstück über Planung und Genehmigung bis zu Bau und Übergabe – kompakt erklärt.",
  },
] as const;

export default function RatgeberPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-container px-6 pb-14 pt-32 md:pb-20 md:pt-40">
        <Reveal>
          <p className="eyebrow text-sage-300">DOHOme Ratgeber</p>
          <h1 className="mt-3 max-w-4xl text-display-xl">Bauen und Wohnen verständlich erklärt</h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">
            Kurze, konkrete Orientierung aus der Projektpraxis – für Eigentümer, Käufer und Wohnungssuchende in der Wedemark und der Region Hannover.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto grid max-w-container gap-5 px-6 py-14 md:grid-cols-2 md:py-20">
          {guides.map((guide, index) => (
            <Reveal key={guide.href} delay={index * 0.05} className="min-w-0">
              <article className="h-full">
                <Link
                  href={guide.href}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-beige-100/12 bg-green-900 p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent-500/45 md:p-10"
                >
                  <p className="eyebrow text-accent-400">{guide.eyebrow}</p>
                  <h2 className="mt-5 break-words font-display text-3xl md:text-4xl">{guide.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-beige-100/70">{guide.text}</p>
                  <span className="mt-8 text-sm text-accent-400">Ratgeber lesen →</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
