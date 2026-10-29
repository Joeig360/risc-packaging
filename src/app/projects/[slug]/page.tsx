import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layouts/page-intro";
import { Section } from "@/components/ui/section";
import { projects } from "@/content";
import { createMetadata } from "@/lib/seo";
// Keep the internal template source, but exclude its route from public rendering.
const publicProjects = projects.filter(({ slug }) => slug !== "concept-project-template");
export function generateStaticParams() { return publicProjects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = publicProjects.find((item) => item.slug === slug); if (!project) notFound(); return createMetadata({ title: project.title, description: project.challenge, path: `/projects/${slug}` }); }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = publicProjects.find((item) => item.slug === slug); if (!project) notFound(); return <><PageIntro eyebrow="Packaging project" title={project.title} description={project.challenge} /><Section><p className="text-sm leading-6 text-slate">{project.solution}</p></Section></>; }
