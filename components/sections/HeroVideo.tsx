// Hintergrundvideo der Startseite: Drohnenflug über die realisierten Projekte.
//
// Grundsätze:
//   • Natives HTML-Autoplay statt einer nachträglich per JavaScript gesetzten
//     Quelle. So funktioniert der Film auch dann, wenn React erst später
//     hydratisiert; das Standbild darunter verhindert trotzdem einen leeren
//     oder schwarzen ersten Frame.
//   • Vier passend zugeschnittene Fassungen: QHD bereits ab Tabletbreite,
//     damit Desktop- und Retina-Displays nicht auf eine weichere 1080p-
//     Fassung zurückfallen. 1080p und 720p bleiben für kleinere Viewports,
//     540p fürs Handy. Alle entstehen
//     direkt aus den 35-Mbit-Drohnenoriginalen,
//     nicht aus einem bereits komprimierten Zwischenexport.
//   • Konstante 30 Bilder pro Sekunde und kurze Szenenwechsel verhindern das
//     Ruckeln des früheren Clips mit variabler Bildrate.
//   • `prefers-reduced-motion` unterdrückt das Video per CSS. Wer Bewegung
//     abbestellt hat, bekommt das ruhige Standbild.
//   • Stumm, in Schleife, `playsInline` – sonst blockt iOS die Wiedergabe
//     oder erzwingt Vollbild.
//   • Rein dekorativ: aria-hidden, kein Bedienelement. Der Inhalt der Seite
//     hängt nicht am Video.

export function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className="hero-video absolute inset-0 h-full w-full object-cover object-center"
    >
      <source
        src="/video/hero-1440.mp4"
        type="video/mp4"
        media="(min-width: 768px)"
      />
      <source
        src="/video/hero-1080.mp4"
        type="video/mp4"
        media="(min-width: 640px)"
      />
      <source
        src="/video/hero-720.mp4"
        type="video/mp4"
        media="(min-width: 480px)"
      />
      <source src="/video/hero-540.mp4" type="video/mp4" />
    </video>
  );
}
