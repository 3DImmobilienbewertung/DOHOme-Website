// Projektdaten Rotkamp 1 (Wedemark) – Leuchtturmprojekt.
//
// Quelle: Wohnungsspiegel, Lageplan (001_Lageplan, 28.03.2025) und Ansichten
// (006_Ansichten, 10.03.2025), Projektnummer 2021-105.
// Bauvorhaben laut Plan: „Neubau Mehrfamilienhäuser mit Garagen und Carports
// in Rotkamp 1 A-C, 30900 Wedemark".
//
// Diese Datei ist die EINZIGE Quelle für Landingpage und Startseiten-Spotlight.

export const rotkamp = {
  name: "Rotkamp 1",
  /** Offizielle Bezeichnung aus den Bauplänen. */
  officialName: "Rotkamp 1 A–C",
  street: "Rotkamp 1",
  city: "Wedemark",
  postalCode: "30900",
  /** Lage laut Lageplan. */
  location: "Ecke Schaumburger Straße",

  /** Vom Kunden freigegebene Verkaufszahlen (Stand Juli 2026). */
  units: {
    total: 22,
    sold: 17,
    occupied: 15,
  },

  /** Belegte Kennzahlen aus dem Wohnungsspiegel. */
  facts: {
    /** Drei Baukörper: Haus A, B, C. */
    buildings: 3,
    /** Geschosse: EG, 1. OG, DG. */
    floors: ["Erdgeschoss", "1. Obergeschoss", "Dachgeschoss"],
    rooms: { min: 2, max: 3.5 },
    /** Wohnfläche gesamt je Einheit (inkl. 50 % Balkon/Terrasse), in m². */
    area: { min: 52.13, max: 89.35 },
    /** Gesamtwohnfläche des Projekts in m². */
    totalArea: 1466.28,
    /** Beheizte Wohnfläche in m². */
    heatedArea: 1392.72,
    /** Privatgärten im Erdgeschoss, in m². */
    gardens: { min: 28.1, max: 142.1 },
  },

  /** Stellplätze laut Aufstellung – für jede Wohnung einer. */
  parking: {
    garages: 10,
    carports: 3,
    outdoor: 9,
  },

  /** Architektur und Bauweise. */
  architecture: {
    facade: "Klinker",
    construction: "zweischaliges Mauerwerk",
    roof: "Satteldach",
    detail: "abgesetztes Dachgeschoss",
  },

  specs: {
    energy: "Effizienzhaus-55-Standard" as string | null,
    /** Noch offen – null blendet die Angabe aus statt zu raten. */
    completion: null as string | null,
  },
} as const;

export const unitsAvailable = rotkamp.units.total - rotkamp.units.sold;

export const soldPercent = Math.round(
  (rotkamp.units.sold / rotkamp.units.total) * 100,
);

/** Gesamtzahl Stellplätze (Garagen + Carports + Außenstellplätze). */
export const parkingTotal =
  rotkamp.parking.garages + rotkamp.parking.carports + rotkamp.parking.outdoor;

// ------------------------------------------------------------ Wohnungsspiegel
//
// Vollständige Aufstellung aus dem Wohnungsspiegel. `price` und `status` sind
// noch offen – sobald die Preisliste vorliegt, hier ergänzen; die Landingpage
// rendert daraus automatisch die Wohnungstabelle.

export type Unit = {
  /** Wohnungsnummer, z. B. "WE 1". */
  id: string;
  /** Haus A, B oder C. */
  house: "A" | "B" | "C";
  floor: "EG" | "1.OG" | "DG";
  rooms: number;
  /** Wohnfläche inkl. 50 % Balkon/Terrasse, in m². */
  areaSqm: number;
  /** Freifläche: Garten (EG) oder Balkon. */
  outdoor: string;
  /** Behindertengerecht ausgeführt (BHG im Wohnungsspiegel). */
  accessible?: boolean;
  status?: "verfuegbar" | "reserviert" | "verkauft" | null;
};

export const units: Unit[] = [
  // Erdgeschoss – mit Privatgarten
  { id: "WE 1", house: "A", floor: "EG", rooms: 2.5, areaSqm: 68.16, outdoor: "Garten 37,50 m²", accessible: true },
  { id: "WE 2", house: "A", floor: "EG", rooms: 2.5, areaSqm: 57.87, outdoor: "Garten 56,50 m²" },
  { id: "WE 3", house: "A", floor: "EG", rooms: 2, areaSqm: 62.59, outdoor: "Garten 28,10 m²" },
  { id: "WE 4", house: "B", floor: "EG", rooms: 2.5, areaSqm: 64.39, outdoor: "Garten 38,20 m²" },
  { id: "WE 5", house: "B", floor: "EG", rooms: 2.5, areaSqm: 64.39, outdoor: "Garten 37,75 m²" },
  { id: "WE 6", house: "C", floor: "EG", rooms: 2.5, areaSqm: 77.67, outdoor: "Garten 142,10 m²", accessible: true },
  { id: "WE 7", house: "C", floor: "EG", rooms: 2.5, areaSqm: 56.81, outdoor: "Garten 70,35 m²" },
  { id: "WE 8", house: "C", floor: "EG", rooms: 2.5, areaSqm: 68.85, outdoor: "Garten 97,35 m²" },
  // 1. Obergeschoss – mit Balkon
  { id: "WE 9", house: "A", floor: "1.OG", rooms: 2.5, areaSqm: 68.67, outdoor: "Balkon", accessible: true },
  { id: "WE 10", house: "A", floor: "1.OG", rooms: 2.5, areaSqm: 57.87, outdoor: "Balkon" },
  { id: "WE 11", house: "A", floor: "1.OG", rooms: 2, areaSqm: 63.1, outdoor: "Balkon" },
  { id: "WE 12", house: "B", floor: "1.OG", rooms: 2.5, areaSqm: 64.9, outdoor: "Balkon" },
  { id: "WE 13", house: "B", floor: "1.OG", rooms: 2.5, areaSqm: 64.9, outdoor: "Balkon" },
  { id: "WE 14", house: "C", floor: "1.OG", rooms: 2.5, areaSqm: 77.67, outdoor: "Balkon", accessible: true },
  { id: "WE 15", house: "C", floor: "1.OG", rooms: 2.5, areaSqm: 56.81, outdoor: "Balkon" },
  { id: "WE 16", house: "C", floor: "1.OG", rooms: 2.5, areaSqm: 69.37, outdoor: "Balkon" },
  // Dachgeschoss – größere Grundrisse
  { id: "WE 17", house: "A", floor: "DG", rooms: 3, areaSqm: 78.93, outdoor: "Balkon" },
  { id: "WE 18", house: "A", floor: "DG", rooms: 3, areaSqm: 73.65, outdoor: "Balkon" },
  { id: "WE 19", house: "B", floor: "DG", rooms: 2, areaSqm: 52.13, outdoor: "Balkon" },
  { id: "WE 20", house: "B", floor: "DG", rooms: 2, areaSqm: 52.16, outdoor: "Balkon" },
  { id: "WE 21", house: "C", floor: "DG", rooms: 3.5, areaSqm: 89.35, outdoor: "Balkon" },
  { id: "WE 22", house: "C", floor: "DG", rooms: 3, areaSqm: 76.04, outdoor: "Balkon" },
];

/** Behindertengerecht ausgeführte Wohnungen (BHG). */
export const accessibleUnits = units.filter((u) => u.accessible);
