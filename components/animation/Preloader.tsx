"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Monogram } from "@/components/brand/Monogram";
import { useAppReady } from "./AppReady";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const { setReady } = useAppReady();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(root.current, { display: "none" });
        setReady();
        return;
      }

      const paths = gsap.utils.toArray<SVGPathElement>(".monogram path");

      gsap
        .timeline({ onComplete: setReady })
        // 1. DH-Monogramm "zeichnen"
        .to(paths, {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power2.inOut",
        })
        // 2. kurzer Atem
        .to(".monogram", { scale: 0.96, duration: 0.4, ease: "power2.out" }, "-=0.2")
        // 3. Vorhang nach oben
        .to(
          root.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "+=0.15",
        )
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] grid place-items-center bg-green-700"
    >
      <Monogram animated stroke="#F1EFE9" className="monogram h-24 w-24" />
    </div>
  );
}
