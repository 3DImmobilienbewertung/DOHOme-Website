const baseUrl = (process.env.SEO_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const canonicalOrigin = (process.env.SEO_CANONICAL_ORIGIN ?? "https://dohome-bau.de").replace(/\/$/, "");

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Sitemap nicht erreichbar: HTTP ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
  const pathname = new URL(match[1]).pathname;
  return `${baseUrl}${pathname}`;
});

const failures = [];
const warnings = [];
const seenTitles = new Map();
const seenDescriptions = new Map();

function normalizeUrl(value) {
  const url = new URL(value);
  return `${url.origin}${url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "")}`;
}

for (const url of urls) {
  const response = await fetch(url, { redirect: "follow" });
  const html = await response.text();
  const pathname = new URL(url).pathname;
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim();
  const description = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i)?.[1];
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "";
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis)];

  if (!response.ok) failures.push(`${pathname}: HTTP ${response.status}`);
  if (!title) failures.push(`${pathname}: Title fehlt`);
  if (!description) failures.push(`${pathname}: Meta-Description fehlt`);
  if (!canonical) failures.push(`${pathname}: Canonical fehlt`);
  if (h1Count !== 1) failures.push(`${pathname}: ${h1Count} H1-Elemente`);
  if (
    canonical &&
    normalizeUrl(canonical) !== normalizeUrl(`${canonicalOrigin}${pathname}`)
  ) {
    failures.push(`${pathname}: Canonical zeigt auf ${canonical}`);
  }
  if (/noindex/i.test(robots)) failures.push(`${pathname}: steht auf noindex`);
  if (title && title.length > 70) warnings.push(`${pathname}: Title ist ${title.length} Zeichen lang`);
  if (description && description.length > 165) {
    warnings.push(`${pathname}: Description ist ${description.length} Zeichen lang`);
  }
  if (title) {
    const previous = seenTitles.get(title);
    if (previous) failures.push(`${pathname}: doppelter Title wie ${previous}`);
    seenTitles.set(title, pathname);
  }
  if (description) {
    const previous = seenDescriptions.get(description);
    if (previous) failures.push(`${pathname}: doppelte Description wie ${previous}`);
    seenDescriptions.set(description, pathname);
  }

  for (const [, block] of jsonLdBlocks) {
    try {
      JSON.parse(block.replaceAll("&quot;", '"').replaceAll("&amp;", "&"));
    } catch {
      failures.push(`${pathname}: ungültiges JSON-LD`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`SEO-Basisprüfung bestanden: ${urls.length} indexierbare URLs.`);
}

if (warnings.length > 0) {
  console.warn(`Hinweise:\n${warnings.join("\n")}`);
}
