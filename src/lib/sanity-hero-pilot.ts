const query = '*[_id == "homepage-hero-pilot" && _type == "homepageHero"][0]{"url": image.asset->url}';

/** Read only the published pilot document; the production Hero singleton is untouched. */
export async function getPilotHeroImage(): Promise<string | null> {
  try {
    const endpoint = new URL("https://xth9bdt8.api.sanity.io/v2025-02-19/data/query/production");
    endpoint.searchParams.set("query", query);
    endpoint.searchParams.set("perspective", "published");
    const response = await fetch(endpoint, { cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("result" in data)) return null;
    const result = data.result;
    if (!result || typeof result !== "object" || !("url" in result) || typeof result.url !== "string") return null;
    const url = new URL(result.url);
    if (url.protocol !== "https:" || url.hostname !== "cdn.sanity.io" || url.username || url.password || url.port || url.search || url.hash || !/^\/images\/xth9bdt8\/production\/[a-f0-9]+-\d+x\d+\.(?:jpg|jpeg|png|webp|avif)$/.test(url.pathname)) return null;
    const image = await fetch(url, { method: "HEAD", cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!image.ok || !image.headers.get("content-type")?.startsWith("image/")) return null;
    return url.href;
  } catch {
    return null;
  }
}
