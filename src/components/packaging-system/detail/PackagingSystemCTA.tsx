import { Button } from "@/components/ui/button";
import { inquiryHref } from "@/lib/inquiry-links";

export function PackagingSystemCTA({ name, code, slug }: { name: string; code: string; slug: string }) {
  return <section className="border-b border-line bg-paper py-16 text-center md:py-20"><p className="text-xs tracking-[.14em] text-slate">{code} / {name.toUpperCase()}</p><h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl md:text-5xl">Start Your Packaging Project</h2><Button href={inquiryHref({ inquiryType: "start-project", productName: name, productCode: code, productSlug: slug, sourceUrl: `/packaging-systems/${slug}` })} className="mt-8">START A PROJECT</Button></section>;
}
