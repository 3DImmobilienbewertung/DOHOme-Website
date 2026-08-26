"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  value: number | null;
  unit?: string;
  suffix?: string;
};

const format = (value: number, unit?: string, suffix?: string) => {
  const number = new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 0,
  }).format(value);
  return `${number}${suffix ?? ""}${unit ? ` ${unit}` : ""}`;
};

export function AnimatedStat({ value, unit, suffix }: AnimatedStatProps) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const [display, setDisplay] = useState<number | null>(value);

  useEffect(() => {
    const element = root.current;
    if (!element || value == null) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const started = performance.now();
        const duration = 1500;
        const tick = (now: number) => {
          const progress = Math.min((now - started) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame.current = requestAnimationFrame(tick);
        };

        setDisplay(0);
        frame.current = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [value]);

  const finalText = value == null ? "—" : format(value, unit, suffix);
  const shownText = display == null ? "—" : format(display, unit, suffix);

  return (
    <span ref={root} aria-label={finalText}>
      <span aria-hidden="true">{shownText}</span>
    </span>
  );
}
