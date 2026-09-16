import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riscpackaging.com";
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: "RISC Packaging", url: siteUrl, description: "Packaging development and supply chain coordination for skincare, peptide, and professional packaging systems." }, { "@type": "WebSite", name: "RISC Packaging", url: siteUrl }] };
  return <html lang="en"><body className="flex min-h-screen flex-col"><SiteHeader /><main className="flex-1">{children}</main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
