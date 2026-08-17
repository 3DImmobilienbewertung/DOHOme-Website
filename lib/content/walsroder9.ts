// Projektdaten Walsroder Straße 9 – fertiggestelltes Wohnprojekt.
//
// Nachbarobjekt der Walsroder Straße 7: beide Gebäude fassen einen gemeinsamen
// Innenhof mit Carports. Die Aufnahmen entstanden im selben Drohnenflug.
//
// Quelle: Angaben des Kunden (25 Wohneinheiten, 1.973 m² Wohnfläche).
//
// PRÜFEN (an den Kunden):
//   • Postleitzahl und Ort – hier 30900 Wedemark angenommen, analog zur
//     Nummer 7. Der Kunde hat den Ort nicht ausdrücklich genannt.
//   • Fertigstellungsjahr.
//   • Wohnungsspiegel (Aufteilung nach Zimmerzahl und Fläche) – bis dahin wird
//     nur die Gesamtfläche ausgewiesen, keine Spanne je Wohnung.

export const walsroder9 = {
  name: "Walsroder Straße 9",
  shortName: "Walsroder Straße 9",
  street: "Walsroder Straße 9",
  /** ANNAHME – vom Kunden bestätigen lassen. */
  city: "Wedemark",
  postalCode: "30900",

  units: {
    total: 25,
    /** Fertiggestellt und bezogen. */
    sold: 25,
  },

  facts: {
    buildings: 1,
    floors: ["Erdgeschoss", "1. Obergeschoss", "Dachgeschoss"],
    /** Gesamtwohnfläche laut Kundenangabe, in m². */
    totalArea: 1973,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    balconies: "Balkone mit Glasbrüstungen, Terrassen im Erdgeschoss",
    parking: "Carports und Stellplätze im gemeinsamen Innenhof",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Walsroder+Stra%C3%9Fe+9%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Walsroder+Stra%C3%9Fe+9,+30900+Wedemark&output=embed",
} as const;

/** Durchschnittliche Wohnfläche je Wohnung, in m². */
export const walsroder9AvgArea =
  walsroder9.facts.totalArea / walsroder9.units.total;

export const walsroder9Story: string[] = [
  `${walsroder9.units.total} Wohnungen auf ${walsroder9.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche – der größere der beiden Baukörper an der Walsroder Straße, in ${walsroder9.architecture.facade} ausgeführt und mit ${walsroder9.architecture.roof} gedeckt.`,
  "Gemeinsam mit der Nummer 7 fasst das Gebäude einen ruhigen Innenhof: Carports und Stellplätze liegen dort geschützt, die Wohnungen orientieren sich nach außen ins Grüne. Zu jeder Wohnung gehört ein Balkon, im Erdgeschoss eine Terrasse.",
  "Das Projekt ist fertiggestellt und bezogen. Es steht hier als Referenz – dieselbe Handschrift, die auch unsere laufenden Vorhaben trägt.",
];
