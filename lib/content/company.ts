// Unternehmenskennzahlen („Realisierte Projekte und Wohneinheiten seit Gründung").
//
// NACHTRAGEN: Sobald die belegten Zahlen vorliegen, hier `value` setzen –
// alle Ansichten (Startseite, Über uns) ziehen automatisch nach. Kennzahlen mit
// `value: null` werden entweder als Platzhalter markiert oder ausgeblendet,
// je nach Kontext. Keine erfundenen Zahlen ausliefern.

export type CompanyStat = {
  /** Interner Schlüssel. */
  key: string;
  /** Belegte Zahl – null, solange nicht bestätigt. */
  value: number | null;
  /** Einheit/Suffix, z. B. "m²". */
  unit?: string;
  label: string;
};

export const companyStats: CompanyStat[] = [
  { key: "projects", value: null, label: "realisierte Projekte" },
  { key: "units", value: null, label: "Wohneinheiten" },
  { key: "livingSpace", value: null, unit: "m²", label: "Gesamtwohnfläche" },
];

/** Deutsche Tausendertrennung; „—" solange die Zahl fehlt. */
export function formatStat(stat: CompanyStat): string {
  if (stat.value == null) return "—";
  const n = new Intl.NumberFormat("de-DE").format(stat.value);
  return stat.unit ? `${n} ${stat.unit}` : n;
}

/** True, wenn noch mindestens eine Kennzahl unbestätigt ist. */
export const hasPendingStats = companyStats.some((s) => s.value == null);
