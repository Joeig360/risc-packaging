import { HeroImage } from "./HeroImage";
import type { HeroContent } from "@/lib/sanity-home-hero";
import Link from "next/link";
import styles from "./hero-v3.module.css";

function ServiceIcon({ type }: { type: "development" | "label" | "packaging" }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" aria-hidden="true">
    {type === "development" ? <path d="M11 3h10M13 3v10L5 26q-1 3 2 3h18q3 0 2-3l-8-13V3M9 21h14M15 8h2" /> : type === "label" ? <><path d="m16 3 13 7-13 7L3 10 16 3Z" /><path d="m4 16 12 7 12-7M4 22l12 7 12-7" /></> : <><path d="m16 3 13 7v14l-13 7L3 24V10l13-7ZM3 10l13 7 13-7M16 17v14M9 7l13 7" /></>}
  </svg>;
}

export function HeroV3({ hero }: { hero: HeroContent }) {
  return <section className={styles.hero} aria-labelledby="hero-v3-title">
    <figure className={styles.visual}>
      <HeroImage desktop={hero.image} mobile={hero.mobileImage} />
    </figure>
    <div className={styles.content}>
      <p className={styles.eyebrow}>Beauty × Packaging Solutions <span aria-hidden="true" /></p>
      <h1 id="hero-v3-title" className={styles.title}>{!hero.title || hero.title === "From Product to Brand." ? <>From Product<br /> to Brand.</> : hero.title}</h1>
      <p className={styles.description}>{hero.subtitle ?? "Skincare development, private label, and custom packaging for beauty brands."}</p>
      <div className={styles.actions}>
        <Link href={hero.primaryCta.href ?? "/start-a-project"} className={styles.primary}>{hero.primaryCta.label ?? "Discuss a Project"} <span aria-hidden="true">→</span></Link>
        <Link href={hero.secondaryCta.href ?? "/products"} className={styles.secondary}>{hero.secondaryCta.label ?? "Explore Products"}</Link>
      </div>
      <ul className={styles.services} aria-label="Our services">
        <li><ServiceIcon type="development" /><span>Product<br />Development</span></li>
        <li><ServiceIcon type="label" /><span>Private<br />Label</span></li>
        <li><ServiceIcon type="packaging" /><span>Packaging<br />Solutions</span></li>
      </ul>
    </div>
  </section>;
}
