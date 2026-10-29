import Image from "next/image";
import Link from "next/link";
import { homeImages } from "@/content/homepage";

const projectSteps = [
  { title: "Product development", description: "Start with product formats and the requirements in your brief." },
  { title: "Private label & presentation", description: "Discuss brand artwork, labels and the look of your range." },
  { title: "Packaging & project coordination", description: "Bring containers, closures and cartons into one packaging direction." },
];

export function CompleteSystemsSection() {
  const image = homeImages.systems[4];
  return (
    <section className="bg-ivory py-12 md:py-16" aria-labelledby="complete-project-heading">
      <div className="mx-auto grid max-w-[var(--container-wide)] gap-8 px-[var(--page-gutter)] lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[5/4] overflow-hidden">
          <Image src={image.src} alt="Serum bottle and coordinated carton packaging concept" fill sizes="(max-width:1023px) 100vw, 46vw" className="object-cover" />
        </div>
        <div>
          <p className="text-xs tracking-[.14em] text-slate">PRODUCT + PACKAGING</p>
          <h2 id="complete-project-heading" className="mt-4 max-w-lg font-display text-3xl leading-[1.1] md:text-4xl">Your product and packaging, considered together.</h2>
          <p className="mt-5 max-w-lg leading-7 text-slate">Choose a product direction, bring your brand references and discuss the packaging that brings them together.</p>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {projectSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4 py-4">
                <span className="pt-1 text-xs text-slate">0{index + 1}</span>
                <div><h3 className="text-base font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate">{step.description}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:gap-7">
            <Link href="/solutions" className="inline-flex min-h-11 items-center gap-3 text-xs font-semibold tracking-[.1em] underline-offset-4 hover:underline">EXPLORE OUR SOLUTIONS <span aria-hidden="true">→</span></Link>
            <Link href="/packaging-systems" className="inline-flex min-h-11 items-center gap-3 text-xs font-semibold tracking-[.1em] underline-offset-4 hover:underline">VIEW PACKAGING SYSTEMS <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
