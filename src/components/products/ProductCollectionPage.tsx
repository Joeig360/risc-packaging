import { ProductCatalog } from "@/components/products/ProductCatalog";
import type { B2BProduct } from "@/types/content";

type ProductCollectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: B2BProduct[];
};

export function ProductCollectionPage({ eyebrow, title, description, products }: ProductCollectionPageProps) {
  return <>
    <section className="bg-graphite py-14 text-paper">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
        <p className="text-xs tracking-[.16em] text-silver">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[.95] md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#d9d7ce]">{description}</p>
      </div>
    </section>
    <ProductCatalog products={products} />
  </>;
}
