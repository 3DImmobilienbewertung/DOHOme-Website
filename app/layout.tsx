import type { Metadata } from "next";
import { fraunces, manrope } from "@/lib/fonts";
import { AppReadyProvider } from "@/components/animation/AppReady";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { Preloader } from "@/components/animation/Preloader";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dohome.de"),
  title: {
    default: "DOHOme – Bauträger Region Hannover | wir schaffen Lebensräume",
    template: "%s · DOHOme",
  },
  description:
    "Premium-Neubau in der Region Hannover – von Anfang an richtig gebaut. Projektentwicklung & Bauträger für Eigennutzer und Kapitalanleger.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "DOHOme",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <AppReadyProvider>
          <Preloader />
          <SmoothScroll>
            <Header />
            {children}
          </SmoothScroll>
        </AppReadyProvider>
      </body>
    </html>
  );
}
