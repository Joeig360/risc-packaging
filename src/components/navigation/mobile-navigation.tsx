"use client";

import Link from "next/link";
import { navigationLinks } from "./navigation-links";
export function MobileNavigation() {
  return <details className="relative lg:hidden">
    <summary className="cursor-pointer list-none text-xs font-semibold tracking-[0.1em] text-graphite">MENU</summary>
    <nav className="absolute right-0 top-8 z-10 w-56 border border-line bg-paper p-5 shadow-[var(--shadow-soft)]" aria-label="Mobile navigation" onClick={(event) => {
      if ((event.target as HTMLElement).closest("a")) event.currentTarget.closest("details")?.removeAttribute("open");
    }}>
      {navigationLinks.map((link) => <Link className="block border-b border-line py-3 text-xs font-semibold tracking-[0.1em] text-slate last:border-0" key={link.href} href={link.href}>{link.label.toUpperCase()}</Link>)}
      <Link className="mt-4 block bg-graphite px-4 py-3 text-center text-[13px] font-semibold tracking-[0.1em] text-[#fcfbf7]" href="/start-a-project">START A PROJECT</Link>
    </nav>
  </details>;
}
