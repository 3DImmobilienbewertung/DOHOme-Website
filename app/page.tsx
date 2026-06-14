import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/*
        Platzhalter-Abschnitt: dient als Scroll-Ziel für die Lenis-Demo und zeigt
        die 30 %-Beige-Fläche mit grünem Akzent. In der nächsten Phase folgen hier
        Über-uns-Scrollytelling, Projektübersicht und der Doppel-Funnel.
      */}
      <section className="bg-beige-100 text-ink">
        <div className="mx-auto max-w-container px-6 py-32 md:py-40">
          <p className="eyebrow text-green-700">Donnarumma · Horstmann</p>
          <h2 className="mt-6 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight">
            Zwei Familien, ein Anspruch: Häuser, die ein Leben lang halten.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink/70">
            Dieser Abschnitt ist vorerst ein Platzhalter und demonstriert das
            sanfte Lenis-Scrolling. Die weiteren Sektionen (Vertrauen, Säulen,
            Projekte, Doppel-Funnel) bauen wir im nächsten Schritt aus.
          </p>
        </div>
      </section>
    </main>
  );
}
