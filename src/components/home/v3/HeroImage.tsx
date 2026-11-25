"use client";

import Image from "next/image";
import { useState } from "react";
import type { HeroImageData } from "@/lib/sanity-home-hero";
import styles from "./hero-v3.module.css";

const fallback: HeroImageData = { url: "/images/home/sooyan-hero-v3-concept.webp", alt: "AI packaging concept: SOOYAN serum, cream and pump bottles with a blush and ivory carton, champagne finishes and pale stone staging", isAiConcept: true };

function Visual({ data, visibility }: { data: HeroImageData | null; visibility?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const image = data && data.url !== failedSrc ? data : fallback;
  return <>
    <Image src={image.url} alt={image.alt} fill preload unoptimized sizes="100vw" className={`${styles.image} ${visibility ?? ""}`}
      onError={() => { if (image.url !== fallback.url) setFailedSrc(image.url); }} />
    {image.isAiConcept && <figcaption className={`${styles.imageNote} ${visibility ?? ""}`}>AI concept · packaging subject to confirmation</figcaption>}
  </>;
}

export function HeroImage({ desktop, mobile }: { desktop: HeroImageData | null; mobile: HeroImageData | null }) {
  if (!mobile) return <Visual data={desktop} />;
  return <><Visual data={desktop} visibility={styles.desktopVisual} /><Visual data={mobile} visibility={styles.mobileVisual} /></>;
}
