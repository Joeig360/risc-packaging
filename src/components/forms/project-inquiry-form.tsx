"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { maxReferenceFiles, maxReferenceFileSizeBytes, maxReferenceFilesTotalBytes, referenceFileExtensions, inquiryLabels, inquiryTypes, type InquiryFieldErrors, type InquiryPayload, type InquiryType } from "@/lib/inquiry";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import type { InquiryProduct } from "@/lib/inquiry-products";

type FormValues = Omit<InquiryPayload, "customizationInterests"> & { customizationInterests: string[] };
const businessAreas = ["Packaging", "Skincare", "Both"];
const customizationOptions = ["Formula", "Packaging", "Branding", "Components"];
const emptyValues: FormValues = { inquiryType: "start-project", fullName: "", company: "", email: "", country: "", phone: "", message: "", businessArea: "", quantity: "", launchTiming: "", productName: "", productCode: "", productSlug: "", shippingCountry: "", customizationInterests: [], sourceUrl: "/start-a-project", website: "", consent: false, turnstileToken: "" };

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
function analyticsEvent(name: string, values: FormValues) { if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, inquiry_type: values.inquiryType, source_page: values.sourceUrl, product_code: values.productCode || undefined }); }
function FieldError({ error }: { error?: string }) { return error ? <span className="text-xs leading-5 text-[#9e3d30]">{error}</span> : null; }

type InquiryFormContext = { inquiryType?: string; sourceUrl?: string; productCode?: string; productName?: string };

