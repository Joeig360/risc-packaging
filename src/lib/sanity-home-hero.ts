export type HeroImageData = { url: string; alt: string; isAiConcept: boolean };
export type HeroContent = {
  title: string | null; subtitle: string | null;
  image: HeroImageData | null; mobileImage: HeroImageData | null;
  primaryCta: { label: string | null; href: string | null };
  secondaryCta: { label: string | null; href: string | null };
};

const allowedRoutes = new Set(["/start-a-project", "/products", "/packaging-systems", "/components", "/solutions", "/about"]);
const empty: HeroContent = { title: null, subtitle: null, image: null, mobileImage: null, primaryCta: { label: null, href: null }, secondaryCta: { label: null, href: null } };
const query = '*[_id == "homepage-hero" && _type == "homepageHero"][0]{title,subtitle,primaryCta{label,href},secondaryCta{label,href},image{alt,isAiConcept,"url":asset->url},mobileImage{alt,isAiConcept,"url":asset->url}}';

function record(value: unknown): Record<string, unknown> { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {}; }
function text(value: unknown, max: number): string | null { return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max ? value.trim() : null; }
function cta(value: unknown) { const data = record(value); const href = text(data.href, 100); return { label: text(data.label, 60), href: href && allowedRoutes.has(href) ? href : null }; }
async function image(value: unknown): Promise<HeroImageData | null> {
  const data = record(value); const alt = text(data.alt, 200);
  if (typeof data.url !== "string" || !alt || typeof data.isAiConcept !== "boolean") return null;
  try {
    const url = new URL(data.url);
    if (url.protocol !== "https:" || url.hostname !== "cdn.sanity.io" || url.username || url.password || url.port || url.search || url.hash || !/^\/images\/xth9bdt8\/production\/[a-f0-9]+-\d+x\d+\.(?:jpg|jpeg|png|webp|avif)$/.test(url.pathname)) return null;
    const response = await fetch(url, { method: "HEAD", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(4000) });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) return null;
    return { url: url.href, alt, isAiConcept: data.isAiConcept };
  } catch { return null; }
}

/** Read only published homepage content; never read the separate pilot document. */
export async function getHomeHero(): Promise<HeroContent> {
  try {
    const url = new URL("https://xth9bdt8.api.sanity.io/v2025-02-19/data/query/production");
    url.searchParams.set("query", query); url.searchParams.set("perspective", "published");
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!response.ok) return empty;
    const result = record(record(await response.json()).result);
    const [desktop, mobile] = await Promise.all([image(result.image), image(result.mobileImage)]);
    return { title: text(result.title, 140), subtitle: text(result.subtitle, 400), image: desktop, mobileImage: mobile, primaryCta: cta(result.primaryCta), secondaryCta: cta(result.secondaryCta) };
  } catch { return empty; }
}
