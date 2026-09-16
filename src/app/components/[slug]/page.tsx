import { notFound } from "next/navigation";
import { ComponentCategoryPage } from "@/components/components/category-page"; import { componentCategories, productCategories } from "@/content";
import { createMetadata } from "@/lib/seo";
export function generateStaticParams() { return Object.keys(componentCategories).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const category = componentCategories[slug]; return createMetadata({ title: category?.seo.title ?? "Component", description: category?.seo.description, path: `/components/${slug}` }); }
export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!productCategories.some(x=>x.slug===slug)) notFound(); if (!componentCategories[slug]) notFound(); return <ComponentCategoryPage slug={slug}/>; }
