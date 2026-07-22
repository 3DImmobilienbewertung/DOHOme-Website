"use client";

import { useState } from "react";

// Datenschutzfreundliche Karte („Zwei-Klick-Lösung"):
// Google Maps wird ERST nach ausdrücklichem Klick geladen. Bis dahin fließen
// keine Daten an Google, es werden keine Cookies gesetzt – die Seite bleibt
// einwilligungsfrei (§ 25 TDDDG). Wer nicht klickt, bekommt den Adress-Link.

type Props = {
  /** Einbettungs-URL (output=embed). */
  embedUrl: string;
  /** Direktlink für Nutzer, die nicht einbetten möchten. */
  linkUrl: string;
  address: string;
  className?: string;
};

export function ConsentMap({ embedUrl, linkUrl, address, className }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-beige-100/15 bg-green-950 ${className ?? ""}`}
    >
      {loaded ? (
        <iframe
          src={embedUrl}
          title={`Karte: ${address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[320px] w-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-sage-300"
          >
            <path
              d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <p className="font-display text-xl text-beige-100">{address}</p>

          <p className="max-w-sm text-sm text-beige-100/70">
            Beim Laden der Karte werden Daten an Google übertragen. Wir laden sie
            deshalb erst, wenn Sie zustimmen.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-green-950 transition-colors hover:bg-accent-400"
            >
              Karte laden
            </button>
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-beige-100/45 px-6 py-3 text-sm font-medium text-beige-100 transition-colors hover:bg-beige-100/10"
            >
              In Google Maps öffnen
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
