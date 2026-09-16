import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PackagingSystemDetail } from "@/types/content";

export function PackagingSystemHero({ name, detail }: { name: string; detail: PackagingSystemDetail }) {
  return <section className="bg-graphite py-14 text-[#fcfbf7] md:py-20"><div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--page-gutter)] md:grid-cols-[.8fr_1.2fr] md:items-center"><div><p className="text-xs tracking-[.15em] text-[#d9d7ce]">{detail.eyebrow}</p><h1 className="mt-5 font-display text-5xl leading-[.92] md:text-7xl">{detail.heroTitle ?? name.replace(" System", "")}</h1><p className="mt-6 max-w-xl text-base leading-7 text-[#d9d7ce]">{detail.heroCopy}</p><p className="mt-6 text-xs tracking-[.12em] text-[#d9d7ce]">{detail.heroStatement}</p><div className="mt-8 flex flex-wrap gap-3"><Button href="/start-a-project">START A PROJECT</Button><Link href="#system-overview" className="border border-[#d9d7ce] px-5 py-3 text-xs font-semibold tracking-[.1em]">EXPLORE THE SYSTEM</Link></div></div><Image src={detail.heroImage.src} alt={detail.heroImage.alt} width={1600} height={1120} priority sizes="(max-width:767px) 100vw, 58vw" className="aspect-[5/4] w-full object-cover"/></div></section>;
}
