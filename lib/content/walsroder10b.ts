// Projektdaten Walsroder Straße 10 b – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (10 Wohneinheiten, 960 m² Wohnfläche, zwei
// Vollgeschosse, unterkellert) sowie Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden): Fertigstellungsjahr und Wohnungsspiegel.

export const walsroder10b = {
  name: "Walsroder Straße 10 b",
  shortName: "Walsroder Straße 10 b",
  street: "Walsroder Straße 10 b",
  city: "Wedemark",
  postalCode: "30900",

  units: { total: 10, sold: 10 },

  facts: {
    buildings: 1,
    /** Zwei Vollgeschosse – bewusst niedriger als die Nachbarobjekte. */
    floors: ["Erdgeschoss", "1. Obergeschoss"],
    fullStoreys: 2,
    /** Gesamtwohnfläche laut Kundenangabe, in m². */
    totalArea: 960,
    basement: true,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    balconies: "Balkone und Terrassen mit eigenem Gartenanteil",
    parking: "Garagen und Stellplätze auf dem Grundstück",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Walsroder+Stra%C3%9Fe+10b%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Walsroder+Stra%C3%9Fe+10b,+30900+Wedemark&output=embed",
} as const;

export const walsroder10bAvgArea =
  walsroder10b.facts.totalArea / walsroder10b.units.total;

export const walsroder10bStory: string[] = [
  `${walsroder10b.units.total} Wohnungen auf ${walsroder10b.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche – bewusst nur zwei Vollgeschosse, damit sich das Haus in die Zeile der Nachbarbebauung einfügt und niemandem die Sonne nimmt.`,
  `Im Mittel rund ${Math.round(walsroder10bAvgArea)} m² je Wohnung, dazu Balkone und im Erdgeschoss Terrassen mit eigenem Gartenanteil. Das Gebäude ist unterkellert – Stauraum, der in vielen Neubauten fehlt.`,
  "Das Projekt ist fertiggestellt und bezogen. Es steht hier als Referenz – dieselbe Handschrift, die auch unsere laufenden Vorhaben trägt.",
];
