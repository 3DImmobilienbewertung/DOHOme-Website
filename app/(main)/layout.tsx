import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Layout der Haupt-Website: globale Navigation und Footer. Das Drohnenvideo ist
// der direkte Einstieg; ein vollflächiger Ladevorhang würde den LCP blockieren.
// Die Route-Gruppe „(main)“ ändert keine URLs. Landingpages liegen bewusst
// außerhalb und laufen ohne globale Navigation.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
