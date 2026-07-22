import { site } from "@/lib/content/site";
import type { PortfolioProject } from "@/lib/content/projects";

// Strukturierte Daten der Projektdetailseite.
//
// ApartmentComplex ist der passende Typ für ein Wohnprojekt mit mehreren
// Einheiten (Residence-Unterklasse). Dazu eine BreadcrumbList, damit die
// Seitenhierarchie auch in der Suchergebnisdarstellung erkennbar ist.
//
// Grundsatz wie in OrganizationJsonLd: Nur belegte Felder ausgeben. Preise
// fehlen bewusst und werden deshalb NICHT als offer ausgezeichnet – eine
// erfundene Preisangabe im Markup wäre irreführend.

export function ProjectJsonLd({ project }: { project: PortfolioProject }) {
  const url = `${site.url}/projekte/${project.slug}`;

  const residence: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${url}#projekt`,
    name: project.name,
    description: project.teaser,
    url,
    image: `${site.url}${project.image.src}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.city,
      postalCode: project.postalCode,
      addressRegion: "Niedersachsen",
      addressCountry: site.address.countryCode,
    },
    numberOfAccommodationUnits: {
      "@type": "QuantitativeValue",
      value: project.units.total,
    },
    provider: { "@id": `${site.url}/#organization` },
  };

  if (project.units.available > 0) {
    residence.numberOfAvailableAccommodationUnits = {
      "@type": "QuantitativeValue",
      value: project.units.available,
    };
  }
  if (project.accessibilityNote) {
    // Wortlaut unverändert aus der Registry – im Markup steht dieselbe Aussage
    // wie auf der Seite, nichts Aufgewertetes.
    residence.amenityFeature = [
      {
        "@type": "LocationFeatureSpecification",
        name: project.accessibilityNote,
        value: true,
      },
    ];
  }
  if (project.area) {
    residence.floorSize = {
      "@type": "QuantitativeValue",
      minValue: project.area.min,
      maxValue: project.area.max,
      unitCode: "MTK", // Quadratmeter
    };
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projekte",
        item: `${site.url}/projekte`,
      },
      { "@type": "ListItem", position: 3, name: project.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residence) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
