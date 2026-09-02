import { site } from "@/lib/content/site";

type ServiceJsonLdProps = {
  name: string;
  description: string;
  path: string;
};

export function ServiceJsonLd({ name, description, path }: ServiceJsonLdProps) {
  const url = `${site.url}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        description,
        url,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: [site.region, ...site.locations].map((place) => ({
          "@type": "Place",
          name: place,
        })),
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${site.url}/kontakt`,
          servicePhone: site.contact.phoneE164,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Leistungen",
            item: `${site.url}/leistungen`,
          },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
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
