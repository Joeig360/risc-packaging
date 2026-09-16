import Link from "next/link";
import type { ProductCategory } from "@/types/content";
import { ImageFrame } from "@/components/ui/image-frame";
export function CategoryCard({ category, available = true }: { category: ProductCategory; available?: boolean }) {
  const content = <><ImageFrame image={category.image} ratio="portrait" /><p className="mt-4 text-[0.68rem] tracking-[0.12em] text-slate uppercase">{category.application.replace("-", " ")}</p><h3 className="mt-1 font-display text-2xl group-hover:text-accent">{category.name}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-slate">{category.shortDescription}</p>{!available && <p className="mt-3 text-[0.68rem] tracking-[0.12em] text-slate uppercase">Coming next</p>}</>;
  if (!available) return <article className="block">{content}</article>;
  return <Link href={`/components/${category.slug}`} className="group block">{content}</Link>;
}
