import { notFound } from "next/navigation";
import { SkincareProductDetailPage } from "@/components/skincare-products/product-pages";
import { skincareProducts } from "@/content";
import { createMetadata } from "@/lib/seo";
export function generateStaticParams() { return skincareProducts.map(product => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = skincareProducts.find(item => item.slug === slug); return createMetadata({ title: product?.seo.title ?? "Skincare Product", description: product?.seo.description, path: `/skincare-products/${slug}` }); }
export default async function SkincareProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = skincareProducts.find(item => item.slug === slug); if (!product) notFound(); return <SkincareProductDetailPage product={product}/>; }
