"use client";

import { useEffect, useRef, useState } from "react";

// Hintergrundvideo der Startseite: Drohnenflug über die realisierten Projekte.
//
// Grundsätze:
//   • Das Standbild darunter bleibt sichtbar, bis das Video wirklich läuft.
//     Es wird erst eingeblendet, wenn `playing` gesetzt ist – kein schwarzer
//     Kasten, kein Ruckeln beim ersten Frame.
//   • Geladen wird erst nach dem Mount, damit das Video nicht mit dem
//     LCP-Bild um Bandbreite konkurriert.
//   • Zwei kurze, hochwertig codierte Fassungen: Full HD ab Tabletbreite und
//     720p fürs Handy. Die frühere 58-Sekunden-Fassung war trotz nomineller
//     Auflösung sichtbar überkomprimiert; 20 Sekunden mit deutlich höherer
//     Datenrate liefern die für die Bühne erforderliche Detailzeichnung.
//   • `prefers-reduced-motion` und der Datensparmodus unterdrücken das Video
//     ganz. Wer Bewegung abbestellt hat, bekommt das ruhige Standbild.
//   • Stumm, in Schleife, `playsInline` – sonst blockt iOS die Wiedergabe
//     oder erzwingt Vollbild.
//   • Rein dekorativ: aria-hidden, kein Bedienelement. Der Inhalt der Seite
//     hängt nicht am Video.

const FULL_HD = "(min-width: 768px)";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Datensparmodus respektieren, wo der Browser ihn meldet.
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    el.src = window.matchMedia(FULL_HD).matches
      ? "/video/hero-1080.mp4?v=2"
      : "/video/hero-720.mp4?v=2";
    el.load();

    const start = () => {
      el.play().then(() => setPlaying(true)).catch(() => {
        // Autoplay verweigert – Standbild bleibt stehen. Kein Fehler für den
        // Besucher, die Bühne sieht trotzdem vollständig aus.
      });
    };
    if (el.readyState >= 3) start();
    else el.addEventListener("canplay", start, { once: true });

    // Wird die Seite in einem Hintergrund-Tab geöffnet, verschiebt der Browser
    // die Wiedergabe. Ohne diesen zweiten Versuch bliebe das Video für den
    // Rest des Besuchs unsichtbar, sobald der Tab in den Vordergrund kommt.
    const onVisible = () => {
      if (document.visibilityState === "visible" && el.paused) start();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      el.removeEventListener("canplay", start);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
