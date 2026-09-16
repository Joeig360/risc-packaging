import type { ImageAsset } from "@/types/content";
import Image from "next/image";
export function ImageFrame({ image, ratio = "portrait" }: { image?: ImageAsset; ratio?: "square" | "portrait" | "landscape" }) {
  const ratioClass = { square: "aspect-square", portrait: "aspect-[4/5]", landscape: "aspect-[16/10]" }[image?.ratio ?? ratio];
  return <div className={`${ratioClass} relative overflow-hidden border border-line bg-ivory`} aria-label={image?.alt ?? "Product image placeholder"}>{image ? <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_50%_35%,#ebe8dd_0%,#d9d7ce_35%,#f5f2ea_70%)]" />}</div>;
}
