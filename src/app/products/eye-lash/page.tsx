import { ProductCollectionPage } from "@/components/products/ProductCollectionPage";
import { getCatalogCollectionProducts } from "@/content/catalog-products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Eye & Lash Products for Private Label | SOOYAN",
  description: "Explore currently available eye and lash-care product directions for private label and coordinated packaging development.",
  path: "/products/eye-lash",
});

export default function ProductsEyeLashPage() {
  return <ProductCollectionPage
    eyebrow="EYE & LASH PRODUCTS"
    title="Targeted product directions for eye and lash care."
    description="Explore currently approved eye-serum and lash-care directions for private label, packaging customization and coordinated project development."
    products={getCatalogCollectionProducts("eye-lash")}
  />;
}
