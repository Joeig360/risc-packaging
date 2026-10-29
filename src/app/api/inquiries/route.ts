import { NextRequest, NextResponse } from "next/server";
import {
  inquiryLabels,
  maxReferenceFiles,
  maxReferenceFileSizeBytes,
  maxReferenceFilesTotalBytes,
  normalizeInquiry,
  referenceFileExtensions,
  referenceFileMimeTypes,
  validateInquiry,
} from "@/lib/inquiry";
import { getInquiryProduct } from "@/lib/inquiry-products";

export const runtime = "nodejs";

const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxRequests = 5;
const maxInquiryRequestBytes = Math.floor(4.4 * 1024 * 1024);
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const allowedPayloadFields = new Set([
  "inquiryType", "fullName", "company", "email", "country", "phone", "message", "businessArea", "quantity", "launchTiming",
  "productName", "productCode", "productSlug", "shippingCountry", "customizationInterests", "sourceUrl", "website", "consent", "turnstileToken",
]);

type Attachment = { filename: string; content: string };

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

function requestIsSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}

function safeFilename(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  const base = filename.slice(0, -(extension.length + 1)).replace(/[^a-zA-Z0-9._ -]/g, "-").replace(/\s+/g, " ").trim().slice(0, 100) || "reference-file";
  return `${base}.${extension}`;
}

async function parseRequest(request: NextRequest): Promise<{ payloadInput: unknown; files: File[] } | { error: string; status?: number }> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) return { error: "Use multipart form data to submit an inquiry." };
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxInquiryRequestBytes) return { error: "Reference files exceed the upload limit.", status: 413 };

  const formData = await request.formData();
  for (const [key] of formData.entries()) {
    if (key !== "payload" && key !== "files") return { error: "Unexpected form field." };
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") return { error: "Invalid inquiry payload." };
  let payloadInput: unknown;
  try { payloadInput = JSON.parse(rawPayload); } catch { return { error: "Invalid inquiry payload." }; }
  if (!payloadInput || typeof payloadInput !== "object" || Array.isArray(payloadInput)) return { error: "Invalid inquiry payload." };
  if (Object.keys(payloadInput as Record<string, unknown>).some((field) => !allowedPayloadFields.has(field))) return { error: "Unexpected inquiry field." };

  const values = formData.getAll("files");
  if (values.some((value) => !(value instanceof File))) return { error: "Invalid reference file." };
  return { payloadInput, files: values as File[] };
}

async function validateAttachments(files: File[]): Promise<Attachment[] | { error: string; status: number }> {
  if (files.length > maxReferenceFiles) return { error: `Upload no more than ${maxReferenceFiles} reference files.`, status: 400 };
  const totalBytes = files.reduce((total, file) => total + file.size, 0);
  if (totalBytes > maxReferenceFilesTotalBytes) return { error: "Reference files exceed the 4 MB total upload limit.", status: 413 };

  const attachments: Attachment[] = [];
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!referenceFileExtensions.includes(extension as typeof referenceFileExtensions[number])) return { error: "Reference files must be JPG, PNG, PDF, XLSX or DOCX.", status: 400 };
    if (!referenceFileMimeTypes[extension as keyof typeof referenceFileMimeTypes].includes(file.type)) return { error: "Reference file type does not match its extension.", status: 400 };
    if (file.size === 0 || file.size > maxReferenceFileSizeBytes) return { error: "Each reference file must be between 1 byte and 4 MB.", status: 413 };
    attachments.push({ filename: safeFilename(file.name), content: Buffer.from(await file.arrayBuffer()).toString("base64") });
  }
  return attachments;
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!secret && !siteKey) return process.env.NODE_ENV === "production" ? { valid: false, configurationError: true } : { valid: true };
  if (!secret || !siteKey) return { valid: false, configurationError: true };
  if (!token) return { valid: false };

  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, cache: "no-store" });
    const result = await response.json() as { success?: boolean };
    return { valid: response.ok && result.success === true };
  } catch {
    return { valid: false };
  }
}

