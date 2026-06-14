import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 60 % – dominante dunkelgrüne Flächen
        green: { 900: "#1A3A29", 700: "#234B36", 500: "#3E6B52" },
        sage: { 300: "#9DB1A4" },
        // 30 % – warmer Beige-/Papier-Untergrund
        beige: { 100: "#F1EFE9", 200: "#E7E3D9" },
        // 10 % – Präzisions-Akzente
        warmwhite: "#FBFAF7",
        ink: "#1C2A22",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.14em" },
      transitionTimingFunction: { "out-expo": "cubic-bezier(0.16,1,0.3,1)" },
      maxWidth: { container: "90rem" },
    },
  },
  plugins: [],
} satisfies Config;
