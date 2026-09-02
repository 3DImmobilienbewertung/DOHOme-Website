import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { Button } from "@/components/ui/Button";

export type ServiceFact = readonly [title: string, text: string];
export type ServiceStep = readonly [number: string, title: string, text: string];

type ServiceLandingPageProps = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  facts: readonly ServiceFact[];
  steps: readonly ServiceStep[];
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function ServiceLandingPage({
  path,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  facts,
  steps,
  ctaTitle,
  ctaText,
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
}: ServiceLandingPageProps) {
  return (
    <main className="bg-green-900 text-beige-100">
      <ServiceJsonLd name={eyebrow} description={description} path={path} />

      <section className="mx-auto grid max-w-container gap-10 px-6 pb-16 pt-32 md:pt-40 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <Reveal>
          <nav aria-label="Brotkrümelnavigation" className="text-xs text-beige-100/55">
            <Link href="/leistungen" className="transition-colors hover:text-beige-100">
              Leistungen
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{eyebrow}</span>
          </nav>
          <p className="eyebrow mt-6 text-sage-300">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-display-xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lead text-beige-100/75">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={ctaHref}>{ctaLabel}</Button>
            {secondaryHref && secondaryLabel && (
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={84}
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <p className="eyebrow text-accent-400">Was Sie erhalten</p>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-beige-100/15 md:grid-cols-3">
            {facts.map(([factTitle, text]) => (
              <div key={factTitle} className="bg-green-900 p-7 md:p-9">
                <dt className="font-display text-3xl">{factTitle}</dt>
                <dd className="mt-4 text-sm leading-relaxed text-beige-100/70">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-beige-100/10 bg-beige-100 text-ink">
        <div className="mx-auto max-w-container px-6 py-14 md:py-20">
          <p className="eyebrow text-green-700">Klarer Ablauf</p>
          <h2 className="mt-3 max-w-3xl text-display-lg">Von der ersten Frage zur belastbaren Entscheidung</h2>
          <ol className="mt-9 grid gap-5 md:grid-cols-3">
            {steps.map(([number, stepTitle, text]) => (
              <li key={number} className="rounded-2xl border border-green-900/10 bg-white p-7">
                <span className="nums text-sm text-green-700">{number}</span>
                <h3 className="mt-6 font-display text-2xl text-green-900">{stepTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-beige-100/10">
        <div className="mx-auto grid max-w-container gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:items-center md:py-24">
          <div>
            <p className="eyebrow text-sage-300">Direkter Kontakt</p>
            <h2 className="mt-3 max-w-3xl text-display-lg">{ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-beige-100/70">{ctaText}</p>
          </div>
          <Button href={ctaHref} className="shrink-0">
            {ctaLabel}
          </Button>
        </div>
      </section>
    </main>
  );
}
