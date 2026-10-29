import { ProductCollectionPage } from "@/components/products/ProductCollectionPage";
import { getCatalogCollectionProducts } from "@/content/catalog-products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Hair & Scalp Products for Private Label | SOOYAN",
  description: "Explore currently available scalp-care product directions for private label and coordinated packaging development.",
  path: "/products/hair-scalp",
});

export default function ProductsHairScalpPage() {
  return <ProductCollectionPage
    eyebrow="HAIR & SCALP PRODUCTS"
    title="Scalp-care product directions for a considered hair program."
    description="Explore currently approved scalp spray and serum directions for private label, packaging customization and coordinated project development."
    products={getCatalogCollectionProducts("hair-scalp")}
  />;
}
