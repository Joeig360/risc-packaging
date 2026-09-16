import { PackagingSystemCard } from "@/components/cards/packaging-system-card";
import { PageIntro } from "@/components/layouts/page-intro";
import { Section } from "@/components/ui/section";
import { packagingSystems } from "@/content";
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ title: "Packaging Systems", description: "Coordinated packaging systems designed to work together.", path: "/packaging-systems" });
export default function PackagingSystemsPage() { return <><PageIntro eyebrow="Packaging systems" title="Designed to work together." description="A reusable route structure for packaging systems that combine components, fit verification, and coordinated sourcing." /><Section><div className="grid gap-x-6 gap-y-12 md:grid-cols-2">{packagingSystems.map((system) => <PackagingSystemCard key={system.slug} system={system} />)}</div></Section></>; }
