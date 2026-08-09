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
// Restbuchwert), Steuerwirkung über den Grenzsteuersatz.
//
// Hausgeld ist bewusst in drei Bestandteile zerlegt, weil sie sich wirtschaftlich
// und steuerlich unterschiedlich verhalten:
//   1. umlagefähige Betriebskosten – trägt der Mieter (Durchlaufposten); nur der
//      Leerstandsanteil bleibt beim Eigentümer und ist dann abziehbar,
//   2. nicht umlagefähige Verwaltungskosten – mindern Cashflow UND Steuer,
//   3. Zuführung zur Instandhaltungsrücklage – mindert den Cashflow, ist aber
//      erst bei tatsächlicher Verausgabung durch die WEG abziehbar.

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
  /**
   * Umlagefähige Betriebskosten je m² und Monat. Der Mieter trägt sie über die
   * Nebenkostenvorauszahlung – für den Eigentümer sind sie ein Durchlaufposten,
   * mit Ausnahme des Leerstandsanteils.
   */
  nebenkostenUmlagefaehigProM2: number;
  /**
   * Nicht umlagefähige Verwaltungskosten je Monat (z. B. WEG-Verwaltervergütung).
   * Sofort als Werbungskosten abziehbar.
   */
  verwaltungskostenMonat: number;
  /**
   * Zuführung zur Instandhaltungsrücklage der WEG je Monat.
   *
   * STEUERLICH: Die Einzahlung in die Rücklage ist beim Vermieter NICHT sofort
   * als Werbungskosten abziehbar – erst wenn die Verwaltung das Geld tatsächlich
   * für Erhaltungsmaßnahmen verausgabt. Sie mindert also den Cashflow, aber
   * zunächst nicht die Steuer. Genau so wird hier gerechnet.
   */
  instandhaltungsruecklageMonat: number;
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
  /** Selbst getragener Anteil umlagefähiger Kosten (Leerstand). */
  nebenkostenLeerstand: number;
  verwaltungskosten: number;
  instandhaltungsruecklage: number;
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

    const kostenIndex = Math.pow(1 + input.kostensteigerung, t - 1);
    // Umlagefähige Kosten trägt der Mieter – außer im Leerstand.
    const nebenkostenUml =
      input.nebenkostenUmlagefaehigProM2 * input.wohnflaeche * 12 * kostenIndex;
    const nebenkostenLeerstand = nebenkostenUml * input.mietausfallPct;
    const verwaltungskosten = input.verwaltungskostenMonat * 12 * kostenIndex;
    const instandhaltungsruecklage =
      input.instandhaltungsruecklageMonat * 12 * kostenIndex;

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

    // Werbungskosten: Zins, AfA, Verwaltung und der im Leerstand selbst
    // getragene Anteil der Betriebskosten. Die Rücklagenzuführung gehört
    // bewusst NICHT dazu (siehe Kommentar am Typ).
    const steuerErgebnis =
      effektiveMiete - zinsJahr - afa - verwaltungskosten - nebenkostenLeerstand;
    const steuerEffekt = -steuerErgebnis * input.grenzsteuersatz;

    // Cashflow nach Steuern: Miete − Kapitaldienst − nicht umlagefähiges Hausgeld
    // + Steuerwirkung. (Umlagefähige Kosten sind Durchlaufposten.)
    const cashflow =
      effektiveMiete -
      (zinsJahr + tilgungJahr) -
      verwaltungskosten -
      instandhaltungsruecklage -
      nebenkostenLeerstand +
      steuerEffekt;

    summeCashflow += cashflow;
    summeTilgung += tilgungJahr;

    years.push({
      jahr: t,
      kaltmiete: round2(kaltmiete),
      mietausfall: round2(mietausfall),
      zins: round2(zinsJahr),
      tilgung: round2(tilgungJahr),
      afa: round2(afa),
      nebenkostenLeerstand: round2(nebenkostenLeerstand),
      verwaltungskosten: round2(verwaltungskosten),
      instandhaltungsruecklage: round2(instandhaltungsruecklage),
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
  // 194 € je Monat bei 69 m² (Angabe des Kunden) = 2,81 € je m² und Monat.
  nebenkostenUmlagefaehigProM2: 2.81,
  // WEG-Verwaltervergütung, Angabe des Kunden (grober Richtwert).
  verwaltungskostenMonat: 35,
  instandhaltungsruecklageMonat: 30,
  mietausfallPct: 0.02,
  grenzsteuersatz: 0.42,
  kostensteigerung: 0.02,
  wertsteigerung: 0,
  jahre: 10,
};

/**
 * Ausgangswerte des allgemeinen Rechners.
 *
 * Leer bleiben nur die Werte, die zwingend vom konkreten Objekt und der
 * Finanzierung abhängen. Alles andere ist mit üblichen Werten vorbelegt und
 * jederzeit änderbar.
 *
 * BEWUSST NICHT leer: Grenzsteuersatz und Hausgeldbestandteile. Ein leeres Feld
 * wird als 0 gerechnet – ein Steuersatz von 0 % würde die Steuerwirkung
 * unterschlagen und das Ergebnis stark zu negativ zeigen, ein Hausgeld von 0 €
 * umgekehrt zu positiv. Beides wäre irreführend, obwohl formal „nichts
 * vorgegeben" wäre.
 */
export const BLANK_FIELDS: (keyof CalcInput)[] = [
  "kaufpreis",
  "wohnflaeche",
  "kaltmieteProM2",
  "eigenkapitalKaufpreis",
  "zins",
  "tilgung",
];

/** Ohne diese Angaben lässt sich nichts rechnen. */
export const REQUIRED_FIELDS: (keyof CalcInput)[] = [
  "kaufpreis",
  "wohnflaeche",
  "kaltmieteProM2",
  "zins",
  "tilgung",
];

export const genericCalcDefaults: CalcInput = {
  ...rotkampCalcDefaults,
  // Die Felder aus BLANK_FIELDS werden in der Komponente ohnehin geleert; die
  // Nullen hier machen nur deutlich, dass es keine Vorgabe gibt.
  kaufpreis: 0,
  wohnflaeche: 0,
  kaltmieteProM2: 0,
  eigenkapitalKaufpreis: 0,
  zins: 0,
  tilgung: 0,
};
