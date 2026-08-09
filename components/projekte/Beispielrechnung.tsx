"use client";

import { useMemo, useState, useId } from "react";
import {
  computeProjection,
  type CalcInput,
} from "@/lib/content/beispielrechnung";

// Interaktive 10-Jahres-Beispielrechnung für vermietende Käufer.
//
// Bewusst zurückhaltend gehalten: nüchterne Zahlen, keine Renditeversprechen,
// keine Superlative. Alle Annahmen sind vom Besucher änderbar – das Ergebnis ist
// erkennbar ein Modell, keine Zusage. Der Vorbehalt steht sichtbar am Kopf UND
// am Fuß, nicht im Kleingedruckten.
//
// Rechnet vollständig im Browser: keine Eingabe verlässt das Gerät, keine
// Cookies, kein Tracking – die Seite bleibt einwilligungsfrei.

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
  /** "eur" | "pct" | "num" */
  kind: "eur" | "pct" | "num";
  step?: number;
  hint?: string;
};

const FIELDS: { group: string; items: FieldDef[] }[] = [
  {
    group: "Objekt und Miete",
    items: [
      { key: "kaufpreis", label: "Kaufpreis", kind: "eur", step: 1000 },
      { key: "wohnflaeche", label: "Wohnfläche (m²)", kind: "num", step: 0.01 },
      {
        key: "kaltmieteProM2",
        label: "Kaltmiete je m²",
        kind: "eur",
        step: 0.5,
        hint: "monatlich",
      },
      { key: "mietsteigerung", label: "Mietsteigerung p. a.", kind: "pct", step: 0.5 },
    ],
  },
  {
    group: "Finanzierung",
    items: [
      {
        key: "eigenkapitalKaufpreis",
        label: "Eigenkapital auf den Kaufpreis",
        kind: "eur",
        step: 1000,
      },
      { key: "zins", label: "Sollzins p. a.", kind: "pct", step: 0.1 },
      { key: "tilgung", label: "Anfängliche Tilgung p. a.", kind: "pct", step: 0.1 },
      {
        key: "kaufnebenkostenPct",
        label: "Kaufnebenkosten",
        kind: "pct",
        step: 0.5,
        hint: "Grunderwerbsteuer, Notar, Grundbuch",
      },
    ],
  },
  {
    group: "Laufende Kosten und Steuern",
    items: [
      {
        key: "nebenkostenUmlagefaehigProM2",
        label: "Betriebskosten je m²",
        kind: "eur",
        step: 0.1,
        hint: "monatlich, umlagefähig – trägt der Mieter",
      },
      {
        key: "instandhaltungsruecklageMonat",
        label: "Instandhaltungsrücklage",
        kind: "eur",
        step: 5,
        hint: "monatlich an die WEG",
      },
      {
        key: "verwaltungskostenMonat",
        label: "Verwaltungskosten",
        kind: "eur",
        step: 5,
        hint: "monatlich, nicht umlagefähig",
      },
      {
        key: "mietausfallPct",
        label: "Mietausfallreserve",
        kind: "pct",
        step: 0.5,
        hint: "Anteil der Kaltmiete",
      },
      {
        key: "gebaeudeanteilPct",
        label: "Gebäudeanteil am Kaufpreis",
        kind: "pct",
        step: 1,
        hint: "Grund und Boden ist nicht abschreibbar",
      },
      { key: "afaSatz", label: "Abschreibung p. a. (degressiv)", kind: "pct", step: 0.5 },
      { key: "grenzsteuersatz", label: "Persönlicher Grenzsteuersatz", kind: "pct", step: 1 },
      { key: "kostensteigerung", label: "Kostensteigerung p. a.", kind: "pct", step: 0.5 },
      {
        key: "wertsteigerung",
        label: "Wertsteigerung p. a.",
        kind: "pct",
        step: 0.5,
        hint: "in der Grundrechnung bewusst 0 %",
      },
    ],
  },
];

