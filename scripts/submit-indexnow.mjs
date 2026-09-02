const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dohome-bau.de").replace(/\/$/, "");
const host = new URL(siteUrl).host;
const key = "0b4c4b02dec15553b3f2e450298daec5";
const keyLocation = `${siteUrl}/${key}.txt`;

const sitemapResponse = await fetch(`${siteUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Sitemap konnte nicht geladen werden: ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) {
  throw new Error("Die Sitemap enthält keine URLs.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow-Anmeldung fehlgeschlagen: HTTP ${response.status}`);
}

console.log(`IndexNow akzeptiert ${urlList.length} URLs (HTTP ${response.status}).`);
