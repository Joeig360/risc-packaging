import type { Metadata } from "next";
import { publicProductText } from "@/lib/public-product-policy";

const siteName = "SOOYAN";
const siteDescription = "Product development, private label and packaging solutions for skincare, peptide and professional projects.";

export function createMetadata({ title, description = siteDescription, path = "/" }: { title?: string; description?: string; path?: string }): Metadata {
  const pageTitle = publicProductText(title ? (title.includes(siteName) ? title : `${title} | ${siteName}`) : siteName);
  description = publicProductText(description);
  const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com");
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  return { metadataBase, title: pageTitle, description, alternates: { canonical: path }, robots: { index: true, follow: true }, verification: google ? { google } : undefined, icons: { icon: "/icon.svg" }, openGraph: { title: pageTitle, description, type: "website", siteName, url: path, images: [{ url: "/brand/sooyan/sooyan-og-mark.svg", width: 1200, height: 630, alt: "SOOYAN — Product Development, Private Label & Packaging Solutions" }] }, twitter: { card: "summary_large_image", title: pageTitle, description, images: ["/brand/sooyan/sooyan-og-mark.svg"] } };
}

export const seo = { siteName, siteDescription };
