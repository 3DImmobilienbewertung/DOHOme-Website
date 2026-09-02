import Link from "next/link";

import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { Button } from "@/components/ui/Button";

export type GuideSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

type GuidePageProps = {
  path: string;
  title: string;
  description: string;
  intro: string;
  sections: readonly GuideSection[];
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
  image?: string;
};

export function GuidePage({
  path,
  title,
  description,
  intro,
  sections,
  ctaTitle,
  ctaText,
  ctaHref,
  ctaLabel,
  image,
}: GuidePageProps) {
  return (
    <main className="bg-green-900 text-beige-100">
      <ArticleJsonLd title={title} description={description} path={path} image={image} />
      <article>
        <header className="mx-auto max-w-4xl px-6 pb-12 pt-32 md:pb-16 md:pt-40">
          <nav aria-label="Brotkrümelnavigation" className="text-xs text-beige-100/55">
            <Link href="/ratgeber" className="transition-colors hover:text-beige-100">
              Ratgeber
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{title}</span>
          </nav>
          <p className="eyebrow mt-6 text-sage-300">Wissen aus der Projektpraxis</p>
          <h1 className="mt-3 text-display-xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lead text-beige-100/75">{intro}</p>
          <p className="mt-5 text-xs text-beige-100/45">
            Aktualisiert am <time dateTime="2026-09-02">2. September 2026</time> · Redaktion: DOHOme
          </p>
        </header>

        <div className="border-t border-beige-100/10">
          <div className="mx-auto max-w-4xl space-y-12 px-6 py-14 md:py-20">
            {sections.map((section, index) => (
              <section key={section.title} className="grid gap-5 md:grid-cols-[3rem_1fr] md:gap-8">
                <span className="nums text-sm text-accent-500">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-display text-3xl text-beige-100 md:text-4xl">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-beige-100/72">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-5 space-y-3 text-beige-100/72">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-[0.75em] h-px w-5 shrink-0 bg-accent-500/70" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto grid max-w-container gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div>
            <p className="eyebrow text-accent-400">Nächster Schritt</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">{ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-beige-100/70">{ctaText}</p>
          </div>
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      </section>
    </main>
  );
}
