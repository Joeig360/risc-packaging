import Image from "next/image"; import Link from "next/link"; import { b2bProducts, homepageActiveDiscovery } from "@/content";
export function TrendingActivesSection(){return <section className="bg-ivory py-20"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-slate">PRODUCT COLLECTIONS</p><h2 className="mt-4 font-display text-5xl">Explore Product Collections</h2><p className="mt-4 max-w-xl text-slate">Explore product formats and private-label packaging for your next collection.</p><div className="mt-10 grid gap-5 sm:grid-cols-2">{homepageActiveDiscovery.map(active=><article className="group overflow-hidden border border-line bg-paper" key={active.collectionSlug}><div className="relative aspect-[3/2] overflow-hidden bg-ivory"><Image aria-hidden="true" src={active.image.src} alt="" fill sizes="(max-width:767px) calc(100vw - 2 * var(--page-gutter)), (max-width:1023px) 45vw, 45vw" className="scale-110 object-cover opacity-35 blur-xl transition-transform duration-700 group-hover:scale-[1.13]"/><Image src={active.image.src} alt={active.image.alt} fill sizes="(max-width:767px) calc(100vw - 2 * var(--page-gutter)), (max-width:1023px) 45vw, 45vw" className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"/></div><div className="p-6 md:p-7"><h3 className="font-display text-3xl leading-tight">{active.name}</h3><p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-slate">{active.formats.join(" · ")}</p><Link href={`/skincare-products/collections/${active.collectionSlug}`} className="mt-7 inline-flex border-b border-graphite pb-1 text-xs font-semibold tracking-[.12em] transition-colors group-hover:text-accent group-hover:border-accent">{active.cta}</Link></div></article>)}</div></div></section>}
const featuredSlugs = [
  "ghk-cu-multi-peptides-intensive-ampoule",
  "pdrn-ectoin-soothing-ampoule",
  "niacinamide-txa-serum",
  "deep-collagen-gold-intensive-ampoule",
  "ghk-cu-ahk-cu-scalp-care-spray",
  "pdrn-peptide-eye-serum",
  "collagen-real-deep-gel-mask",
  "bakuchiol-smoothing-serum",
  "centella-micro-bead-calming-serum",
  "pdrn-dual-chamber-serum",
];

export function FeaturedSkincareInnovationsSection() {
  const products = featuredSlugs
    .map((slug) => b2bProducts.find((product) => product.slug === slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <section className="py-10 md:py-16" data-home-sooyan-products aria-labelledby="featured-products-heading">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs tracking-[.16em] text-slate">FEATURED SOOYAN PRODUCTS</p>
            <h2 id="featured-products-heading" className="mt-3 font-display text-3xl md:text-4xl">Explore your next product.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate">A selection from our skincare and beauty catalog, ready to explore for your brand.</p>
          </div>
          <Link href="/products" className="inline-flex min-h-11 shrink-0 items-center gap-3 self-start text-xs font-semibold tracking-[.1em] underline-offset-4 hover:underline sm:self-auto">VIEW ALL 66 PRODUCTS <span aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-10">
          {products.map((product) => (
            <Link href={`/products/${product.slug}`} className="group min-w-0" key={product.slug}>
              <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                <Image src={product.heroImage.src} alt={product.heroImage.alt} fill sizes="(max-width:639px) 45vw, (max-width:1023px) 30vw, 18vw" className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]" />
              </div>
              <h3 className="mt-3 font-display text-lg leading-[1.2] md:text-xl group-hover:underline underline-offset-4">{product.name}</h3>
              <p className="mt-2 text-xs leading-5 text-slate">{product.format} / {product.size}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
