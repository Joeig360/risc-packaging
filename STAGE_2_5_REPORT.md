# RISC Packaging Website - Stage 2.5 Report

## 1. Homepage Structure

The homepage was reduced from eleven sections to eight:

1. Hero
2. Explore Our Packaging
3. Featured Packaging Systems
4. Peptide Packaging Systems
5. From Components to Complete Systems
6. What RISC Can Do for You
7. Improve What You Already Have
8. Start With What You Have

## 2. Removed And Compressed Content

- Removed from the homepage: `FindPackagingSection` and `FeaturedPackagingSection`. Their product-discovery and showcase roles overlapped with Explore and Featured Systems.
- Removed from the homepage: `PackagingProjectsSection`. It remains available in the codebase but is not composed on the homepage because concept projects have limited visual value without verified project photography.
- `ExplorePackagingSection`: reduced from ten categories to eight on desktop and six visible categories on mobile, with `VIEW ALL PACKAGING` linking to `/components`.
- `FeaturedPackagingSystemsSection`: reduced from six systems to P01-P04. Mobile uses a horizontal snap rail rather than a long stack.
- `CapabilitiesSection`: condensed into a six-part editorial process band.
- `ImprovePackagingSection` and the final CTA both use tighter spacing and reduced typography scale.

## 3. Hero Adjustment

- Desktop hero height is now `calc(88svh - 5rem)`, measured at 712px in a 1440 x 900 viewport.
- Mobile hero height is 608px in a 390 x 844 viewport.
- The image focal point moved rightward to preserve a calm left-side text field.
- The headline, positioning, CTA copy, and business message are unchanged.

## 4. Peptide Placement

`PeptideFeatureSection` now follows Featured Packaging Systems, moving RISC's peptide focus into the first half of the homepage. It uses the peptide-serum system visual rather than repeating P01 immediately after the P01-P04 systems group.

## 5. Image Reuse

No new concept images were generated in Stage 2.5.

| Asset | Stage 2 uses | Stage 2.5 desktop uses |
| --- | ---: | ---: |
| Hero collection | 1 | 1 |
| P01 lyophilized peptide | 7 | 4 |
| P02 dual-vial | 6 | 4 |
| P03 five-vial | 6 | 3 |
| P04 ten-vial | 6 | 3 |
| Peptide serum system | 5 | 3 |
| Premium skincare set | 4 | 1 |

No asset exceeds four homepage uses. The closest repeated views are now deliberately separated by section purpose and altered crop ratio. Complete Systems uses narrow material-oriented crops rather than reusing full system-card framing.

## 6. Page-Length Change

| Viewport | Stage 2 height | Stage 2.5 height | Change |
| --- | ---: | ---: | ---: |
| Desktop, 1440 x 900 | 11,552px | 5,903px | -48.9% |
| Tablet, 1024 x 900 | 10,097px | 5,418px | -46.3% |
| Mobile, 390 x 844 | 20,511px | 7,676px | -62.6% |

Mobile section heights are now: Hero 608px, Explore 2,199px, Featured Systems 621px, Peptide 908px, Complete Systems 1,174px, Capabilities 737px, Improve 609px, and final CTA 508px.

## 7. Browser Validation

Validation used the local development server and Codex in-app browser. Network waterfall inspection is not available and was not performed.

### Desktop - 1440 x 900

- Eight homepage sections rendered in the intended order.
- Hero measured 712px, allowing product discovery to begin materially earlier than Stage 2.
- 19 image elements rendered, down from 35 in Stage 2.
- No console errors or warnings. No horizontal overflow.

### Tablet - 1024 x 900

- Homepage height reduced to 5,418px.
- Product grids, two-column featured systems layout, and CTA hierarchy rendered without overflow.
- No console errors or warnings.

### Mobile - 390 x 844

- Homepage height reduced to 7,676px.
- Explore displays six categories with a route CTA for the complete category set.
- Featured Systems uses a horizontal snap rail; the final project CTA remains reachable.
- No console errors, hydration issues, or horizontal overflow.
- Two lazy images were intentionally not requested because their corresponding Explore cards are hidden with `display: none` at this breakpoint. No visible image is broken.

## 8. Test Results

- `npm run lint`: passed.
- `npm run build`: passed.
- Next.js generated all 33 routes successfully.

## 9. Remaining Visual Risks

- The eight-image Explore grid remains the longest mobile section. Further reduction should wait for approved category-specific photography rather than removing core product discovery.
- The concept-image palette is still intentionally limited. Real photography should replace the hero and P01-P04 first because they remain the most visible assets.
- `Improve What You Already Have` is structurally clear but has no bespoke before/after image. A single neutral concept image could improve this area later if approved.

## 10. Homepage Status And Stage 3 Recommendation

Stage 2.5 meets its objective: the homepage is substantially shorter, more product-focused, and less repetitive while preserving the approved design system and Stage 2 content architecture.

Recommend freezing the homepage for Stage 2.5 approval. Stage 3 can begin only after user confirmation; no Stage 3 work was started.
