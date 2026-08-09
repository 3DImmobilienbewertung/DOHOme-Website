// 10-Jahres-Beispielrechnung für vermietende Käufer.
//
// WICHTIG (rechtlicher Rahmen): Dies ist eine unverbindliche Modellrechnung auf
// Basis frei wählbarer Annahmen – KEINE Steuer-, Rechts- oder Anlageberatung und
// KEINE Zusicherung künftiger Erträge. Die Funktionen hier rechnen ausschließlich
// die vom Nutzer gesetzten Annahmen durch. Alle Ausgaben sind mit Vorbehalt zu
// versehen (siehe Beispielrechnung-Komponente). Vor Livegang steuerlich/anwaltlich
// prüfen lassen.
//
// Modell: jährliche Betrachtung über `jahre` Jahre, Darlehen monatlich annuitätisch
// getilgt, degressive AfA auf den Gebäudeanteil (§ 7 Abs. 5a EStG, 5 % vom
// Restbuchwert), Steuerwirkung über den Grenzsteuersatz. Umlagefähige Betriebs-
// kosten sind Durchlaufposten (Mieter zahlt, Eigentümer leitet weiter) und bleiben
// deshalb außen vor – relevant ist nur der nicht umlagefähige Anteil des Hausgeldes.

export type CalcInput = {
  kaufpreis: number;
  /** Wohnfläche in m². */
  wohnflaeche: number;
  /** Kaltmiete je m² und Monat. */
  kaltmieteProM2: number;
  /** Mietsteigerung p. a. als Dezimalwert (0,02 = 2 %). */
  mietsteigerung: number;
  /** Eigenkapital, das auf den Kaufpreis fließt (ohne Kaufnebenkosten). */
  eigenkapitalKaufpreis: number;
  /** Sollzins p. a. als Dezimalwert. */
  zins: number;
  /** Anfängliche Tilgung p. a. als Dezimalwert. */
  tilgung: number;
  /** Kaufnebenkosten als Anteil des Kaufpreises. */
  kaufnebenkostenPct: number;
  /** Gebäudeanteil am Kaufpreis (Rest = Grund und Boden, nicht abschreibbar). */
  gebaeudeanteilPct: number;
  /** AfA-Satz p. a. (degressiv, vom Restbuchwert). */
  afaSatz: number;
  /** Hausgeld je Monat (gesamt). */
  hausgeldMonat: number;
  /** Davon nicht umlagefähig (Kosten des Eigentümers) je Monat. */
  hausgeldNichtUmlagefaehigMonat: number;
  /** Mietausfall-/Leerstandsreserve als Anteil der Kaltmiete. */
  mietausfallPct: number;
  /** Persönlicher Grenzsteuersatz als Dezimalwert. */
  grenzsteuersatz: number;
  /** Allgemeine Kostensteigerung p. a. (Hausgeld) als Dezimalwert. */
  kostensteigerung: number;
  /** Wertsteigerung der Immobilie p. a. – in der Grundrechnung 0. */
  wertsteigerung: number;
  jahre: number;
};

export type CalcYear = {
  jahr: number;
  kaltmiete: number;
  mietausfall: number;
  zins: number;
  tilgung: number;
  afa: number;
  hausgeldNichtUml: number;
  /** Steuerliches Ergebnis (negativ = Verlust → Steuererstattung). */
  steuerErgebnis: number;
  /** Steuerwirkung (positiv = Erstattung, negativ = zusätzliche Steuer). */
  steuerEffekt: number;
  /** Cashflow nach Steuern in diesem Jahr. */
  cashflow: number;
  /** Restschuld am Jahresende. */
  restschuld: number;
};

