import type { Metadata } from "next";
import { fraunces, manrope, montserrat } from "@/lib/fonts";
import { AppReadyProvider } from "@/components/animation/AppReady";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dohome-bau.de",
  ),
  title: {
    default: "DOHOme – Bauträger Region Hannover | wir schaffen Lebensräume",
    template: "%s · DOHOme",
  },
  description:
    "Bauträger in der Region Hannover: Wir entwickeln, planen und bauen eigene Wohnprojekte – durchdachte Grundrisse, langlebige Bauweise, ruhige Lagen.",
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
  },
  twitter: {
    card: "summary_large_image",
  },
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
          <SmoothScroll>{children}</SmoothScroll>
        </AppReadyProvider>
      </body>
    </html>
  );
}
