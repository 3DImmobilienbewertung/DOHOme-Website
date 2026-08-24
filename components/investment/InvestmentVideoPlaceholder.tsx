type InvestmentVideoPlaceholderProps = {
  number: number;
  title: string;
};

/** Austauschbarer Platz für eine spätere, freigegebene Käuferstimme. */
export function InvestmentVideoPlaceholder({
  number,
  title,
}: InvestmentVideoPlaceholderProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-beige-100/15 bg-green-950/40">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-green-700 to-green-950">
        <div className="text-center" aria-label={`${title}: Video folgt`} role="img">
          <span className="nums text-sm text-accent-500">0{number}</span>
          <p className="mt-3 text-sm text-beige-100/60">Käuferinterview folgt</p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-beige-100">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-beige-100/65">
          Hier wird später eine authentische, schriftlich freigegebene
          Käuferstimme als Video eingebunden.
        </p>
      </div>
    </article>
  );
}
