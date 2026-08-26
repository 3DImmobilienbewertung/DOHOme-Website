import { Monogram } from "./Monogram";

// Horizontales Marken-Lockup: DH-Monogramm + Wortmarke „DOHOme“ in Montserrat.
// Alles skaliert über die Font-Size des Containers (className setzt z. B.
// text-[1.4rem]); currentColor trägt die Farbe (beige auf Grün, grün auf Beige).

type WordmarkProps = {
  className?: string;
  /** Zeigt den offiziellen Markenclaim unter der Wortmarke. */
  tagline?: boolean;
  /** Rein dekorativ rendern, wenn die Umgebung die Marke bereits benennt. */
  decorative?: boolean;
};

export function Wordmark({
  className,
  tagline = false,
  decorative = false,
}: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-[0.42em] leading-none ${className ?? ""}`}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "DOHOme" })}
    >
      <Monogram className="h-[1.32em] w-auto shrink-0" />
      <span className="flex flex-col">
        <span className="font-brand font-bold tracking-[0.01em]">DOHOme</span>
        {tagline && (
          <span className="mt-[0.28em] whitespace-nowrap font-brand text-[0.27em] font-medium tracking-[0.2em]">
            wir schaffen Lebensräume
          </span>
        )}
      </span>
    </span>
  );
}
