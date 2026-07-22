import { site } from "@/lib/content/site";

// Organisations-/LocalBusiness-Auszeichnung für Rich Results und Local SEO.
// Quelle ist ausschließlich lib/content/site.ts – NAP bleibt konsistent mit
// Footer, Impressum und (später) Google Business Profile. Felder mit fehlendem
// Kundeninput (z. B. Telefon) werden weggelassen statt mit Platzhaltern befüllt.
export function OrganizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#organization`,
    name: site.brand,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    slogan: site.claim,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    areaServed: site.locations.map((name) => ({ "@type": "Place", name })),
  };

  // Nur belegte Felder ausgeben – kein "null" im strukturierten Datenmarkup.
  if (site.contact.phone) data.telephone = site.contact.phone;
  if (site.founded) data.foundingDate = String(site.founded);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
