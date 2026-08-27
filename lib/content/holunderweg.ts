// Projektdaten Holunderweg 2 a/b – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (12 Wohneinheiten, 1.200,99 m² Wohnfläche, mit
// Keller) sowie Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden):
//   • Fertigstellungsjahr.
//   • Wohnungsspiegel (Aufteilung nach Zimmerzahl und Fläche) – bis dahin wird
//     nur die Gesamtfläche ausgewiesen, keine Spanne je Wohnung.

export const holunderweg = {
  name: "Holunderweg 2 a/b",
  shortName: "Holunderweg 2 a/b",
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
    totalArea: 1200.99,
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
    "https://www.google.com/maps/search/?api=1&query=Holunderweg+2a%2Fb%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Holunderweg+2a%2Fb,+30900+Wedemark&output=embed",
} as const;

export const holunderwegStory: string[] = [
  `${holunderweg.units.total} Wohnungen verteilen sich auf zwei Hauseingänge und ${holunderweg.facts.totalArea.toLocaleString("de-DE")} m² Gesamtwohnfläche. Klinkerfassade und Satteldach geben dem Gebäude eine ruhige, klare Gliederung.`,
  "Balkone, Dachterrassen und Gärten im Erdgeschoss schaffen private Außenbereiche. Das Gebäude ist vollständig unterkellert und bietet damit zusätzliche Nebenflächen.",
  "Garagen und Stellplätze befinden sich direkt auf dem Grundstück. Das Projekt ist fertiggestellt und bezogen.",
];
