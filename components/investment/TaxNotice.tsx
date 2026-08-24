export function TaxNotice() {
  return (
    <aside className="rounded-2xl border border-beige-100/15 bg-green-950/35 p-6 text-sm leading-relaxed text-beige-100/65">
      <strong className="font-medium text-beige-100">Wichtiger Hinweis:</strong>{" "}
      Die dargestellten Informationen sind allgemeiner Natur und keine Steuer-,
      Rechts-, Finanzierungs- oder Anlageberatung. Ob und in welcher Höhe eine
      Abschreibung oder Steuerentlastung möglich ist, hängt vom Objekt, dem
      Kaufzeitpunkt, der Nutzung, der Bemessungsgrundlage und Ihrer persönlichen
      Situation ab. Bitte lassen Sie die Berechnung vor einer Entscheidung durch
      Ihre Steuerberatung prüfen.
    </aside>
  );
}
