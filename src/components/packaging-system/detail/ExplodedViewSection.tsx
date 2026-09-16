import Image from "next/image";
import type { PackagingSystemDetail } from "@/types/content";

export function ExplodedViewSection({ explodedView }: { explodedView: PackagingSystemDetail["explodedView"] }) {
  return <section className="py-16 md:py-24"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><div className="max-w-2xl"><p className="text-xs tracking-[.14em] text-slate">SYSTEM RELATIONSHIPS</p><h2 className="mt-4 font-display text-4xl md:text-5xl">From Components to a Complete System</h2><p className="mt-5 text-slate">{explodedView.copy}</p></div><Image src={explodedView.image.src} alt={explodedView.image.alt} width={1800} height={1300} sizes="(max-width:767px) 100vw, 90vw" className="mt-9 aspect-[16/10] w-full object-cover"/><ol className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-xs tracking-[.08em] text-slate">{explodedView.sequence.map((item,index)=><li key={item} className="flex items-center gap-3"><span>{item}</span>{index < explodedView.sequence.length - 1 && <span aria-hidden="true">→</span>}</li>)}</ol></div></section>;
}
