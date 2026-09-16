import type { Product } from "@/types/content";
import { ImageFrame } from "@/components/ui/image-frame";
export function FeaturedProductCard({ product }: { product: Product }) { return <article><ImageFrame image={product.images[0]} /><h3 className="mt-4 font-display text-2xl">{product.name}</h3><p className="mt-2 text-sm leading-6 text-slate">{product.shortDescription}</p></article>; }
