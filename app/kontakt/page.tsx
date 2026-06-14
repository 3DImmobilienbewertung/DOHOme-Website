import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Sprechen Sie mit DOHOme – Bauträger und Projektentwickler in der Region Hannover. Persönliche Beratung zu Eigentumswohnungen, Kapitalanlagen und Grundstücken.",
};

// TODO(Vito): Bitte echte Kanäle bestätigen. Die Büro-Adresse ist die offizielle
// DOHOme-Anschrift; E-Mail/Telefon sind Platzhalter, bis du sie freigibst.
const CONTACT = {
  email: "kontakt@dohome.de",
  phone: "+49 5130 000 000",
  phoneHref: "tel:+4951300000000",
  address: ["Donnarumma · Horstmann GmbH", "Im Rotbusch 17", "30900 Wedemark"],
};

export default function KontaktPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      {/* ---------------------------------------------------------------- HERO */}
      <section className="mx-auto max-w-container px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="eyebrow text-sage-300">Kontakt</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
          Lassen Sie uns sprechen
        </h1>
        <p className="mt-5 max-w-xl text-lg text-beige-100/75">
          Ob konkrete Wohnung, Kapitalanlage oder ein Grundstück, das Sie
          entwickeln lassen möchten – wir nehmen uns Zeit für Ihr Anliegen.
        </p>
      </section>

      {/* ---------------------------------------------- KANÄLE + FORMULAR */}
      <section className="mx-auto max-w-container px-6 pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Direkte Kanäle */}
          <div className="flex flex-col gap-8">
            <ContactBlock label="E-Mail">
              <a
                href={`mailto:${CONTACT.email}`}
                className="transition-colors hover:text-sage-300"
              >
                {CONTACT.email}
              </a>
            </ContactBlock>
            <ContactBlock label="Telefon">
              <a
                href={CONTACT.phoneHref}
                className="transition-colors hover:text-sage-300"
              >
                {CONTACT.phone}
              </a>
            </ContactBlock>
            <ContactBlock label="Büro">
              <address className="not-italic">
                {CONTACT.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </ContactBlock>
            <p className="text-sm text-beige-100/55">
              Wir melden uns in der Regel innerhalb von 24&nbsp;Stunden
              (werktags).
            </p>
          </div>

          {/* Formular */}
          <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl">
              Nachricht senden
            </h2>
            <p className="mt-2 text-beige-100/70">
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
      <p className="eyebrow text-beige-100/55">{label}</p>
      <div className="mt-2 font-display text-2xl leading-snug">{children}</div>
    </div>
  );
}
