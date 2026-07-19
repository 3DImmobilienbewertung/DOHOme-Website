// Presse-Referenzen (E-E-A-T / Social Proof). Zentrale Quelle für den
// „Bekannt aus"-Bereich auf Startseite und Landingpages.
//
// Hinweis: Die HAZ-Schlagzeile ist belegt (Artikel-URL). Die Zuordnung der
// beiden extra-verlag-E-Paper-Links zu Wedemark Echo bzw. Wochenblatt Burgwedel
// ist eine Annahme – der Kunde bestätigt/korrigiert die Zuordnung noch.

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
  {
    outlet: "Wedemark Echo",
    short: "Wedemark Echo",
    url: "https://epaper.extra-verlag.de/epaper/download_page_pdf/14/15447/",
  },
  {
    outlet: "Wochenblatt Burgwedel",
    short: "Wochenblatt Burgwedel",
    url: "https://epaper.extra-verlag.de/epaper/download_page_pdf/15/15464/",
  },
  {
    outlet: "Schwarmstedt Echo",
    short: "Schwarmstedt",
  },
];
