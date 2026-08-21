// Projektdaten Holunderweg 4 – fertiggestelltes Wohnprojekt.
//
// Quelle: Angaben des Kunden (16 Wohneinheiten, 1.300 m² Wohnfläche,
// unterkellert) sowie Luftaufnahmen des Objekts.
//
// PRÜFEN (an den Kunden): Fertigstellungsjahr und Wohnungsspiegel.

export const holunderweg4 = {
  name: "Holunderweg 4",
  shortName: "Holunderweg 4",
  street: "Holunderweg 4",
  city: "Wedemark",
  postalCode: "30900",

  units: { total: 16, sold: 16 },

  facts: {
    buildings: 1,
    floors: ["Erdgeschoss", "1. Obergeschoss", "Dachgeschoss"],
    /** Gesamtwohnfläche laut Kundenangabe, in m². */
    totalArea: 1300,
    basement: true,
  },

  architecture: {
    facade: "Klinker",
    roof: "Satteldach",
    balconies: "Balkone und Dachterrassen, Gärten im Erdgeschoss",
    parking: "Garagen und Stellplätze auf dem Grundstück",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Holunderweg+4%2C+30900+Wedemark",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Holunderweg+4,+30900+Wedemark&output=embed",
} as const;

export const holunderweg4AvgArea =
  holunderweg4.facts.totalArea / holunderweg4.units.total;

export const holunderweg4Story: string[] = [
  `${holunderweg4.units.total} Wohnungen auf ${holunderweg4.facts.totalArea.toLocaleString("de-DE")} m² Wohnfläche in ruhiger Wohnlage am Ortsrand – hinter dem Haus verläuft die Bahnstrecke, davor eine gewachsene Nachbarschaft. Klinkerfassade, Satteldach, die Handschrift der Region.`,
  `Im Mittel rund ${Math.round(holunderweg4AvgArea)} m² je Wohnung, mit Balkonen, Dachterrassen und eigenen Gartenanteilen im Erdgeschoss. Das Gebäude ist unterkellert – zusätzlicher Stauraum, der in vielen Neubauten fehlt.`,
  "Das Projekt ist fertiggestellt und bezogen. Es steht hier als Referenz – dieselbe Handschrift, die auch unsere laufenden Vorhaben trägt.",
];
