import Link from "next/link";
import { Suspense } from "react";
import { SkincareProductCatalog } from "@/components/catalog/SkincareProductCatalog";
import { skincareCollections, skincareProducts } from "@/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Custom Skincare Product Collections", description: "Explore expandable skincare product collections and customizable product directions.", path: "/skincare-products" });

export default function SkincareProductsPage() {
  const activeCollections = skincareCollections.filter((collection) => ["peptides", "ghk-cu-copper-peptide", "pdrn", "barrier-repair"].includes(collection.slug));

  return <>
    <section className="bg-graphite py-20 text-paper"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-silver">ADVANCED SKINCARE DEVELOPMENT</p><h1 className="mt-5 max-w-4xl font-display text-5xl leading-[.95] md:text-7xl">Advanced Skincare Development</h1><p className="mt-6 max-w-2xl text-[#d9d7ce]">From trending actives to market-ready skincare collections.</p><p className="mt-3 text-xs tracking-[.12em] text-silver">SOOYAN — skincare development, private label and packaging solutions.</p><p className="mt-6 text-sm tracking-[.1em] text-silver">PEPTIDES · PDRN · GHK-CU · BARRIER CARE · ADVANCED TREATMENT SYSTEMS</p></div></section>
    <section className="border-b border-line py-10"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-slate">START WITH AN ACTIVE</p><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{activeCollections.map((collection) => <Link className="border-t border-line pt-4 font-display text-3xl transition-colors hover:text-accent" href={`/skincare-products/collections/${collection.slug}`} key={collection.slug}>{collection.name}</Link>)}</div></div></section>
    <main><Suspense fallback={<section className="py-[var(--space-section)]" />}><SkincareProductCatalog compactTop products={skincareProducts} /></Suspense></main>
  </>;
}
