"use client";

import { useMemo, useState, useId } from "react";
import {
  computeProjection,
  REQUIRED_FIELDS,
  type CalcInput,
} from "@/lib/content/beispielrechnung";

// Interaktive 10-Jahres-Rechnung für vermietende Käufer.
//
// Zwei Betriebsarten über dieselbe Komponente:
//   • `variant="beispiel"` – auf der Projektseite, mit durchgerechnetem Beispiel.
//   • `variant="leer"`     – allgemeiner Rechner: objekt- und personenbezogene
//     Felder starten leer, das Ergebnis erscheint erst, wenn das Nötigste
//     eingetragen ist. Konventionen (AfA-Satz, Gebäudeanteil, Steigerungsraten)
//     bleiben vorbelegt – sonst müsste jeder Nutzer Fachwerte raten.
//
// Bewusst zurückhaltend: nüchterne Zahlen, keine Renditeversprechen. Alle
// Annahmen sind änderbar – das Ergebnis ist erkennbar ein Modell, keine Zusage.
// Der Vorbehalt steht am Kopf UND am Fuß, nicht im Kleingedruckten.
//
// Rechnet vollständig im Browser: keine Eingabe verlässt das Gerät, keine
// Cookies – die Seite bleibt einwilligungsfrei.

const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const eur2 = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  signDisplay: "always",
});
const num = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 });

type FieldDef = {
  key: keyof CalcInput;
  label: string;
  kind: "eur" | "pct" | "num";
  step?: number;
  hint?: string;
  /** Beispielwert als Platzhalter im leeren Rechner. */
  placeholder?: string;
};

const FIELDS: { group: string; items: FieldDef[] }[] = [
  {
    group: "Objekt und Miete",
    items: [
      { key: "kaufpreis", label: "Kaufpreis", kind: "eur", step: 1000, placeholder: "z. B. 388000" },
      { key: "wohnflaeche", label: "Wohnfläche (m²)", kind: "num", step: 0.01, placeholder: "z. B. 77,67" },
      { key: "kaltmieteProM2", label: "Kaltmiete je m²", kind: "eur", step: 0.5, hint: "monatlich", placeholder: "z. B. 14" },
      { key: "mietsteigerung", label: "Mietsteigerung p. a.", kind: "pct", step: 0.5 },
    ],
  },
  {
    group: "Finanzierung",
    items: [
      { key: "eigenkapitalKaufpreis", label: "Eigenkapital auf den Kaufpreis", kind: "eur", step: 1000, placeholder: "z. B. 77600" },
      { key: "zins", label: "Sollzins p. a.", kind: "pct", step: 0.1, placeholder: "z. B. 4,2" },
      { key: "tilgung", label: "Anfängliche Tilgung p. a.", kind: "pct", step: 0.1, placeholder: "z. B. 1,5" },
      { key: "kaufnebenkostenPct", label: "Kaufnebenkosten", kind: "pct", step: 0.5, hint: "Grunderwerbsteuer, Notar, Grundbuch" },
    ],
  },
  {
    group: "Laufende Kosten und Steuern",
    items: [
      { key: "nebenkostenUmlagefaehigProM2", label: "Betriebskosten je m²", kind: "eur", step: 0.1, hint: "monatlich, umlagefähig – trägt der Mieter", placeholder: "z. B. 2,81" },
      { key: "instandhaltungsruecklageMonat", label: "Instandhaltungsrücklage", kind: "eur", step: 5, hint: "monatlich an die WEG", placeholder: "z. B. 30" },
      { key: "verwaltungskostenMonat", label: "Verwaltungskosten", kind: "eur", step: 5, hint: "monatlich, nicht umlagefähig", placeholder: "z. B. 35" },
      { key: "mietausfallPct", label: "Mietausfallreserve", kind: "pct", step: 0.5, hint: "Anteil der Kaltmiete" },
      { key: "gebaeudeanteilPct", label: "Gebäudeanteil am Kaufpreis", kind: "pct", step: 1, hint: "Grund und Boden ist nicht abschreibbar" },
      { key: "afaSatz", label: "Abschreibung p. a. (degressiv)", kind: "pct", step: 0.5 },
      { key: "grenzsteuersatz", label: "Persönlicher Grenzsteuersatz", kind: "pct", step: 1, placeholder: "z. B. 42" },
      { key: "kostensteigerung", label: "Kostensteigerung p. a.", kind: "pct", step: 0.5 },
      { key: "wertsteigerung", label: "Wertsteigerung p. a.", kind: "pct", step: 0.5, hint: "bewusst vorsichtig: 0 %" },
    ],
  },
];