function emailText(payload: ReturnType<typeof normalizeInquiry>, attachments: Attachment[]) {
  const fields = [
    ["Inquiry type", inquiryLabels[payload.inquiryType]], ["Full name", payload.fullName], ["Company", payload.company],
    ["Work email", payload.email], ["Phone / WhatsApp", payload.phone], ["Country / region", payload.country],
    ["Business area", payload.businessArea], ["Product / system", payload.productName], ["Product code", payload.productCode],
    ["Product slug", payload.productSlug], ["Customization interests", payload.customizationInterests?.join(", ")],
    ["Quantity", payload.quantity], ["Launch timing", payload.launchTiming], ["Shipping country", payload.shippingCountry],
    ["Message", payload.message], ["Reference files", attachments.length ? attachments.map(({ filename }) => filename).join(", ") : "Not provided"],
    ["Source URL", payload.sourceUrl], ["Submission timestamp", new Date().toISOString()],
  ];
  return fields.map(([label, value]) => `${label}: ${value || "Not provided"}`).join("\n");
}

function subjectFor(payload: ReturnType<typeof normalizeInquiry>) {
  return `New SOOYAN Project Inquiry — ${payload.company}`;
}

function logDelivery(event: string, payload: ReturnType<typeof normalizeInquiry>, success: boolean, detail?: string) {
  console.info(JSON.stringify({ event, inquiryType: payload.inquiryType, sourcePage: payload.sourceUrl, productCode: payload.productCode || null, deliverySuccess: success, timestamp: new Date().toISOString(), ...(detail ? { detail } : {}) }));
}

async function sendEmail({ to, from, subject, text, replyTo, attachments }: { to: string; from: string; subject: string; text: string; replyTo?: string; attachments?: Attachment[] }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, reply_to: replyTo, ...(attachments?.length ? { attachments } : {}) }),
  });
  if (!response.ok) throw new Error(`Email provider rejected the request (${response.status}).`);
}

export async function POST(request: NextRequest) {
  if (!requestIsSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const ip = clientIp(request);
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many inquiries. Please try again later." }, { status: 429 });

  const parsed = await parseRequest(request);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: parsed.status ?? 400 });
  const payload = normalizeInquiry(parsed.payloadInput);
  if (payload.website) return NextResponse.json({ success: true });

  // The browser may prefill this from a query string, but only a known catalog slug is retained.
  const catalogProduct = getInquiryProduct(payload.productSlug);
  if (!catalogProduct) payload.productSlug = "";

  const errors = validateInquiry(payload);
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please review the highlighted fields.", fieldErrors: errors }, { status: 422 });

  const attachments = await validateAttachments(parsed.files);
  if ("error" in attachments) return NextResponse.json({ error: attachments.error }, { status: attachments.status });

  const turnstile = await verifyTurnstile(payload.turnstileToken, ip);
  if (turnstile.configurationError) return NextResponse.json({ error: "Inquiry verification is not configured correctly. Please contact us directly." }, { status: 503 });
  if (!turnstile.valid) return NextResponse.json({ error: "Verification failed. Please refresh and try again." }, { status: 403 });

  const to = process.env.INQUIRY_TO_EMAIL ?? process.env.INQUIRY_EMAIL_TO;
  const from = process.env.INQUIRY_FROM_EMAIL ?? process.env.INQUIRY_EMAIL_FROM;
  const apiKey = process.env.RESEND_API_KEY;
  const missingConfiguration = [!to && "INQUIRY_TO_EMAIL", !from && "INQUIRY_FROM_EMAIL", !apiKey && "RESEND_API_KEY"].filter(Boolean).join(", ");
  if (!to || !from || !apiKey) {
    logDelivery("inquiry_delivery_configuration_missing", payload, false, missingConfiguration);
    return NextResponse.json({ error: "Inquiry delivery is not configured yet. Please contact us directly." }, { status: 503 });
  }

  try {
    await sendEmail({ to, from, subject: subjectFor(payload), text: emailText(payload, attachments), replyTo: payload.email, attachments });
    if (process.env.INQUIRY_SEND_CONFIRMATION === "true") {
      try {
        await sendEmail({ to: payload.email, from, subject: "We received your SOOYAN project inquiry", text: "Thank you for contacting SOOYAN.\n\nWe’ve received your project information and will review the details provided.\n\nIf additional information is needed, our team will contact you using the email address submitted.\n\nSOOYAN\nProduct Development, Private Label & Packaging Solutions" });
      } catch {
        logDelivery("inquiry_confirmation_delivery_failed", payload, false, "provider_rejected");
      }
    }
    logDelivery("inquiry_delivery_completed", payload, true);
    return NextResponse.json({ success: true });
  } catch {
    logDelivery("inquiry_delivery_failed", payload, false, "provider_rejected");
    return NextResponse.json({ error: "We could not send your inquiry. Please try again later." }, { status: 502 });
  }
}
