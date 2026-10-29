import { b2bProducts, packagingSystems, skincareProducts } from "@/content";

export type InquiryProduct = {
  slug: string;
  name: string;
  code?: string;
};

export function getInquiryProduct(slug: string | undefined): InquiryProduct | undefined {
  if (!slug) return undefined;

  const b2bProduct = b2bProducts.find((product) => product.slug === slug);
  if (b2bProduct) return { slug: b2bProduct.slug, name: b2bProduct.name };

  const skincareProduct = skincareProducts.find((product) => product.slug === slug);
  if (skincareProduct) return { slug: skincareProduct.slug, name: skincareProduct.name, code: skincareProduct.id };

  const packagingSystem = packagingSystems.find((system) => system.slug === slug);
  if (packagingSystem) return { slug: packagingSystem.slug, name: packagingSystem.name, code: packagingSystem.code };
}
