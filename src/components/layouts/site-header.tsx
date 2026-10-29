import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
export function SiteHeader() { return <header className="border-b border-line bg-paper"><div className="mx-auto flex min-h-20 max-w-[var(--container-wide)] items-center justify-between px-[var(--page-gutter)]"><Link href="/" aria-label="SOOYAN home" className="font-display text-[1.35rem] tracking-[0.16em] md:text-[1.5rem]">SOOYAN</Link><DesktopNavigation /><div className="flex items-center gap-4"><Button href="/start-a-project" className="hidden sm:inline-flex max-[359px]:px-1">START A PROJECT</Button><MobileNavigation /></div></div></header>; }
