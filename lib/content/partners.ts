// Handwerkerpartner – das regionale Netzwerk hinter DOHOme.
//
// Vom Kunden benannt. Namen aus der jeweiligen Domain abgeleitet; wo die genaue
// Firmierung oder das Gewerk unsicher ist, ist es bewusst offen gelassen statt
// geraten. ERGÄNZEN/KORRIGIEREN: exakte Firmennamen und Gewerke vom Kunden.
//
// Rechtlicher Hinweis: Fremde Firmennamen und -logos nur mit Einverständnis der
// Partner nennen. Namensnennung mit Verlinkung ist üblich; vor Livegang kurz
// mit den Betrieben abstimmen.

export type Partner = {
  name: string;
  /** Gewerk/Leistung, sofern bekannt. */
  trade?: string;
  url: string;
};

export const partners: Partner[] = [
  { name: "Jennert GmbH", url: "https://www.jennertgmbh.de" },
  { name: "Kopjen", url: "https://kopjen.de" },
  { name: "Geisler Bau", trade: "Rohbau", url: "https://geisler-bau.de" },
  { name: "Cattau", url: "https://cattau.de" },
  { name: "Pleuß Elektro", trade: "Elektro", url: "https://www.pleuss-elektro.de" },
  { name: "Bethke-Leide", url: "https://bethke-leide.de" },
  { name: "Fliesen Forty", trade: "Fliesen", url: "http://www.fliesen-forty.de" },
  { name: "Diekmann Dachbau", trade: "Dach", url: "https://diekmann-dachbau.de" },
  { name: "Stelling Holzbau", trade: "Holzbau", url: "https://stelling-holzbau.de" },
  { name: "Baumschule Schmidt", trade: "Garten- und Landschaftsbau", url: "https://www.baumschule-schmidt.de" },
];
