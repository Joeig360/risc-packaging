import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "quiet" };
export function Button({ variant = "primary", className = "", style, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-5 py-3 text-[13px] font-semibold tracking-[0.13em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles = variant === "primary" ? "bg-graphite text-ivory hover:bg-[#35342f]" : "border border-graphite text-graphite hover:border-accent hover:bg-ivory";
  return <Link className={`${base} ${styles} ${className}`} style={variant === "primary" ? { ...style, color: "#f5f1e8" } : style} {...props} />;
}
