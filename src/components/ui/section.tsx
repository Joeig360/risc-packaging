import type { ReactNode } from "react";
import { Container } from "./container";
export function Section({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <section className="py-[var(--space-section)]"><Container wide={wide}>{children}</Container></section>;
}
