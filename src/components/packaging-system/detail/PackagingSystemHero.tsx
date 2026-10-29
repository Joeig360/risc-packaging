import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PackagingSystemDetail } from "@/types/content";
import { inquiryHref } from "@/lib/inquiry-links";

export function PackagingSystemHero({ name, code, slug, detail }: { name: string; code: string; slug: string; detail: PackagingSystemDetail }) {
  return <section className="bg-graphite py-14 text-[#fcfbf7] md:py-20"><div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--page-gutter)] md:grid-cols-[.7fr_1.3fr] md:items-center md:gap-14"><div><p className="text-xs tracking-[.15em] text-[#d9d7ce]">{detail.eyebrow}</p><h1 className="mt-5 font-display text-[2.5rem] leading-[.92] md:text-6xl">{detail.heroTitle ?? name.replace(" System", "")}</h1><p className="mt-6 max-w-xl text-base leading-7 text-[#d9d7ce]">{detail.heroCopy}</p><p className="mt-6 text-xs tracking-[.12em] text-[#d9d7ce]">{detail.heroStatement}</p><div className="mt-8 flex flex-wrap gap-3"><Button href={inquiryHref({ inquiryType: "start-project", productName: name, productCode: code, productSlug: slug, sourceUrl: `/packaging-systems/${slug}` })}>START A PROJECT</Button><Link href="#system-overview" className="border border-[#d9d7ce] px-5 py-3 text-xs font-semibold tracking-[.1em]">EXPLORE THE SYSTEM</Link></div></div><div className="overflow-hidden border border-[#62635d] bg-[#34352f] shadow-[0_24px_70px_rgba(0,0,0,0.24)]"><Image src={detail.heroImage.src} alt={detail.heroImage.alt} width={1600} height={1120} priority sizes="(max-width:767px) 100vw, 62vw" className="aspect-[5/4] w-full object-cover object-center"/></div></div></section>;
}
