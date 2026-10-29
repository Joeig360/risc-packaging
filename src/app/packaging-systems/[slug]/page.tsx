import { notFound } from "next/navigation";
import { CustomizationSection } from "@/components/packaging-system/detail/CustomizationSection";
import { DesignedToWorkTogetherSection } from "@/components/packaging-system/detail/DesignedToWorkTogetherSection";
import { ExplodedViewSection } from "@/components/packaging-system/detail/ExplodedViewSection";
import { PackagingSystemCapabilitiesSection } from "@/components/packaging-system/detail/PackagingSystemCapabilitiesSection";
import { PackagingSystemCTA } from "@/components/packaging-system/detail/PackagingSystemCTA";
import { PackagingSystemHero } from "@/components/packaging-system/detail/PackagingSystemHero";
import { RelatedSystemsSection } from "@/components/packaging-system/detail/RelatedSystemsSection";
import { StartWithWhatYouHaveSection } from "@/components/packaging-system/detail/StartWithWhatYouHaveSection";
import { SystemComponentsSection } from "@/components/packaging-system/detail/SystemComponentsSection";
import { SystemOverviewSection } from "@/components/packaging-system/detail/SystemOverviewSection";
import { PageIntro } from "@/components/layouts/page-intro";
import { CtaBlock } from "@/components/shared/cta-block";
import { Section } from "@/components/ui/section";
import { packagingSystems } from "@/content";
import { createMetadata } from "@/lib/seo";
export function generateStaticParams() { return packagingSystems.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const system = packagingSystems.find((item) => item.slug === slug); return createMetadata({ title: system?.detail?.seo.title ?? system?.name ?? "Packaging System", description: system?.detail?.seo.description ?? system?.shortDescription, path: `/packaging-systems/${slug}` }); }
export default async function PackagingSystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = packagingSystems.find((item) => item.slug === slug);
  if (!system) notFound();
  const detail = system.detail;

  if (!detail) return <><PageIntro eyebrow={`${system.code} / Packaging System`} title={system.name} description={system.shortDescription} /><Section><h2 className="font-display text-3xl">System components</h2><ul className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">{system.components.map((component) => <li className="text-sm text-slate" key={component}>{component}</li>)}</ul></Section><CtaBlock /></>;

  const relatedSystems = packagingSystems.filter((item) => detail.relatedSystems.includes(item.slug));
  return <><PackagingSystemHero name={system.name} code={system.code} slug={system.slug} detail={detail}/><SystemOverviewSection overview={detail.overview}/><SystemComponentsSection components={detail.components} image={detail.fitSection.image}/><ExplodedViewSection explodedView={detail.explodedView}/><DesignedToWorkTogetherSection fitSection={detail.fitSection}/><CustomizationSection groups={detail.customizationGroups}/><PackagingSystemCapabilitiesSection system={system} managementItems={detail.managementItems}/><RelatedSystemsSection systems={relatedSystems}/><StartWithWhatYouHaveSection options={detail.startOptions}/><PackagingSystemCTA name={system.name} code={system.code} slug={system.slug}/></>;
}
