"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Monogram } from "@/components/brand/Monogram";
import { useAppReady } from "./AppReady";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);
  const { setReady } = useAppReady();

  // Sicherheitsnetz: Die CSS-Failsafe in globals.css blendet den Vorhang nach
  // 1,7 s aus, kann aber kein setReady() auslösen. Käme die Timeline nie durch
  // – etwa weil der Tab im Hintergrund lädt und requestAnimationFrame nicht
  // tickt –, bliebe der Hero dauerhaft unsichtbar. Deshalb wird die Seite
  // – etwa weil der Tab im Hintergrund lädt –, wird die Seite spätestens nach
  // 1,9 s in jedem Fall freigegeben.
  useEffect(() => {
    const t = window.setTimeout(setReady, 1900);
    return () => window.clearTimeout(t);
  }, [setReady]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isHome = window.location.pathname === "/";
      const seen = sessionStorage.getItem("dohome:intro") === "1";

      // Intro nur beim ersten Seitenaufruf der Session, nur auf der Startseite,
      // nur bei erlaubter Bewegung. Sonst sofort aufdecken.
      if (reduce || !isHome || seen) {
        gsap.set(root.current, { display: "none" });
        setReady();
        return;
      }
      sessionStorage.setItem("dohome:intro", "1");

      const paths = gsap.utils.toArray<SVGPathElement>(".monogram path");
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(sheen.current, { skewX: -18, xPercent: -120, autoAlpha: 0 });

      gsap
        .timeline({ onComplete: setReady })
        // DH-Monogramm Strich für Strich zeichnen (Timing aus dem Logo-Design)
        .to(paths[0], { strokeDashoffset: 0, duration: 0.32, ease: "power1.inOut" }, 0.03)
        .to(paths[1], { strokeDashoffset: 0, duration: 0.18, ease: "power1.inOut" }, 0.22)
        .to(paths[2], { strokeDashoffset: 0, duration: 0.25, ease: "power1.inOut" }, 0.27)
        .to(paths[4], { strokeDashoffset: 0, duration: 0.2, ease: "power1.inOut" }, 0.43)
        .to(paths[3], { strokeDashoffset: 0, duration: 0.15, ease: "power1.inOut" }, 0.5)
        // Sheen-Sweep über die fertige Marke
        .to(sheen.current, { xPercent: 900, autoAlpha: 1, duration: 0.25, ease: "sine.in" }, 0.56)
        .set(sheen.current, { autoAlpha: 0 })
        // Vorhang lüften
        .to(root.current, { yPercent: -100, duration: 0.35, ease: "power4.inOut" }, 0.68)
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
      <div className="relative w-48 overflow-hidden">
        <Monogram className="monogram w-full" strokeWidth={14} />
        <div
          ref={sheen}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-20%] left-0 w-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
        />
      </div>
    </div>
  );
}