const ALL_FIELDS = FIELDS.flatMap((g) => g.items);
const PCT_KEYS = new Set(ALL_FIELDS.filter((f) => f.kind === "pct").map((f) => f.key));

/** Eingaben als Rohtext – erlaubt leere Felder, ohne auf 0 zu springen. */
type RawInput = Record<keyof CalcInput, string>;

function toRaw(v: CalcInput, blanks: (keyof CalcInput)[]): RawInput {
  const out = {} as RawInput;
  (Object.keys(v) as (keyof CalcInput)[]).forEach((k) => {
    if (blanks.includes(k)) {
      out[k] = "";
      return;
    }
    const n = v[k] as number;
    out[k] = String(Number((PCT_KEYS.has(k) ? n * 100 : n).toFixed(4)));
  });
  return out;
}

export function Beispielrechnung({
  defaults,
  projectName,
  unitNote,
  variant = "beispiel",
  blankFields,
}: {
  defaults: CalcInput;
  projectName?: string;
  unitNote?: string;
  variant?: "beispiel" | "leer";
  /** Felder, die im leeren Rechner ohne Vorbelegung starten. */
  blankFields?: (keyof CalcInput)[];
}) {
  const initial = useMemo(
    () => toRaw(defaults, variant === "leer" ? (blankFields ?? []) : []),
    [defaults, variant, blankFields],
  );
  const [raw, setRaw] = useState<RawInput>(initial);
  const [showTable, setShowTable] = useState(false);
  const uid = useId();

  // Fehlende Pflichtangaben sammeln, statt mit Nullen ein Scheinergebnis zu zeigen.
  const missing = REQUIRED_FIELDS.filter((k) => {
    const v = Number(raw[k].replace(",", "."));
    return raw[k].trim() === "" || Number.isNaN(v) || v <= 0;
  });
  const ready = missing.length === 0;

  const input: CalcInput = useMemo(() => {
    const out = { ...defaults };
    (Object.keys(raw) as (keyof CalcInput)[]).forEach((k) => {
      const parsed = Number(raw[k].replace(",", "."));
      const v = raw[k].trim() === "" || Number.isNaN(parsed) ? 0 : parsed;
      (out[k] as number) = PCT_KEYS.has(k) ? v / 100 : v;
    });
    out.jahre = defaults.jahre;
    return out;
  }, [raw, defaults]);

  const result = useMemo(
    () => (ready ? computeProjection(input) : null),
    [ready, input],
  );

  const isTouched = useMemo(
    () => (Object.keys(initial) as (keyof CalcInput)[]).some((k) => raw[k] !== initial[k]),
    [raw, initial],
  );

  const startMiete = input.wohnflaeche * input.kaltmieteProM2;
  const nebenkostenMonat = input.nebenkostenUmlagefaehigProM2 * input.wohnflaeche;
  const eigenanteilMonat =
    input.instandhaltungsruecklageMonat + input.verwaltungskostenMonat;
  const hausgeldMonat = nebenkostenMonat + eigenanteilMonat;
  const missingLabels = missing.map(
    (k) => ALL_FIELDS.find((f) => f.key === k)?.label ?? String(k),
  );

  return (
    <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-6 md:p-10">
      {/* ------------------------------------------------------------- KOPF */}
      <p className="eyebrow text-sage-300">
        {variant === "leer" ? "Rechner" : "Unverbindliche Beispielrechnung"}
      </p>
      <h3 className="mt-2 font-display text-2xl md:text-3xl">
        {variant === "leer"
          ? "Ihre Wohnung über zehn Jahre durchrechnen"
          : `Wie sich ${projectName} über zehn Jahre rechnet`}
      </h3>
      <p className="mt-4 max-w-2xl text-beige-100/75">
        {variant === "leer"
          ? "Tragen Sie Ihre eigenen Zahlen ein – Kaufpreis, Fläche, Miete und Finanzierung. Die Rechnung entsteht sofort und zeigt Cashflow, Tilgung und Steuerwirkung Jahr für Jahr."
          : "Eine Modellrechnung für den Fall, dass Sie die Wohnung vermieten. Alle Annahmen können Sie unten ändern – die Zahlen rechnen sich sofort neu."}
        {unitNote ? ` ${unitNote}` : ""}
      </p>

      {/* --------------------------------------------------------- ERGEBNIS */}
      {result ? (
        <>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-2 lg:grid-cols-4">
            <Tile
              label="Cashflow im 1. Jahr"
              value={`${eur2.format(result.cashflowMonatJahr1)} / Monat`}
              hint={
                result.cashflowMonatJahr1 >= 0
                  ? "nach Steuern und Kapitaldienst"
                  : "monatlicher Zuschuss"
              }
              emphasis
            />
            <Tile
              label="Eigenkapital gesamt"
              value={eur.format(result.eigenkapitalGesamt)}
              hint={`inkl. ${eur.format(result.kaufnebenkosten)} Nebenkosten`}
            />
            <Tile
              label="Getilgt nach 10 Jahren"
              value={eur.format(result.summeTilgung)}
              hint={`Restschuld ${eur.format(result.restschuldEnde)}`}
            />
            <Tile
              label="Vermögenszuwachs"
              value={eur.format(result.vermoegenszuwachs)}
              hint="Tilgung + Cashflow über 10 Jahre"
              emphasis
            />
          </dl>

          <p className="mt-4 text-sm text-muted-dark">
            Annuität {eur.format(result.annuitaetMonat)} pro Monat · Darlehen{" "}
            {eur.format(result.darlehen)} · Start-Kaltmiete{" "}
            {eur.format(startMiete)} pro Monat ({num.format(input.wohnflaeche)} m² ×{" "}
            {num.format(input.kaltmieteProM2)} €)
          </p>

          {/* Hausgeld aufgeschlüsselt: der umlagefähige Teil belastet den
              Eigentümer nicht – der häufigste Denkfehler bei solchen Rechnungen. */}
          {hausgeldMonat > 0 && (
            <p className="mt-2 text-sm text-muted-dark">
              Hausgeld {eur.format(hausgeldMonat)} pro Monat, davon{" "}
              {eur.format(nebenkostenMonat)} umlagefähig (trägt der Mieter) und{" "}
              {eur.format(eigenanteilMonat)} Ihr Anteil.
            </p>
          )}
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-beige-100/25 bg-green-950/30 p-8 text-center">
          <p className="font-display text-xl text-beige-100/90">
            Noch ein paar Angaben – dann rechnet es
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-beige-100/70">
            Es fehlt noch: {missingLabels.join(", ")}.
          </p>
        </div>
      )}

      {/* -------------------------------------------------------- ANNAHMEN */}
      <div className="mt-10 border-t border-beige-100/10 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="font-display text-xl">
            {variant === "leer" ? "Ihre Zahlen" : "Ihre Annahmen"}
          </h4>
          {isTouched && (
            <button
              type="button"
              onClick={() => setRaw(initial)}
              className="rounded-full border border-beige-100/30 px-5 py-2 text-sm text-beige-100/80 transition-colors hover:border-beige-100/60 hover:text-beige-100"
            >
              {variant === "leer" ? "Eingaben leeren" : "Auf Ausgangswerte zurücksetzen"}
            </button>
          )}
        </div>

        <div className="mt-6 space-y-8">
          {FIELDS.map((group) => (
            <fieldset key={group.group}>
              <legend className="eyebrow text-accent-400">{group.group}</legend>
              <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((f) => {
                  const id = `${uid}-${String(f.key)}`;
                  const isMissing = missing.includes(f.key);
                  return (
                    <div key={String(f.key)}>
                      <label htmlFor={id} className="block text-sm text-beige-100/80">
                        {f.label}
                      </label>
                      <div className="mt-1.5 flex items-center gap-2">
                        <input
                          id={id}
                          type="number"
                          inputMode="decimal"
                          step={f.step}
                          placeholder={variant === "leer" ? f.placeholder : undefined}
                          value={raw[f.key]}
                          onChange={(e) =>
                            setRaw((p) => ({ ...p, [f.key]: e.target.value }))
                          }
                          className={`nums w-full rounded-lg border bg-green-950/50 px-3 py-2 text-beige-100 outline-none transition-colors placeholder:text-beige-100/30 focus:border-accent-500 ${
                            isMissing ? "border-accent-500/60" : "border-beige-100/20"
                          }`}
                        />
                        <span className="shrink-0 text-sm text-muted-dark">
                          {f.kind === "pct" ? "%" : f.kind === "eur" ? "€" : ""}
                        </span>
                      </div>
                      {f.hint && (
                        <p className="mt-1 text-xs text-muted-dark">{f.hint}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------- TABELLE */}
      {result && (
        <div className="mt-8 border-t border-beige-100/10 pt-6">
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            aria-expanded={showTable}
            className="inline-flex items-center gap-2 text-sm text-beige-100/85 underline underline-offset-4 transition-colors hover:text-beige-100"
          >
            {showTable ? "Jahresübersicht ausblenden" : "Jahr für Jahr ansehen"}
          </button>

          {showTable && (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Jahresübersicht über {input.jahre} Jahre
                </caption>
                <thead>
                  <tr className="border-b border-beige-100/15 text-muted-dark">
                    <th scope="col" className="py-2.5 pr-4 font-medium">Jahr</th>
                    <th scope="col" className="py-2.5 pr-4 font-medium">Kaltmiete</th>
                    <th scope="col" className="py-2.5 pr-4 font-medium">Zins</th>
                    <th scope="col" className="py-2.5 pr-4 font-medium">Tilgung</th>
                    <th scope="col" className="py-2.5 pr-4 font-medium">Abschreibung</th>
                    <th scope="col" className="py-2.5 pr-4 font-medium">Ihre Kosten</th>
                    <th scope="col" className="py-2.5 pr-4 font-medium">Steuerwirkung</th>
                    <th scope="col" className="py-2.5 pr-4 font-medium">Cashflow</th>
                    <th scope="col" className="py-2.5 font-medium">Restschuld</th>
                  </tr>
                </thead>
                <tbody>
                  {result.years.map((y) => (
                    <tr key={y.jahr} className="border-b border-beige-100/10">
                      <th scope="row" className="py-2.5 pr-4 font-normal">{y.jahr}</th>
                      <td className="nums py-2.5 pr-4">{eur.format(y.kaltmiete)}</td>
                      <td className="nums py-2.5 pr-4 text-beige-100/70">{eur.format(y.zins)}</td>
                      <td className="nums py-2.5 pr-4 text-beige-100/70">{eur.format(y.tilgung)}</td>
                      <td className="nums py-2.5 pr-4 text-beige-100/70">{eur.format(y.afa)}</td>
                      <td className="nums py-2.5 pr-4 text-beige-100/70">
                        {eur.format(y.instandhaltungsruecklage + y.verwaltungskosten)}
                      </td>
                      <td className="nums py-2.5 pr-4">{eur2.format(y.steuerEffekt)}</td>
                      <td
                        className={`nums py-2.5 pr-4 ${
                          y.cashflow >= 0 ? "text-beige-100" : "text-danger-300"
                        }`}
                      >
                        {eur2.format(y.cashflow)}
                      </td>
                      <td className="nums py-2.5 text-beige-100/70">
                        {eur.format(y.restschuld)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------- VORBEHALT */}
      <div className="mt-8 rounded-2xl border border-beige-100/15 bg-green-950/40 p-5 text-sm text-beige-100/70">
        <p>
          <strong className="text-beige-100/90">Unverbindliche Modellrechnung.</strong>{" "}
          Die Werte beruhen ausschließlich auf den oben gewählten Annahmen und sind
          weder eine Zusicherung künftiger Erträge noch eine Steuer-, Rechts- oder
          Anlageberatung. Ob und in welcher Höhe Abschreibungen und
          Steuerwirkungen in Ihrem Fall greifen, hängt von Ihren persönlichen
          Verhältnissen ab – bitte klären Sie das mit Ihrer Steuerberaterin oder
          Ihrem Steuerberater.
        </p>
        <p className="mt-3">
          Die Zuführung zur Instandhaltungsrücklage mindert den Cashflow, ist
          steuerlich aber erst abziehbar, wenn die Eigentümergemeinschaft das Geld
          tatsächlich für Erhaltungsmaßnahmen verwendet – so ist es hier gerechnet.
          Nicht enthalten sind unter anderem Instandhaltungen über die Rücklage
          hinaus, Modernisierungen, Kosten der Anschlussfinanzierung nach Ablauf
          der Zinsbindung sowie eine mögliche Besteuerung eines
          Veräußerungsgewinns.
        </p>
        <p className="mt-3 text-xs text-muted-dark">
          Ihre Eingaben werden ausschließlich in Ihrem Browser verarbeitet und
          nicht übertragen.
        </p>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  hint,
  emphasis,
}: {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="bg-green-900 p-5 md:p-6">
      <dt className="text-xs uppercase tracking-wider text-beige-100/60">{label}</dt>
      <dd
        className={`nums mt-2 font-display leading-tight ${
          emphasis ? "text-2xl text-accent-400 md:text-[1.6rem]" : "text-xl md:text-2xl"
        }`}
      >
        {value}
        {hint && (
          <span className="mt-1.5 block font-sans text-xs text-muted-dark">{hint}</span>
        )}
      </dd>
    </div>
  );
}
