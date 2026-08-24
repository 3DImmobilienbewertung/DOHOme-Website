import Image from "next/image";
import Link from "next/link";
import { projectImage, HERO_SEED } from "@/lib/content/media";
import { HeroVideo } from "@/components/sections/HeroVideo";

export function Hero() {
  return (
    <section className="relative grid min-h-svh items-end overflow-hidden bg-green-700 text-beige-100">
      {/* Kein -z-10: `relative` erzeugt am Section-Element keinen
          Stacking-Kontext, ein negativer z-index würde das Bild hinter den
          Section-Hintergrund schieben und unsichtbar machen. Der Inhalt liegt
          stattdessen mit z-10 darüber. */}
      <div className="absolute inset-0">
        {/* Standbild trägt den ersten Eindruck: es ist sofort da und bleibt der
            LCP-Kandidat. Das Video legt sich erst darüber, wenn es abspielt –
            so wartet niemand auf 5 MB, bevor die Bühne steht. */}
        <Image
          src={projectImage(HERO_SEED, 2400, 1400)}
          alt="Rotkamp 1 in Wedemark – Mehrfamilienhäuser mit Klinkerfassade und Satteldach"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <HeroVideo />
        {/* Marken-Tönung, nach unten gewichtet: der Text steht sicher, das
            Gebäude behält oben seine echten Klinker- und Ziegeltöne.
            Achtung: Tailwind kennt Verlaufs-Stopps nur in 5-%-Schritten –
            krumme Werte wie via-52% werden stillschweigend verworfen. */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/60 via-45% to-transparent to-85%" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-6 pb-16 [text-shadow:0_1px_18px_rgba(15,36,26,0.6)] md:pb-24">
        <p className="eyebrow text-beige-100/85">
          Bauträger · Wedemark &amp; Region Hannover
        </p>

        <h1 className="mt-6 text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[1.02]">
          <span className="block">wir schaffen </span>
          <span className="block">Lebensräume</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-beige-100/85">
          Wir entwickeln, planen und bauen eigene Wohnprojekte in der Wedemark und
          der Region Hannover — mit einem Handwerker-Netzwerk, das teils seit 30
          Jahren zusammensteht.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 [text-shadow:none]">
          <Link
            href="/projekte"
            className="rounded-full bg-accent-500 px-7 py-3.5 text-sm font-medium text-green-950 transition-[transform,background-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-accent-400"
          >
            Projekte entdecken
          </Link>
          <Link
            href="/grundstueck-verkaufen"
            className="rounded-full border border-beige-100/45 px-7 py-3.5 text-sm font-medium text-beige-100 transition-colors hover:bg-beige-100/10"
          >
            Grundstück verkaufen
          </Link>
        </div>
      </div>

      {/* Scroll-Hinweis: führt zum Geschichts-Anriss. Bisher war das toter
          Text (pointer-events-none) – jetzt ein echter Anker-Link. */}
      <a
        href="#geschichte"
        className="group absolute bottom-8 right-6 z-10 flex items-center gap-3 text-beige-100/70 transition-colors hover:text-beige-100"
      >
        <span className="eyebrow">Unsere Geschichte</span>
        <span className="block h-10 w-px origin-top bg-beige-100/40 transition-transform duration-500 ease-out-expo group-hover:scale-y-125 group-hover:bg-beige-100/70" />
      </a>
    </section>
  );
}
