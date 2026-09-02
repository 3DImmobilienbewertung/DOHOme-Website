// Unternehmenskennzahlen für Startseite (TrustBand) und /ueber-uns.
//
// Portfolio-Werte werden aus der Projekt-Registry berechnet. Die vom
// Unternehmen bestätigte Kundenzahl wird separat als Vertrauenssignal geführt.

import { portfolioTotals } from "@/lib/content/projects";

export type TeamProfile = {
  name: string;
  initials: string;
  qualifications: string[];
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
};

// Die Qualifikationen stammen aus den bestätigten Angaben des Unternehmens.
export const teamProfiles: TeamProfile[] = [
  {
    name: "Tasso Donnarumma",
    initials: "TD",
    image: {
      src: "/images/team/tasso-donnarumma.jpeg",
      alt: "Tasso Donnarumma von DOHOme",
      objectPosition: "50% 54%",
    },
    qualifications: [
      "Holz- und Bautenschutztechniker",
      "Kaufmann",
      "Sachverständiger für Bauwerksabdichtung",
    ],
  },
  {
    name: "Jens Horstmann",
    initials: "JH",
    qualifications: ["Architekt a. D.", "Tischler"],
  },
  {
    name: "Vito Donnarumma",
    initials: "VD",
    image: {
      src: "/images/team/vito-donnarumma.jpg",
      alt: "Vito Donnarumma von DOHOme",
    },
    qualifications: [
      "Bachelor of Science Architektur",
      "Energieberater",
      "Immobilienbewerter – TA Bildungszentrum mit IHK-Prüfung",
    ],
  },
];

export type CompanyStat = {
  key: string;
  value: number | null;
  /** Einheit/Suffix, z. B. "m²". */
  unit?: string;
  label: string;
};

export const companyStats: CompanyStat[] = [
  { key: "customers", value: 100, unit: "+", label: "Zufriedene Kunden" },
  { key: "units", value: portfolioTotals.units, label: "Wohneinheiten realisiert & aktuell" },
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
  if (stat.unit === "+") return `${n}+`;
  return stat.unit ? `${n} ${stat.unit}` : n;
}

/** True, wenn noch mindestens eine Kennzahl unbestätigt ist. */
export const hasPendingStats = companyStats.some((s) => s.value == null);
