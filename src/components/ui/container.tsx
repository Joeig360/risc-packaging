import type { ReactNode } from "react";
export function Container({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`mx-auto w-full px-[var(--page-gutter)] ${wide ? "max-w-[var(--container-wide)]" : "max-w-[var(--container-content)]"}`}>{children}</div>;
}
