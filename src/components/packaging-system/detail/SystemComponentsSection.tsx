import Image from "next/image";
import type { ImageAsset, PackagingSystemComponent } from "@/types/content";

export function SystemComponentsSection({ components, image }: { components: PackagingSystemComponent[]; image: ImageAsset }) {
  return <section className="bg-ivory py-16 md:py-24"><div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--page-gutter)] lg:grid-cols-[.85fr_1.15fr]"><div><p className="text-xs tracking-[.14em] text-slate">P01 / COMPONENTS</p><h2 className="mt-4 font-display text-4xl md:text-5xl">The System Components</h2><Image src={image.src} alt={image.alt} width={1400} height={1000} sizes="(max-width:1023px) 100vw, 40vw" className="mt-8 aspect-[5/4] w-full object-cover"/></div><div className="grid content-end gap-x-8 gap-y-6 sm:grid-cols-2">{components.map((component,index)=><article key={component.name} className="border-t border-line pt-4"><p className="text-xs text-slate">0{index + 1}</p><h3 className="mt-2 font-display text-2xl">{component.name}</h3><p className="mt-2 text-sm leading-6 text-slate">{component.description}</p></article>)}</div></div></section>;
}
