import Link from "next/link";
import type { ComponentProps } from "react";
export function TextLink({ className = "", ...props }: ComponentProps<typeof Link>) { return <Link className={`text-xs font-semibold tracking-[0.1em] text-graphite underline-offset-4 hover:underline ${className}`} {...props} />; }
