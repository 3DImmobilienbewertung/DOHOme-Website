import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

// Statische, indexierbare Routen. Die dynamischen Projekt-URLs
// (/projekte/[slug]) werden hier ergänzt, sobald die Website an die Supabase-
// Aggregat-View angebunden ist (Slugs aus public_project_summary).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projekte",
    "/kapitalanlage",
    "/grundstueck-verkaufen",
    "/ueber-uns",
    "/kontakt",
  ];

  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
