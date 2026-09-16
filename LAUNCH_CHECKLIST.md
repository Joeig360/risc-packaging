# Launch Checklist

## Domain

- [ ] Confirm the production domain and set `NEXT_PUBLIC_SITE_URL` without a trailing slash.
- [ ] Confirm HTTPS and production canonical URLs.

## SEO

- [x] Unique metadata, canonical paths, Open Graph defaults, sitemap, and robots are configured.
- [ ] Verify rendered metadata against the final production domain.
- [ ] Add an approved redirect from `/solutions/pharma-professional` to `/solutions/pharma` if the old URL was publicly used.

## Content

- [x] Core, Solution, System, and Components pages are complete.
- [ ] Replace Concept Project examples with verified project material when available.
- [ ] Confirm production contact details before displaying them.

## Forms

- [x] The Start a Project form validates inputs and explicitly does not send data.
- [ ] Select and configure a production form delivery service.
- [ ] Add server-side validation, rate limiting, spam protection, and file scanning/storage controls.

## Legal

- [x] Baseline Privacy and Terms routes are available and noindexed.
- [ ] Obtain legal review before production launch.

## Analytics

- [ ] Choose analytics and consent approach before loading tracking scripts.
- [ ] Verify the domain in Google Search Console and submit `/sitemap.xml` after launch.

## Performance

- [x] Next Image AVIF/WebP settings and responsive sizes are configured.
- [ ] Add approved originals to `assets/images/source` before running batch Sharp optimization.
- [ ] Run Lighthouse/Web Vitals checks on the deployed production domain.

## Accessibility

- [x] Landmarks, form labels, status messaging, and active link names were reviewed.
- [ ] Perform final keyboard, screen-reader, contrast, and mobile tap-target QA.

## Links

- [x] Active navigation and Components routes use valid internal destinations.
- [ ] Configure a legacy redirect only if `/solutions/pharma-professional` was externally published.

## Images

- [x] Existing concept images use Next Image with reserved layouts and responsive sizes.
- [ ] Replace priority concept images with approved real photography when available.

## Security

- [x] No production API key or contact secret is committed in the repository.
- [ ] Populate server-only form and analytics configuration through the hosting environment.

## Final Browser QA

- [ ] Review desktop, tablet, and mobile screenshots on the deployed domain.
- [ ] Confirm no horizontal overflow, broken images, console errors, or unexpected redirects.
