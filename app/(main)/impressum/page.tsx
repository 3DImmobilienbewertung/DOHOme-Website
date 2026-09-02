import { site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der DOHOme.",
  path: "/impressum",
  noIndex: true,
});

export default function ImpressumPage() {
  const { legal, contact } = site;
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
        <p className="eyebrow text-sage-300">Rechtliches</p>
        <h1 className="mt-3 text-display-xl">Impressum</h1>

        <div className="mt-10 space-y-8 text-beige-100/80">
          <div>
            <h2 className="text-heading text-beige-100">Angaben gemäß § 5 DDG</h2>
            <p className="mt-3">
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Vertreten durch</h2>
            <p className="mt-3">{legal.managingDirectors}</p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Kontakt</h2>
            <p className="mt-3">
              E-Mail:{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline underline-offset-4 hover:text-beige-100"
              >
                {contact.email}
              </a>
              {contact.phone && (
                <>
                  <br />
                  Telefon: {contact.phone}
                </>
              )}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Registereintrag</h2>
            <p className="mt-3">
              Registergericht: {legal.registerCourt}
              <br />
              Registernummer: {legal.registerNumber}
            </p>
          </div>

          {legal.vatId && (
            <div>
              <h2 className="text-heading text-beige-100">Umsatzsteuer-ID</h2>
              <p className="mt-3">{legal.vatId}</p>
            </div>
          )}

          <div>
            <h2 className="text-heading text-beige-100">
              Verantwortlich i. S. d. § 18 Abs. 2 MStV
            </h2>
            <p className="mt-3">
              {legal.managingDirectors}
              <br />
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">
              Streitbeilegung
            </h2>
            <p className="mt-3">
              Wir sind nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Haftung für Inhalte</h2>
            <p className="mt-3">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität können wir
              jedoch keine Gewähr übernehmen. Abbildungen von Bauvorhaben sind
              teilweise unverbindliche Visualisierungen; maßgeblich sind allein
              die vertraglichen Vereinbarungen und die Baubeschreibung.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Haftung für Links</h2>
            <p className="mt-3">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist
              stets der jeweilige Anbieter verantwortlich.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Urheberrecht</h2>
            <p className="mt-3">
              Die durch uns erstellten Inhalte, Pläne und Visualisierungen
              unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung oder
              Verwendung außerhalb der gesetzlichen Grenzen bedarf unserer
              schriftlichen Zustimmung.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
