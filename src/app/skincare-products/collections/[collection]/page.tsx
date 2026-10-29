import { notFound } from "next/navigation";
import { SkincareCollectionPage } from "@/components/skincare-products/product-pages";
import { skincareCollections, skincareProducts } from "@/content";
import { createMetadata } from "@/lib/seo";
export function generateStaticParams() { return skincareCollections.filter(collection => skincareProducts.some(product => product.collection === collection.slug)).map(collection => ({ collection: collection.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) { const { collection } = await params; const item = skincareCollections.find(entry => entry.slug === collection); return createMetadata({ title: item ? `${item.name} Skincare Collection` : "Skincare Collection", description: item?.description, path: `/skincare-products/collections/${collection}` }); }
export default async function SkincareCollectionRoute({ params }: { params: Promise<{ collection: string }> }) { const { collection } = await params; if (!skincareCollections.some(item => item.slug === collection)) notFound(); return <SkincareCollectionPage collection={collection}/>; }
