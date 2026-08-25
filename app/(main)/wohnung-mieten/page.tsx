import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/animation/Reveal";
import { RentalInterestForm } from "@/components/forms/RentalInterestForm";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Mietwohnung in Wedemark gesucht?",
  description:
    "Mietwohnung in Wedemark und Umgebung gesucht? Hinterlegen Sie Ihr Suchprofil für seniorengerechte Wohnungen aus DOHOme-Wohnprojekten.",
  alternates: { canonical: "/wohnung-mieten" },
};

const housingFacts = [
  ["2–3,5", "Zimmer"],
  ["52–89 m²", "Wohnungsgrößen"],
  ["100 %", "seniorengerecht"],
] as const;

const process = [
  ["01", "Suchprofil senden", "Größe, Einzugstermin und persönliche Wünsche hinterlegen."],
  ["02", "Passende Wohnung", "Wir gleichen Ihr Profil mit verfügbaren Mietwohnungen ab."],
  ["03", "Persönlicher Kontakt", "Bei einer passenden Wohnung melden wir uns direkt bei Ihnen."],
] as const;

export default function WohnungMietenPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="relative isolate flex min-h-[min(82vh,760px)] items-end overflow-hidden">
        <Image
          src="/images/rotkamp-1/wohnraum-balkon.jpg"
          alt="Heller Wohnraum mit bodentiefen Fenstern und Balkon in einem DOHOme-Wohnprojekt"
          fill
          priority
          sizes="100vw"
          quality={84}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 from-10% via-green-950/80 via-55% to-green-950/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-green-950/85 to-transparent" />
        <div className="relative mx-auto w-full max-w-container px-6 pb-14 pt-36 md:pb-20">
          <Reveal>
            <p className="eyebrow text-accent-400">Mietwohnung in der Wedemark</p>
            <h1 className="mt-4 max-w-3xl text-display-xl">Wohnung gesucht?</h1>
            <p className="mt-6 max-w-2xl text-lead text-beige-100/80">
              Hinterlegen Sie einmal Ihr Suchprofil. Wenn eine passende Wohnung
              aus unseren Projekten zur Vermietung steht, können wir Sie gezielt
              informieren.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#suchprofil">Suchprofil hinterlegen</Button>
              {site.contact.phone && (
                <Button href={site.contact.phoneHref} variant="secondary">
                  Direkt anrufen
                </Button>
              )}
            </div>
          </Reveal>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl bg-beige-100/20 backdrop-blur-md">
            {housingFacts.map(([value, label]) => (
              <div key={label} className="bg-green-950/80 p-4 md:p-5">
                <dd className="nums text-xl text-accent-500 md:text-3xl">{value}</dd>
                <dt className="mt-1 text-[0.7rem] text-beige-100/60 md:text-xs">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-accent-400">So funktioniert es</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">
              Ein Suchprofil. Kein tägliches Suchen.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/15 md:grid-cols-3">
            {process.map(([number, title, text]) => (
              <article key={number} className="bg-green-900 p-7 md:p-9">
                <p className="nums text-sm text-accent-500">{number}</p>
                <h3 className="mt-7 font-display text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-beige-100/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-beige-100 text-ink">
        <div className="mx-auto grid max-w-container gap-10 px-6 py-14 md:grid-cols-[0.95fr_1.05fr] md:items-center md:py-20">
          <div>
            <p className="eyebrow text-green-700">Wohnen mit Substanz</p>
            <h2 className="mt-3 text-display-lg">Für heute geplant. Für morgen geeignet.</h2>
            <ul className="mt-7 space-y-4 text-sm text-ink/70">
              <li className="border-b border-green-900/10 pb-4">Seniorengerechte, alltagstaugliche Grundrisse</li>
              <li className="border-b border-green-900/10 pb-4">Balkon, Terrasse oder Garten – abhängig von der Wohnung</li>
              <li className="border-b border-green-900/10 pb-4">Ruhige Wohnlagen mit kurzen Wegen im Alltag</li>
              <li>Solide Neubauqualität aus eigener Projektentwicklung</li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/rotkamp-1/luftbild-projekt.jpg"
              alt="DOHOme-Wohnprojekt Rotkamp 1 in der Wedemark aus der Luft"
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
              quality={84}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="suchprofil" className="scroll-mt-24 border-t border-beige-100/10">
        <div className="mx-auto grid max-w-container gap-12 px-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow text-sage-300">Unverbindliches Suchprofil</p>
            <h2 className="mt-3 text-display-lg">Welche Wohnung suchen Sie?</h2>
            <p className="mt-5 text-beige-100/70">
              Je genauer Ihre Angaben sind, desto gezielter können wir eine
              passende Mietwohnung zuordnen. Das Suchprofil ist kostenlos und
              verpflichtet zu nichts.
            </p>
            <p className="mt-7 text-sm text-beige-100/55">
              Aktuell nichts Passendes dabei? Ihr Profil bleibt für künftige
              Wohnungen aus unseren Projekten vorgemerkt.
            </p>
          </div>
          <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-6 sm:p-8 md:p-10">
            <RentalInterestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
