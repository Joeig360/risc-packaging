import Link from "next/link";
import { PageIntro } from "@/components/layouts/page-intro";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";
const solutions = [{ href: "/solutions/peptides", name: "Peptide Packaging" }, { href: "/solutions/skincare", name: "Skincare Packaging" }, { href: "/solutions/pharma", name: "Professional Packaging" }];
export const metadata = createMetadata({ title: "Solutions", description: "RISC packaging solutions for peptide, skincare, and professional product programs.", path: "/solutions" });
export default function SolutionsPage() { return <><PageIntro eyebrow="Solutions" title="Packaging directions for complex product programs." description="Stage 1 route skeleton for the three priority solution areas." /><Section><div className="divide-y divide-line border-y border-line">{solutions.map((solution) => <Link className="block py-6 font-display text-3xl hover:text-accent" href={solution.href} key={solution.href}>{solution.name}</Link>)}</div></Section></>; }
