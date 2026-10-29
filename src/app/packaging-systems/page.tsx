import { PackagingSystemCatalog } from "@/components/catalog/PackagingSystemCatalog";
import { PageIntro } from "@/components/layouts/page-intro";
import { packagingSystems } from "@/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Packaging Systems", description: "Coordinated packaging systems designed to work together.", path: "/packaging-systems" });

export default function PackagingSystemsPage() {
  return <><PageIntro eyebrow="Packaging systems" title="Designed to work together." description="A reusable route structure for packaging systems that combine components, fit verification, and coordinated sourcing." /><Suspense fallback={<section className="py-[var(--space-section)]" />}><PackagingSystemCatalog systems={packagingSystems} /></Suspense></>;
}
import { Suspense } from "react";
