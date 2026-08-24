// Projektdaten Halzroder Straße 32 a/b – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (10 Wohneinheiten, 830 m² Wohnfläche, zwei
// Vollgeschosse, unterkellert) sowie Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden): Fertigstellungsjahr und Wohnungsspiegel.

export const halzroder32 = {
  name: "Halzroder Straße 32 a/b",
  shortName: "Halzroder Straße 32 a/b",
  street: "Halzroder Straße 32 a/b",
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
    "https://www.google.com/maps/search/?api=1&query=Halzroder+Stra%C3%9Fe+32a%2Fb%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Halzroder+Stra%C3%9Fe+32a%2Fb,+30900+Wedemark&output=embed",
} as const;

export const halzroder32AvgArea =
  halzroder32.facts.totalArea / halzroder32.units.total;

export const halzroder32Story: string[] = [
  `${halzroder32.units.total} Wohnungen auf ${halzroder32.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche – bewusst nur zwei Vollgeschosse, damit sich das Haus in die Zeile der Nachbarbebauung einfügt und niemandem die Sonne nimmt.`,
  `Im Mittel rund ${Math.round(halzroder32AvgArea)} m² je Wohnung, dazu Balkone und im Erdgeschoss Terrassen mit eigenem Gartenanteil. Das Gebäude ist unterkellert – Stauraum, der in vielen Neubauten fehlt.`,
  "Das Projekt ist fertiggestellt und bezogen. Es steht hier als Referenz – dieselbe Handschrift, die auch unsere laufenden Vorhaben trägt.",
];
