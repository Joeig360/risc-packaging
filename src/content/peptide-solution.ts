export const peptideSolution = {
  hero: {
    eyebrow: "PEPTIDE PACKAGING",
    title: "Peptide Packaging, Built as a System",
    copy: "RISC coordinates containers, dispensing components, inserts, cartons and specialized suppliers around your packaging requirements.",
    primaryCta: { label: "EXPLORE PACKAGING SYSTEMS", href: "#packaging-systems" },
    secondaryCta: { label: "START A PROJECT", href: "/start-a-project" },
    images: [
      { src: "/images/packaging-systems/p01-lyophilized-peptide-concept-v1.png", alt: "Single-vial peptide packaging system", position: "center" },
      { src: "/images/packaging-systems/p04-ten-vial-premium-concept-v1.png", alt: "Premium ten-vial peptide packaging kit", position: "center" },
      { src: "/images/packaging-systems/peptide-serum-system-concept-v1.png", alt: "Premium peptide serum dropper packaging system", position: "center" },
      { src: "/images/packaging-systems/p06-airless-hero-concept-v1.png", alt: "Airless peptide serum packaging system", position: "center" },
    ],
  },
  groups: [
    { id: "vial", label: "CORE BIOTECH", title: "Vial Packaging Systems", slugs: ["lyophilized-peptide-packaging", "dual-vial-peptide-kit"], featuredSlug: undefined },
    { id: "kits", label: "MULTI-UNIT ORGANIZATION", title: "Multi-Vial Kits", slugs: ["five-vial-treatment-kit", "10-vial-premium-peptide-kit"], featuredSlug: "10-vial-premium-peptide-kit" },
    { id: "serums", label: "PREMIUM SKINCARE DISPENSING", title: "Peptide Serum Packaging", slugs: ["peptide-serum-dropper-system", "airless-peptide-serum"], featuredSlug: undefined },
  ],
  completeSystem: {
    eyebrow: "SYSTEM THINKING",
    title: "From Primary Packaging to Complete Kits",
    copy: "RISC brings specialized packaging components into one considered project direction.",
    routes: [
      { name: "Vial Route", items: ["Vial", "Closure", "Label", "Insert", "Carton"] },
      { name: "Serum Route", items: ["Bottle", "Dropper / Airless Pump", "Decoration", "Insert", "Carton"] },
    ],
  },
  formats: ["Lyophilized Vials", "Dual-Component Kits", "Multi-Vial Sets", "Peptide Serums", "Dropper Formats", "Airless Formats"],
  coordination: ["Vial / bottle supplier", "Closure / dispensing supplier", "Printing / decoration", "Insert supplier", "Carton supplier", "Assembly / inspection"],
  capabilities: [
    { name: "DEVELOP", copy: "Define system direction and component requirements." },
    { name: "SOURCE", copy: "Match specialized packaging suppliers." },
    { name: "COORDINATE", copy: "Manage components across multiple vendors." },
    { name: "INSPECT", copy: "Check appearance, fit and packaging consistency." },
    { name: "CONSOLIDATE", copy: "Bring components together for final inspection." },
    { name: "DELIVER", copy: "Prepare consolidated packaging for shipment." },
  ],
  start: ["Photo", "Sample", "Drawing", "Existing Packaging", "Product Requirements", "Idea"],
} as const;
