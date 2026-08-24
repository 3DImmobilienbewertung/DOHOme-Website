"use client";

import { useSyncExternalStore } from "react";
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
  const reduce = useSyncExternalStore(
    (onStoreChange) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
