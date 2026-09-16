# RISC Website Project Context

## Business Positioning
RISC is a packaging development and supply chain partner. It coordinates the path from an early idea, sample, image, drawing, existing pack, or requirement to a complete packaging system.

## Audience And Goals
The English-language site serves U.S. skincare, peptide, beauty, professional skincare, private-label, product development, buying, distribution, and professional-product teams. It must demonstrate product range, systems thinking, and a practical route to starting a project without complete specifications.

## Product Priorities
1. Peptide packaging systems P01-P06.
2. Premium skincare packaging.
3. Pharma/professional packaging without unsupported medical, regulatory, or performance claims.

## Information Architecture
Home; Solutions; Packaging Systems; Components; Capabilities; Projects; About; Start a Project. Components use a category-first model. Packaging systems have dedicated, reusable detail-route templates.

## Visual Direction
Premium, minimal, editorial U.S. B2B. Warm white and ivory surfaces, graphite typography, soft silver lines, clear product photography, and generous whitespace. Avoid marketplace styling, factory-photo-led layouts, blue-purple tech gradients, DNA motifs, cyberpunk, hospital imagery, dense cards, and filler copy.

## Design System
Tokens live in `src/app/globals.css`. The system uses a display serif plus restrained sans stack, fluid page/section spacing, 72rem content and 90rem wide containers, fine lines, small radii, one muted green accent, and replaceable image frames.

## Content Architecture
Strong TypeScript models define `ProductCategory`, `Product`, `PackagingSystem`, `Project`, `Capability`, and `ImageAsset`. Data lives in `src/content`, separate from route code. Images are optional assets in each record so AI concepts can later be replaced by real imagery without template rewrites.

## Primary CTA
`START A PROJECT`, supported by `Start with what you have.` The future form supports name, company, email, product/packaging type, estimated quantity, target market, project stage, message, and JPG/PNG/PDF upload.

## SEO
Metadata uses `createMetadata` in `src/lib/seo.ts`. Every route has its own title, description, and canonical path. `sitemap.ts` and `robots.ts` are included. Content follows semantic heading structure; image records include alt-text support.

## Constraints
No heavy CMS in Stage 1; no full homepage, complete product pages, bulk AI imagery, fabricated cases, testimonials, certificates, ecommerce, pricing, MOQ, or medical claims. Use data-driven additions before considering a CMS.

## Stage 2 Direction
Build the homepage as an image-led editorial product-discovery path: a full-bleed system-focused hero, product categories, featured packaging systems, application discovery, RISC's coordinated workflow, and a final project CTA. This stage needs a confirmed source for product imagery or approval to create a limited AI concept-image set.

Required homepage content, not implemented in Stage 1: approximately 12 packaging categories, 4-6 featured packaging systems, six application categories, approximately six featured products, What RISC Can Do for You, a Peptide Packaging feature, From Components to Complete Systems, Packaging Improvement, Projects, and Start With What You Have.