export function ProjectInquiryForm({ initialProduct, initialContext = {} }: { initialProduct?: InquiryProduct; initialContext?: InquiryFormContext }) {
  const [values, setValues] = useState<FormValues>(() => {
    const candidate = initialContext.inquiryType;
    const inquiryType = inquiryTypes.includes(candidate as InquiryType) ? candidate as InquiryType : "start-project";
    const candidateSource = initialContext.sourceUrl;
    const sourceUrl = candidateSource?.startsWith("/") && !candidateSource.startsWith("//") ? candidateSource : "/start-a-project";
    const productSlug = initialProduct?.slug ?? "";
    return { ...emptyValues, inquiryType, sourceUrl, productName: initialProduct?.name ?? initialContext.productName ?? "", productCode: initialProduct?.code ?? initialContext.productCode ?? "", productSlug };
  });
  const openedValues = useRef(values);
  const isSubmitting = useRef(false);
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  useEffect(() => { analyticsEvent("inquiry_form_open", openedValues.current); }, []);
  function update(field: keyof FormValues, value: string | string[] | boolean) { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); }
  function updateFiles(selected: File[]) {
    const totalBytes = selected.reduce((total, file) => total + file.size, 0);
    const invalid = selected.find((file) => !referenceFileExtensions.includes(file.name.split(".").pop()?.toLowerCase() as typeof referenceFileExtensions[number]) || file.size > maxReferenceFileSizeBytes);
    if (selected.length > maxReferenceFiles || invalid || totalBytes > maxReferenceFilesTotalBytes) {
      setFiles([]);
      setFileError(`Upload up to ${maxReferenceFiles} JPG, PNG, PDF, XLSX or DOCX files. Each file may be up to 4 MB, with a 4 MB total.`);
      return;
    }
    setFiles(selected);
    setFileError("");
  }
  function toggleInterest(interest: string) { update("customizationInterests", values.customizationInterests.includes(interest) ? values.customizationInterests.filter((item) => item !== interest) : [...values.customizationInterests, interest]); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting.current || status === "submitting") return;
    isSubmitting.current = true; setStatus("submitting"); setErrors({}); setFormError(""); analyticsEvent("inquiry_form_submit", values);
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(values));
      files.forEach((file) => formData.append("files", file));
      const response = await fetch("/api/inquiries", { method: "POST", body: formData });
      const result = await response.json() as { success?: boolean; error?: string; fieldErrors?: InquiryFieldErrors };
      if (!response.ok || !result.success) { setErrors(result.fieldErrors ?? {}); setFormError(result.error ?? "We could not submit your inquiry. Please try again."); setStatus("error"); isSubmitting.current = false; analyticsEvent("inquiry_form_error", values); return; }
      setStatus("success"); analyticsEvent("inquiry_form_success", values);
    } catch { setFormError("We could not submit your inquiry. Please check your connection and try again."); setStatus("error"); isSubmitting.current = false; analyticsEvent("inquiry_form_error", values); }
  }
  if (status === "success") return <div className="border-l-2 border-accent bg-paper px-5 py-6" role="status"><p className="font-display text-3xl">Thank you.</p><p className="mt-3 max-w-lg text-sm leading-6 text-slate">Your inquiry has been received. Our team will review the project details and follow up shortly.</p></div>;

  const isProject = values.inquiryType === "start-project";
  const isSamples = values.inquiryType === "samples";
  const isCustomize = values.inquiryType === "customize";
  const inputClass = "w-full border border-line bg-paper px-3 py-3 outline-none transition-colors focus:border-graphite";
  const labelClass = "grid gap-2 text-sm text-graphite";
  return <form className="grid gap-5" onSubmit={submit} noValidate>
    <fieldset className="grid gap-3 border-b border-line pb-5"><legend className="text-xs font-semibold tracking-[.14em] text-slate">INQUIRY TYPE</legend><div className="flex flex-wrap gap-2">{inquiryTypes.map((type) => <label className={`cursor-pointer border px-3 py-2 text-xs tracking-[.08em] ${values.inquiryType === type ? "border-graphite bg-graphite text-paper" : "border-line text-slate"}`} key={type}><input className="sr-only" type="radio" name="inquiryType" value={type} checked={values.inquiryType === type} onChange={() => update("inquiryType", type)} />{inquiryLabels[type].toUpperCase()}</label>)}</div></fieldset>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className={labelClass}>Full Name<input value={values.fullName} onChange={(event) => update("fullName", event.target.value)} autoComplete="name" className={inputClass} /><FieldError error={errors.fullName} /></label>
      <label className={labelClass}>Company<input value={values.company} onChange={(event) => update("company", event.target.value)} autoComplete="organization" className={inputClass} /><FieldError error={errors.company} /></label>
      <label className={labelClass}>Work Email<input type="email" value={values.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" className={inputClass} /><FieldError error={errors.email} /></label>
      <label className={labelClass}>Country / Region<input value={values.country} onChange={(event) => update("country", event.target.value)} autoComplete="country-name" className={inputClass} /><FieldError error={errors.country} /></label>
    </div>
    <label className={labelClass}>Phone / WhatsApp <span className="text-xs text-slate">Optional</span><input value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" className={inputClass} /></label>
    {isProject ? <label className={labelClass}>Product / Packaging Interest <span className="text-xs text-slate">Optional</span><input value={values.productName} onChange={(event) => update("productName", event.target.value)} className={inputClass} /></label> : null}
    {isProject && <div className="grid gap-5 sm:grid-cols-3"><label className={labelClass}>Business Area<select value={values.businessArea} onChange={(event) => update("businessArea", event.target.value)} className={inputClass}><option value="">Select one</option>{businessAreas.map((area) => <option key={area}>{area}</option>)}</select><FieldError error={errors.businessArea} /></label><label className={labelClass}>Estimated Quantity<input value={values.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="If known" className={inputClass} /></label><label className={labelClass}>Target Launch Timing<input value={values.launchTiming} onChange={(event) => update("launchTiming", event.target.value)} placeholder="If known" className={inputClass} /></label></div>}
    {!isProject && <div className="grid gap-5 sm:grid-cols-2"><label className={labelClass}>Product / System Name<input value={values.productName} onChange={(event) => update("productName", event.target.value)} className={inputClass} /><FieldError error={errors.productName} /></label><label className={labelClass}>Product Code<input value={values.productCode} onChange={(event) => update("productCode", event.target.value)} className={inputClass} /></label>{isSamples && <><label className={labelClass}>Quantity Requested<input value={values.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="If known" className={inputClass} /></label><label className={labelClass}>Shipping Country<input value={values.shippingCountry} onChange={(event) => update("shippingCountry", event.target.value)} className={inputClass} /></label></>}{isCustomize && <><fieldset className="sm:col-span-2"><legend className="text-sm text-graphite">Customization Interests</legend><div className="mt-2 flex flex-wrap gap-2">{customizationOptions.map((interest) => <label className={`cursor-pointer border px-3 py-2 text-xs ${values.customizationInterests.includes(interest) ? "border-graphite bg-graphite text-paper" : "border-line text-slate"}`} key={interest}><input className="sr-only" type="checkbox" checked={values.customizationInterests.includes(interest)} onChange={() => toggleInterest(interest)} />{interest}</label>)}</div><FieldError error={errors.customizationInterests} /></fieldset><label className={labelClass}>Target Quantity<input value={values.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="If known" className={inputClass} /></label></>}</div>}
    <label className={labelClass}>Reference Files <span className="text-xs text-slate">Optional · JPG, PNG, PDF, XLSX or DOCX · 4 MB total</span><input type="file" multiple accept=".jpg,.jpeg,.png,.pdf,.xlsx,.docx" onChange={(event) => updateFiles(Array.from(event.target.files ?? []))} className="w-full text-sm text-slate file:mr-4 file:border-0 file:bg-paper file:px-3 file:py-2 file:text-xs file:font-semibold file:tracking-[.08em] file:text-graphite" />{files.length ? <span className="text-xs text-slate">{files.length} file{files.length === 1 ? "" : "s"} ready to attach.</span> : null}{fileError ? <span className="text-xs leading-5 text-[#9e3d30]">{fileError}</span> : null}</label>
    <label className="sr-only" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} /></label>
    <label className={labelClass}>{isCustomize ? "Notes" : isSamples ? "Project Details" : "Message / Project Details"}<textarea rows={6} value={values.message} onChange={(event) => update("message", event.target.value)} className={inputClass} /><FieldError error={errors.message} /></label>
    {formError ? <p className="border-l-2 border-[#9e3d30] bg-[#fbf1ee] px-4 py-3 text-sm leading-6 text-[#7c2f24]" role="alert">{formError}</p> : null}
    <label className="flex items-start gap-3 text-xs leading-5 text-slate"><input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1 size-4 accent-graphite" /> <span>I agree that SOOYAN may use the information provided to review and respond to this project inquiry. <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link></span></label><FieldError error={errors.consent} />
    <TurnstileWidget onToken={(token) => update("turnstileToken", token)} onError={() => setFormError("Verification could not be completed. Please refresh and try again.")} />
    <button type="submit" disabled={status === "submitting"} className="w-fit bg-graphite px-5 py-3 text-[13px] font-semibold tracking-[.13em] text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? "SENDING..." : isSamples ? "REQUEST SAMPLES" : isCustomize ? "SEND CUSTOMIZATION REQUEST" : "START A PROJECT"}</button>
  </form>;
}