export function Beispielrechnung({
  defaults,
  projectName,
  unitNote,
}: {
  defaults: CalcInput;
  projectName: string;
  /** Hinweis, worauf sich die Beispielwohnung bezieht. */
  unitNote?: string;
}) {
  const [input, setInput] = useState<CalcInput>(defaults);
  const [showTable, setShowTable] = useState(false);
  const uid = useId();

  const result = useMemo(() => computeProjection(input), [input]);
  const startMiete = input.wohnflaeche * input.kaltmieteProM2;
  const isDefault = useMemo(
    () => (Object.keys(defaults) as (keyof CalcInput)[]).every((k) => input[k] === defaults[k]),
    [input, defaults],
  );

  function set(key: keyof CalcInput, raw: string, kind: FieldDef["kind"]) {
    const parsed = Number(raw.replace(",", "."));
    if (Number.isNaN(parsed)) return;
    setInput((prev) => ({
      ...prev,
      [key]: kind === "pct" ? parsed / 100 : parsed,
    }));
  }

  const cf1 = result.cashflowMonatJahr1;
  const nebenkostenMonat =
    input.nebenkostenUmlagefaehigProM2 * input.wohnflaeche;
  const eigenanteilMonat =
    input.instandhaltungsruecklageMonat + input.verwaltungskostenMonat;
  const hausgeldMonat = nebenkostenMonat + eigenanteilMonat;

  return (
    <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-6 md:p-10">
      {/* ------------------------------------------------------------- KOPF */}
      <p className="eyebrow text-sage-300">Unverbindliche Beispielrechnung</p>
      <h3 className="mt-2 font-display text-2xl md:text-3xl">
        Wie sich {projectName} über zehn Jahre rechnet
      </h3>
      <p className="mt-4 max-w-2xl text-beige-100/75">
        Eine Modellrechnung für den Fall, dass Sie die Wohnung vermieten. Alle
        Annahmen können Sie unten ändern – die Zahlen rechnen sich sofort neu.
        {unitNote ? ` ${unitNote}` : ""}
      </p>

      {/* --------------------------------------------------------- ERGEBNIS */}
      <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          label="Cashflow im 1. Jahr"
          value={`${eur2.format(cf1)} / Monat`}
          hint={cf1 >= 0 ? "nach Steuern und Kapitaldienst" : "monatlicher Zuschuss"}
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
        {eur.format(result.darlehen)} · Start-Kaltmiete {eur.format(startMiete)} pro
        Monat ({num.format(input.wohnflaeche)} m² × {num.format(input.kaltmieteProM2)} €)
      </p>

      {/* Hausgeld aufgeschlüsselt: der umlagefähige Teil belastet den Eigentümer
          nicht – das ist der häufigste Denkfehler bei solchen Rechnungen. */}
      <p className="mt-2 text-sm text-muted-dark">
        Hausgeld {eur.format(hausgeldMonat)} pro Monat, davon{" "}
        {eur.format(nebenkostenMonat)} umlagefähig (trägt der Mieter) und{" "}
        {eur.format(eigenanteilMonat)} Ihr Anteil.
      </p>

      {/* -------------------------------------------------------- ANNAHMEN */}
      <div className="mt-10 border-t border-beige-100/10 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="font-display text-xl">Ihre Annahmen</h4>
          {!isDefault && (
            <button
              type="button"
              onClick={() => setInput(defaults)}
              className="rounded-full border border-beige-100/30 px-5 py-2 text-sm text-beige-100/80 transition-colors hover:border-beige-100/60 hover:text-beige-100"
            >
              Auf Ausgangswerte zurücksetzen
            </button>
          )}
        </div>

        <div className="mt-6 space-y-8">
          {FIELDS.map((group) => (
            <fieldset key={group.group}>
              <legend className="eyebrow text-accent-400">{group.group}</legend>
              <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((f) => {
                  const raw = input[f.key] as number;
                  const shown = f.kind === "pct" ? raw * 100 : raw;
                  const id = `${uid}-${String(f.key)}`;
                  return (
                    <div key={String(f.key)}>
                      <label
                        htmlFor={id}
                        className="block text-sm text-beige-100/80"
                      >
                        {f.label}
                      </label>
                      <div className="mt-1.5 flex items-center gap-2">
                        <input
                          id={id}
                          type="number"
                          inputMode="decimal"
                          step={f.step}
                          value={Number(shown.toFixed(4))}
                          onChange={(e) => set(f.key, e.target.value, f.kind)}
                          className="nums w-full rounded-lg border border-beige-100/20 bg-green-950/50 px-3 py-2 text-beige-100 outline-none transition-colors focus:border-accent-500"
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
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Jahresübersicht der Beispielrechnung über {input.jahre} Jahre
              </caption>
              <thead>
                <tr className="border-b border-beige-100/15 text-muted-dark">
                  <th scope="col" className="py-2.5 pr-4 font-medium">Jahr</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Kaltmiete</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Zins</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Tilgung</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Abschreibung</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Rücklage</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Steuerwirkung</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Cashflow</th>
                  <th scope="col" className="py-2.5 font-medium">Restschuld</th>
                </tr>
              </thead>
              <tbody>
                {result.years.map((y) => (
                  <tr key={y.jahr} className="border-b border-beige-100/10">
                    <th scope="row" className="py-2.5 pr-4 font-normal">
                      {y.jahr}
                    </th>
                    <td className="nums py-2.5 pr-4">{eur.format(y.kaltmiete)}</td>
                    <td className="nums py-2.5 pr-4 text-beige-100/70">
                      {eur.format(y.zins)}
                    </td>
                    <td className="nums py-2.5 pr-4 text-beige-100/70">
                      {eur.format(y.tilgung)}
                    </td>
                    <td className="nums py-2.5 pr-4 text-beige-100/70">
                      {eur.format(y.afa)}
                    </td>
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
      <dt className="text-xs uppercase tracking-wider text-beige-100/60">
        {label}
      </dt>
      <dd
        className={`nums mt-2 font-display leading-tight ${
          emphasis ? "text-2xl text-accent-400 md:text-[1.6rem]" : "text-xl md:text-2xl"
        }`}
      >
        {value}
        {hint && (
          <span className="mt-1.5 block font-sans text-xs text-muted-dark">
            {hint}
          </span>
        )}
      </dd>
    </div>
  );
}
