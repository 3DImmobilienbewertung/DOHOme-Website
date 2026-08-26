"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Wordmark } from "@/components/brand/Wordmark";
import { useAppReady } from "./AppReady";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const { setReady } = useAppReady();

  // Sicherheitsnetz: Sollte die Animation in einem Hintergrund-Tab nicht
  // anlaufen, wird die Seite nach drei Sekunden zuverlässig freigegeben.
  useEffect(() => {
    const t = window.setTimeout(setReady, 3000);
    return () => window.clearTimeout(t);
  }, [setReady]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isHome = window.location.pathname === "/";
      const seen = sessionStorage.getItem("dohome:intro") === "1";

      // Intro nur beim ersten Startseitenaufruf der Sitzung. Unterseiten und
      // Reduced-Motion-Nutzer werden nicht durch einen Vorhang aufgehalten.
      if (reduce || !isHome || seen) {
        gsap.set(root.current, { display: "none" });
        setReady();
        return;
      }
      sessionStorage.setItem("dohome:intro", "1");

      gsap.set(logo.current, { autoAlpha: 0, scale: 0.84, y: 16 });

      gsap
        .timeline({ onComplete: setReady })
        .to(logo.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
        })
        .to(
          logo.current,
          { autoAlpha: 0, scale: 1.025, duration: 0.45, ease: "power2.in" },
          "+=0.42",
        )
        .to(root.current, { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, "-=0.18")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      role="status"
      aria-label="DOHOme wird geladen"
      className="preloader fixed inset-0 z-preloader grid place-items-center bg-green-700 text-beige-100"
    >
      <div ref={logo} className="px-8 text-center">
        <Wordmark className="text-[2rem] sm:text-[2.65rem]" tagline decorative />
      </div>
    </div>
  );
}
