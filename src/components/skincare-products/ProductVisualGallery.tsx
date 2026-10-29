"use client";

import Image from "next/image";
import { useState } from "react";
import type { SkincareProduct } from "@/types/content";

type GalleryImage = { src: string; alt: string; label: string; fit: "contain" | "cover"; isCleanHero?: boolean };

function getImages(product: SkincareProduct): GalleryImage[] {
  const fallbackHero = { src: product.image.hero, alt: product.image.heroAlt ?? `${product.name} concept visual`, fit: "cover" as const };
  const cleanHero = product.image.cleanHero ?? fallbackHero;
  const campaign = product.image.campaign ?? fallbackHero;
  const images: GalleryImage[] = [
    { src: cleanHero.src, alt: cleanHero.alt, label: "Product", fit: product.image.cleanHero ? "contain" : "cover", isCleanHero: Boolean(product.image.cleanHero) },
    { src: campaign.src, alt: campaign.alt, label: "Campaign", fit: "cover" },
    ...(product.image.detail ?? []).map((image, index) => ({ src: image.src, alt: image.alt, label: `Detail ${index + 1}`, fit: "cover" as const })),
  ];

  return images.filter((image, index) => images.findIndex((candidate) => candidate.src === image.src) === index);
}

export function ProductVisualGallery({ product }: { product: SkincareProduct }) {
  const images = getImages(product);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] ?? images[0];

  return <div className="min-w-0">
    <figure className="relative h-[min(52svh,34rem)] min-h-72 overflow-hidden bg-paper sm:h-[min(65svh,42rem)] lg:h-[min(64svh,42rem)]">
      {selected.isCleanHero ? <Image aria-hidden src={selected.src} alt="" fill sizes="(max-width:1023px) 100vw, 62vw" className="scale-110 object-cover blur-2xl opacity-35" /> : null}
      <Image src={selected.src} alt={selected.alt} fill preload loading="eager" sizes="(max-width:1023px) 100vw, 62vw" className={selected.fit === "contain" ? "object-contain" : "object-cover"} />
    </figure>
    {images.length > 1 ? <div className="mt-3 flex gap-3 overflow-x-auto pb-1" aria-label="Product visual selector">{images.map((image, index) => <button className={`relative h-16 w-14 shrink-0 overflow-hidden border transition-colors sm:h-20 sm:w-16 ${selectedIndex === index ? "border-graphite" : "border-line hover:border-slate"}`} type="button" onClick={() => setSelectedIndex(index)} aria-label={`View ${image.label.toLowerCase()} image`} aria-pressed={selectedIndex === index} key={image.src}><Image src={image.src} alt="" fill sizes="64px" className="object-cover" /><span className="sr-only">{image.label}</span></button>)}</div> : null}
  </div>;
}
