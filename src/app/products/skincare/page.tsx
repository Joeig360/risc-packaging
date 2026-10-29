import { ProductCatalog } from "@/components/products/ProductCatalog";
import { b2bProducts } from "@/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Skincare Products for Private Label | SOOYAN", description: "Discover skincare product directions for private label, custom packaging and coordinated project development.", path: "/products/skincare" });

export default function ProductsSkincarePage() {
  const products = b2bProducts.filter((product) => product.collection === "skincare" || product.collection === "hair-scalp" || product.collection === "eye-lash");
  return <><section className="bg-graphite py-14 text-paper"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-silver">SKINCARE PRODUCTS</p><h1 className="mt-4 max-w-3xl font-display text-5xl leading-[.95] md:text-6xl">Private-label product directions for considered skincare collections.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#d9d7ce]">Explore a focused edit of serums, ampoules, creams, masks, mists and pads. Each product can be developed with label and packaging coordination.</p></div></section><ProductCatalog products={products} /><section className="bg-ivory py-16"><div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-2"><div><p className="text-xs tracking-[.16em] text-slate">PACKAGING INTEGRATION</p><h2 className="mt-4 font-display text-4xl">Pair the formula with the packaging direction.</h2></div><p className="max-w-xl text-base leading-7 text-slate">Coordinate bottles, airless formats, jars, cartons and decoration as part of one product-development conversation.</p></div></section></>;
}
