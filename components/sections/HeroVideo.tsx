"use client";

import { useEffect, useRef, useState } from "react";

// Hintergrundvideo der Startseite: Drohnenflug über die realisierten Projekte.
//
// Grundsätze:
//   • Das sofort sichtbare Standbild und die Website laden zuerst. Erst nach
//     dem Window-Load wird die passende Filmfassung angefordert. Dadurch
//     konkurriert die bis zu 37 MB große QHD-Datei nicht mehr mit LCP, Schriften
//     und Navigation.
//   • Smartphones im Hochformat bekommen einen eigenen 1080 × 1920-Cut.
//     Dadurch muss keine kleine Querformatdatei mehr extrem vergrößert werden.
//   • Retina-Desktop bekommt weiterhin QHD. Nur ein ausdrücklich aktivierter
//     Datensparmodus erhält automatisch eine kleinere Fassung.
//   • Konstante 30 Bilder pro Sekunde und kurze Szenenwechsel verhindern das
//     Ruckeln des früheren Clips mit variabler Bildrate.
//   • `prefers-reduced-motion` unterdrückt das Video per CSS. Wer Bewegung
//     abbestellt hat, bekommt das ruhige Standbild.
//   • Stumm, in Schleife, `playsInline` – sonst blockt iOS die Wiedergabe
//     oder erzwingt Vollbild.
//   • Rein dekorativ: aria-hidden, kein Bedienelement. Der Inhalt der Seite
//     hängt nicht am Video.

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const selectSource = () => {
      const connection = (
        navigator as Navigator & {
          connection?: { effectiveType?: string; saveData?: boolean };
        }
      ).connection;
      const saveData = connection?.saveData === true;
      const portraitPhone =
        window.innerWidth < 768 && window.matchMedia("(orientation: portrait)").matches;

      // Das eigens zugeschnittene Hochkantvideo liefert auf Retina-Handys
      // deutlich mehr sichtbare Details als die bisherige 540p-Querfassung.
      // effectiveType wird hier bewusst nicht zur Qualitätswahl verwendet:
      // Browser melden selbst in schnellen WLANs gelegentlich fälschlich 3G.
      if (portraitPhone && !saveData) {
        setSrc("/video/hero-mobile-1080.mp4");
        return;
      }

      // Auf großen Retina-Flächen hat die sichtbare Bildqualität Vorrang.
      // Weil der Film erst nach dem Seitenaufbau lädt, bremst QHD den ersten
      // Eindruck und die Bedienbarkeit trotzdem nicht mehr aus.
      const retinaDesktop = window.innerWidth >= 1200 && window.devicePixelRatio >= 1.5;
      if (retinaDesktop || window.innerWidth >= 1800) {
        setSrc("/video/hero-1440.mp4");
        return;
      }

      if (saveData) {
        setSrc(window.innerWidth >= 768 ? "/video/hero-720.mp4" : "/video/hero-540.mp4");
        return;
      }

      if (window.innerWidth >= 900) {
        setSrc("/video/hero-1080.mp4");
      } else if (window.innerWidth >= 560) {
        setSrc("/video/hero-720.mp4");
      } else {
        setSrc("/video/hero-540.mp4");
      }
    };

    if (document.readyState === "complete") {
      const timeout = window.setTimeout(selectSource, 180);
      return () => window.clearTimeout(timeout);
    }

    window.addEventListener("load", selectSource, { once: true });
    return () => window.removeEventListener("load", selectSource);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {
        // Das Standbild bleibt sichtbar; ein erneuter Versuch folgt, sobald der
        // Tab wieder aktiv wird oder genügend Daten vorhanden sind.
      });
    };
    const onVisibilityChange = () => {
      if (!document.hidden) play();
    };

    play();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src ?? undefined}
      autoPlay
      muted
      loop
      playsInline
      preload={src ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={() => {
        const video = videoRef.current;
        if (video) {
          // iOS kann das native `play`-Ereignis auslösen, bevor React den
          // Listener nach dem Quellenwechsel registriert hat. Sobald ein
          // abspielbares Bild vorliegt, darf der Film daher sicher einblenden.
          setIsPlaying(true);
          void video.play().catch(() => undefined);
        }
      }}
      onPlay={() => setIsPlaying(true)}
      onError={() => {
        if (src !== "/video/hero-540.mp4") setSrc("/video/hero-540.mp4");
      }}
      className={`hero-video absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
        isPlaying ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
