"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import {
  buildAlt,
  categoryLabel,
  type GalleryImage,
  type GalleryCategory,
} from "@/lib/content/gallery";

// Projektgalerie: horizontaler Slider mit Kategorie-Filter, Tastaturbedienung
// und Lazy Loading. Das erste Bild lädt priorisiert (LCP), alle weiteren lazy.
// Alt-Texte kommen aus buildAlt() – beschreibend statt nur der Projektname.

type Props = {
  images: GalleryImage[];
  project: { name: string; postalCode?: string; city?: string };
  className?: string;
};

export function ProjectGallery({ images, project, className }: Props) {
  const [active, setActive] = useState<GalleryCategory | "alle">("alle");
  const trackRef = useRef<HTMLUListElement>(null);

  const categories = Array.from(new Set(images.map((i) => i.category)));
  const shown =
    active === "alle" ? images : images.filter((i) => i.category === active);

  function scrollByCards(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : 400;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className={className}>
      {/* Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Bildkategorie" className="flex flex-wrap gap-2">
          {(["alle", ...categories] as const).map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c as GalleryCategory | "alle")}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "border-transparent bg-warmwhite text-green-950"
                    : "border-beige-100/45 text-beige-100/80 hover:bg-beige-100/10"
                }`}
              >
                {c === "alle" ? "Alle" : categoryLabel(c as GalleryCategory)}
              </button>
            );
          })}
        </div>

        <div className="hidden gap-2 sm:flex">
          <SliderButton label="Vorherige Bilder" onClick={() => scrollByCards(-1)} rotate />
          <SliderButton label="Nächste Bilder" onClick={() => scrollByCards(1)} />
        </div>
      </div>

      {/* Slider */}
      <ul
        ref={trackRef}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shown.map((img, i) => (
          <li
            key={img.src}
            className="w-[85%] shrink-0 snap-start sm:w-[58%] lg:w-[42%]"
          >
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-green-950">
                <Image
                  src={img.src}
                  alt={buildAlt(img, project)}
                  fill
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 58vw, 85vw"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-sm">
                <span className="text-beige-100/80">
                  {img.caption ?? categoryLabel(img.category)}
                </span>
                {img.date && (
                  <span className="shrink-0 text-muted-dark">Stand {img.date}</span>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  rotate = false,
}: {
  label: string;
  onClick: () => void;
  rotate?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-beige-100/45 text-beige-100 transition-colors hover:bg-beige-100/10"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={rotate ? "rotate-180" : undefined}
      >
        <path
          d="M9 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
