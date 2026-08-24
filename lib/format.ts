// Deutsche Zahlen-/Preis-/Flächenformatierung für die Website.

const euro0 = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const dec1 = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });
const dec2 = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 });

export function formatEuro(value: number | null | undefined): string {
  return value == null ? "—" : euro0.format(value);
}

export function formatSqm(value: number | null | undefined): string {
  return value == null ? "—" : `${dec1.format(value)} m²`;
}

/** Gesamtflächen: vorhandene Nachkommastellen bis auf zwei Stellen erhalten. */
export function formatTotalSqm(value: number | null | undefined): string {
  return value == null ? "—" : `${dec2.format(value)} m²`;
}

export function formatRooms(value: number | null | undefined): string {
  return value == null ? "—" : dec1.format(value);
}

/** "X bis Y" – bei identischen Werten nur eine Zahl. */
export function range(
  min: number | null | undefined,
  max: number | null | undefined,
  fmt: (v: number) => string,
): string {
  if (min == null && max == null) return "—";
  if (min == null) return fmt(max as number);
  if (max == null) return fmt(min);
  if (min === max) return fmt(min);
  return `${fmt(min)} – ${fmt(max)}`;
}

/**
 * "52,1 – 89,4 m²" – Einheit nur einmal am Ende. Kürzer als range(…, formatSqm)
 * und vermeidet Zeilenumbrüche in schmalen Kacheln.
 */
export function formatSqmRange(
  min: number | null | undefined,
  max: number | null | undefined,
): string {
  if (min == null && max == null) return "—";
  if (min == null) return formatSqm(max);
  if (max == null || min === max) return formatSqm(min);
  return `${dec1.format(min)} – ${formatSqm(max)}`;
}

/** "Juli 2026" aus einem ISO-Datum. */
export function formatMonthYear(iso: string | null | undefined): string {
  if (!iso) return "auf Anfrage";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "auf Anfrage";
  return d.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}
