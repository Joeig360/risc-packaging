import Image from "next/image";
import { KeyBenefits } from "@/components/products/KeyBenefits";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductVisualGallery } from "@/components/skincare-products/ProductVisualGallery";
import { skincareCollections, skincareProducts } from "@/content";
import { inquiryHref } from "@/lib/inquiry-links";
import type { SkincareProduct } from "@/types/content";

function ProductCard({ product }: { product: SkincareProduct }) { return <Link href={`/skincare-products/${product.slug}`} className="group block"><div className="relative aspect-[4/5] overflow-hidden bg-ivory"><Image src={product.image.hero} alt={product.image.heroAlt ?? `${product.name} concept visual`} fill sizes="(max-width:767px) 85vw, (max-width:1024px) 45vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div><p className="mt-4 text-xs tracking-[.13em] text-slate">{product.id} / {product.category.toUpperCase()}</p><h3 className="mt-2 font-display text-2xl group-hover:text-accent">{product.name}</h3><p className="mt-2 text-sm leading-6 text-slate">{product.shortDescription}</p></Link>; }

function ProductInformationPanel({ product }: { product: SkincareProduct }) {
  const collection = skincareCollections.find((item) => item.slug === product.collection);

  return <aside className="border-t border-line pt-6 lg:self-start lg:border-t-0 lg:pt-2">
    <p className="text-xs tracking-[.16em] text-slate">{product.id} / {product.collection.toUpperCase()}</p>
    <h1 className="mt-4 max-w-full break-words font-display text-4xl leading-[.95] sm:text-[3.25rem] xl:text-[3.4rem]">{product.name}</h1>
    <p className="mt-4 max-w-lg text-base leading-7 text-slate">{product.shortDescription}</p>
    <div className="mt-6 grid gap-5 border-t border-line pt-5">
      <KeyBenefits benefits={product.benefits} />
    </div>
    <div className="mt-7 grid gap-3"><Button href={inquiryHref({ inquiryType: "samples", productName: product.name, productCode: product.id, productSlug: product.slug, sourceUrl: `/skincare-products/${product.slug}` })}>REQUEST THIS PRODUCT</Button><Button href={inquiryHref({ inquiryType: "customize", productName: product.name, productCode: product.id, productSlug: product.slug, sourceUrl: `/skincare-products/${product.slug}` })} variant="quiet">CUSTOMIZE THIS PRODUCT</Button></div>
    {collection ? <Link className="mt-6 inline-flex text-xs font-semibold tracking-[.12em] text-graphite underline decoration-line underline-offset-4" href={`/skincare-products/collections/${collection.slug}`}>Explore {collection.name} &rarr;</Link> : null}
  </aside>;
}






function BuildCollectionSection({ product, related }: { product: SkincareProduct; related: SkincareProduct[] }) { const collection = skincareCollections.find(item => item.slug === product.collection); if (!collection) return null; return <section className="bg-ivory py-[var(--space-section)]"><div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs tracking-[.16em] text-slate">BUILD A COLLECTION</p><h2 className="mt-4 font-display text-4xl">Build a {collection.name} Collection</h2><p className="mt-5 max-w-md text-sm leading-6 text-slate">Extend the active direction across complementary real formats and a coordinated development brief.</p></div><div><p className="text-xs font-semibold tracking-[.14em] text-graphite">RELATED FORMATS</p><div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 border-t border-line pt-4 text-sm text-slate">{collection.formats.slice(0, 4).map(format => <span key={format.name}>{format.name}</span>)}</div>{related.length ? <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{related.map(item => <Link className="border-t border-line pt-3 text-sm text-slate transition-colors hover:text-graphite" href={`/skincare-products/${item.slug}`} key={item.slug}><span className="block text-xs tracking-[.11em] text-graphite">{item.id}</span><span className="mt-1 block">{item.name}</span></Link>)}</div> : null}<Link className="mt-7 inline-flex text-xs font-semibold tracking-[.12em] text-graphite underline decoration-line underline-offset-4" href={`/skincare-products/collections/${collection.slug}`}>Explore {collection.name} &rarr;</Link></div></div></section>; }

export function SkincareProductDetailPage({ product }: { product: SkincareProduct }) {
  const related = skincareProducts.filter(item => product.relatedProducts?.includes(item.slug)).slice(0, 3);
  return <>
    <section className="skincare-product-detail-layout bg-ivory py-8 lg:py-14"><div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-[minmax(0,1.35fr)_minmax(21rem,.85fr)] lg:items-start lg:gap-12"><ProductVisualGallery product={product} /><ProductInformationPanel product={product} /></div></section>
    <ProductCustomization product={product}/>
    <BuildCollectionSection product={product} related={related}/>
    <section className="bg-ivory py-[var(--space-section)]"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-slate">BUILD A COLLECTION</p><h2 className="mt-4 font-display text-4xl md:text-5xl">Related Products</h2><div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{related.map(item => <ProductCard key={item.slug} product={item}/>)}</div></div></section>
    <section className="bg-graphite py-20 text-center text-paper"><h2 className="font-display text-4xl md:text-5xl">Build This Into Your Next Collection</h2><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href={inquiryHref({ inquiryType: "samples", productName: product.name, productCode: product.id, productSlug: product.slug, sourceUrl: `/skincare-products/${product.slug}` })}>REQUEST SAMPLES</Button><Button href={inquiryHref({ inquiryType: "start-project", productName: product.name, productCode: product.id, productSlug: product.slug, sourceUrl: `/skincare-products/${product.slug}` })} variant="quiet" className="border-slate text-paper">START A PROJECT</Button></div></section>
  </>;
}

function ProductCustomization({ product }: { product: SkincareProduct }) {
  const mobileGroups = [
    { title: "PACKAGING", items: product.packagingOptions ?? [] },
    { title: "BRANDING", items: ["Decoration direction", "Printing treatment", "Carton presentation"] },
  ];

  return <section className="py-[var(--space-section)]"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-slate">CUSTOMIZE THIS PRODUCT</p><h2 className="mt-4 font-display text-4xl">Develop the packaging and presentation around your brief.</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{mobileGroups.map(group => <article className="border-t border-line pt-4" key={group.title}><h3 className="text-xs font-semibold tracking-[.14em] text-graphite">{group.title}</h3><div className="mt-3 flex flex-wrap gap-2">{group.items.map(item => <span className="border border-line px-3 py-2 text-xs text-slate" key={item}>{item}</span>)}</div></article>)}</div></div></section>;
}

function FormatCard({ format }: { format: { name: string; description: string } }) { return <article className="border-t border-line pt-4"><h3 className="font-display text-3xl">{format.name}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-slate">{format.description}</p></article>; }

export function SkincareCollectionPage({ collection }: { collection: string }) {
  const definition = skincareCollections.find(item => item.slug === collection);
  const products = skincareProducts.filter(item => item.collection === collection);
  if (!definition) return null;

  const featured = products.find(item => item.slug === definition.featuredProduct);
  const supportingSlugs = definition.supportingProducts ?? products.filter(item => item.slug !== featured?.slug).map(item => item.slug);
  const supporting = supportingSlugs.map(slug => products.find(item => item.slug === slug)).filter((product): product is SkincareProduct => Boolean(product));

  return <>
    <section className="bg-graphite py-20 text-paper">
      <div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-[.82fr_1.18fr] lg:items-end">
        <div><p className="text-xs tracking-[.16em] text-silver">SKINCARE COLLECTION</p><h1 className="mt-5 font-display text-4xl md:text-6xl">{definition.name}</h1><p className="mt-6 max-w-xl text-base leading-7 text-[#d9d7ce]">{definition.description}</p></div>
        {featured && <div className="relative aspect-[4/3] overflow-hidden bg-paper"><Image src={featured.image.hero} alt={`${definition.name} collection lead concept visual`} fill loading="eager" sizes="(max-width:1023px) 100vw, 55vw" className="object-cover"/></div>}
      </div>
    </section>

    <section className="py-[var(--space-section)]">
      <div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--page-gutter)] lg:grid-cols-[.82fr_1.18fr]">
        <div><p className="text-xs tracking-[.16em] text-slate">COLLECTION DIRECTION</p><h2 className="mt-4 font-display text-4xl">A focused development framework.</h2></div>
        <div><p className="max-w-2xl text-lg leading-8 text-slate">{definition.positioning}</p><div className="mt-7 flex flex-wrap gap-x-4 gap-y-3 border-t border-line pt-4 text-sm text-slate">{definition.formats.map(format => <span key={format.name}>{format.name}</span>)}</div></div>
      </div>
    </section>

    {featured ? <section className="bg-ivory py-[var(--space-section)]"><div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div className="relative aspect-[4/5] overflow-hidden bg-paper"><Image src={featured.image.hero} alt={featured.image.heroAlt ?? `${featured.name} concept visual`} fill sizes="(max-width:1023px) 100vw, 55vw" className="object-cover"/></div><div><p className="text-xs tracking-[.16em] text-slate">FEATURED PRODUCT</p><p className="mt-5 text-xs tracking-[.13em] text-slate">{featured.id} / {featured.category.toUpperCase()}</p><h2 className="mt-3 max-w-xl font-display text-4xl md:text-5xl">{featured.name}</h2><p className="mt-5 max-w-xl text-base leading-7 text-slate">{featured.shortDescription}</p><Link href={`/skincare-products/${featured.slug}`} className="mt-8 inline-flex border border-graphite px-5 py-3 text-xs font-semibold tracking-[.12em]">VIEW PRODUCT</Link></div></div></section> : <section className="bg-ivory py-[var(--space-section)]"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-slate">DEVELOPMENT DIRECTION</p><h2 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl">Start with the format that fits your collection.</h2><p className="mt-5 max-w-xl text-base leading-7 text-slate">This collection is ready to develop once an approved formula direction or product brief is available.</p></div></section>}

    <section className="py-[var(--space-section)]"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-slate">AVAILABLE FORMATS</p><div className="mt-8 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{definition.formats.map(format => <FormatCard format={format} key={format.name}/>)}</div></div></section>

    {supporting.length > 0 && <section className="bg-ivory py-[var(--space-section)]"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="text-xs tracking-[.16em] text-slate">SUPPORTING PRODUCTS</p>{supporting.length === 1 ? <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-end"><ProductCard product={supporting[0]}/><div className="border-t border-line pt-4"><p className="text-xs tracking-[.13em] text-slate">COLLECTION EXTENSION</p><h2 className="mt-3 max-w-md font-display text-4xl">Build a more complete product story.</h2><p className="mt-5 max-w-md leading-7 text-slate">Use this real supporting product to extend the collection across another relevant format without adding a separate product family.</p></div></div> : <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{supporting.map(product => <ProductCard key={product.slug} product={product}/>)}</div>}</div></section>}

    {definition.editorialImage && <section className="py-[var(--space-section)]"><div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><p className="mb-5 text-xs tracking-[.16em] text-slate">COLLECTION MATERIAL STUDY</p><div className="relative aspect-[4/3] overflow-hidden bg-ivory sm:aspect-[3/2] lg:aspect-[16/6]"><Image src={definition.editorialImage.src} alt={definition.editorialImage.alt} fill sizes="(max-width:1023px) 100vw, 90vw" className="object-cover"/></div></div></section>}

    <section className="bg-graphite py-20 text-center text-paper"><h2 className="font-display text-4xl md:text-5xl">Build a Collection</h2><p className="mt-5 text-base leading-7 text-[#d9d7ce]">Begin with an active, a product format, or an existing brand direction.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/start-a-project">START A PROJECT</Button><Button href="/start-a-project" variant="quiet" className="border-slate text-paper">REQUEST SAMPLES</Button></div></section>
  </>;
}
