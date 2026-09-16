import type { ReactNode } from "react";
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="text-xs font-semibold tracking-[0.14em] text-slate">{children}</p>; }
export function SectionHeading({ children }: { children: ReactNode }) { return <h2 className="font-display text-4xl leading-tight md:text-5xl">{children}</h2>; }
export function Divider() { return <hr className="border-0 border-t border-line" />; }
