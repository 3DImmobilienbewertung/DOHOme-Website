import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/animation/Reveal";
import { site, addressLines } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Sprechen Sie mit DOHOme – Bauträger in der Region Hannover. Persönliche Beratung zu unseren Wohnprojekten und zu Grundstücken in der Wedemark.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      {/* HERO */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <Reveal>
          <p className="eyebrow text-sage-300">Kontakt</p>
          <h1 className="mt-3 max-w-3xl text-display-xl">
            Lassen Sie uns sprechen
          </h1>
          <p className="mt-5 max-w-xl text-lead text-beige-100/75">
            Ob eine konkrete Wohnung oder ein Grundstück, das entwickelt werden
            soll: Sie sprechen direkt mit den Inhabern – nicht mit einem
            Vertriebsteam.
          </p>
        </Reveal>
      </section>

      {/* KANÄLE + FORMULAR */}
      <section className="mx-auto max-w-container px-6 pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Direkte Kanäle */}
          <div className="flex flex-col gap-8">
            <ContactBlock label="E-Mail">
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-sage-300"
              >
                {site.contact.email}
              </a>
            </ContactBlock>
            {site.contact.phone && (
              <ContactBlock label="Telefon">
                <a
                  href={site.contact.phoneHref}
                  className="transition-colors hover:text-sage-300"
                >
                  {site.contact.phone}
                </a>
              </ContactBlock>
            )}
            <ContactBlock label="Büro">
              <address className="not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </ContactBlock>
            <p className="text-sm text-muted-dark">
              Wir melden uns {site.responseTime}.
            </p>
          </div>

          {/* Formular */}
          <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-8 md:p-10">
            <h2 className="text-display-lg">Nachricht senden</h2>
            <p className="mt-2 text-beige-100/75">
              Pflichtfelder sind mit&nbsp;* markiert – wir antworten persönlich.
            </p>
            <LeadForm
              subject="Allgemeine Anfrage"
              submitLabel="Anfrage senden"
              className="mt-8"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-beige-100/10 pt-6">
      <p className="eyebrow text-muted-dark">{label}</p>
      <div className="mt-2 font-display text-2xl leading-snug">{children}</div>
    </div>
  );
}
