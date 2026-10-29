"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { SkincareProduct } from "@/types/content";
import { B2BFilterPanel, type CatalogFilterGroup } from "./B2BFilterPanel";

const formatOrder = ["Serum", "Ampoule", "Cream", "Eye Care", "Lip Care", "Mask", "Hydrogel Mask", "Hair & Scalp"];
const sortOptions = [{ value: "featured", label: "Featured" }, { value: "newest", label: "Newest" }, { value: "type", label: "Product Type" }];

type FilterKey = "format";
type Selected = Record<FilterKey, string[]>;
const emptySelected = (): Selected => ({ format: [] });

function valuesFromParams(searchParams: URLSearchParams): Selected {
  return (Object.keys(emptySelected()) as FilterKey[]).reduce((selected, key) => ({ ...selected, [key]: searchParams.get(key)?.split(",").filter(Boolean) ?? [] }), emptySelected());
}

function productValues(product: SkincareProduct) {
  const taxonomy = product.taxonomy;
  if (!taxonomy) return [];
  return taxonomy.formats;
}

function matches(product: SkincareProduct, selected: Selected, omittedKey?: FilterKey) {
  return (Object.keys(selected) as FilterKey[]).every((key) => key === omittedKey || !selected[key].length || selected[key].some((value) => productValues(product).includes(value)));
}

function buildGroups(products: SkincareProduct[]): CatalogFilterGroup[] {
  const definitions: { key: FilterKey; label: string; order: string[] }[] = [
    { key: "format", label: "PRODUCT FORMAT", order: formatOrder },
  ];
  return definitions.map((definition) => ({
    key: definition.key,
    label: definition.label,
    options: definition.order.filter((value) => products.some((product) => productValues(product).includes(value))).map((value) => ({
      value,
      count: products.filter((product) => productValues(product).includes(value)).length,
    })),
  }));
}

function sortedProducts(products: SkincareProduct[], sort: string) {
  return [...products].sort((a, b) => {
    if (sort === "type") return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    if (sort === "featured") return Number(b.hero) - Number(a.hero) || Number(b.trending) - Number(a.trending) || a.name.localeCompare(b.name);
    return 0;
  });
}

function ProductCard({ product }: { product: SkincareProduct }) {
  const image = product.image.cleanHero ?? { src: product.image.hero, alt: product.image.heroAlt ?? `${product.name} concept visual` };
  return <Link className="group block" data-catalog-card href={`/skincare-products/${product.slug}`}>
    <div className="relative aspect-[4/5] overflow-hidden bg-ivory"><Image alt={image.alt} className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" fill sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 33vw" src={image.src} /></div>
    <p className="mt-4 text-xs tracking-[.13em] text-slate">{product.id} / {product.collection.toUpperCase()}</p>
    <h3 className="mt-2 font-display text-2xl group-hover:text-accent">{product.name}</h3>
    <span className="mt-4 inline-block text-xs font-semibold tracking-[.13em] text-graphite underline decoration-line underline-offset-4">EXPLORE PRODUCT</span>
  </Link>;
}

export function SkincareProductCatalog({ products, compactTop = false }: { products: SkincareProduct[]; compactTop?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const selected = valuesFromParams(searchParams);
  const sort = searchParams.get("sort") ?? "featured";
  const filtered = products.filter((product) => matches(product, selected));
  const results = sortedProducts(filtered, sort);
  const groups = buildGroups(products);

  function update(nextSelected: Selected, nextSort = sort) {
    const params = new URLSearchParams();
    (Object.keys(nextSelected) as FilterKey[]).forEach((key) => { if (nextSelected[key].length) params.set(key, nextSelected[key].join(",")); });
    if (nextSort !== "featured") params.set("sort", nextSort);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggle(group: string, value: string) {
    const key = group as FilterKey;
    const values = selected[key].includes(value) ? selected[key].filter((item) => item !== value) : [...selected[key], value];
    update({ ...selected, [key]: values });
  }

  return <section className={compactTop ? "pb-[var(--space-section)] pt-12 md:pt-16" : "py-[var(--space-section)]"}>
    <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <B2BFilterPanel groups={groups} isOpen={isFilterOpen} onClear={() => update(emptySelected())} onSort={(value) => update(selected, value)} onToggle={toggle} resultCount={results.length} selected={selected} setOpen={setFilterOpen} sort={sort} sortOptions={sortOptions} />
        <div>
          <div className="flex items-end justify-between gap-4 border-b border-line pb-5"><div><p className="text-xs tracking-[.16em] text-slate">PRODUCT DIRECTIONS</p><h2 className="mt-3 font-display text-4xl">Explore the current edit.</h2></div><p aria-live="polite" className="hidden text-sm text-slate sm:block">{results.length} {results.length === 1 ? "product" : "products"}</p></div>
          {results.length ? <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">{results.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="mt-8 border-y border-line py-14"><p className="font-display text-3xl">No current product direction matches these filters.</p><button className="mt-5 text-xs font-semibold tracking-[.13em] underline decoration-line underline-offset-4" onClick={() => update(emptySelected())} type="button">CLEAR FILTERS</button></div>}
        </div>
      </div>
    </div>
  </section>;
}
