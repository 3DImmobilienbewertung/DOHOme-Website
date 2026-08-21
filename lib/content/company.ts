// Unternehmenskennzahlen für Startseite (TrustBand) und /ueber-uns.
//
// Werte werden aus der Portfolio-Registry berechnet (portfolioTotals), nicht
// von Hand gepflegt: Sobald ein Projekt dazukommt, stimmen die Kennzahlen
// automatisch. So kann keine Zahl auf der Website hinter dem tatsächlichen
// Portfolio zurückbleiben.

import { portfolioTotals } from "@/lib/content/projects";

export type CompanyStat = {
  key: string;
  value: number | null;
  /** Einheit/Suffix, z. B. "m²". */
  unit?: string;
  label: string;
};

export const companyStats: CompanyStat[] = [
  { key: "projects", value: portfolioTotals.projects, label: "realisierte Projekte" },
  { key: "units", value: portfolioTotals.units, label: "Wohneinheiten" },
  {
    key: "livingSpace",
    value: portfolioTotals.livingSpace,
    unit: "m²",
    label: "Gesamtwohnfläche",
  },
];

/** Deutsche Tausendertrennung; „—" solange die Zahl fehlt. */
export function formatStat(stat: CompanyStat): string {
  if (stat.value == null) return "—";
  const n = new Intl.NumberFormat("de-DE").format(stat.value);
  return stat.unit ? `${n} ${stat.unit}` : n;
}

/** True, wenn noch mindestens eine Kennzahl unbestätigt ist. */
export const hasPendingStats = companyStats.some((s) => s.value == null);
