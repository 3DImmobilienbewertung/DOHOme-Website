import type { Metadata } from "next";
import { fraunces, manrope, montserrat } from "@/lib/fonts";
import { AppReadyProvider } from "@/components/animation/AppReady";
import { Preloader } from "@/components/animation/Preloader";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { site } from "@/lib/content/site";
import "./globals.css";

const homeTitle =
  "DOHOme – Donnarumma / Horstmann GmbH | Immobilien Wedemark";
const homeDescription =
  "DOHOme ist die Marke der Donnarumma / Horstmann GmbH in 30900 Wedemark – für Projektentwicklung, Wohnungsbau, Vermietung und Immobilienbewertung.";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.brand,
  creator: site.legalNameDisplay,
  publisher: site.legalNameDisplay,
  category: "Bauwesen und Immobilien",
  title: {
    default: homeTitle,
    template: "%s · DOHOme",
  },
  description: homeDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "DOHOme",
    title: homeTitle,
    description: homeDescription,
    url: site.url,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DOHOme – Donnarumma / Horstmann GmbH in Wedemark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/opengraph-image"],
  },
  verification:
    googleVerification || bingVerification
      ? {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? { other: { "msvalidate.01": bingVerification } }
            : {}),
        }
      : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${manrope.variable} ${montserrat.variable}`}
    >
      <body>
        <OrganizationJsonLd />
        {/* Ohne JS bleibt kein Vorhang stehen. */}
        <noscript>
          <style>{`.preloader{display:none !important}`}</style>
        </noscript>
        <AppReadyProvider>
          <Preloader />
          <SmoothScroll>{children}</SmoothScroll>
        </AppReadyProvider>
      </body>
    </html>
  );
}
