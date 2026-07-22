// Projektdaten Rotkamp 1 (Wedemark) – Leuchtturmprojekt.
//
// Diese Datei ist die EINZIGE Quelle für die Landingpage und den
// Startseiten-Spotlight. Sobald die Preisliste vorliegt, werden hier die
// Einheiten ergänzt; alle Ansichten ziehen automatisch nach.
//
// Belegte Zahlen (Stand Juli 2026, vom Kunden freigegeben):
//   22 Wohneinheiten · 17 verkauft · 15 vermietet/belegt

export const rotkamp = {
  name: "Rotkamp 1",
  city: "Wedemark",
  postalCode: "30900",

  /** Belegte Projektzahlen. */
  units: {
    total: 22,
    sold: 17,
    occupied: 15,
  },

  /** Noch nicht bestätigt – null blendet die Angabe aus statt zu raten. */
  specs: {
    /** z. B. "KfW 55 / Wärmepumpe" */
    energy: null as string | null,
    /** Wohnflächen-Spanne in m², z. B. { min: 54, max: 118 } */
    area: null as { min: number; max: number } | null,
    /** Zimmer-Spanne, z. B. { min: 2, max: 4 } */
    rooms: null as { min: number; max: number } | null,
    /** Bezugstermin, z. B. "Frühjahr 2027" */
    completion: null as string | null,
  },
} as const;

/** Wie viele Einheiten rechnerisch noch nicht verkauft sind. */
export const unitsAvailable = rotkamp.units.total - rotkamp.units.sold;

/** Verkaufsfortschritt in Prozent (gerundet) – für die Fortschrittsanzeige. */
export const soldPercent = Math.round(
  (rotkamp.units.sold / rotkamp.units.total) * 100,
);

// ---------------------------------------------------------------- Preisliste
//
// NACHTRAGEN: Sobald die Preisliste hochgeladen ist, werden die Einheiten hier
// eingepflegt. Die Landingpage rendert daraus automatisch eine Wohnungstabelle.
// Solange die Liste leer ist, zeigt die Seite stattdessen den Beratungs-CTA.

export type Unit = {
  /** Wohnungsnummer, z. B. "WE 04" */
  id: string;
  rooms: number;
  areaSqm: number;
  floor: string;
  /** Kaufpreis in Euro – null, wenn auf Anfrage. */
  price: number | null;
  status: "verfuegbar" | "reserviert" | "verkauft";
  /** Besonderheiten, z. B. "Südterrasse, Gäste-WC" */
  note?: string;
};

export const units: Unit[] = [];
