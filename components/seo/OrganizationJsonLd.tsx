import { site } from "@/lib/content/site";

// Organisations-/LocalBusiness-Auszeichnung für Rich Results und Local SEO.
// Quelle ist ausschließlich lib/content/site.ts – NAP bleibt konsistent mit
// Footer, Impressum und (später) Google Business Profile. Felder mit fehlendem
// Kundeninput (z. B. Telefon) werden weggelassen statt mit Platzhaltern befüllt.
export function OrganizationJsonLd() {
  const organizationId = `${site.url}/#organization`;
  const organization: Record<string, unknown> = {
    "@type": ["Organization", "HomeAndConstructionBusiness"],
    "@id": organizationId,
    name: site.legalName,
    legalName: site.legalName,
    alternateName: site.alternateNames,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/web-app-icon-512.png`,
      contentUrl: `${site.url}/web-app-icon-512.png`,
      width: 512,
      height: 512,
    },
    brand: { "@type": "Brand", name: site.brand },
    description:
      "DOHOme ist die Marke der Donnarumma / Horstmann GmbH für Projektentwicklung, Wohnungsbau, Vermietung und Immobilienbewertung in der Region Hannover.",
    slogan: site.claim,
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.contact.phoneE164,
      email: site.contact.email,
      availableLanguage: ["de"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: "Niedersachsen",
      addressCountry: site.address.countryCode,
    },
    areaServed: site.locations.map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "Projektentwicklung",
      "Wohnungsbau",
      "Vermietung von Wohnimmobilien",
      "Immobilienbewertung",
    ],
    identifier: {
      "@type": "PropertyValue",
      propertyID: site.legal.registerCourt ?? "Handelsregister",
      value: site.legal.registerNumber,
    },
  };

  // Nur belegte Felder ausgeben – kein "null" im strukturierten Datenmarkup.
  if (site.founded) organization.foundingDate = String(site.founded);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.brand,
        alternateName: [site.legalName, site.legalNameDisplay],
        publisher: { "@id": organizationId },
        inLanguage: "de-DE",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
