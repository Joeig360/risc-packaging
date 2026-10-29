import type { InquiryType } from "@/lib/inquiry";

type InquiryContext = {
  inquiryType: InquiryType;
  productName?: string;
  productCode?: string;
  productSlug?: string;
  sourceUrl?: string;
};

export function inquiryHref({ inquiryType, productName, productCode, productSlug, sourceUrl }: InquiryContext) {
  const query = new URLSearchParams({ inquiryType });
  if (productName) query.set("productName", productName);
  if (productCode) query.set("productCode", productCode);
  if (productSlug) query.set("product", productSlug);
  if (sourceUrl) query.set("sourceUrl", sourceUrl);
  return `/start-a-project?${query.toString()}`;
}
