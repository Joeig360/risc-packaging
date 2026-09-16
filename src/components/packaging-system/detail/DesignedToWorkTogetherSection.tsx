import Image from "next/image";
import type { PackagingSystemDetail } from "@/types/content";

export function DesignedToWorkTogetherSection({ fitSection }: { fitSection: PackagingSystemDetail["fitSection"] }) {
  return <section className="bg-graphite py-16 text-[#fcfbf7] md:py-24"><div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--page-gutter)] md:grid-cols-[1.1fr_.9fr] md:items-center"><Image src={fitSection.image.src} alt={fitSection.image.alt} width={1600} height={1120} sizes="(max-width:767px) 100vw, 55vw" className="aspect-[5/4] w-full object-cover"/><div><p className="text-xs tracking-[.14em] text-[#d9d7ce]">SYSTEM FIT</p><h2 className="mt-4 font-display text-4xl md:text-5xl">{fitSection.title}</h2><p className="mt-5 leading-7 text-[#d9d7ce]">{fitSection.copy}</p><ul className="mt-8 grid gap-3 border-t border-[#62635d] pt-5 sm:grid-cols-2 md:grid-cols-1">{fitSection.points.map((point)=><li key={point} className="text-sm">{point}</li>)}</ul></div></div></section>;
}
