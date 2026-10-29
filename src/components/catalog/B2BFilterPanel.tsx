"use client";

import type { Dispatch, SetStateAction } from "react";

export type CatalogFilterGroup = {
  key: string;
  label: string;
  options: { value: string; count: number }[];
};

export type CatalogSortOption = { value: string; label: string };

type FilterPanelProps = {
  groups: CatalogFilterGroup[];
  selected: Record<string, string[]>;
  sort: string;
  sortOptions: CatalogSortOption[];
  resultCount: number;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onToggle: (group: string, value: string) => void;
  onClear: () => void;
  onSort: (value: string) => void;
};

function FilterGroups({ groups, selected, onToggle }: Pick<FilterPanelProps, "groups" | "selected" | "onToggle">) {
  return <div className="divide-y divide-line border-y border-line">
    {groups.map((group) => <fieldset className="py-5" key={group.key}>
      <legend className="text-xs font-semibold tracking-[.15em] text-graphite">{group.label}</legend>
      <div className="mt-3 grid gap-3">
        {group.options.map((option) => {
          const checked = selected[group.key]?.includes(option.value) ?? false;
          if (option.count === 0 && !checked) return null;
          return <label className={`flex cursor-pointer items-center justify-between gap-3 text-sm transition-colors ${checked ? "font-medium text-graphite" : "text-slate hover:text-graphite"}`} key={option.value}>
            <span className="flex items-center gap-2.5"><input aria-label={`${group.label}: ${option.value}`} checked={checked} className="h-3.5 w-3.5 accent-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite" onChange={() => onToggle(group.key, option.value)} type="checkbox" /><span>{option.value}</span></span>
            <span className="text-xs tabular-nums text-slate">{option.count}</span>
          </label>;
        })}
      </div>
    </fieldset>)}
  </div>;
}

export function B2BFilterPanel(props: FilterPanelProps) {
  const activeFilterCount = Object.values(props.selected).flat().length;
  const controls = <>
    <label className="block text-xs font-semibold tracking-[.15em] text-graphite">SORT
      <select aria-label="Sort results" className="mt-3 w-full border-b border-line bg-transparent pb-3 text-sm text-slate outline-none" onChange={(event) => props.onSort(event.target.value)} value={props.sort}>
        {props.sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
    <FilterGroups groups={props.groups} onToggle={props.onToggle} selected={props.selected} />
  </>;

  return <>
    <aside className="sticky top-24 hidden self-start lg:block" aria-label="Catalog filters">
      <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[.16em] text-graphite">FILTER PRODUCTS</p><p aria-live="polite" className="mt-2 text-xs tracking-[.1em] text-slate">{props.resultCount} PRODUCTS</p></div><button className="mt-0.5 text-[11px] tracking-[.1em] text-slate underline decoration-line underline-offset-4 hover:text-graphite" onClick={props.onClear} type="button">CLEAR FILTERS</button></div>
      <div className="mt-7 grid gap-7">{controls}</div>
    </aside>

    <div className="mb-8 flex items-center justify-between border-y border-line py-3 lg:hidden">
      <button className="text-xs font-semibold tracking-[.15em]" onClick={() => props.setOpen(true)} type="button">FILTER{activeFilterCount ? ` (${activeFilterCount})` : ""}</button>
      <label className="flex items-center gap-3 text-xs font-semibold tracking-[.15em]">SORT
        <select aria-label="Sort results" className="bg-transparent text-xs font-normal tracking-normal text-slate outline-none" onChange={(event) => props.onSort(event.target.value)} value={props.sort}>
          {props.sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </div>

    {props.isOpen ? <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-label="Filter products" aria-modal="true">
      <button aria-label="Close filters" className="absolute inset-0 bg-graphite/35" onClick={() => props.setOpen(false)} type="button" />
      <section className="absolute inset-x-0 bottom-0 flex h-[100dvh] flex-col bg-paper shadow-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-line px-[var(--page-gutter)] py-5"><p className="text-xs font-semibold tracking-[.16em] text-graphite">FILTER PRODUCTS</p><button className="text-xs tracking-[.12em] text-slate underline decoration-line underline-offset-4" onClick={props.onClear} type="button">CLEAR ALL</button></header>
        <div className="min-h-0 flex-1 overflow-y-auto px-[var(--page-gutter)] py-6"><div className="grid gap-7">{controls}</div></div>
        <footer className="grid shrink-0 grid-cols-[auto_1fr] gap-3 border-t border-line bg-paper px-[var(--page-gutter)] py-4"><button className="px-2 text-xs tracking-[.12em] text-slate underline decoration-line underline-offset-4" onClick={props.onClear} type="button">CLEAR ALL</button><button className="bg-graphite px-5 py-4 text-[13px] font-semibold tracking-[.14em] text-paper" onClick={() => props.setOpen(false)} type="button">SHOW {props.resultCount} {props.resultCount === 1 ? "PRODUCT" : "PRODUCTS"}</button></footer>
      </section>
    </div> : null}
  </>;
}
