import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { portfolio } from "@/lib/content/projects";

// Indexierbare Routen. Die Projektdetailseiten kommen aus der Portfolio-
// Registry; sobald Supabase angebunden ist, kann die Liste zusätzlich aus
// public_project_summary gespeist werden.
//
// Nicht enthalten (bewusst): /impressum und /datenschutz (noindex) sowie die
// Anzeigen-Landingpage /rotkamp-1 (noindex, damit sie nicht mit der
// Projektseite um dasselbe Keyword konkurriert).
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projekte",
    "/wohnung-mieten",
    "/grundstueck-verkaufen",
    "/ueber-uns",
    "/kontakt",
    "/steuern-sparen",
    "/steuern-sparen/neubauwohnung",
    "/steuern-sparen/erstgespraech",
  ];

  const projectRoutes = portfolio.map((p) => `/projekte/${p.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly",
    // Projektdetailseiten sind die Verkaufsseiten – hoch priorisiert.
    priority: path === "" ? 1 : path.startsWith("/projekte/") ? 0.9 : 0.8,
  }));
}
