import type { Metadata } from "next";

import { site } from "@/lib/content/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  type?: "website" | "article";
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
  type = "website",
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  const socialTitle = title.toLowerCase().includes(site.brand.toLowerCase())
    ? title
    : `${title} · ${site.brand}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      locale: "de_DE",
      siteName: site.brand,
      title: socialTitle,
      description,
      url: path,
      images: [{ url: image, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
