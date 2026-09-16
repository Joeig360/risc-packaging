import Link from "next/link";
import type { PackagingSystem } from "@/types/content";
import { ImageFrame } from "@/components/ui/image-frame";
export function PackagingSystemCard({ system }: { system: PackagingSystem }) {
  return <Link href={`/packaging-systems/${system.slug}`} className="group block"><ImageFrame image={system.heroImage} ratio="landscape" /><p className="mt-4 text-[0.68rem] tracking-[0.12em] text-slate">{system.code} / {system.category.toUpperCase()}</p><h3 className="mt-1 font-display text-2xl group-hover:text-accent">{system.name}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate">{system.shortDescription}</p></Link>;
}
