import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/products/ProductPages";
import { b2bProducts } from "@/content";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() { return b2bProducts.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = b2bProducts.find((item) => item.slug === slug); return createMetadata({ title: product?.seo.title ?? "Private Label Product | SOOYAN", description: product?.seo.description, path: `/products/${slug}` }); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = b2bProducts.find((item) => item.slug === slug); if (!product) notFound(); return <ProductDetailPage product={product} />; }
