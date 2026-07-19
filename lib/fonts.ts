import { Fraunces, Manrope, Montserrat } from "next/font/google";

// Marken-/Logo-Schrift: Montserrat (Wortmarke „DOHOme“ + Firmierung), wie im
// finalen Logo-Design. Wird gezielt für die Marke genutzt – der redaktionelle
// Satz bleibt Fraunces (Display) + Manrope (Text).
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

// Display: Fraunces (variable Soft-Serif, opsz + SOFT für warmen, redaktionellen Charakter)
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

// Body / UI: Manrope (humanistischer Grotesk, klar & modern)
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
