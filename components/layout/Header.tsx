"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

const NAV = [
  { href: "/projekte", label: "Projekte" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

const GRUNDSTUECK = { href: "/grundstueck-verkaufen", label: "Grundstück verkaufen" };

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Headroom: kompakte Fixed-Bar mit Untergrund ab Scroll-Schwelle; beim
  // Runterscrollen ausblenden, beim Hochscrollen wieder einblenden.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 240);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile-Panel: Escape schließt (Fokus zurück auf Toggle), Body-Scroll-Lock.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-header text-beige-100 transition-transform duration-500 ease-out-expo ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-beige-100/10 bg-green-900/95 backdrop-blur"
            : "border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-container items-center justify-between px-6 transition-[padding] duration-300 ${
            scrolled ? "py-4" : "py-6"
          }`}
        >
          <Link href="/" aria-label="DOHOme – Startseite" className="shrink-0">
            <Wordmark className="text-[1.35rem]" decorative />
          </Link>

          {/* Desktop-Navigation */}
          <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-beige-100/85 transition-colors hover:text-beige-100"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href={GRUNDSTUECK.href}
              className="rounded-full border border-beige-100/45 px-5 py-2 text-sm transition-colors hover:bg-beige-100/10"
            >
              {GRUNDSTUECK.label}
            </Link>
          </nav>

          {/* Mobile-Toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-6 bg-beige-100 transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-beige-100 transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile-Sheet mit Scrim */}
      {open && (
        <div className="fixed inset-0 top-0 z-overlay md:hidden">
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-green-950/70 backdrop-blur-sm"
          />
          <nav
            id="mobile-nav"
            aria-label="Mobile Navigation"
            className="absolute inset-x-4 top-24 rounded-2xl bg-green-900 p-6 shadow-2xl"
          >
            <ul className="flex flex-col gap-4">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="text-lg text-beige-100/90 transition-colors hover:text-beige-100"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={GRUNDSTUECK.href}
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full border border-beige-100/45 px-5 py-2 text-sm"
                >
                  {GRUNDSTUECK.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
