// Projektdaten Walsroder Straße 32 a/b – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (10 Wohneinheiten, 830 m² Wohnfläche, zwei
// Vollgeschosse, unterkellert) sowie Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden): Fertigstellungsjahr und Wohnungsspiegel.

export const walsroder32 = {
  name: "Walsroder Straße 32 a/b",
  shortName: "Walsroder Straße 32 a/b",
  street: "Walsroder Straße 32 a/b",
  city: "Wedemark",
  postalCode: "30900",

  units: { total: 10, sold: 10 },

  facts: {
    buildings: 1,
    /** Zwei Vollgeschosse – bewusst niedriger als die Nachbarobjekte. */
    floors: ["Erdgeschoss", "1. Obergeschoss"],
    fullStoreys: 2,
    /** Gesamtwohnfläche laut Kundenangabe, in m². */
    totalArea: 830,
    basement: true,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    balconies: "Balkone und Terrassen mit eigenem Gartenanteil",
    parking: "Garagen und Stellplätze auf dem Grundstück",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Walsroder+Stra%C3%9Fe+32a%2Fb%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Walsroder+Stra%C3%9Fe+32a%2Fb,+30900+Wedemark&output=embed",
} as const;

export const walsroder32Story: string[] = [
  `${walsroder32.units.total} Wohnungen auf ${walsroder32.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche sind auf zwei Vollgeschosse verteilt. Klinkerfassade und Satteldach orientieren sich an der Maßstäblichkeit der Wohnstraße.`,
  "Balkone sowie Terrassen mit eigenen Gartenanteilen ergänzen die Wohnungen um private Freiflächen. Das Gebäude ist vollständig unterkellert.",
  "Garagen und Stellplätze liegen auf dem Grundstück. Das Projekt ist fertiggestellt und bezogen.",
];
