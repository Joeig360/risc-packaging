import "server-only";
import type { B2BProduct, SkincareCollection, SkincareProduct } from "@/types/content";

/** Display policy only. Source names, formula values and supplier records stay intact. */
export function publicProductText(value: string): string {
  return value.replace(/\b\d+(?:\.\d+)?\s*%\s*/g, "").replace(/\s{2,}/g, " ").trim();
}

type ApprovedBenefit = {
  text: string;
  evidenceSource: string;
  productVersion: string;
  approvedBy: string;
  approvedOn: string;
};

// No product-specific claim approvals were supplied. Never infer claims from ingredients.
const approvedBenefits: Readonly<Record<string, readonly ApprovedBenefit[]>> = {};

function benefitsFor(productKey: string): string[] {
  return (approvedBenefits[productKey] ?? [])
    .filter((claim) => claim.evidenceSource && claim.productVersion && claim.approvedBy && claim.approvedOn)
    .map((claim) => publicProductText(claim.text)).slice(0, 4);
}

function imageFor<T extends { src: string; alt: string }>(image: T): T {
  return { ...image, alt: publicProductText(image.alt) };
}

// User-approved packaging names only; this does not expose ingredient lists or other ratios.
const approvedPackagingNames: Readonly<Record<string, string>> = {
  // #4 and #38: adopted packaging version labels, not verified formula concentrations.
  "niacinamide-txa-serum": "Niacinamide 10% + TXA 4% Serum",
  "bakuchiol-plumping-serum": "Bakuchiol 0.5% Plumping Serum",
  // #3: adopted packaging name only; not verification of formula concentration.
  "ghk-cu-lash-enhancing-serum": "GHK-Cu 2% Copper Peptide Lash Enhancing Serum",
  // #13: adopted packaging label only; not a verified formula concentration.
  "ghk-cu-copper-peptide-barrier-cream": "GHK-Cu 2% Copper Peptide Barrier Cream",
  "ghk-cu-copper-peptide-gel-mask": "GHK-Cu 2% Copper Peptide Gel Mask",
  "ghk-cu-copper-peptide-balm": "GHK-Cu 2% Copper Peptide Balm",
  "pdrn-hyaluronic-acid-serum": "PDRN 3% + Hyaluronic Acid 2% Serum",
  "pdrn-collagen-gel-mask": "PDRN 3% Collagen Gel Mask",
  "kojic-acid-turmeric-brightening-gel-mask": "Kojic Acid 0.5% Turmeric 2% Brightening Gel Mask",
  "pdrn-collagen-bubble-serum": "PDRN 3% Collagen Bubble Serum",
  "pdrn-collagen-glow-toner-spray": "PDRN 3% Collagen Glow Toner Spray",
  "pdrn-dual-renewal-mist-lotion": "PDRN 3% Dual Renewal Mist Lotion",
  "pdrn-collagen-hydrating-soap": "PDRN 3% Collagen Soap",
};

/** Explicit allowlist: raw product objects must never cross the client boundary. */
export function publicB2BProduct(product: B2BProduct): B2BProduct {
  const name = approvedPackagingNames[product.slug] ?? publicProductText(product.name);
  const shortDescription = `A ${product.format.toLowerCase()} product direction for private label and custom packaging.`;
  return {
    slug: product.slug, name, collection: product.collection, category: product.category,
    format: product.format, size: product.size,
    actives: [], concerns: [],
    shortDescription, keyBenefits: benefitsFor(`products/${product.slug}`),
    howToUse: "Follow the directions supplied with the confirmed product.",
    heroImage: imageFor(product.heroImage), gallery: product.gallery.map(imageFor),
    privateLabelAvailable: product.privateLabelAvailable,
    packagingCustomizable: product.packagingCustomizable,
    relatedProducts: [...product.relatedProducts], relatedPackaging: [...product.relatedPackaging],
    seo: { title: `${name} | Private Label | SOOYAN`, description: shortDescription, keywords: [name, "private label", "custom packaging"] },
  };
}

export function publicSkincareProduct(product: SkincareProduct): SkincareProduct {
  const name = publicProductText(product.name);
  const shortDescription = "A skincare product direction for private label and packaging customization.";
  return {
    id: product.id, slug: product.slug, name, category: product.category, collection: product.collection,
    hero: product.hero, trending: product.trending, visualFamily: product.visualFamily,
    shortDescription, keyIngredients: [], benefits: benefitsFor(`skincare-products/${product.slug}`),
    skinConcerns: [], packagingOptions: product.packagingOptions ? [...product.packagingOptions] : [],
    relatedProducts: product.relatedProducts ? [...product.relatedProducts] : [],
    taxonomy: { concerns: [], actives: [], formats: [...(product.taxonomy?.formats ?? [])] },
    image: {
      hero: product.image.hero, heroAlt: `${name} product image`,
      cleanHero: product.image.cleanHero ? imageFor(product.image.cleanHero) : undefined,
      campaign: product.image.campaign ? imageFor(product.image.campaign) : undefined,
      detail: product.image.detail?.map(imageFor),
      collection: product.image.collection ? imageFor(product.image.collection) : undefined,
    },
    seo: { title: `${name} | Private Label | SOOYAN`, description: shortDescription, keywords: [name, "private label", "custom packaging"] },
  };
}

export function publicSkincareCollection(collection: SkincareCollection): SkincareCollection {
  return {
    slug: collection.slug, name: publicProductText(collection.name),
    description: "Explore product formats for private label and coordinated packaging development.",
    activeIntro: "", positioning: "Choose product formats and coordinate packaging around your project brief.",
    benefitDirection: [],
    formats: collection.formats.map(({ name }) => ({ name, description: "Available for private-label and packaging project discussions." })),
    featuredProduct: collection.featuredProduct, supportingProducts: collection.supportingProducts,
    editorialImage: collection.editorialImage ? imageFor(collection.editorialImage) : undefined,
  };
}
