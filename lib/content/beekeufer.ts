// Projektdaten Am Beekeufer 11 a/b – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (11 Wohneinheiten, 1.180 m² Wohnfläche,
// unterkellert) sowie Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden): Fertigstellungsjahr und Wohnungsspiegel.

export const beekeufer = {
  name: "Am Beekeufer 11 a/b",
  shortName: "Am Beekeufer 11 a/b",
  street: "Am Beekeufer 11 a/b",
  city: "Wedemark",
  postalCode: "30900",

  units: { total: 11, sold: 11 },

  facts: {
    buildings: 1,
    floors: ["Erdgeschoss", "1. Obergeschoss", "Dachgeschoss"],
    /** Gesamtwohnfläche laut Kundenangabe, in m². */
    totalArea: 1180,
    basement: true,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    balconies: "Balkone und Dachterrassen, Gärten im Erdgeschoss",
    parking: "Garagen und Stellplätze auf dem Grundstück",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Am+Beekeufer+11a%2Fb%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Am+Beekeufer+11a%2Fb,+30900+Wedemark&output=embed",
} as const;

export const beekeuferStory: string[] = [
  `${beekeufer.units.total} Wohnungen verteilen sich auf ${beekeufer.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche. Klinkerfassade und Satteldach geben dem fertiggestellten Gebäude eine klare, langlebige Erscheinung.`,
  "Balkone und Dachterrassen schaffen private Außenbereiche; die Erdgeschosswohnungen verfügen über eigene Gartenanteile. Das Gebäude ist vollständig unterkellert.",
  "Garagen und Stellplätze liegen direkt auf dem Grundstück. Das Projekt ist fertiggestellt, bezogen und Teil unseres gebauten Portfolios in der Wedemark.",
];
