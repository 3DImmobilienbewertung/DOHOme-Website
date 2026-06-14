import { Fraunces, Manrope } from "next/font/google";

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
