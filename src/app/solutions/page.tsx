import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { inquiryHref } from "@/lib/inquiry-links";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Skincare, Private Label & Packaging Solutions",
  description: "Explore skincare and private label, custom packaging, and coordinated product programs with SOOYAN. Start with a product, packaging reference or project brief.",
  path: "/solutions",
});

const services = [
  {
    id: "skincare-private-label",
    title: "Skincare & Private Label",
    description: "Explore skincare formats for your brand, then discuss the product selection and packaging direction that fit your brief.",
    details: ["Serums, creams & masks", "Product selection", "Brand & packaging direction"],
    image: "/images/products/sooyan/logo-final5/ghk-cu-copper-peptide-barrier-cream-01.png",
    alt: "SOOYAN copper peptide cream in a glass jar",
    imageClass: "object-contain",
    href: "/products/skincare",
    link: "EXPLORE SKINCARE",
    inquiryType: "start-project" as const,
    inquiry: "DISCUSS PRIVATE LABEL",
  },
  {
    id: "custom-packaging",
    title: "Custom Packaging",
    description: "Bring containers, closures, decoration and cartons into one visual direction. Start with an existing pack, a reference image or a new idea.",
    details: ["Containers & closures", "Printing & decoration", "Cartons & inserts"],
    image: "/images/packaging-systems/peptide-serum-system-concept-v1.png",
    alt: "Frosted dropper bottle and coordinated folding carton packaging concept",
    imageClass: "object-cover",
    href: "/packaging-systems",
    link: "EXPLORE PACKAGING",
    inquiryType: "customize" as const,
    inquiry: "DISCUSS YOUR PACKAGING",
  },
  {
    id: "complete-product-programs",
    title: "Complete Product Programs",
    description: "Plan product and packaging together. Share your brief so we can discuss selection, samples and the components of a coordinated presentation.",
    details: ["Product & packaging planning", "Sample coordination", "Coordinated sets & presentation"],
    image: "/images/packaging-systems/p04-open-box-concept-v1.png",
    alt: "Open presentation box with coordinated vials and a fitted insert concept",
    imageClass: "object-contain",
    href: "/capabilities",
    link: "VIEW OUR CAPABILITIES",
    inquiryType: "start-project" as const,
    inquiry: "DISCUSS YOUR PROGRAM",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-ivory" aria-labelledby="solutions-heading">
        <div className="mx-auto grid max-w-[var(--container-wide)] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-[var(--page-gutter)] py-12 md:py-16 lg:py-20">
            <p className="text-xs font-semibold tracking-[.16em] text-slate">SOOYAN / SOLUTIONS</p>
            <h1 id="solutions-heading" className="mt-5 max-w-xl font-display text-4xl leading-[1.04] md:text-6xl">From skincare to finished packaging.</h1>
            <p className="mt-6 max-w-md leading-7 text-slate">Private label skincare, custom packaging and coordinated product programs for your brand.</p>
            <div className="mt-7"><Button href={inquiryHref({ inquiryType: "start-project", sourceUrl: "/solutions" })}>START A PROJECT</Button></div>
          </div>
          <div className="relative aspect-[3/2] lg:aspect-auto lg:min-h-[470px]">
            <Image src="/images/packaging-systems/premium-skincare-set-concept-v1.png" alt="Coordinated skincare bottles, cream jar, cartons and presentation box concept" fill priority sizes="(max-width:1023px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <nav aria-label="Explore our solutions" className="border-y border-line">
        <div className="mx-auto grid max-w-[var(--container-wide)] px-[var(--page-gutter)] md:grid-cols-3">
          {services.map((service, index) => (
            <Link key={service.id} href={'#' + service.id} className="group flex min-h-16 items-center gap-4 border-b border-line py-4 text-sm last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite md:border-b-0 md:py-6">
              <span className="text-xs text-slate">0{index + 1}</span>
              <span className="underline-offset-4 group-hover:underline">{service.title}</span>
              <span aria-hidden="true" className="ml-auto pr-4 motion-safe:transition-transform group-hover:translate-y-1">↓</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
        {services.map((service, index) => (
          <section key={service.id} id={service.id} aria-labelledby={service.id + "-heading"} className="grid scroll-mt-8 gap-7 border-b border-line py-12 last:border-b-0 md:gap-12 md:py-16 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className={'group relative aspect-[4/3] overflow-hidden bg-ivory ' + (index === 1 ? 'lg:order-2' : '')}>
              <Image src={service.image} alt={service.alt} fill sizes="(max-width:1023px) 100vw, 45vw" className={service.imageClass + " motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"} />
            </div>
            <div>
              <p className="text-xs tracking-[.16em] text-slate">0{index + 1} / OUR SOLUTIONS</p>
              <h2 id={service.id + "-heading"} className="mt-4 max-w-lg font-display text-3xl leading-[1.1] md:text-4xl">{service.title}</h2>
              <p className="mt-5 max-w-lg leading-7 text-slate">{service.description}</p>
              <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
                {service.details.map((detail) => <li key={detail} className="py-3">{detail}</li>)}
              </ul>
              <div className="mt-7 flex flex-col items-start gap-5">
                <Button href={inquiryHref({ inquiryType: service.inquiryType, sourceUrl: "/solutions#" + service.id })}>{service.inquiry}</Button>
                <Link href={service.href} className="inline-flex min-h-11 items-center gap-4 text-xs font-semibold tracking-[.1em] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite">{service.link}<span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-graphite px-[var(--page-gutter)] py-16 text-paper md:py-20">
        <div className="mx-auto max-w-[var(--container-content)] text-center">
          <p className="text-xs tracking-[.16em] text-silver">START WITH WHAT YOU HAVE</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-[1.1] md:text-5xl">A product idea. A packaging reference. Your next project.</h2>
          <p className="mx-auto mt-5 max-w-lg leading-7 text-silver">Tell us what you have in mind. A photo, a sample or a short brief is enough to begin the conversation.</p>
          <div className="mt-8"><Button href={inquiryHref({ inquiryType: "start-project", sourceUrl: "/solutions" })} className="border border-silver hover:border-paper">START A PROJECT</Button></div>
        </div>
      </section>
    </>
  );
}
