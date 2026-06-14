// DH-Monogramm – saubere SVG-Nachbildung der echten Logo-Geometrie:
// ineinandergreifendes D + H, D-Rahmen oben-rechts kantig, unten-rechts gerundet,
// die rechte Senkrechte ist zugleich der rechte H-Stamm.
// Hand-rekonstruiert aus dem Logo-Bild; finale Vektor-Datei ersetzt dies 1:1.
// `animated` aktiviert die Linien-Zeichnung (strokeDashoffset) für den Preloader.

type MonogramProps = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  animated?: boolean;
};

const PATHS = [
  "M28 24 H88 V70 Q88 92 66 92 H28", // D-Rahmen: oben · rechte Strebe · Rundung u. r. · unten
  "M50 38 V86", // H – linker (kurzer) Stamm
  "M50 58 H88", // H – Querbalken (greift in die rechte D-Strebe)
];

export function Monogram({
  className,
  stroke = "currentColor",
  strokeWidth = 14,
  animated = false,
}: MonogramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 116 116"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          {...(animated
            ? { pathLength: 1, style: { strokeDasharray: 1, strokeDashoffset: 1 } }
            : {})}
        />
      ))}
    </svg>
  );
}
