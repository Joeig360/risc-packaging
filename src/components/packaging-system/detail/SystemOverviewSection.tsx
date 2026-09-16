import type { PackagingSystemDetail } from "@/types/content";

export function SystemOverviewSection({ overview }: { overview: PackagingSystemDetail["overview"] }) {
  return <section id="system-overview" className="py-16 md:py-24"><div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--page-gutter)] md:grid-cols-[.9fr_1.1fr]"><div><p className="text-xs tracking-[.14em] text-slate">SYSTEM OVERVIEW</p><h2 className="mt-4 font-display text-4xl md:text-5xl">{overview.title}</h2></div><div><p className="max-w-xl text-lg leading-8 text-slate">{overview.copy}</p><ul className="mt-8 grid gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-2">{overview.items.map((item,index)=><li key={item} className="flex gap-3 text-sm"><span className="text-xs text-slate">0{index + 1}</span><span>{item}</span></li>)}</ul></div></div></section>;
}
