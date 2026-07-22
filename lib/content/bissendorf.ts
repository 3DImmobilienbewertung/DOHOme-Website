// Projektdaten Bissendorfer Straße 21 – fertiggestelltes Wohnprojekt.
//
// Quelle: Wohnungsspiegel des Kunden (21 Wohneinheiten, EG / 1. OG / DG) sowie
// Außenaufnahme vom August 2023.
//
// PRÜFEN (an den Kunden): Der Wohnungsspiegel führt je Einheit eine Spalte
// „WFL warm“. Bei WE 1, WE 2 und WE 6 ergibt „warm + anteilige Balkonfläche“
// nicht die ausgewiesene Gesamtwohnfläche (Abweichung 0,06 – 1,29 m²), und die
// Summe der Warm-Spalte liegt 2,23 m² unter dem Blattergebnis. Deshalb wird
// hier ausschließlich die Spalte „WFL gesamt“ je Wohnung veröffentlicht – deren
// Summe stimmt mit dem Blattergebnis überein (1.486,19 m²).

import type { Unit } from "@/lib/content/types";

export const bissendorf = {
  name: "Bissendorfer Straße 21",
  shortName: "Bissendorfer Straße",
  street: "Bissendorfer Straße 21",
  // PRÜFEN: Ort und Postleitzahl vom Kunden bestätigen lassen.
  city: "Wedemark",
  postalCode: "30900",

  units: {
    total: 21,
    /** Vollständig vermarktet. */
    sold: 21,
  },

  facts: {
    buildings: 1,
    floors: ["Erdgeschoss", "1. Obergeschoss", "Dachgeschoss"],
    rooms: { min: 2, max: 4 },
    /** Wohnfläche gesamt je Einheit (inkl. anteiliger Balkon-/Terrassenfläche). */
    area: { min: 46.89, max: 100.31 },
    /** Gesamtwohnfläche laut Blattergebnis, in m². */
    totalArea: 1486.19,
    /** Beheizte Wohnfläche laut Blattergebnis, in m². */
    heatedArea: 1419.91,
    /** Abstellräume als Nutzfläche, in m². */
    storageArea: 180.11,
    /** Wohn- und Nutzfläche zusammen, in m². */
    grossArea: 1666.3,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    detail: "verglastes Treppenhaus über zwei Geschosse",
    balconies: "Glasbrüstungen",
  },

  /**
   * Vom Kunden bestätigt: alle 21 Wohnungen sind seniorengerecht ausgeführt.
   *
   * BEWUSST NICHT „barrierefrei“: Dieser Begriff ist über DIN 18040-2 definiert
   * und darf nur mit Nachweis verwendet werden. „Seniorengerecht“ ist die
   * Formulierung des Kunden und bleibt so stehen. Erst wenn eine Bestätigung
   * nach DIN 18040-2 vorliegt, darf hier aufgewertet werden.
   */
  accessibility: "alle Wohnungen seniorengerecht",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bissendorfer+Stra%C3%9Fe+21%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Bissendorfer+Stra%C3%9Fe+21,+30900+Wedemark&output=embed",
} as const;

// ------------------------------------------------------------ Wohnungsspiegel
//
// `areaSqm` ist die Spalte „WFL gesamt“, `storageSqm` der zugeordnete
// Abstellraum. Freiflächen sind im Blatt nur als anteilige Fläche geführt,
// nicht als Art (Balkon/Terrasse) – deshalb bleibt `outdoor` leer, statt eine
// Zuordnung zu erfinden. ERGÄNZEN, sobald die Angabe vorliegt.

export const bissendorfUnits: Unit[] = [
  // Erdgeschoss
  { id: "WE 1", floor: "EG", rooms: 2, areaSqm: 59.73, storageSqm: 7.91 },
  { id: "WE 2", floor: "EG", rooms: 4, areaSqm: 97.37, storageSqm: 10.7 },
  { id: "WE 3", floor: "EG", rooms: 2, areaSqm: 48.99, storageSqm: 7.76 },
  { id: "WE 4", floor: "EG", rooms: 2, areaSqm: 57.35, storageSqm: 7.79 },
  { id: "WE 5", floor: "EG", rooms: 2, areaSqm: 67.92, storageSqm: 8.07 },
  { id: "WE 6", floor: "EG", rooms: 3, areaSqm: 74.52, storageSqm: 8.53 },
  { id: "WE 7", floor: "EG", rooms: 3, areaSqm: 100.31, storageSqm: 9.14 },
  // 1. Obergeschoss
  { id: "WE 8", floor: "1.OG", rooms: 2, areaSqm: 59.73, storageSqm: 7.91 },
  { id: "WE 9", floor: "1.OG", rooms: 4, areaSqm: 97.35, storageSqm: 9.92 },
  { id: "WE 10", floor: "1.OG", rooms: 2, areaSqm: 48.99, storageSqm: 7.05 },
  { id: "WE 11", floor: "1.OG", rooms: 2, areaSqm: 57.35, storageSqm: 7.79 },
  { id: "WE 12", floor: "1.OG", rooms: 2, areaSqm: 67.92, storageSqm: 7.95 },
  { id: "WE 13", floor: "1.OG", rooms: 3, areaSqm: 74.52, storageSqm: 8.46 },
  { id: "WE 14", floor: "1.OG", rooms: 3, areaSqm: 100.31, storageSqm: 12.77 },
  // Dachgeschoss
  { id: "WE 15", floor: "DG", rooms: 2, areaSqm: 56.62, storageSqm: 7.79 },
  { id: "WE 16", floor: "DG", rooms: 2, areaSqm: 86.21, storageSqm: 9.14 },
  { id: "WE 17", floor: "DG", rooms: 2, areaSqm: 46.89, storageSqm: 6.22 },
  { id: "WE 18", floor: "DG", rooms: 2, areaSqm: 56.42, storageSqm: 7.88 },
  { id: "WE 19", floor: "DG", rooms: 2, areaSqm: 66.29, storageSqm: 8.24 },
  { id: "WE 20", floor: "DG", rooms: 3, areaSqm: 72.31, storageSqm: 8.28 },
  { id: "WE 21", floor: "DG", rooms: 2, areaSqm: 89.14, storageSqm: 10.81 },
];

/** Fließtext zur Ausführung – belegt durch Wohnungsspiegel und Aufnahme. */
export const bissendorfStory: string[] = [
  `Ein Baukörper mit ${bissendorf.units.total} Wohnungen über drei Geschosse, in ${bissendorf.architecture.facade} ausgeführt und mit ${bissendorf.architecture.roof} gedeckt. Ein über zwei Geschosse verglastes Treppenhaus gliedert die Straßenfassade und bringt Tageslicht bis in den Eingangsbereich.`,
  `Die Wohnungen reichen von ${bissendorf.facts.rooms.min} bis ${bissendorf.facts.rooms.max} Zimmern – von der kompakten Zweizimmerwohnung bis zur Vierzimmerwohnung mit rund 97 m². Zu jeder Einheit gehört ein eigener Abstellraum; zusammen ergeben sie gut 180 m² Nutzfläche zusätzlich zur Wohnfläche.`,
  "Alle Wohnungen sind seniorengerecht ausgeführt – nicht als Sonderfall für einzelne Einheiten, sondern durchgängig. Wer hier einzieht, muss die Wohnung im Alter nicht wieder verlassen.",
  "Das Projekt ist fertiggestellt und vollständig vermarktet. Es steht hier als Referenz – für die Handschrift, die auch unsere laufenden Vorhaben trägt.",
];
