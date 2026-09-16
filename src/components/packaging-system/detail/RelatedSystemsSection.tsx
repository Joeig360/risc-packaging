import Image from "next/image";
import Link from "next/link";
import type { PackagingSystem } from "@/types/content";

export function RelatedSystemsSection({ systems }: { systems: PackagingSystem[] }) {
  return <section className="py-16 md:py-24"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.14em] text-slate">CONTINUE EXPLORING</p><h2 className="mt-4 font-display text-4xl md:text-5xl">Related Packaging Systems</h2><div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">{systems.map((system)=><Link key={system.slug} href={`/packaging-systems/${system.slug}`} className="group min-w-[78vw] snap-start md:min-w-0">{system.heroImage && <Image src={system.heroImage.src} alt={system.heroImage.alt} width={1200} height={800} sizes="(max-width:767px) 78vw, 33vw" className="aspect-[4/3] w-full object-cover"/>}<p className="mt-3 text-xs tracking-[.1em] text-slate">{system.code}</p><h3 className="mt-2 font-display text-2xl group-hover:text-accent">{system.name}</h3></Link>)}</div></div></section>;
}
