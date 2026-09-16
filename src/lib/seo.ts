import type { Metadata } from "next";

const siteName = "RISC Packaging";
const siteDescription = "Packaging development and supply chain coordination for skincare, peptide, and professional packaging systems.";

export function createMetadata({ title, description = siteDescription, path = "/" }: { title?: string; description?: string; path?: string }): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://riscpackaging.com");
  return { metadataBase, title: pageTitle, description, alternates: { canonical: path }, robots: { index: true, follow: true }, openGraph: { title: pageTitle, description, type: "website", siteName, url: path, images: [{ url: "/images/hero/risc-packaging-collection-concept-v1.png", width: 1600, height: 1000, alt: "RISC complete packaging collection" }] }, twitter: { card: "summary_large_image", title: pageTitle, description, images: ["/images/hero/risc-packaging-collection-concept-v1.png"] } };
}

export const seo = { siteName, siteDescription };
