import Link from "next/link";
import type { Project } from "@/types/content";
export function ProjectCard({ project }: { project: Project }) { return <Link href={`/projects/${project.slug}`} className="block border-t border-line py-7"><p className="text-xs tracking-[0.12em] text-slate">{project.status.toUpperCase()}</p><h3 className="mt-2 font-display text-3xl">{project.title}</h3><p className="mt-3 text-sm text-slate">{project.challenge}</p></Link>; }
