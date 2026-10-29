import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { Analytics } from "@/components/analytics/analytics";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: "SOOYAN", url: siteUrl, description: "Product development, private label and packaging solutions for skincare, peptide and professional projects." }, { "@type": "WebSite", name: "SOOYAN", url: siteUrl }] };
  return <html lang="en"><body className="flex min-h-screen flex-col"><SiteHeader /><main className="flex-1">{children}</main><SiteFooter /><Analytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
