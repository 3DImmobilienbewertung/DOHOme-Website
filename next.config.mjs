/** @type {import('next').NextConfig} */

// Nicht-brechende Sicherheits-Header (Defense in Depth). Die vollständige
// Content-Security-Policy folgt bewusst erst in Phase 7 (Compliance) über eine
// Nonce-basierte Middleware – sie lässt sich nur gegen einen laufenden Build
// sauber verifizieren, ohne den ersten Render zu riskieren.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    // Platzhalter-Quelle bis eigenes /public/images-Material vorliegt.
    // Unsplash entfernt (wurde nie genutzt – Remote-Allowlist minimal halten).
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Route umbenannt (SEO: „verkaufen“ trifft die Suchintention).
      {
        source: "/grundstueck-anbieten",
        destination: "/grundstueck-verkaufen",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
