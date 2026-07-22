// Gemeinsame Datentypen der Projektinhalte.
//
// Bewusst neutral gehalten, damit sich Projekte unterscheiden dürfen: Rotkamp 1
// hat Privatgärten und drei Baukörper, die Bissendorfer Straße einen Baukörper
// mit Abstellräumen. Optionale Felder bleiben leer, statt erfunden zu werden –
// die Wohnungstabelle blendet Spalten ohne Daten automatisch aus.

export type Unit = {
  /** Wohnungsnummer, z. B. "WE 1". */
  id: string;
  /** Baukörper, sofern das Projekt mehrere hat. */
  house?: string;
  /** Geschoss, z. B. "EG", "1.OG", "DG". */
  floor: string;
  rooms: number;
  /** Wohnfläche gesamt (inkl. anteiliger Balkon-/Terrassenfläche), in m². */
  areaSqm: number;
  /** Freifläche als Text, z. B. "Garten 37,50 m²" oder "Balkon". */
  outdoor?: string;
  /** Abstellraum in m², sofern dem Projekt zugeordnet. */
  storageSqm?: number;
  /** Behindertengerecht ausgeführt (BHG im Wohnungsspiegel). */
  accessible?: boolean;
  status?: "verfuegbar" | "reserviert" | "verkauft" | null;
};

/** Infrastruktur im Umfeld – belegte Entfernungen, keine Schätzungen. */
export type PoiGroup = {
  title: string;
  items: { name: string; distance: string }[];
};
