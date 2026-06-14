"use client";

import { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

const NAV = [
  { href: "/projekte", label: "Projekte" },
  { href: "/kapitalanlage", label: "Kapitalanlage" },
  { href: "/philosophie", label: "Philosophie" },
  { href: "/ueber-uns", label: "Über uns" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-beige-100">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-6">
        <Link href="/" aria-label="DOHOme – Startseite" className="shrink-0">
          <Wordmark className="h-9 w-auto" />
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
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
            href="/grundstueck-anbieten"
            className="rounded-full border border-beige-100/40 px-5 py-2 text-sm transition-colors hover:bg-beige-100/10"
          >
            Grundstück anbieten
          </Link>
        </nav>

        {/* Mobile-Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
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

      {/* Mobile-Panel */}
      {open && (
        <nav className="mx-4 rounded-2xl bg-green-900/95 p-6 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-beige-100/90"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/grundstueck-anbieten"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-beige-100/40 px-5 py-2 text-sm"
              >
                Grundstück anbieten
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
