import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { b2bProducts } from "@/content/catalog-products";
import { HeroV3 } from "./HeroV3";
import products from "./featured-products-v2.module.css";
import styles from "./home-v3.module.css";
import packaging from "./packaging-solutions.module.css";

// Same five products and image scales as the standalone prototype.
// The fifth remains in the rendered catalog and is hidden only on mobile.
const selection = [
  { slug: "ghk-cu-multi-peptides-intensive-ampoule", width: "78%" },
  { slug: "pdrn-ectoin-soothing-ampoule", width: "78%" },
  { slug: "niacinamide-brightening-night-cream", width: "92%" },
  { slug: "bakuchiol-retinol-alternative-serum", width: "76%" },
  { slug: "ghk-cu-ahk-cu-scalp-care-spray", width: "94%" },
];

export function HomepageV3({ heroImage }: { heroImage: string | null }) {
  return <div className={styles.home}>
    <HeroV3 image={heroImage} />
    <section className={`${products.section} ${styles.products}`} aria-labelledby="home-v3-products-title" data-home-v3-products>
      <div className={products.inner}>
        <div className={products.heading}>
          <div>
            <p className={products.eyebrow}>SOOYAN · Selected products</p>
            <h2 id="home-v3-products-title" className={products.title}>Your next collection<br className={products.mobileBreak} /> starts here.</h2>
            <p className={products.description}>Explore skincare and beauty products for private label and custom packaging.</p>
          </div>
          <Link className={products.catalogLink} href="/products">Explore all products <span aria-hidden="true">↗</span></Link>
        </div>
        <ul className={`${products.grid} ${styles.productGrid}`} aria-label="Featured products">
          {selection.map(({ slug, width }) => {
            const product = b2bProducts.find((item) => item.slug === slug);
            if (!product) throw new Error(`Home preview product missing: ${slug}`);
            return <li key={slug} className={products.item} style={{ "--image-width": width } as CSSProperties}>
              <Link href={`/products/${product.slug}`} className={products.card} data-product={product.slug}>
                <div className={products.visual}>
                  <Image src={product.heroImage.src} alt={product.heroImage.alt} fill
                    sizes="(max-width: 767px) 44vw, (max-width: 1023px) 28vw, 18vw" className={products.image} />
                </div>
                <div className={products.info}>
                  <p className={products.category}>{product.category}</p>
                  <h3 className={products.productName}>{product.name}</h3>
                  <span className={products.detail}>View product <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            </li>;
          })}
        </ul>
        <div className={products.bottomLine}>
          <p>Product development <span aria-hidden="true">/</span> Private label <span aria-hidden="true">/</span> Packaging solutions</p>
          <Link href="/start-a-project">Discuss your collection <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
    <section className={packaging.section} aria-labelledby="home-v3-packaging-title" data-home-v3-packaging>
      <div className={packaging.inner}>
        <div className={packaging.heading}>
          <div>
            <p className={packaging.eyebrow}>SOOYAN · Packaging solutions</p>
            <h2 id="home-v3-packaging-title" className={packaging.title}>Packaging That<br /> Brings It Together.</h2>
          </div>
          <div className={packaging.intro}>
            <p>From primary containers to custom cartons and complete sets, explore packaging solutions for your beauty products.</p>
            <Link href="/packaging-systems" className={packaging.link}>Explore Packaging <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className={packaging.editorial}>
          <figure className={packaging.mainFigure}>
            <div className={packaging.mainImage}>
              <Image src="/images/packaging-systems/premium-skincare-set-concept-v1.png"
                alt="AI concept of a coordinated skincare packaging set with bottles, jar and presentation cartons"
                fill sizes="(max-width: 767px) 88vw, 58vw" className={packaging.image} />
              <span className={packaging.note}>AI concept</span>
            </div>
            <figcaption className={packaging.mainCaption}>
              <span className={packaging.number} aria-hidden="true">01 /</span>
              <div><h3>Complete Packaging Systems</h3><p>Coordinated product and packaging sets.</p></div>
            </figcaption>
          </figure>
          <div className={packaging.details}>
            <figure className={packaging.detailFigure}>
              <div className={packaging.detailImage}>
                <Image src="/images/packaging-systems/p06-airless-hero-concept-v1.png"
                  alt="AI concept of a frosted pump container beside an ivory carton"
                  fill sizes="(max-width: 767px) 36vw, 17vw" className={packaging.image} />
                <span className={packaging.note}>AI concept</span>
              </div>
              <figcaption><span className={packaging.number} aria-hidden="true">02 /</span><h3>Primary Packaging</h3><p>Bottles, jars, droppers and pumps.</p></figcaption>
            </figure>
            <figure className={packaging.detailFigure}>
              <div className={packaging.detailImage}>
                <Image src="/images/packaging-systems/p06-open-box-concept-v1.png"
                  alt="AI concept of an open presentation box with a fitted insert and pump bottle"
                  fill sizes="(max-width: 767px) 36vw, 17vw" className={packaging.image} />
                <span className={packaging.note}>AI concept</span>
              </div>
              <figcaption><span className={packaging.number} aria-hidden="true">03 /</span><h3>Secondary Packaging</h3><p>Custom cartons, labels and inserts.</p></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
