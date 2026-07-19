import { Preloader } from "@/components/animation/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Layout der Haupt-Website: Preloader-Intro + globale Navigation + Footer. Die
// Route-Gruppe „(main)“ ändert keine URLs. Landingpages (z. B. /rotkamp-1)
// liegen bewusst außerhalb und laufen ohne Navigation und ohne Preloader.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <Header />
      {children}
      <Footer />
    </>
  );
}
