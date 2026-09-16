import type { ProductCategory } from "@/types/content";

const images = ["p01-lyophilized-peptide-concept-v1.png","peptide-serum-system-concept-v1.png","p06-airless-hero-concept-v1.png","skincare-bottle-jar-system-concept-v1.png","premium-skincare-set-concept-v1.png","p02-exploded-concept-v1.png","p05-open-box-concept-v1.png","p04-ten-vial-premium-concept-v1.png","p04-open-box-concept-v1.png","skincare-decoration-detail-concept-v1.png"];
export const productCategories: ProductCategory[] = [
  { id: "category-vials", slug: "vials", name: "Vials", shortDescription: "Glass vial systems and supporting components.", application: "peptide", featured: true, order: 1 },
  { id: "category-droppers", slug: "droppers", name: "Droppers", shortDescription: "Precision dispensing systems for serum formats.", application: "skincare", featured: true, order: 2 },
  { id: "category-airless", slug: "airless", name: "Airless", shortDescription: "Airless packaging for controlled product delivery.", application: "skincare", featured: true, order: 3 },
  { id: "category-serum-bottles", slug: "serum-bottles", name: "Serum Bottles", shortDescription: "Premium bottles for treatment and serum lines.", application: "skincare", featured: true, order: 4 },
  { id: "category-jars", slug: "jars", name: "Jars", shortDescription: "Cream jars with considered closure systems.", application: "skincare", featured: true, order: 5 },
  { id: "category-closures", slug: "closures", name: "Closures", shortDescription: "Caps, stoppers, and finish-matched closures.", application: "cross-category", featured: false, order: 6 },
  { id: "category-cartons", slug: "cartons", name: "Cartons", shortDescription: "Printed folding cartons and secondary packaging.", application: "cross-category", featured: true, order: 7 },
  { id: "category-rigid-boxes", slug: "rigid-boxes", name: "Rigid Boxes", shortDescription: "Premium rigid packaging for presentation and protection.", application: "cross-category", featured: true, order: 8 },
  { id: "category-inserts", slug: "inserts", name: "Custom Inserts", shortDescription: "Component-fit inserts for multi-part systems.", application: "professional", featured: false, order: 9 },
  { id: "category-labels-decoration", slug: "labels-decoration", name: "Labels & Decoration", shortDescription: "Surface treatments, labels, and print coordination.", application: "cross-category", featured: false, order: 10 },
];
productCategories.forEach((category, index) => { category.image = { src: index === 3 || index === 9 ? `/images/skincare/${images[index]}` : `/images/packaging-systems/${images[index]}`, alt: `${category.name} packaging concept`, ratio: "landscape" }; });
