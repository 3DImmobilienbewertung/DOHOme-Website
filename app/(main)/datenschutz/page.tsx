import { site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei DOHOme.",
  path: "/datenschutz",
  noIndex: true,
});

// Struktur nach Art. 13/14 DSGVO, abgestimmt auf die tatsächlich eingesetzte
// Technik: statisches Hosting, self-hosted Schriften, keine Analyse-Cookies,
// keine Tracker. Google Maps wird ausschließlich nach ausdrücklichem Klick
// nachgeladen (Zwei-Klick-Lösung, siehe ConsentMap) – deshalb bleibt die Seite
// ohne Einwilligung cookiefrei. Sobald Analyse-Tools oder weitere externe
// Dienste ergänzt werden, MUSS dieser Text erweitert werden.

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-heading text-beige-100">
        {n}. {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
        <p className="eyebrow text-sage-300">Rechtliches</p>
        <h1 className="mt-3 text-display-xl">Datenschutzerklärung</h1>

        <div className="mt-10 space-y-9 text-beige-100/80">
          <Section n={1} title="Verantwortlicher">
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p>
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
              <br />
              {site.legal.managingDirectors && (
                <>
                  Vertreten durch: {site.legal.managingDirectors}
                  <br />
                </>
              )}
              E-Mail:{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="underline underline-offset-4 hover:text-beige-100"
              >
                {site.contact.email}
              </a>
              {site.contact.phone && (
                <>
                  <br />
                  Telefon:{" "}
                  <a
                    href={site.contact.phoneHref}
                    className="underline underline-offset-4 hover:text-beige-100"
                  >
                    {site.contact.phone}
                  </a>
                </>
              )}
            </p>
          </Section>

          <Section n={2} title="Aufruf der Website (Server-Logfiles)">
            <p>
              Beim Aufruf dieser Website verarbeitet unser Hosting-Dienstleister
              automatisch technische Zugriffsdaten: IP-Adresse, Datum und Uhrzeit
              des Zugriffs, aufgerufene Seite, übertragene Datenmenge, Referrer
              sowie Browser- und Betriebssystemangaben.
            </p>
            <p>
              <strong className="text-beige-100">Zweck:</strong> Auslieferung der
              Website, Betriebssicherheit und Abwehr von Angriffen.
              <br />
              <strong className="text-beige-100">Rechtsgrundlage:</strong> Art. 6
              Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren,
              stabilen Betrieb).
              <br />
              <strong className="text-beige-100">Speicherdauer:</strong> Die
              Logdaten werden nach spätestens 30 Tagen gelöscht oder anonymisiert.
            </p>
          </Section>

          <Section n={3} title="Kontaktaufnahme und Anfrageformulare">
            <p>
              Wenn Sie uns über ein Formular, per E-Mail oder telefonisch
              kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten – je
              nach Formular etwa Name, Telefonnummer, E-Mail-Adresse sowie
              Angaben zu Ihrem Anliegen oder Ihrem Grundstück.
            </p>
            <p>
              <strong className="text-beige-100">Zweck:</strong> Bearbeitung
              Ihrer Anfrage und Kommunikation mit Ihnen.
              <br />
              <strong className="text-beige-100">Rechtsgrundlage:</strong> Art. 6
              Abs. 1 lit. b DSGVO, sofern die Anfrage auf einen Vertrag
              abzielt, andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der Beantwortung von Anfragen).
              <br />
              <strong className="text-beige-100">Speicherdauer:</strong> Wir
              löschen die Daten, sobald Ihr Anliegen abschließend bearbeitet ist
              und keine gesetzlichen Aufbewahrungspflichten entgegenstehen
              (handels- und steuerrechtlich bis zu zehn Jahre).
            </p>
            <p>
              Die Angabe der Daten erfolgt freiwillig. Ohne die als Pflichtfeld
              gekennzeichneten Angaben können wir Ihre Anfrage jedoch nicht
              bearbeiten.
            </p>
          </Section>

          <Section n={4} title="Schutz vor missbräuchlichen Formularzusendungen">
            <p>
              Unsere Formulare enthalten technische Schutzmaßnahmen gegen
              automatisierte Zusendungen (unsichtbares Zusatzfeld sowie eine
              Prüfung der Ausfüllzeit). Dabei werden keine zusätzlichen
              personenbezogenen Daten erhoben und keine Cookies gesetzt.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </Section>

          <Section n={5} title="Cookies und Reichweitenmessung">
            <p>
              Diese Website setzt <strong className="text-beige-100">keine
              Cookies zu Analyse-, Marketing- oder Tracking-Zwecken</strong> ein.
              Es findet keine Reichweitenmessung und kein Profiling statt. Eine
              Einwilligung nach § 25 TDDDG ist daher nicht erforderlich.
            </p>
          </Section>

          <Section n={6} title="Kartendarstellung (Google Maps)">
            <p>
              Auf Projektseiten bieten wir eine Karte des Standorts an. Diese
              wird <strong className="text-beige-100">nicht automatisch
              geladen</strong>: Sie sehen zunächst nur einen Hinweis mit der
              Adresse. Erst wenn Sie aktiv auf „Karte laden&ldquo; klicken, wird der
              Dienst Google Maps nachgeladen. Dabei werden Ihre IP-Adresse und
              gegebenenfalls weitere Daten an Google Ireland Limited übertragen;
              eine Übermittlung in die USA ist möglich.
            </p>
            <p>
              <strong className="text-beige-100">Rechtsgrundlage:</strong> Ihre
              Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25
              Abs. 1 TDDDG). Klicken Sie nicht, findet keine Übertragung statt.
              Sie können die Einwilligung jederzeit widerrufen, indem Sie die
              Seite neu laden.
            </p>
          </Section>

          <Section n={7} title="Schriftarten">
            <p>
              Schriften werden lokal von unserem Server ausgeliefert
              (self-hosted). Es besteht keine Verbindung zu Servern Dritter; es
              werden keine Daten an externe Anbieter übermittelt.
            </p>
          </Section>

          <Section n={8} title="Empfänger und Auftragsverarbeitung">
            <p>
              Zur Bereitstellung der Website und zur Bearbeitung von Anfragen
              setzen wir Dienstleister für Hosting und E-Mail-Versand ein. Diese
              verarbeiten Daten im Rahmen der vereinbarten Leistungen und auf
              Grundlage der jeweils erforderlichen Datenschutzvereinbarungen.
              Eine Verarbeitung außerhalb der EU oder des EWR kann je nach
              technischer Bereitstellung nicht ausgeschlossen werden. In diesem
              Fall erfolgt sie nur unter den Voraussetzungen der Art. 44 ff.
              DSGVO.
            </p>
          </Section>

          <Section n={9} title="Ihre Rechte">
            <p>Ihnen stehen gegenüber uns folgende Rechte zu:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
                Interessen (Art. 21 DSGVO)
              </li>
              <li>
                Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft
                (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p>
              Zur Ausübung genügt eine formlose Nachricht an{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="underline underline-offset-4 hover:text-beige-100"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </Section>

          <Section n={10} title="Beschwerderecht bei der Aufsichtsbehörde">
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
              beschweren. Für uns zuständig ist:
            </p>
            <p>
              Die Landesbeauftragte für den Datenschutz Niedersachsen
              <br />
              Prinzenstraße 5, 30159 Hannover
            </p>
          </Section>

          <Section n={11} title="Aktualität">
            <p>
              Wir passen diese Datenschutzerklärung an, sobald sich die
              Datenverarbeitung auf dieser Website ändert – etwa durch neue
              Funktionen oder eingesetzte Dienste.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
