import { site } from "@/lib/content/site";

type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function ArticleJsonLd({
  title,
  description,
  path,
  image = "/images/rotkamp-1/luftbild-projekt.jpg",
}: ArticleJsonLdProps) {
  const url = `${site.url}${path}`;
  const date = "2026-09-02";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        mainEntityOfPage: url,
        image: `${site.url}${image}`,
        datePublished: date,
        dateModified: date,
        inLanguage: "de-DE",
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
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
            name: "Ratgeber",
            item: `${site.url}/ratgeber`,
          },
          { "@type": "ListItem", position: 3, name: title, item: url },
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
