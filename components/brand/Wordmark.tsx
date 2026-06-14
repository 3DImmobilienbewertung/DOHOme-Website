// DOHOme-Wortmarke – SVG-Platzhalter (DH-Monogramm + Schriftzug).
// "DOHO" = Versal/halbfett, "me" = gemein/leicht. currentColor erbt die Textfarbe.
// Finale Vektor-Wortmarke wird später eingesetzt.

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className }: WordmarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 384 116"
      fill="none"
      role="img"
      aria-label="DOHOme"
    >
      {/* DH-Monogramm-Marke (echte Logo-Geometrie) */}
      <g
        stroke="currentColor"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M28 24 H88 V70 Q88 92 66 92 H28" />
        <path d="M50 38 V86" />
        <path d="M50 58 H88" />
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
