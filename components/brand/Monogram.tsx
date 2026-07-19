// DH-Monogramm – finale Vektorgeometrie aus dem Marken-Design (monolineal, D mit
// hoher, überstehender H-Strebe und Querbalken). Einzige Quelle der Geometrie;
// Wortmarke, Preloader und Favicon leiten sich hiervon ab.
// stroke = currentColor, damit die Marke die jeweilige Textfarbe erbt.

type MonogramProps = {
  className?: string;
  strokeWidth?: number;
};

export const MONOGRAM_PATHS = [
  "M20 20 L96 20 C142 20 170 52 170 100 C170 148 142 180 96 180 L20 180", // D-Bogen
  "M66 52 L66 148", // innerer / H-linker Stamm
  "M216 14 L216 186", // rechte (hohe) H-Strebe
  "M186 14 L216 14", // Kopf-Serife der H-Strebe
  "M120 100 L216 100", // H-Querbalken
];

export function Monogram({ className, strokeWidth = 15 }: MonogramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {MONOGRAM_PATHS.map((d, i) => (
        <path key={i} d={d} pathLength={1} />
      ))}
    </svg>
  );
}
