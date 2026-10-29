import Link from "next/link";
import Image from "next/image";
import type { PackagingSystem } from "@/types/content";

export function PackagingSystemCard({ system }: { system: PackagingSystem }) {
  const isLeadSystem = system.code === "P01";
  return <Link href={`/packaging-systems/${system.slug}`} className="group block" data-catalog-card><div className={`relative overflow-hidden bg-ivory ${isLeadSystem ? "aspect-[4/3] md:aspect-[16/7]" : "aspect-[4/3]"}`}>{system.heroImage ? <Image src={system.heroImage.src} alt={system.heroImage.alt} fill loading={isLeadSystem ? "eager" : "lazy"} sizes={isLeadSystem ? "(max-width:767px) 100vw, 90vw" : "(max-width:767px) 100vw, 45vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" /> : null}</div><p className="mt-5 text-[0.68rem] tracking-[0.12em] text-slate">{system.code} / {system.category.toUpperCase()}</p><h3 className="mt-2 font-display text-2xl group-hover:text-accent">{system.name}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-slate">{system.shortDescription}</p></Link>;
}
