import Link from "next/link";
import { navigationLinks } from "./navigation-links";
export function DesktopNavigation() { return <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">{navigationLinks.map((link) => <Link className="text-xs font-semibold tracking-[0.08em] text-slate hover:text-graphite" key={link.href} href={link.href}>{link.label.toUpperCase()}</Link>)}</nav>; }
