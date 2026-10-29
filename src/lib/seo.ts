import type { Metadata } from "next";
import { publicProductText } from "@/lib/public-product-policy";

const siteName = "SOOYAN";
const siteDescription = "Product development, private label and packaging solutions for skincare, peptide and professional projects.";

export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  try {
    const url = new URL(configuredUrl);
    // A missing or placeholder domain must never become a public SEO address.
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password
      || /(^|\.)example\.(com|net|org)$|\.example$|^localhost$/i.test(url.hostname)) return undefined;
    return new URL(url.origin);
  } catch {
    return undefined;
  }
}

export function isSiteIndexable(): boolean {
  const environment = process.env.VERCEL_ENV;
  return Boolean(getSiteUrl()) && (environment ? environment === "production" : process.env.NODE_ENV === "production");
}

export function createMetadata({ title, description = siteDescription, path = "/", noIndex = false }: { title?: string; description?: string; path?: string; noIndex?: boolean }): Metadata {
  const pageTitle = publicProductText(title ? (title.includes(siteName) ? title : `${title} | ${siteName}`) : siteName);
  description = publicProductText(description);
  const siteUrl = getSiteUrl();
  const indexable = isSiteIndexable();
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const image = siteUrl ? { url: new URL("/brand/sooyan/sooyan-og-mark.svg", siteUrl).href, width: 1200, height: 630, alt: "SOOYAN — Product Development, Private Label & Packaging Solutions" } : undefined;

  return {
    ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: new URL(path, siteUrl).href } } : {}),
    title: pageTitle,
    description,
    robots: { index: indexable && !noIndex, follow: indexable },
    verification: google ? { google } : undefined,
    icons: { icon: "/icon.svg" },
    openGraph: {
      title: pageTitle, description, type: "website", siteName,
      ...(siteUrl ? { url: new URL(path, siteUrl).href } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: pageTitle, description, ...(image ? { images: [image.url] } : {}) },
  };
}

export const seo = { siteName, siteDescription };
