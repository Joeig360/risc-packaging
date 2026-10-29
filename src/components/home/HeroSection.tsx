import Image from "next/image";
import { Button } from "@/components/ui/button";
import { homeImages } from "@/content/homepage";

export function HeroSection() {
  const image = homeImages.heroSlides[2];

  return (
    <section className="bg-ivory" aria-labelledby="home-heading">
      <div className="mx-auto grid max-w-[var(--container-wide)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-[var(--page-gutter)] py-8 md:py-14 lg:py-16">
          <p className="text-xs font-semibold tracking-[.15em] text-slate">SOOYAN / FOR BEAUTY BRANDS</p>
          <h1 id="home-heading" className="mt-4 max-w-xl font-display text-4xl leading-[1.05] md:text-6xl">Skincare, private label & custom packaging.</h1>
          <p className="mt-5 max-w-md leading-7 text-slate">Explore skincare and beauty products. Bring product development, brand presentation and packaging into one coordinated project.</p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap" aria-label="Explore SOOYAN">
            <Button href="/products">EXPLORE PRODUCTS</Button>
            <Button href="/packaging-systems" variant="quiet">EXPLORE PACKAGING</Button>
          </div>
        </div>
        <div className="relative aspect-[3/2] lg:aspect-auto lg:min-h-[470px]">
          <Image src={image.src} alt={image.alt} fill priority sizes="(max-width:1023px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
