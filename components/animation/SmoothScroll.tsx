"use client";

import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hält ScrollTrigger mit dem Lenis-Scroll in Sync, damit Scroll-Reveals
// zuverlässig auslösen (sonst kann Inhalt unter dem Fold unsichtbar bleiben).
function LenisScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

// Lenis respektiert prefers-reduced-motion: bei „reduce“ wird das JS-getriebene
// Smooth-Scrolling komplett ausgelassen (der globale CSS-Kill-Switch greift nur
// für CSS-Animationen). Reagiert auch auf Umschalten zur Laufzeit.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
