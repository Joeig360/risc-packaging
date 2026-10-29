export const inquiryTypes = ["start-project", "samples", "customize"] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export type InquiryPayload = {
  inquiryType: InquiryType;
  fullName: string;
  company: string;
  email: string;
  country: string;
  phone?: string;
  message: string;
  businessArea?: string;
  quantity?: string;
  launchTiming?: string;
  productName?: string;
  productCode?: string;
  productSlug?: string;
  shippingCountry?: string;
  customizationInterests?: string[];
  sourceUrl: string;
  website?: string;
  consent: boolean;
  turnstileToken?: string;
};

export type InquiryFieldErrors = Partial<Record<keyof InquiryPayload, string>>;

const maxLengths: Partial<Record<keyof InquiryPayload, number>> = {
  fullName: 120,
  company: 160,
  email: 254,
  country: 100,
  phone: 60,
  message: 5000,
  businessArea: 50,
  quantity: 100,
  launchTiming: 100,
  productName: 200,
  productCode: 80,
  productSlug: 160,
  shippingCountry: 100,
  sourceUrl: 500,
  website: 200,
  turnstileToken: 4096,
};

export const referenceFileExtensions = ["jpg", "jpeg", "png", "pdf", "xlsx", "docx"] as const;
export const referenceFileMimeTypes: Record<(typeof referenceFileExtensions)[number], readonly string[]> = {
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
  pdf: ["application/pdf"],
  xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};

// Vercel Functions cap request bodies at 4.5 MB. Leave space for multipart metadata and form data.
export const maxReferenceFiles = 3;
export const maxReferenceFileSizeBytes = 4 * 1024 * 1024;
export const maxReferenceFilesTotalBytes = 4 * 1024 * 1024;

function cleanString(value: unknown, key: keyof InquiryPayload): string {
  const raw = typeof value === "string" ? value : "";
  return raw.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLengths[key] ?? 500);
}

function cleanList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80)).filter(Boolean).slice(0, 8);
}

export function normalizeInquiry(input: unknown): InquiryPayload {
  const data = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const candidateType = cleanString(data.inquiryType, "inquiryType");
  const inquiryType = inquiryTypes.includes(candidateType as InquiryType) ? candidateType as InquiryType : "start-project";

  return {
    inquiryType,
    fullName: cleanString(data.fullName, "fullName"),
    company: cleanString(data.company, "company"),
    email: cleanString(data.email, "email").toLowerCase(),
    country: cleanString(data.country, "country"),
    phone: cleanString(data.phone, "phone"),
    message: cleanString(data.message, "message"),
    businessArea: cleanString(data.businessArea, "businessArea"),
    quantity: cleanString(data.quantity, "quantity"),
    launchTiming: cleanString(data.launchTiming, "launchTiming"),
    productName: cleanString(data.productName, "productName"),
    productCode: cleanString(data.productCode, "productCode"),
    productSlug: cleanString(data.productSlug, "productSlug"),
    shippingCountry: cleanString(data.shippingCountry, "shippingCountry"),
    customizationInterests: cleanList(data.customizationInterests),
    sourceUrl: cleanString(data.sourceUrl, "sourceUrl"),
    website: cleanString(data.website, "website"),
    consent: data.consent === true,
    turnstileToken: cleanString(data.turnstileToken, "turnstileToken"),
  };
}

export function validateInquiry(payload: InquiryPayload): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};
  if (!payload.fullName) errors.fullName = "Enter your full name.";
  if (!payload.company) errors.company = "Enter your company name.";
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = "Enter a valid work email.";
  if (!payload.country) errors.country = "Select or enter your country or region.";
  if (!payload.message) errors.message = "Tell us a little about your project.";
  if (!payload.consent) errors.consent = "Confirm that we may contact you about this inquiry.";
  if (!payload.sourceUrl || !payload.sourceUrl.startsWith("/") || payload.sourceUrl.startsWith("//")) errors.sourceUrl = "Invalid inquiry source.";

  if (payload.inquiryType === "start-project") {
    if (!payload.businessArea) errors.businessArea = "Choose a business area.";
  } else {
    if (!payload.productName) errors.productName = "Enter the product or system name.";
  }
  if (payload.inquiryType === "customize" && !payload.customizationInterests?.length) errors.customizationInterests = "Choose at least one customization area.";
  return errors;
}

export const inquiryLabels: Record<InquiryType, string> = {
  "start-project": "Start a Project",
  samples: "Request Samples",
  customize: "Customize Product / Formula",
};
