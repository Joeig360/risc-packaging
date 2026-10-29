"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PackagingSystemCard } from "@/components/cards/packaging-system-card";
import type { PackagingSystem } from "@/types/content";
import { B2BFilterPanel, type CatalogFilterGroup } from "./B2BFilterPanel";

const packagingTypeOrder = ["Boxes & Cartons", "Vial Packaging", "Bottle Packaging", "Jar Packaging", "Airless Packaging", "Dropper Packaging", "Tube Packaging", "Kits & Sets", "Inserts & Trays"];
const applicationOrder = ["Peptides", "Skincare", "Serums", "Creams", "Masks", "Professional / Clinic", "Treatment Kits"];
const systemFormatOrder = ["Primary Packaging", "Secondary Packaging", "Complete Packaging System", "Multi-Component Kit", "Custom Insert System"];
const sortOptions = [{ value: "featured", label: "Featured" }, { value: "type", label: "Packaging Type" }, { value: "application", label: "Application" }];

type FilterKey = "type" | "application" | "system";
type Selected = Record<FilterKey, string[]>;
const emptySelected = (): Selected => ({ type: [], application: [], system: [] });

function valuesFromParams(searchParams: URLSearchParams): Selected {
  return (Object.keys(emptySelected()) as FilterKey[]).reduce((selected, key) => ({ ...selected, [key]: searchParams.get(key)?.split(",").filter(Boolean) ?? [] }), emptySelected());
}

function systemValues(system: PackagingSystem, key: FilterKey) {
  const taxonomy = system.taxonomy;
  if (!taxonomy) return [];
  return key === "type" ? taxonomy.packagingTypes : key === "application" ? taxonomy.applications : taxonomy.systemFormats;
}

function matches(system: PackagingSystem, selected: Selected, omittedKey?: FilterKey) {
  return (Object.keys(selected) as FilterKey[]).every((key) => key === omittedKey || !selected[key].length || selected[key].some((value) => systemValues(system, key).includes(value)));
}

function buildGroups(systems: PackagingSystem[]): CatalogFilterGroup[] {
  const definitions: { key: FilterKey; label: string; order: string[] }[] = [
    { key: "type", label: "PACKAGING TYPE", order: packagingTypeOrder },
    { key: "application", label: "APPLICATION", order: applicationOrder },
    { key: "system", label: "SYSTEM FORMAT", order: systemFormatOrder },
  ];
  return definitions.map((definition) => ({
    key: definition.key,
    label: definition.label,
    options: definition.order.filter((value) => systems.some((system) => systemValues(system, definition.key).includes(value))).map((value) => ({
      value,
      count: systems.filter((system) => systemValues(system, definition.key).includes(value)).length,
    })),
  }));
}

function sortedSystems(systems: PackagingSystem[], sort: string) {
  return [...systems].sort((a, b) => {
    if (sort === "type") return (a.taxonomy?.packagingTypes[0] ?? "").localeCompare(b.taxonomy?.packagingTypes[0] ?? "") || a.name.localeCompare(b.name);
    if (sort === "application") return (a.taxonomy?.applications[0] ?? "").localeCompare(b.taxonomy?.applications[0] ?? "") || a.name.localeCompare(b.name);
    return Number(b.featured) - Number(a.featured) || a.code.localeCompare(b.code);
  });
}

export function PackagingSystemCatalog({ systems }: { systems: PackagingSystem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const selected = valuesFromParams(searchParams);
  const sort = searchParams.get("sort") ?? "featured";
  const results = sortedSystems(systems.filter((system) => matches(system, selected)), sort);
  const groups = buildGroups(systems);

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

  return <section className="py-[var(--space-section)]">
    <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <B2BFilterPanel groups={groups} isOpen={isFilterOpen} onClear={() => update(emptySelected())} onSort={(value) => update(selected, value)} onToggle={toggle} resultCount={results.length} selected={selected} setOpen={setFilterOpen} sort={sort} sortOptions={sortOptions} />
        <div>
          <div className="flex items-end justify-between gap-4 border-b border-line pb-5"><div><p className="text-xs tracking-[.16em] text-slate">PACKAGING SYSTEMS</p><h2 className="mt-3 font-display text-4xl">Explore coordinated systems.</h2></div><p aria-live="polite" className="hidden text-sm text-slate sm:block">{results.length} {results.length === 1 ? "system" : "systems"}</p></div>
          {results.length ? <div className="mt-8 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-24">{results.map((system) => <PackagingSystemCard key={system.slug} system={system} />)}</div> : <div className="mt-8 border-y border-line py-14"><p className="font-display text-3xl">No current system matches these filters.</p><button className="mt-5 text-xs font-semibold tracking-[.13em] underline decoration-line underline-offset-4" onClick={() => update(emptySelected())} type="button">CLEAR FILTERS</button></div>}
        </div>
      </div>
    </div>
  </section>;
}
