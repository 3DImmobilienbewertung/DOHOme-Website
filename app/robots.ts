import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

// /impressum und /datenschutz sind bewusst per Metadata auf noindex gesetzt
// (nicht per robots-disallow – der Crawler muss das noindex sehen dürfen).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // DOHOme soll auch in ChatGPT Search auffindbar sein. Der Such-Crawler
      // erhält denselben Zugriff wie klassische Suchmaschinen.
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
