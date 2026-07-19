// Zentrale Stammdaten der Marke DOHOme – eine Quelle der Wahrheit für Footer,
// Kontaktseite, Impressum und (später) JSON-LD/Schema.org. So bleiben NAP-Daten
// (Name/Adresse/Telefon) überall konsistent – Voraussetzung für Local SEO und
// ein zum Google-Business-Profil passendes LocalBusiness-Schema.
//
// Felder mit `null` sind bewusst leer, bis der Kunde echte Daten freigibt: sie
// werden dann NICHT gerendert (statt Platzhalter/Fake auszuliefern).

export const site = {
  brand: "DOHOme",
  claim: "wir schaffen Lebensräume",
  // Exakte Handelsregister-Firmierung (Amtsgericht Hannover, HRB 210402).
  legalName: "Donnarumma/Horstmann GmbH",
  // Rein gestalterische Stilisierung – nur außerhalb rechtlicher Pflichtangaben.
  brandStylized: "Donnarumma · Horstmann",
  founded: 2012,
  // Domain noch nicht final – aus Env, Platzhalter-Default bis zur Registrierung.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dohome.de",

  address: {
    street: "Im Rotbusch 17",
    postalCode: "30900",
    city: "Wedemark",
    countryCode: "DE",
  },

  contact: {
    email: "kontakt@dohome.de",
    // TODO(Vito): echte Telefonnummer. Bis zur Freigabe null → wird ausgeblendet,
    // damit keine tote Nummer klickbar ist.
    phone: null as string | null,
  },

  responseTime: "in der Regel innerhalb von 24 Stunden (werktags)",

  // Bediengebiet: „Region Hannover“ ist der Dachbegriff, konkret bespielt werden
  // die Umland-Orte unten – NICHT die Stadt Hannover. Grundlage für redaktionelle
  // Texte und späteres areaServed im LocalBusiness-Schema.
  region: "Region Hannover",
  locations: [
    "Wedemark",
    "Isernhagen",
    "Großburgwedel",
    "Schwarmstedt",
    "Lindwedel",
  ],

  // Handelsregister-/Vertretungsangaben fürs Impressum.
  // Quelle: Handelsregister-Eintrag (Amtsgericht Hannover, HRB 210402,
  // eingetragen 05.11.2013). TODO(Vito): vor Livegang gegenprüfen.
  legal: {
    managingDirectors: "Tasso Donnarumma, Jens Horstmann" as string | null,
    registerCourt: "Amtsgericht Hannover" as string | null,
    registerNumber: "HRB 210402" as string | null,
    vatId: null as string | null, // TODO(Vito): USt-IdNr. (§ 27a UStG) fehlt noch
  },
} as const;

// Vollständige Postanschrift als Zeilenarray (Footer, Kontakt, Impressum).
export const addressLines: string[] = [
  site.legalName,
  site.address.street,
  `${site.address.postalCode} ${site.address.city}`,
];
