// Unternehmensgeschichte – zentrale Quelle für Startseite (StoryTeaser) und
// /ueber-uns. Ein Wortlaut, keine zwei driftenden Fassungen.
//
// Grundsatz: Nur Belegtes. Alle Aussagen sind aus dem gesicherten Projektstand
// abgeleitet (Rotkamp 1, Bissendorfer Straße 11, HAZ-Bericht „Vorzeigeprojekt
// für Wedemark") oder allgemeingültig für das Geschäftsmodell. KEINE erfundenen
// Jahreszahlen: Das Gründungsjahr ist offen (2012 vs. HR 05.11.2013), deshalb
// steht hier nirgends ein konkretes Jahr.
//
// ERGÄNZEN (Kunde): persönliche Gründer-Anekdote, exakte Zeitleiste, Zahl der
// realisierten Projekte. Bis dahin trägt der Text ohne Platzhalter-Lücke.

/** Kurzform für den Anriss auf der Startseite. */
export const storyTeaser = {
  eyebrow: "Unsere Geschichte",
  heading: "Zwei Familien, ein Anspruch: Häuser, die ein Leben lang halten.",
  paragraphs: [
    "Der Kern von DOHOme ist Handwerk, nicht Vertrieb. Donnarumma und Horstmann entwickeln eigene Wohnprojekte in der Wedemark und den Nachbarorten – mit einem Handwerker-Netzwerk, das teils seit 30 Jahren zusammensteht.",
    "Weil wir selbst bauen und selbst verantworten, entscheidet bei uns die Qualität – nicht die schnellste Marge.",
  ],
} as const;

/** Ausführliche Fassung für /ueber-uns. */
export const storyLong = {
  eyebrow: "Unsere Geschichte",
  heading: "Aus dem Handwerk gewachsen",
  paragraphs: [
    "DOHOme ist der gemeinsame Weg zweier Familien: Donnarumma und Horstmann. Was uns verbindet, ist keine Vertriebsidee, sondern das Handwerk – die Überzeugung, dass ein Haus so gebaut sein muss, dass man in dreißig Jahren nicht an die Substanz muss, sondern höchstens die Wände neu streicht.",
    "Wir entwickeln, planen, bauen und verkaufen ausschließlich eigene Wohnprojekte. Kein Zwischenhandel, keine weitergereichte Verantwortung: Wer bei uns kauft, spricht mit denen, die das Haus errichtet haben. Getragen wird das von einem Netzwerk aus Handwerksbetrieben der Region, mit denen wir teils seit dreißig Jahren zusammenarbeiten – dieselben Leute, dieselben Standards, Projekt für Projekt.",
    "Unser Zuhause ist die Wedemark und die Region Hannover. Wir kennen die Orte, die Bauämter und die Menschen – und bauen so, dass sich ein Neubau in eine gewachsene Nachbarschaft einfügt, statt sich davorzustellen. Als der Bürgermeister eines unserer Projekte in der Presse ein „Vorzeigeprojekt für Wedemark“ nannte, war das für uns weniger Auszeichnung als Bestätigung des eigenen Anspruchs.",
    "Dieser Anspruch bleibt gleich, ob eine Wohnung an eine junge Familie geht oder an jemanden, der im Alter zentral und barrierearm wohnen möchte: von Anfang an richtig gebaut, mit Materialien, die halten, und einer Ausführung, für die wir mit unserem Namen geradestehen.",
  ],
  /** Werte-Kacheln – bleiben konsistent zwischen Startseite und Über-uns. */
  principles: [
    {
      title: "Von Anfang an richtig",
      text: "Kompromisslose Qualität statt Nacharbeit – gebaut, um Generationen zu tragen.",
    },
    {
      title: "Ein Partner, keine Kette",
      text: "Sie sprechen mit den Inhabern. Verantwortung bleibt an einem Tisch.",
    },
    {
      title: "Regional verwurzelt",
      text: "Wir kennen die Orte, Bauämter und Menschen der Region Hannover.",
    },
  ],
} as const;
