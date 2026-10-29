import { ProductsHub } from "@/components/products/ProductsHub";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Skincare & Peptide Products | SOOYAN", description: "Ready-to-develop skincare and peptide products for private label, packaging customization and coordinated project development.", path: "/products" });

export default function ProductsPage() { return <ProductsHub />; }
