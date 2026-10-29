import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getCatalogCollectionProducts } from "@/content/catalog-products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Peptide Skincare Products | SOOYAN", description: "Explore peptide-led product formats for private label, packaging customization and coordinated skincare project development.", path: "/products/peptides" });

export default function ProductsPeptidesPage() {
  const products = getCatalogCollectionProducts("peptides");
  return <><section className="bg-graphite py-14 text-paper"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-silver">PEPTIDE PRODUCTS</p><h1 className="mt-4 max-w-3xl font-display text-5xl leading-[.95] md:text-6xl">Peptide product formats for a more focused collection brief.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#d9d7ce]">Explore copper peptide, PDRN and advanced peptide directions across serum, ampoule, cream, eye and scalp-care formats.</p></div></section><ProductCatalog products={products} /></>;
}
