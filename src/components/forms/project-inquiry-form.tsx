"use client";

import { FormEvent, useState } from "react";

const projectTypes = ["Peptide Packaging", "Skincare Packaging", "Professional Packaging", "Components", "Packaging Improvement", "Not Sure Yet"];

export function ProjectInquiryForm() {
  const [status, setStatus] = useState<string | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setStatus("This inquiry form is not connected to a production delivery service. Your information has not been sent.");
  }
  return <form className="grid gap-5" onSubmit={submit} noValidate>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm">Name<input required name="name" autoComplete="name" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label><label className="grid gap-2 text-sm">Company<input required name="company" autoComplete="organization" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label><label className="grid gap-2 text-sm">Email<input required name="email" type="email" autoComplete="email" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label><label className="grid gap-2 text-sm">Country<input name="country" autoComplete="country-name" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm">Project Type<select required name="projectType" defaultValue="" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite"><option value="" disabled>Select one</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label className="grid gap-2 text-sm">Packaging Type<input name="packagingType" placeholder="Vial, carton, set, or not sure" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label><label className="grid gap-2 text-sm">Estimated Quantity<input name="quantity" inputMode="numeric" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label><label className="grid gap-2 text-sm">Target Timeline<input name="timeline" placeholder="If known" className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label></div>
    <label className="grid gap-2 text-sm">Existing Sample or Reference<input name="reference" type="file" accept=".jpg,.jpeg,.png,.pdf" className="border border-dashed border-line bg-paper px-3 py-3 text-sm" /><span className="text-xs leading-5 text-slate">Upload is displayed for project planning only. This non-production form does not transmit files.</span></label>
    <label className="grid gap-2 text-sm">Message<textarea required name="message" rows={6} className="border border-line bg-paper px-3 py-3 outline-none focus:border-graphite" /></label>
    <p className="text-xs leading-5 text-slate">By using this form, you understand that it is a non-production inquiry placeholder and no information is sent or stored.</p>
    <button type="submit" className="w-fit bg-graphite px-5 py-3 text-xs font-semibold tracking-[.13em] text-paper hover:bg-accent">CHECK INQUIRY DETAILS</button>
    {status && <p role="status" className="border-l-2 border-accent bg-ivory px-4 py-3 text-sm leading-6 text-graphite">{status}</p>}
  </form>;
}
