"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { B2BProduct } from "@/types/content";

const filterGroups = [
  { key: "format", label: "PRODUCT TYPE", values: ["Serum", "Ampoule", "Cream", "Mask", "Mist", "Pads", "Balm", "Cleanser", "Soap", "Body Care", "Scalp Care", "Eye Care"] },
] as const;

type FilterKey = (typeof filterGroups)[number]["key"];
type Selected = Record<FilterKey, string[]>;
const blankSelected = (): Selected => ({ format: [] });

function productType(product: B2BProduct) {
  const format = product.format.toLowerCase();
  if (product.collection === "hair-scalp" || format.includes("scalp") || format.includes("shampoo") || format.includes("conditioner")) return "Scalp Care";
  if (product.collection === "eye-lash" || product.category === "Eye Care" || format.includes("eye") || format.includes("lash")) return "Eye Care";
  if (format.includes("body")) return "Body Care";
  if (format.includes("ampoule")) return "Ampoule";
  if (format.includes("cream")) return "Cream";
  if (format.includes("mask")) return "Mask";
  if (format.includes("mist") || format.includes("spray")) return "Mist";
  if (format.includes("pad")) return "Pads";
  if (format.includes("balm")) return "Balm";
  if (format.includes("soap")) return "Soap";
  if (format.includes("wash") || format.includes("mousse") || format.includes("remover")) return "Cleanser";
  return "Serum";
}

function matches(product: B2BProduct, selected: Selected) {
  return (!selected.format.length || selected.format.includes(productType(product)));
}

