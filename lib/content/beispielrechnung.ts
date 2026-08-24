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
// Angesetzt werden nur die beiden Posten, die der Eigentümer selbst trägt.
// Umlagefähige Betriebskosten bleiben außen vor – sie trägt der Mieter über die
// Nebenkostenvorauszahlung und sind für die Rechnung ein Durchlaufposten:
//   1. Hausverwaltung – mindert Cashflow UND Steuer,
//   2. Zuführung zur Instandhaltungsrücklage – mindert den Cashflow, ist aber
//      erst bei tatsächlicher Verausgabung durch die WEG abziehbar.

export type CalcInput = {
  kaufpreis: number;
  /** Wohnfläche in m². */
  wohnflaeche: number;
  /** Kaltmiete je m² und Monat. */
  kaltmieteProM2: number;
  /** Zusätzliche Stellplatzmiete je Monat. */
  stellplatzmieteMonat: number;
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
   * Vergütung der Hausverwaltung je Monat. Nicht umlagefähig, sofort als
   * Werbungskosten abziehbar.
   */
  hausverwaltungMonat: number;
  /**
   * Zuführung zur Instandhaltungsrücklage der WEG je Monat.
   *
   * STEUERLICH: Die Einzahlung in die Rücklage ist beim Vermieter NICHT sofort
   * als Werbungskosten abziehbar – erst wenn die Verwaltung das Geld tatsächlich
   * für Erhaltungsmaßnahmen verausgabt. Sie mindert also den Cashflow, aber
   * zunächst nicht die Steuer. Genau so wird hier gerechnet.
   */
  instandhaltungsruecklageMonat: number;
  /** Persönlicher Grenzsteuersatz als Dezimalwert. */
  grenzsteuersatz: number;
  /** Solidaritätszuschlag auf die errechnete Steuerwirkung. */
  soliSatz: number;
  /** Steigerung der laufenden Kosten p. a. als Dezimalwert. */
  kostensteigerung: number;
  /** Wertsteigerung der Immobilie p. a. – in der Grundrechnung 0. */
  wertsteigerung: number;
  jahre: number;
};

export type CalcYear = {
  jahr: number;
  kaltmiete: number;
  zins: number;
  tilgung: number;
  afa: number;
  hausverwaltung: number;
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
  const gesamtinvestition = input.kaufpreis + kaufnebenkosten;
  // WE-3-Datenblatt: Aufteilung von Gesamtkaufpreis einschließlich
  // Kaufnebenkosten in Grund-/Boden- und Gebäudeanteil.
  const gebaeudewert = gesamtinvestition * input.gebaeudeanteilPct;
  const annuitaetMonat = (darlehen * (input.zins + input.tilgung)) / 12;
  const startKaltmieteMonat =
    input.wohnflaeche * input.kaltmieteProM2 + input.stellplatzmieteMonat;

  let restschuld = darlehen;
  let buchwert = gebaeudewert;

  const years: CalcYear[] = [];
  let summeCashflow = 0;
  let summeTilgung = 0;

  for (let t = 1; t <= input.jahre; t++) {
    const wachstum = Math.pow(1 + input.mietsteigerung, t - 1);
    // Durchgehende Vermietung unterstellt – keine Leerstandsreserve.
    const kaltmiete = startKaltmieteMonat * 12 * wachstum;

    const kostenIndex = Math.pow(1 + input.kostensteigerung, t - 1);
    const hausverwaltung = input.hausverwaltungMonat * 12 * kostenIndex;
    const instandhaltungsruecklage =
      input.instandhaltungsruecklageMonat * 12 * kostenIndex;

    // Jahresweise Annuitätenfortschreibung wie im WE-3-Datenblatt: Zins auf
    // die Restschuld zu Jahresbeginn, Tilgung als Annuität abzüglich Zins.
    const zinsJahr = restschuld * input.zins;
    const annuitaetJahr = Math.min(
      restschuld + zinsJahr,
      annuitaetMonat * 12,
    );
    const tilgungJahr = Math.min(restschuld, annuitaetJahr - zinsJahr);
    restschuld -= tilgungJahr;

    // Degressive AfA vom Restbuchwert.
    const afa = buchwert * input.afaSatz;
    buchwert -= afa;

    // Werbungskosten: Zins, AfA und Hausverwaltung. Die Rücklagenzuführung
    // gehört bewusst NICHT dazu (siehe Kommentar am Typ).
    const steuerErgebnis = kaltmiete - zinsJahr - afa - hausverwaltung;
    const steuerEffekt =
      -steuerErgebnis * input.grenzsteuersatz * (1 + input.soliSatz);

    // Cashflow nach Steuern: Miete − Kapitaldienst − eigene laufende Kosten
    // + Steuerwirkung.
    const cashflow =
      kaltmiete -
      annuitaetJahr -
      hausverwaltung -
      instandhaltungsruecklage +
      steuerEffekt;

    summeCashflow += cashflow;
    summeTilgung += tilgungJahr;

    years.push({
      jahr: t,
      kaltmiete: round2(kaltmiete),
      zins: round2(zinsJahr),
      tilgung: round2(tilgungJahr),
      afa: round2(afa),
      hausverwaltung: round2(hausverwaltung),
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
 * Vollständige Kalkulation für WE 3 aus dem Exposé, Stand 24. August 2026.
 * Kaufpreis enthält den Außenstellplatz; die Miete setzt sich aus 14 €/m² für
 * die Wohnung und 40 € Stellplatzmiete zusammen.
 */
export const rotkampCalcDefaults: CalcInput = {
  kaufpreis: 319191,
  wohnflaeche: 62.59,
  kaltmieteProM2: 14,
  stellplatzmieteMonat: 40,
  mietsteigerung: 0.02,
  eigenkapitalKaufpreis: 31919.1,
  zins: 0.042,
  tilgung: 0.015,
  kaufnebenkostenPct: 0.07,
  gebaeudeanteilPct: 0.91,
  afaSatz: 0.05,
  // Angaben des Kunden.
  hausverwaltungMonat: 35,
  instandhaltungsruecklageMonat: 45,
  grenzsteuersatz: 0.42,
  soliSatz: 0.055,
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
 * BEWUSST NICHT leer: Grenzsteuersatz und laufende Kosten. Ein leeres Feld wird
 * als 0 gerechnet – ein Steuersatz von 0 % würde die Steuerwirkung unterschlagen
 * und das Ergebnis stark zu negativ zeigen, Kosten von 0 € umgekehrt zu positiv.
 * Beides wäre irreführend, obwohl formal „nichts vorgegeben" wäre.
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
