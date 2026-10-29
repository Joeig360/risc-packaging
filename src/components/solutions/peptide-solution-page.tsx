import Image from "next/image";
import Link from "next/link";
import { packagingSystems } from "@/content";
import { peptideSolution } from "@/content/peptide-solution";
import { Button } from "@/components/ui/button";

const systemsBySlug = new Map(packagingSystems.map((system) => [system.slug, system]));

function SystemLink({ slug, featured = false }: { slug: string; featured?: boolean }) {
  const system = systemsBySlug.get(slug);
  if (!system?.heroImage) return null;

  return (
    <Link href={`/packaging-systems/${system.slug}`} className={`group block ${featured ? "md:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden bg-ivory ${featured ? "aspect-[16/9]" : "aspect-[16/9] md:aspect-[4/3]"}`}>
        <Image
          src={system.heroImage.src}
          alt={system.heroImage.alt}
          fill
          sizes={featured ? "(max-width: 767px) 100vw, 66vw" : "(max-width: 767px) 84vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/65 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="grid gap-2 border-b border-line py-4 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-4">
        <span className="text-[0.66rem] tracking-[0.15em] text-slate">{system.code}</span>
        <div>
          <h3 className="font-display text-2xl transition-colors group-hover:text-accent md:text-3xl">{system.name}</h3>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate">{system.shortDescription}</p>
        </div>
        <span className="text-xs font-semibold tracking-[0.1em] text-accent">VIEW SYSTEM</span>
      </div>
    </Link>
  );
}

export function PeptideSolutionPage() {
  return (
    <>
      <section className="bg-graphite text-paper">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[var(--container-wide)] gap-6 px-[var(--page-gutter)] py-8 lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.14fr)] lg:items-center lg:gap-10 lg:py-14">
          <div className="max-w-2xl lg:py-10">
            <p className="text-[0.68rem] tracking-[0.17em] text-silver">{peptideSolution.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-xl font-display text-5xl leading-[0.94] sm:text-6xl lg:text-7xl">{peptideSolution.hero.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#d9d7ce]">{peptideSolution.hero.copy}</p>
            <p className="mt-8 max-w-md border-l border-silver pl-4 font-display text-2xl leading-tight text-paper">One project. Multiple specialized suppliers. One point of contact.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={peptideSolution.hero.primaryCta.href} className="inline-flex items-center justify-center bg-paper px-5 py-3 text-xs font-semibold tracking-[0.13em] transition-colors hover:bg-ivory" style={{ color: "#242522" }}>{peptideSolution.hero.primaryCta.label}</Link>
              <Button href={peptideSolution.hero.secondaryCta.href} variant="quiet" className="border-slate text-paper hover:border-paper">{peptideSolution.hero.secondaryCta.label}</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 self-stretch sm:gap-3">
            {peptideSolution.hero.images.map((image, index) => (
              <div className={`relative min-h-32 overflow-hidden bg-slate sm:min-h-40 ${index > 1 ? "hidden sm:block" : ""} ${index === 1 ? "translate-y-3 sm:translate-y-6" : ""}`} key={image.src}>
                <Image src={image.src} alt={image.alt} fill loading={index < 2 ? "eager" : "lazy"} sizes="(max-width: 1023px) 50vw, 30vw" className="object-cover" style={{ objectPosition: image.position }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packaging-systems" className="scroll-mt-20 py-[var(--space-section)]">
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
          <p className="text-[0.68rem] tracking-[0.17em] text-slate">CHOOSE YOUR SYSTEM</p>
          <div className="mt-4 grid gap-5 border-b border-line pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)] md:items-end">
            <h2 className="max-w-3xl font-display text-5xl leading-[0.96] md:text-6xl">Choose Your Packaging System</h2>
            <p className="max-w-xl text-sm leading-6 text-slate">Start with your product format. Each system connects the primary package, supporting components, presentation and supplier coordination around one project.</p>
          </div>
          <div className="mt-12 space-y-14 md:mt-16 md:space-y-20">
            {peptideSolution.groups.map((group) => (
              <section key={group.id}>
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                  <div><p className="text-[0.66rem] tracking-[0.16em] text-slate">{group.label}</p><h2 className="mt-2 font-display text-4xl md:text-5xl">{group.title}</h2></div>
                  {group.featuredSlug && <span className="text-xs tracking-[0.12em] text-accent">P04 / FLAGSHIP VIAL KIT</span>}
                </div>
                <div className="grid gap-x-5 gap-y-10 md:grid-cols-2">
                  {group.slugs.map((slug) => <SystemLink key={slug} slug={slug} featured={slug === group.featuredSlug} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-[var(--space-section)]">
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
          <p className="text-[0.68rem] tracking-[0.17em] text-slate">{peptideSolution.completeSystem.eyebrow}</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:items-end">
            <h2 className="max-w-xl font-display text-5xl leading-[0.96] md:text-6xl">{peptideSolution.completeSystem.title}</h2>
            <p className="max-w-xl text-sm leading-6 text-slate">{peptideSolution.completeSystem.copy}</p>
          </div>
          <div className="mt-12 grid gap-10 border-t border-line pt-7 lg:grid-cols-2">
            {peptideSolution.completeSystem.routes.map((route) => (
              <article key={route.name}>
                <h3 className="font-display text-3xl">{route.name}</h3>
                <ol className="mt-5 flex flex-wrap items-center gap-y-3 text-sm text-slate">{route.items.map((item, index) => <li className="flex items-center" key={item}><span>{item}</span>{index < route.items.length - 1 && <span className="mx-3 text-graphite">&rarr;</span>}</li>)}</ol>
              </article>
            ))}
          </div>
          <div className="mt-12 overflow-hidden bg-paper md:grid md:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-72"><Image src="/images/packaging-systems/p04-exploded-concept-v1.png" alt="Exploded premium peptide packaging system components" fill sizes="(max-width: 767px) 100vw, 55vw" className="object-cover" /></div>
            <div className="flex flex-col justify-center p-7 md:p-10"><p className="text-[0.66rem] tracking-[0.16em] text-slate">COMPONENTS BECOME A SYSTEM</p><p className="mt-4 font-display text-4xl leading-tight">One packaging direction from primary container to final carton.</p></div>
          </div>
        </div>
      </section>

      <section className="py-[var(--space-section)]">
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
          <div className="grid gap-8 border-b border-line pb-8 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:items-end"><div><p className="text-[0.68rem] tracking-[0.17em] text-slate">PRODUCT FORMAT</p><h2 className="mt-4 font-display text-5xl leading-[0.96] md:text-6xl">Built Around Different Peptide Formats</h2></div><p className="max-w-xl text-sm leading-6 text-slate">What type of peptide packaging are you developing?</p></div>
          <div className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">{peptideSolution.formats.map((format, index) => <div className="border-b border-line py-5 text-xl md:px-5 md:text-2xl" key={format}><span className="mr-3 text-xs tracking-[0.12em] text-slate">0{index + 1}</span><span className="font-display">{format}</span></div>)}</div>
        </div>
      </section>

      <section className="bg-graphite py-[var(--space-section)] text-paper">
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]"><div><p className="text-[0.68rem] tracking-[0.17em] text-silver">COORDINATION VALUE</p><h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.96] md:text-6xl">More Components Means More Coordination</h2><p className="mt-6 max-w-lg leading-7 text-[#d9d7ce]">A peptide packaging project can move across specialized suppliers. SOOYAN keeps the packaging direction, component fit and final presentation connected.</p></div><div className="border-t border-slate pt-4"><div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{peptideSolution.coordination.map((item, index) => <p className="border-b border-slate pb-4 text-sm" key={item}><span className="mr-3 text-xs tracking-[0.13em] text-silver">0{index + 1}</span>{item}</p>)}</div><p className="mt-10 max-w-2xl font-display text-3xl leading-tight md:text-4xl">One project. Multiple specialized suppliers. One point of contact.</p></div></div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)]"><div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-7"><div><p className="text-[0.68rem] tracking-[0.17em] text-slate">PROJECT MANAGEMENT</p><h2 className="mt-4 font-display text-5xl leading-[0.96] md:text-6xl">What SOOYAN Can Manage</h2></div><p className="max-w-sm text-sm leading-6 text-slate">A coordinated packaging project from early system direction through consolidated delivery.</p></div><div className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{peptideSolution.capabilities.map((capability, index) => <article className="border-t border-line pt-4" key={capability.name}><div className="flex items-baseline justify-between"><h3 className="font-display text-2xl">{capability.name}</h3><span className="text-xs tracking-[0.12em] text-slate">0{index + 1}</span></div><p className="mt-3 max-w-xs text-sm leading-6 text-slate">{capability.copy}</p></article>)}</div></div>
      </section>

      <section className="bg-ivory py-20 text-center md:py-28"><div className="mx-auto max-w-[var(--container-content)] px-[var(--page-gutter)]"><p className="text-[0.68rem] tracking-[0.17em] text-slate">START WITH WHAT YOU HAVE</p><h2 className="mt-4 font-display text-5xl leading-[0.96] md:text-6xl">Start With What You Have</h2><p className="mt-5 text-slate">You don&apos;t need a finished packaging specification to begin.</p><div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate">{peptideSolution.start.map((item) => <span key={item}>{item}</span>)}</div><Button href="/start-a-project" className="mt-9">START A PROJECT</Button></div></section>

      <section className="bg-graphite py-20 text-center text-paper md:py-28"><div className="mx-auto max-w-[var(--container-content)] px-[var(--page-gutter)]"><p className="text-[0.68rem] tracking-[0.17em] text-silver">PEPTIDE PACKAGING SYSTEMS</p><h2 className="mt-4 font-display text-5xl leading-[0.96] md:text-6xl">Build Your Peptide Packaging System</h2><p className="mx-auto mt-5 max-w-lg text-[#d9d7ce]">Tell us what you&apos;re working with, and we&apos;ll help organize the packaging around it.</p><Link href="/start-a-project" className="mt-9 inline-flex items-center justify-center bg-paper px-5 py-3 text-xs font-semibold tracking-[0.13em] transition-colors hover:bg-ivory" style={{ color: "#242522" }}>START A PROJECT</Link></div></section>
    </>
  );
}
