"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./hero-v3.module.css";

const fallback = "/images/home/sooyan-hero-v3-concept.webp";

export function HeroImage({ src }: { src: string | null }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const image = src && src !== failedSrc ? src : fallback;
  return <Image src={image} alt={image === fallback
    ? "AI packaging concept: SOOYAN serum, cream and pump bottles with a blush and ivory carton, champagne finishes and pale stone staging"
    : "SOOYAN homepage visual"}
    fill preload unoptimized sizes="100vw" className={styles.image}
    onError={() => { if (image !== fallback) setFailedSrc(image); }} />;
}
