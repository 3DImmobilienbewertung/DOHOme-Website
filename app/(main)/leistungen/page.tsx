import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Bau- und Immobilienleistungen in der Wedemark",
  description:
    "Projektentwicklung, Wohnungsbau, Immobilienbewertung und seniorengerechte Wohnkonzepte von DOHOme in der Region Hannover.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-container px-6 pb-14 pt-32 md:pb-20 md:pt-40">
        <Reveal>
          <p className="eyebrow text-sage-300">Leistungen</p>
          <h1 className="mt-3 max-w-4xl text-display-xl">
            Bauen, entwickeln und bewerten in der Region Hannover
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">
            DOHOme verbindet Planung, Baupraxis und Immobilienwissen. Sie sprechen direkt mit den Menschen, die Entscheidungen treffen und Projekte verantworten.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <div className="grid gap-5 md:grid-cols-2">
            {site.services.map((service, index) => (
              <Reveal key={service.path} delay={index * 0.05} className="min-w-0">
                <Link
                  href={service.path}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-beige-100/12 bg-green-900 p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent-500/45 md:p-10"
                >
                  <span className="nums text-xs text-accent-500">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-8 break-words font-display text-3xl md:text-4xl">{service.name}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-beige-100/70">{service.description}</p>
                  <span className="mt-8 text-sm text-accent-400">Leistung ansehen →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto flex max-w-container flex-col gap-7 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-24">
          <div>
            <p className="eyebrow text-sage-300">Konkretes Vorhaben?</p>
            <h2 className="mt-3 max-w-2xl text-display-lg">Sprechen Sie direkt mit DOHOme.</h2>
          </div>
          <Button href="/kontakt">Kontakt aufnehmen</Button>
        </div>
      </section>
    </main>
  );
}
