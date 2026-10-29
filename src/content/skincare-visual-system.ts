import type { SkincareVisualFamilyDefinition } from "@/types/content";

export const skincareVisualFamilies: SkincareVisualFamilyDefinition[] = [
  {
    id: "copper-peptide",
    name: "GHK-Cu / Copper Peptide",
    colorDirection: ["Deep cobalt", "Cool blue", "Restrained copper", "Soft silver"],
    materialDirection: ["Frosted glass", "Translucent serum", "Brushed-metal accent"],
    productForms: ["Prestige serum bottle", "Minimal dropper or airless format"],
    primaryFeeling: ["Advanced", "Precise", "High-performance", "Premium"],
    prohibitedStyles: ["Generic blue dropper", "Medical packaging", "Excessive metallic decoration"],
    labelTemplate: { brand: "SOOYAN", collection: "GHK-Cu", productName: "Copper Peptide Serum", descriptor: "Advanced Peptide Care" },
  },
  {
    id: "pdrn",
    name: "PDRN",
    colorDirection: ["Clear glass", "Pale blush", "Soft pink", "Silver"],
    materialDirection: ["Transparent liquid", "Fine glass", "Soft reflected light"],
    productForms: ["Ampoule", "Vial", "Refined treatment format"],
    primaryFeeling: ["Refined", "Hydrating", "Recovery-focused", "Light", "Premium"],
    prohibitedStyles: ["Injection aesthetic", "Bright pink cosmetics", "Generic airless bottle"],
    labelTemplate: { brand: "SOOYAN", collection: "PDRN", productName: "Recovery Ampoule", descriptor: "Hydration Treatment" },
  },
  {
    id: "peptide-barrier",
    name: "Peptide / Barrier",
    colorDirection: ["Ivory", "Warm white", "Beige", "Soft silver"],
    materialDirection: ["Soft translucent packaging", "Satin glass", "Calm cream surfaces"],
    productForms: ["Daily serum", "Barrier emulsion", "Soft airless format"],
    primaryFeeling: ["Healthy aging", "Barrier care", "Skin longevity", "Daily prestige skincare"],
    prohibitedStyles: ["Clinical blue", "Heavy medical graphics", "Basic pharmacy packaging"],
    labelTemplate: { brand: "SOOYAN", collection: "PEPTIDES", productName: "Multi-Peptide Firming Serum", descriptor: "Daily Peptide Care" },
  },
  {
    id: "advanced-treatment",
    name: "Advanced Mask / Treatment",
    colorDirection: ["Transparent", "Pearl", "Warm ivory", "Soft silver"],
    materialDirection: ["Hydrogel", "Translucent membrane", "Glossy hydrated texture"],
    productForms: ["Water-activated membrane", "Hydrogel mask", "Treatment sachet"],
    primaryFeeling: ["Innovative", "Tactile", "Technology-led", "Premium treatment"],
    prohibitedStyles: ["Generic sheet-mask sachet", "Crowded ingredient graphics"],
    labelTemplate: { brand: "SOOYAN", collection: "ADVANCED TREATMENT", productName: "Water-Activated Collagen Peptide Mask", descriptor: "Transformative Treatment" },
  },
];
