import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { TrackedContactLink } from "@/components/analytics/TrackedContactLink";
import { site, addressLines } from "@/lib/content/site";

// Globaler Footer: sitewide NAP-Block (Local-SEO + Vertrauen), Silo-Navigation,
// Rechtslinks und Marken-Claim. Auf green-950 (tiefstes Grün) abgesetzt.

const NAV_GROUPS: { title: string; links: { href: string; label: string }[] }[] =
  [
    {
      title: "Wohnen",
      links: [
        { href: "/projekte", label: "Projekte" },
        { href: "/wohnung-mieten", label: "Mietwohnung gesucht" },
        { href: "/seniorengerechtes-wohnen", label: "Seniorengerechtes Wohnen" },
      ],
    },
    {
      title: "Leistungen",
      links: [
        { href: "/leistungen", label: "Alle Leistungen" },
        { href: "/projektentwicklung-wedemark", label: "Projektentwicklung" },
        { href: "/wohnungsbau-region-hannover", label: "Wohnungsbau" },
        { href: "/immobilienbewertung-wedemark", label: "Immobilienbewertung" },
        { href: "/grundstueck-verkaufen", label: "Grundstück verkaufen" },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { href: "/ueber-uns", label: "Über uns" },
        { href: "/ratgeber", label: "Ratgeber" },
        { href: "/kontakt", label: "Kontakt" },
      ],
    },
  ];

export function Footer() {
  const year = 2026; // Statisch: Datumsfunktionen sind im Build nicht verfügbar.

  return (
    <footer className="bg-green-950 text-beige-100">
      <div className="mx-auto max-w-container px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marke + NAP */}
          <div>
            <Link
              href="/"
              aria-label={`${site.brand} – Startseite`}
              className="inline-flex"
            >
              <Wordmark className="text-2xl text-beige-100" tagline decorative />
            </Link>
            <p className="mt-5 max-w-xs font-display text-xl leading-snug">
              {site.claim}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-dark">
              {site.brand} ist die Marke der {site.legalNameDisplay}.
            </p>
            <address className="mt-6 not-italic text-sm text-muted-dark">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <TrackedContactLink
                href={`mailto:${site.contact.email}`}
                method="email"
                placement="footer"
                className="mt-3 inline-block text-beige-100/80 transition-colors hover:text-beige-100"
              >
                {site.contact.email}
              </TrackedContactLink>
              {site.contact.phone && (
                <TrackedContactLink
                  href={site.contact.phoneHref}
                  method="phone"
                  placement="footer"
                  className="mt-1 block text-beige-100/80 transition-colors hover:text-beige-100"
                >
                  {site.contact.phone}
                </TrackedContactLink>
              )}
            </address>
          </div>

          {/* Navigations-Silos */}
          {NAV_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="eyebrow text-muted-dark">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-beige-100/80 transition-colors hover:text-beige-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Rechtszeile */}
        <div className="mt-14 flex flex-col gap-4 border-t border-beige-100/10 pt-6 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-beige-100">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-beige-100">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
