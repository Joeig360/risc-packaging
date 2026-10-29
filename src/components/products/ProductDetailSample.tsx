import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KeyBenefits } from "@/components/products/KeyBenefits";
import { inquiryHref } from "@/lib/inquiry-links";
import type { B2BProduct } from "@/types/content";

// Presentation facts from the adopted images and existing public catalog only.
// Benefit claims still come exclusively from the public product policy.
const sampleDetails = {
  "ghk-cu-copper-peptide-barrier-cream": {
    description: "A 50 g cream presented in a glass jar with a metallic-look lid. Explore this format for your private label skincare collection.",
    features: [
      { title: "Cream format", text: "A cream product format for your skincare range." },
      { title: "50 g presentation", text: "The size marked on the displayed jar." },
      { title: "Jar packaging", text: "A glass jar with a metallic-look lid, as shown." },
    ],
    benefitNote: "Request a sample to assess the cream’s texture and finish for your intended routine.",
    packaging: ["Jar label or decoration", "Lid and container presentation", "Outer carton and brand artwork"],
  },
  "ghk-cu-copper-peptide-gel-mask": {
    description: "A gel mask presented in an individual 47 g sachet containing one sheet. Explore the format and pack presentation for your skincare range.",
    features: [
      { title: "Gel mask format", text: "A sheet-mask format for your skincare range." },
      { title: "47 g / 1 sheet", text: "One sheet per sachet, as marked on the displayed pack." },
      { title: "Individual sachet", text: "A flat sachet presentation with space for brand artwork." },
    ],
    benefitNote: "Request a sample to assess the gel sheet’s feel and fit for your intended routine.",
    packaging: ["Sachet artwork and branding", "Pack layout and label details", "Outer carton presentation"],
  },
  "retinol-shot-tightening-serum": {
    description: "A 30 mL serum presented with a clean white carton. Explore the serum format and coordinate the packaging around your brand.",
    features: [
      { title: "Serum format", text: "A serum product format for your skincare range." },
      { title: "30 mL presentation", text: "The volume marked on the displayed carton." },
      { title: "Carton packaging", text: "A white carton with green label accents, as shown." },
    ],
    benefitNote: "Request a sample to assess the serum’s texture and finish for your intended routine.",
    packaging: ["Primary container direction", "Carton artwork and decoration", "Coordinated label presentation"],
  },
} as const;

export function hasProductDetailSample(slug: string): slug is keyof typeof sampleDetails {
  return Object.hasOwn(sampleDetails, slug);
}

export function ProductDetailSample({ product }: { product: B2BProduct }) {
  if (!hasProductDetailSample(product.slug)) return null;
  const detail = sampleDetails[product.slug];
  const context = {
    productName: product.name,
    productCode: product.name,
    productSlug: product.slug,
    sourceUrl: `/products/${product.slug}`,
  };
  const requestHref = inquiryHref({ ...context, inquiryType: "samples" });

  return (
    <>
      <div className="border-b border-line">
        <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[var(--container-wide)] gap-3 px-[var(--page-gutter)] py-5 text-xs text-slate">
          <Link href="/products" className="underline-offset-4 hover:underline">Products</Link>
          <span aria-hidden="true">/</span>
          <Link href="/products/skincare" className="underline-offset-4 hover:underline">Skincare</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.format}</span>
        </nav>
      </div>

      <section className="bg-ivory py-8 md:py-12" aria-labelledby="product-heading">
        <div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 relative aspect-square overflow-hidden bg-paper lg:order-1">
            <Image src={product.heroImage.src} alt={product.heroImage.alt} fill priority sizes="(max-width:1023px) 100vw, 46vw" className="object-contain" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs tracking-[.16em] text-slate">SOOYAN / SKINCARE</p>
            <h1 id="product-heading" className="mt-4 font-display text-[2rem] leading-[1.08] md:text-5xl">{product.name}</h1>
            <dl className="mt-6 grid grid-cols-2 border-y border-line py-4">
              <div><dt className="text-xs tracking-[.12em] text-slate">FORMAT</dt><dd className="mt-2 text-base">{product.format}</dd></div>
              <div><dt className="text-xs tracking-[.12em] text-slate">SIZE</dt><dd className="mt-2 text-base">{product.size}</dd></div>
            </dl>
            <p className="mt-5 max-w-lg leading-7 text-slate">{detail.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:items-start">
              <Button href={requestHref}>REQUEST THIS PRODUCT</Button>
              <Link href="#packaging-options" className="inline-flex min-h-11 items-center text-xs font-semibold tracking-[.1em] underline-offset-4 hover:underline">PRIVATE LABEL & PACKAGING OPTIONS <span aria-hidden="true" className="ml-3">↓</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" aria-labelledby="features-heading">
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
          <h2 id="features-heading" className="font-display text-3xl md:text-4xl">Product highlights</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-3 md:gap-10">
            {detail.features.map((feature) => (
              <div key={feature.title} className="border-t border-line pt-4">
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12 md:py-16" aria-label="Benefits and product experience">
        <div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Explore the product experience.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate">Start with a sample and the product details relevant to your brief.</p>
          </div>
          <div>
            <KeyBenefits benefits={product.keyBenefits} emptyMessage={detail.benefitNote} />
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate">Discuss your intended cosmetic benefits with us. Specific benefit claims need support for the selected product.</p>
            <Link href={requestHref} className="mt-4 inline-flex min-h-11 items-center text-xs font-semibold tracking-[.1em] underline-offset-4 hover:underline">REQUEST PRODUCT DETAILS <span aria-hidden="true" className="ml-3">→</span></Link>
          </div>
        </div>
      </section>

      <section id="packaging-options" className="scroll-mt-8 bg-ivory py-12 md:py-16" aria-labelledby="packaging-heading">
        <div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs tracking-[.16em] text-slate">MAKE IT YOURS</p>
            <h2 id="packaging-heading" className="mt-4 max-w-lg font-display text-3xl leading-[1.1] md:text-4xl">Private Label / Packaging Options</h2>
            <p className="mt-5 max-w-md leading-7 text-slate">Discuss your brand artwork and packaging preferences. Available options, quantities and timing are confirmed for your project.</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[.14em]">OPTIONS TO DISCUSS</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {detail.packaging.map((option) => <li key={option} className="py-4 text-sm text-slate">{option}</li>)}
            </ul>
            <div className="mt-6"><Button href={inquiryHref({ ...context, inquiryType: "customize" })}>DISCUSS CUSTOMIZATION</Button></div>
            <p className="mt-4 text-sm leading-6 text-slate">Include your target quantity, destination market and a reference image if available.</p>
          </div>
        </div>
      </section>
    </>
  );
}
