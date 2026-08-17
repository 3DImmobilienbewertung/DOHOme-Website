// Projektdaten Walsroder Straße 7 – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (20 Wohnungen, 1.335 m² Wohnfläche) sowie
// Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden):
//   • Postleitzahl und Ort – hier 30900 Wedemark angenommen, weil DOHOme
//     ausschließlich dort und in den Nachbarorten baut und die Aufnahmen die
//     Ortslage zeigen. Der Kunde hat den Ort NICHT ausdrücklich genannt.
//   • Fertigstellungsjahr.
//   • Aufteilung der Wohnungen nach Zimmerzahl und Fläche (Wohnungsspiegel) –
//     bis dahin wird nur die Gesamtfläche ausgewiesen, keine Spanne je Wohnung.

export const walsroder = {
  name: "Walsroder Straße 7",
  shortName: "Walsroder Straße",
  street: "Walsroder Straße 7",
  /** ANNAHME – vom Kunden bestätigen lassen. */
  city: "Wedemark",
  postalCode: "30900",

  units: {
    total: 20,
    /** Fertiggestellt und bezogen. */
    sold: 20,
  },

  facts: {
    buildings: 1,
    floors: ["Erdgeschoss", "1. Obergeschoss", "Dachgeschoss"],
    /** Gesamtwohnfläche laut Kundenangabe, in m². */
    totalArea: 1335,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    detail: "verglastes Treppenhaus über die volle Gebäudehöhe",
    balconies: "Balkone mit Glasbrüstungen, Terrassen im Erdgeschoss",
    parking: "Carports und Stellplätze auf dem Grundstück",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Walsroder+Stra%C3%9Fe+7%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Walsroder+Stra%C3%9Fe+7,+30900+Wedemark&output=embed",
} as const;

/** Durchschnittliche Wohnfläche je Wohnung, in m². */
export const walsroderAvgArea =
  walsroder.facts.totalArea / walsroder.units.total;

/** Fließtext zur Ausführung – belegt durch Kundenangaben und Aufnahmen. */
export const walsroderStory: string[] = [
  `${walsroder.units.total} Wohnungen auf ${walsroder.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche, in ${walsroder.architecture.facade} ausgeführt und mit ${walsroder.architecture.roof} gedeckt. Ein über die volle Gebäudehöhe verglastes Treppenhaus teilt die Straßenfassade und bringt Tageslicht in jedes Geschoss.`,
  "Zu den Wohnungen gehören Balkone mit Glasbrüstungen, im Erdgeschoss Terrassen zum Garten. Geparkt wird auf dem eigenen Grundstück – überdachte Carports und Stellplätze direkt am Haus.",
  "Das Projekt ist fertiggestellt und bezogen. Es steht hier als Referenz: dieselbe Handschrift, die auch unsere laufenden Vorhaben trägt.",
];