export type CalcResult = {
  darlehen: number;
  kaufnebenkosten: number;
  eigenkapitalGesamt: number;
  gebaeudewert: number;
  annuitaetMonat: number;
  years: CalcYear[];
  /** Cashflow des ersten Jahres, auf den Monat gerechnet. */
  cashflowMonatJahr1: number;
  summeCashflow: number;
  summeTilgung: number;
  restschuldEnde: number;
  /** Vermögenszuwachs = kumulierter Cashflow + Tilgung (+ Wertzuwachs, falls > 0). */
  wertzuwachs: number;
  vermoegenszuwachs: number;
  /** Rechnerische Ø-Rendite p. a. auf das eingesetzte Eigenkapital (illustrativ). */
  eigenkapitalRenditePa: number;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export function computeProjection(input: CalcInput): CalcResult {
  const darlehen = Math.max(0, input.kaufpreis - input.eigenkapitalKaufpreis);
  const kaufnebenkosten = input.kaufpreis * input.kaufnebenkostenPct;
  const eigenkapitalGesamt = input.eigenkapitalKaufpreis + kaufnebenkosten;
  const gebaeudewert = input.kaufpreis * input.gebaeudeanteilPct;
  const annuitaetMonat = (darlehen * (input.zins + input.tilgung)) / 12;
  const startKaltmieteMonat = input.wohnflaeche * input.kaltmieteProM2;

  const monatsZins = input.zins / 12;
  let restschuld = darlehen;
  let buchwert = gebaeudewert;

  const years: CalcYear[] = [];
  let summeCashflow = 0;
  let summeTilgung = 0;

  for (let t = 1; t <= input.jahre; t++) {
    const wachstum = Math.pow(1 + input.mietsteigerung, t - 1);
    const kaltmiete = startKaltmieteMonat * 12 * wachstum;
    const mietausfall = kaltmiete * input.mietausfallPct;
    const effektiveMiete = kaltmiete - mietausfall;

    const hausgeldNichtUml =
      input.hausgeldNichtUmlagefaehigMonat *
      12 *
      Math.pow(1 + input.kostensteigerung, t - 1);

    // Darlehen monatlich annuitätisch fortschreiben.
    let zinsJahr = 0;
    let tilgungJahr = 0;
    for (let m = 0; m < 12 && restschuld > 0; m++) {
      const zinsMonat = restschuld * monatsZins;
      let tilgungMonat = annuitaetMonat - zinsMonat;
      if (tilgungMonat > restschuld) tilgungMonat = restschuld; // letzte Rate kappen
      zinsJahr += zinsMonat;
      tilgungJahr += tilgungMonat;
      restschuld -= tilgungMonat;
    }

    // Degressive AfA vom Restbuchwert.
    const afa = buchwert * input.afaSatz;
    buchwert -= afa;

    const steuerErgebnis = effektiveMiete - zinsJahr - afa - hausgeldNichtUml;
    const steuerEffekt = -steuerErgebnis * input.grenzsteuersatz;

    // Cashflow nach Steuern: Miete − Kapitaldienst − nicht umlagefähiges Hausgeld
    // + Steuerwirkung. (Umlagefähige Kosten sind Durchlaufposten.)
    const cashflow =
      effektiveMiete - (zinsJahr + tilgungJahr) - hausgeldNichtUml + steuerEffekt;

    summeCashflow += cashflow;
    summeTilgung += tilgungJahr;

    years.push({
      jahr: t,
      kaltmiete: round2(kaltmiete),
      mietausfall: round2(mietausfall),
      zins: round2(zinsJahr),
      tilgung: round2(tilgungJahr),
      afa: round2(afa),
      hausgeldNichtUml: round2(hausgeldNichtUml),
      steuerErgebnis: round2(steuerErgebnis),
      steuerEffekt: round2(steuerEffekt),
      cashflow: round2(cashflow),
      restschuld: round2(Math.max(0, restschuld)),
    });
  }

  const restschuldEnde = Math.max(0, restschuld);
  const wertzuwachs =
    input.wertsteigerung > 0
      ? input.kaufpreis * (Math.pow(1 + input.wertsteigerung, input.jahre) - 1)
      : 0;
  const vermoegenszuwachs = summeCashflow + summeTilgung + wertzuwachs;
  const eigenkapitalRenditePa =
    eigenkapitalGesamt > 0
      ? vermoegenszuwachs / eigenkapitalGesamt / input.jahre
      : 0;

  return {
    darlehen: round2(darlehen),
    kaufnebenkosten: round2(kaufnebenkosten),
    eigenkapitalGesamt: round2(eigenkapitalGesamt),
    gebaeudewert: round2(gebaeudewert),
    annuitaetMonat: round2(annuitaetMonat),
    years,
    cashflowMonatJahr1: round2(years[0].cashflow / 12),
    summeCashflow: round2(summeCashflow),
    summeTilgung: round2(summeTilgung),
    restschuldEnde: round2(restschuldEnde),
    wertzuwachs: round2(wertzuwachs),
    vermoegenszuwachs: round2(vermoegenszuwachs),
    eigenkapitalRenditePa,
  };
}

/**
 * Standard-Annahmen für Rotkamp 1 (Beispielwohnung 77,67 m² – entspricht WE 6
 * bzw. WE 14, beide aktuell verfügbar). Vom Kunden vorgegebene Werte; Hausgeld
 * ist bewusst als Annahme markiert, solange die tatsächliche Abrechnung fehlt.
 */
export const rotkampCalcDefaults: CalcInput = {
  kaufpreis: 388000,
  wohnflaeche: 77.67,
  kaltmieteProM2: 14,
  mietsteigerung: 0.02,
  eigenkapitalKaufpreis: 77600,
  zins: 0.042,
  tilgung: 0.015,
  kaufnebenkostenPct: 0.07,
  gebaeudeanteilPct: 0.85,
  afaSatz: 0.05,
  hausgeldMonat: 300,
  hausgeldNichtUmlagefaehigMonat: 106,
  mietausfallPct: 0.02,
  grenzsteuersatz: 0.42,
  kostensteigerung: 0.02,
  wertsteigerung: 0,
  jahre: 10,
};
