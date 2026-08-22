// Projektvideo (Drohnenflug). Bewusst kein Autoplay: Das Video ist Inhalt,
// keine Deko – der Besucher entscheidet, ob er es startet.
//
// `preload="none"` lädt die Videodatei erst beim Klick; sichtbar ist bis dahin
// nur das Poster. Das feste Seitenverhältnis hält das Layout ruhig, damit beim
// Laden nichts springt.
//
// Die Bedienelemente kommen vom Browser – damit funktionieren Tastatur,
// Screenreader und Untertitel-Einstellungen ohne eigenen Code.
//
// `portrait`: Hochformat-Aufnahmen (Drohne im Reel-Format) werden in der Breite
// begrenzt, sonst füllte ein 9:16-Video die halbe Seitenhöhe.

export function ProjectVideo({
  src,
  poster,
  title,
  caption,
  portrait = false,
}: {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  portrait?: boolean;
}) {
  return (
    <figure className={portrait ? "mx-auto max-w-sm" : ""}>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="none"
        title={title}
        style={{ aspectRatio: portrait ? "9 / 16" : "16 / 9" }}
        className="w-full rounded-3xl border border-beige-100/15 bg-green-950 object-cover"
      >
        Ihr Browser kann dieses Video nicht abspielen.
      </video>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-dark">{caption}</figcaption>
      )}
    </figure>
  );
}