export function ProductCard({ product, compact = false }: { product: B2BProduct; compact?: boolean }) {
  return <article className={`group border-t border-line pt-4 ${compact ? "flex h-full min-w-0 flex-col" : ""}`} data-product-card={product.slug}>
    <Link href={`/products/${product.slug}`} className={compact ? "flex h-full min-w-0 flex-col" : "block"}>
      <div className={`relative overflow-hidden bg-ivory ${compact ? "aspect-square" : "aspect-[4/5]"}`}>
        <Image src={product.heroImage.src} alt={product.heroImage.alt} fill sizes="(max-width:639px) 48vw, (max-width:1023px) 32vw, 24vw" className={`${compact ? "object-contain p-3 sm:p-4" : "object-cover"} transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.025]`} />
      </div>
      <p className={`mt-4 text-xs tracking-[.13em] text-slate ${compact ? "min-h-10" : ""}`}>{product.format.toUpperCase()} / {product.size}</p>
      <h3 className={`mt-2 font-display leading-tight group-hover:text-accent ${compact ? "text-xl sm:text-2xl" : "text-2xl"}`}>{product.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate">{product.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold tracking-[.1em] text-graphite"><span className="border border-line px-2 py-1">PRIVATE LABEL</span><span className="border border-line px-2 py-1">CUSTOM PACKAGING</span></div>
      <span className={`${compact ? "mt-auto pt-5" : "mt-5"} inline-flex text-xs font-semibold tracking-[.13em] text-graphite underline decoration-line underline-offset-4`}>VIEW PRODUCT</span>
    </Link>
  </article>;
}

function FilterControls({ products, selected, toggle, showCounts = false }: { products: B2BProduct[]; selected: Selected; toggle: (key: FilterKey, value: string) => void; showCounts?: boolean }) {
  return <div className="divide-y divide-line border-y border-line">
    {filterGroups.map((group) => {
      const available = group.values.filter((value) => products.some((product) => productType(product) === value));
      return <fieldset className="py-5" key={group.key}>
        <legend className="text-xs font-semibold tracking-[.14em] text-graphite">{group.label}</legend>
        <div className="mt-3 grid gap-3">
          {available.map((value) => <label className={`flex cursor-pointer items-center gap-2.5 text-sm text-slate ${showCounts ? "min-h-11" : ""}`} key={value}>
            <input checked={selected[group.key].includes(value)} className="h-3.5 w-3.5 accent-graphite" onChange={() => toggle(group.key, value)} type="checkbox" />
            <span>{value}</span>{showCounts ? <span className="ml-auto tabular-nums">{products.filter((product) => productType(product) === value).length}</span> : null}
          </label>)}
        </div>
      </fieldset>;
    })}
  </div>;
}

export function ProductCatalog({ products, browseMode = false }: { products: B2BProduct[]; browseMode?: boolean }) {
  const [visibleCount, setVisibleCount] = useState(12);
  const [selected, setSelected] = useState<Selected>(blankSelected);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const results = useMemo(() => products.filter((product) => matches(product, selected)), [products, selected]);
  const activeCount = Object.values(selected).flat().length;
  const toggle = (key: FilterKey, value: string) => {
    setVisibleCount(12);
    setSelected((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  };
  const clear = () => { setSelected(blankSelected()); setVisibleCount(12); };
  const visibleResults = browseMode ? results.slice(0, visibleCount) : results;

  return <section className={browseMode ? "py-8 md:py-10" : "py-[var(--space-section)]"}>
    <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
      <div className={`mb-8 flex items-end justify-between gap-4 border-b border-line pb-5 lg:hidden ${browseMode ? "sticky top-0 z-20 bg-paper py-4" : ""}`}><div><p className="text-xs tracking-[.16em] text-slate">PRODUCT DISCOVERY</p><h2 className="mt-3 font-display text-4xl">{browseMode ? "Browse products." : "Explore the edit."}</h2>{browseMode ? <p className="mt-2 text-sm text-slate" role="status">{results.length} products{activeCount ? ` · ${selected.format.join(", ")}` : ""}</p> : null}</div><button onClick={() => setFiltersOpen(true)} aria-haspopup="dialog" className="min-h-11 shrink-0 border border-line px-4 text-xs font-semibold" type="button">FILTER{activeCount ? ` (${activeCount})` : ""}</button></div>
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <aside className="sticky top-24 hidden self-start lg:block" aria-label="Product filters"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[.16em] text-graphite">FILTER PRODUCTS</p><p className="mt-2 text-xs tracking-[.1em] text-slate">{results.length} PRODUCTS</p></div><button className="text-[11px] tracking-[.1em] text-slate underline decoration-line underline-offset-4" onClick={clear} type="button">CLEAR</button></div><div className="mt-7"><FilterControls products={products} selected={selected} toggle={toggle} showCounts={browseMode} /></div></aside>
        <div className="min-w-0"><div className="hidden items-end justify-between border-b border-line pb-5 lg:flex"><div><p className="text-xs tracking-[.16em] text-slate">PRODUCT DISCOVERY</p><h2 className="mt-3 font-display text-4xl">{browseMode ? "Browse all products." : "Explore the current product edit."}</h2></div><p className="shrink-0 text-sm text-slate" role="status">{results.length} {results.length === 1 ? "product" : "products"}</p></div>{results.length ? <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-3 xl:grid-cols-4">{visibleResults.map((product) => <ProductCard key={product.slug} product={product} compact={browseMode} />)}</div> : <div className="mt-8 border-y border-line py-14"><p className="font-display text-3xl">No current product direction matches these filters.</p><button className="mt-5 text-xs font-semibold tracking-[.13em] underline decoration-line underline-offset-4" onClick={clear} type="button">CLEAR FILTERS</button></div>}{browseMode && results.length > 0 ? <div className="mt-10 border-t border-line pt-6 text-center"><p className="text-sm text-slate" role="status">Showing {visibleResults.length} of {results.length} products</p>{visibleResults.length < results.length ? <div className="mt-4 flex flex-wrap items-center justify-center gap-4"><button type="button" className="min-h-11 bg-graphite px-6 py-3 text-xs font-semibold tracking-[.1em] text-paper" onClick={() => setVisibleCount((count) => count + 12)}>LOAD MORE PRODUCTS</button><button type="button" className="min-h-11 px-3 text-xs underline underline-offset-4" onClick={() => setVisibleCount(results.length)}>VIEW ALL {results.length} PRODUCTS</button></div> : null}</div> : null}</div>
      </div>
    </div>
    {filtersOpen ? <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Filter products"><button className="absolute inset-0 bg-graphite/35" aria-label="Close filters" onClick={() => setFiltersOpen(false)} type="button" /><section className="absolute inset-x-0 bottom-0 flex h-[100dvh] flex-col bg-paper"><header className="flex items-center justify-between border-b border-line px-[var(--page-gutter)] py-5"><p className="text-xs font-semibold tracking-[.16em]">FILTER PRODUCTS</p><button className="text-xs tracking-[.12em] text-slate underline decoration-line underline-offset-4" onClick={clear} type="button">CLEAR ALL</button></header><div className="min-h-0 flex-1 overflow-y-auto px-[var(--page-gutter)] py-6"><FilterControls products={products} selected={selected} toggle={toggle} showCounts={browseMode} /></div><footer className="border-t border-line p-4"><button className="w-full bg-graphite px-5 py-4 text-[13px] font-semibold tracking-[.14em] text-paper" onClick={() => setFiltersOpen(false)} type="button">SHOW {results.length} PRODUCTS</button></footer></section></div> : null}
  </section>;
}
