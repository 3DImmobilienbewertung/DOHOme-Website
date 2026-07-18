"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppReady } from "@/components/animation/AppReady";

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
      <div className="hero-bg absolute inset-0 -z-10">
        {/* Platzhalter-Bild – später durch /public/images/hero.jpg ersetzen */}
        <Image
          src="https://picsum.photos/seed/dohome-hero/2400/1400"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Marken-Tönung: dunkelgrün dominiert das Bild (Dark Luxe) */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/60 to-green-900/20" />
        <div className="absolute inset-0 bg-green-900/30 mix-blend-multiply" />
      </div>

      <div className="mx-auto w-full max-w-container px-6 pb-16 md:pb-24">
        <div className="line-mask">
          <p className="hero-eyebrow eyebrow text-sage-300">
            Projektentwicklung · Region Hannover
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
          Von Anfang an richtig gebaut — kompromisslose Qualität, ohne Stress. Seit
          2012, mit einem Handwerker-Netzwerk, das teils seit 30 Jahren zusammensteht.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
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

      <div className="hero-scroll pointer-events-none absolute bottom-8 right-6 flex items-center gap-3 text-beige-100/70">
        <span className="eyebrow">Unsere Geschichte</span>
        <span className="block h-10 w-px bg-beige-100/40" />
      </div>
    </section>
  );
}
