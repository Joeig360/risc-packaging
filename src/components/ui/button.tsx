import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "quiet" };
export function Button({ variant = "primary", className = "", style, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-5 py-3 text-xs font-semibold tracking-[0.13em] transition-colors";
  const styles = variant === "primary" ? "bg-graphite text-[#fcfbf7] hover:bg-accent" : "border border-line text-graphite hover:border-graphite";
  return <Link className={`${base} ${styles} ${className}`} style={variant === "primary" ? { ...style, color: "#fcfbf7" } : style} {...props} />;
}
