// Projektdaten Holunderweg 2 a/b – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (12 Wohneinheiten, 1.150 m² Wohnfläche, mit
// Keller) sowie Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden):
//   • Fertigstellungsjahr.
//   • Wohnungsspiegel (Aufteilung nach Zimmerzahl und Fläche) – bis dahin wird
//     nur die Gesamtfläche ausgewiesen, keine Spanne je Wohnung.

export const holunderweg = {
  name: "Holunderweg 2 a/b",
  shortName: "Holunderweg",
  street: "Holunderweg 2 a/b",
  /** Vom Kunden genannt. */
  city: "Wedemark",
  postalCode: "30900",

  units: {
    total: 12,
    /** Fertiggestellt und bezogen. */
    sold: 12,
  },

  facts: {
    /** Zwei Hauseingänge, 2 a und 2 b. */
    buildings: 2,
    floors: ["Erdgeschoss", "1. Obergeschoss", "Dachgeschoss"],
    /** Gesamtwohnfläche laut Kundenangabe, in m². */
    totalArea: 1150,
    /** Unterkellert – zusätzlicher Stauraum je Wohnung. */
    basement: true,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    balconies: "Balkone und Dachterrassen mit Glasbrüstungen, Gärten im Erdgeschoss",
    parking: "Garagen und Stellplätze auf dem Grundstück",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Holunderweg+2%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Holunderweg+2,+30900+Wedemark&output=embed",
} as const;

/** Durchschnittliche Wohnfläche je Wohnung, in m². */
export const holunderwegAvgArea =
  holunderweg.facts.totalArea / holunderweg.units.total;

export const holunderwegStory: string[] = [
  `${holunderweg.units.total} Wohnungen auf ${holunderweg.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche, verteilt auf zwei Hauseingänge. Klinkerfassade, Satteldach, ruhige Wohnstraße – ein Haus, das sich in die gewachsene Nachbarschaft einfügt statt sie zu überragen.`,
  `Mit im Mittel rund ${Math.round(holunderwegAvgArea)} m² sind die Wohnungen großzügiger geschnitten als in unseren übrigen Projekten. Dazu kommen Balkone und Dachterrassen mit Glasbrüstungen, im Erdgeschoss eigene Gartenanteile.`,
  "Das Gebäude ist vollständig unterkellert: Stauraum, der in vielen Neubauten fehlt und den man spätestens beim zweiten Fahrrad vermisst. Geparkt wird in Garagen und auf Stellplätzen direkt am Haus.",
  "Das Projekt ist fertiggestellt und bezogen. Es steht hier als Referenz – dieselbe Handschrift, die auch unsere laufenden Vorhaben trägt.",
];
