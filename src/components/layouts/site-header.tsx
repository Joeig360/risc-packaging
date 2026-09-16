import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
export function SiteHeader() { return <header className="border-b border-line bg-paper"><div className="mx-auto flex min-h-20 max-w-[var(--container-wide)] items-center justify-between px-[var(--page-gutter)]"><Link href="/" className="font-display text-2xl tracking-[0.08em]">RISC<span className="ml-2 font-sans text-[0.6rem] font-semibold tracking-[0.18em]">PACKAGING</span></Link><DesktopNavigation /><div className="flex items-center gap-4"><Button href="/start-a-project" className="hidden sm:inline-flex">START A PROJECT</Button><MobileNavigation /></div></div></header>; }
