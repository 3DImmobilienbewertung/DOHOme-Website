"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppReady } from "@/components/animation/AppReady";
import { projectImage, HERO_SEED } from "@/lib/content/media";
import { HeroVideo } from "@/components/sections/HeroVideo";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useAppReady();

  // Anfangszustände sofort beim Mount setzen, damit beim Lüften des
  // Preloader-Vorhangs nichts "fertig" aufblitzt.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.set(".hero-bg", { clipPath: "inset(0 0 100% 0)" });
      gsap.set([".hero-eyebrow", ".hero-line .line-inner"], { yPercent: 110 });
      gsap.set([".hero-sub", ".hero-cta"], { autoAlpha: 0, y: 20 });
      gsap.set(".hero-scroll", { autoAlpha: 0 });
    },
    { scope: root },
  );

  // Reveal-Timeline, sobald der Preloader fertig ist.
  useGSAP(
    () => {
      if (!ready) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".hero-bg", { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut" })
        .to(".hero-eyebrow", { yPercent: 0, duration: 0.8 }, "-=0.6")
        .to(".hero-line .line-inner", { yPercent: 0, duration: 1, stagger: 0.12 }, "-=0.5")
        .to(".hero-sub", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(".hero-cta", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .to(".hero-scroll", { autoAlpha: 1, duration: 0.6 }, "-=0.3");
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      ref={root}
      className="relative grid min-h-svh items-end overflow-hidden bg-green-700 text-beige-100"
    >
      {/* Kein -z-10: `relative` erzeugt am Section-Element keinen
          Stacking-Kontext, ein negativer z-index würde das Bild hinter den
          Section-Hintergrund schieben und unsichtbar machen. Der Inhalt liegt
          stattdessen mit z-10 darüber. */}
      <div className="hero-bg absolute inset-0">
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
        <div className="line-mask">
          <p className="hero-eyebrow eyebrow text-beige-100/85">
            Bauträger · Wedemark &amp; Region Hannover
          </p>
        </div>

        <h1 className="hero-line mt-6 text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[1.02]">
          <span className="line-mask">
            <span className="line-inner">wir schaffen </span>
          </span>
          <span className="line-mask">
            <span className="line-inner">Lebensräume</span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl text-lg text-beige-100/85">
          Wir entwickeln, planen und bauen eigene Wohnprojekte in der Wedemark und
          der Region Hannover — mit einem Handwerker-Netzwerk, das teils seit 30
          Jahren zusammensteht.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 [text-shadow:none]">
          <Link
            href="/projekte"
            className="hero-cta rounded-full bg-accent-500 px-7 py-3.5 text-sm font-medium text-green-950 transition-[transform,background-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-accent-400"
          >
            Projekte entdecken
          </Link>
          <Link
            href="/grundstueck-verkaufen"
            className="hero-cta rounded-full border border-beige-100/45 px-7 py-3.5 text-sm font-medium text-beige-100 transition-colors hover:bg-beige-100/10"
          >
            Grundstück verkaufen
          </Link>
        </div>
      </div>

      {/* Scroll-Hinweis: führt zum Geschichts-Anriss. Bisher war das toter
          Text (pointer-events-none) – jetzt ein echter Anker-Link. */}
      <a
        href="#geschichte"
        aria-label="Zu unserer Geschichte scrollen"
        className="hero-scroll group absolute bottom-8 right-6 z-10 flex items-center gap-3 text-beige-100/70 transition-colors hover:text-beige-100"
      >
        <span className="eyebrow">Unsere Geschichte</span>
        <span className="block h-10 w-px origin-top bg-beige-100/40 transition-transform duration-500 ease-out-expo group-hover:scale-y-125 group-hover:bg-beige-100/70" />
      </a>
    </section>
  );
}
