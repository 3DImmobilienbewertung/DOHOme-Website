// Presse-Referenzen (E-E-A-T / Social Proof). Zentrale Quelle für den
// „Bekannt aus"-Bereich auf Startseite und Landingpages.
//
// Medienliste vom Kunden bestätigt. Belegt mit Artikel-URL ist bislang nur der
// HAZ-Bericht; die übrigen Titel stehen als Nennung ohne Link.
//
// HINWEIS zur HAZ: „HAZ" und „Hannoversche Allgemeine Zeitung" sind dasselbe
// Blatt und deshalb bewusst EIN Eintrag. Ein Medium doppelt zu führen würde die
// Liste künstlich verlängern und fiele Lesern aus der Region sofort auf.
//
// OFFEN: Dem Kunden liegen zwei E-Paper-Ausgaben des extra-Verlags vor:
//   https://epaper.extra-verlag.de/epaper/download_page_pdf/14/15447/
//   https://epaper.extra-verlag.de/epaper/download_page_pdf/15/15464/
// Welche der Echo-Ausgaben das jeweils ist, war zunächst geraten und hat sich
// als falsch erwiesen. Deshalb sind die Links hier NICHT zugeordnet. Sobald die
// Zuordnung feststeht: als `url` beim passenden Titel eintragen.

export type PressItem = {
  outlet: string;
  short: string;
  headline?: string;
  url?: string;
};

// Hervorgehobenes Zitat (Schlagzeile, attribuiert).
export const pressHighlight = {
  quote: "Vorzeigeprojekt für Wedemark",
  outlet: "Hannoversche Allgemeine Zeitung",
  url: "https://www.haz.de/lokales/umland/wedemark/buergermeister-vorzeigeprojekt-fuer-wedemark-5VMAH23YYTLM4PAVVT4ODNG6UU.html",
};

export const press: PressItem[] = [
  {
    outlet: "Hannoversche Allgemeine Zeitung",
    short: "HAZ",
    headline: "Bürgermeister: Vorzeigeprojekt für Wedemark",
    url: pressHighlight.url,
  },
  { outlet: "Langenhagener Echo", short: "Langenhagener Echo" },
  { outlet: "Schwarmstedter Echo", short: "Schwarmstedter Echo" },
  { outlet: "Marktspiegel Burgwedel", short: "Marktspiegel Burgwedel" },
  { outlet: "Marktspiegel Burgdorf", short: "Marktspiegel Burgdorf" },
  { outlet: "Marktspiegel Lehrte", short: "Marktspiegel Lehrte" },
];
