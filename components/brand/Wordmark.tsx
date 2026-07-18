// DOHOme-Wortmarke – SVG-Platzhalter (DH-Monogramm + Schriftzug).
// "DOHO" = Versal/halbfett, "me" = gemein/leicht. currentColor erbt die Textfarbe.
// Finale Vektor-Wortmarke wird später eingesetzt.

import { MONOGRAM_PATHS } from "./Monogram";

type WordmarkProps = {
  className?: string;
  /** Wenn die umgebende Struktur die Marke bereits benennt (z. B. ein Link mit
   *  aria-label), rein dekorativ rendern, um doppelte Screenreader-Ansagen zu
   *  vermeiden. */
  decorative?: boolean;
};

export function Wordmark({ className, decorative = false }: WordmarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 384 116"
      fill="none"
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "DOHOme" })}
    >
      {/* DH-Monogramm-Marke (echte Logo-Geometrie) */}
      <g
        stroke="currentColor"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {MONOGRAM_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* Schriftzug */}
      <text
        x="140"
        y="80"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-manrope), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "60px",
          letterSpacing: "0.01em",
        }}
      >
        DOHO
        <tspan style={{ fontWeight: 400 }}>me</tspan>
      </text>
    </svg>
  );
}
