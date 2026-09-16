# Tooling Setup Report

Date: 2026-09-08

## 1. Git / GitHub

- **Git:** Available (`2.53.0.windows.3`).
- **Repository:** Initialized locally in this project with the `main` branch. No remote repository was created.
- **Git ignore:** Existing environment-file protection remains in place. `.env.example` is explicitly allowed; `.env.local` and original image files are ignored.
- **GitHub CLI:** Not installed.
- **GitHub connector:** Available and authenticated in Codex. No repository, issue, pull request, or remote state was changed.
- **Commit identity:** Not configured locally. A user name and email must be configured before the first commit.

Recommended branch strategy:

- `main`: production-ready, protected release branch.
- `develop`: integration branch for approved stages.
- `feature/<stage>-<scope>`: short-lived work, for example `feature/stage-2-homepage`.

Use focused conventional commits, for example `feat(home): add category discovery`, `feat(images): add P01 hero assets`, or `fix(ui): restore CTA contrast`.

## 2. Browser / DevTools

The Codex in-app browser is available and was tested against `http://localhost:3000`.

Available:

- Local browser preview and navigation.
- Full-page screenshots.
- DOM snapshots and semantic inspection.
- Console warning/error inspection.
- Read-only JavaScript runtime evaluation.
- Explicit responsive viewport override and reset.
- Page asset listing capability for later image checks.

Not directly exposed as a first-class capability:

- DevTools Network waterfall, request timing table, or request-header inspection.
- Built-in Lighthouse report.

The available browser tools are sufficient to test desktop/tablet/mobile layouts, console errors, visible broken-image states, layout behavior, DOM structure, and browser performance entries. Network analysis will require a manual browser DevTools session or a future approved test tool.

## 3. AI Image Generation

Available now:

- **Built-in OpenAI image generation:** Available through Codex for normal generation, editing, product mockups, and transparent-background requests. It does not require an `OPENAI_API_KEY` in this project.
- **OpenAI API/CLI fallback:** Available only if explicitly selected. It requires `OPENAI_API_KEY` and uses billable API usage.

Recommendation: use the built-in Codex image-generation workflow for individual RISC product concept images and revisions. Each selected project asset must then be copied into the workspace before it is referenced by the site. Use the API/CLI route only if a future approved bulk-generation workflow needs it.

No third-party image-generation service is connected. The optional Runway integration is not installed.

## 4. Image Pipeline

Tools:

- `next/image` for responsive delivery in the application.
- `sharp` for local, batchable source-image conversion.
- Next image settings prefer AVIF and WebP responses and define product-image-friendly device widths.

Directories:

```text
assets/images/source/          # Original local assets; ignored by Git
public/images/hero/
public/images/peptides/p01/ through p06/
public/images/skincare/
public/images/pharma/
public/images/components/
public/images/projects/
```

Usage:

1. Keep the original at `assets/images/source/<section>/<descriptive-name>.<ext>`.
2. Run `npm run images:optimize`.
3. The script preserves the relative path and writes both `*.webp` and `*.avif` under `public/images`.
4. Reference the chosen optimized asset through content data and `next/image`.

Naming convention examples: `p01-hero`, `p01-exploded`, `p01-open-box`, `p01-detail`, and `p01-customization`. Avoid generic or revision-only names.

The script accepts AVIF, JPEG, PNG, TIFF, and WebP source files, corrects orientation, avoids upscaling, limits output to 2400px wide, and retains alpha channels in WebP/AVIF. WebP quality is 88 and AVIF quality is 68 to preserve product edges and transparent detail without shipping full originals.

## 5. Optional Integrations

| Integration | Status | Notes |
| --- | --- | --- |
| GitHub | Available and authenticated | Connector available; GitHub CLI is not installed. |
| Figma | Available to install, not connected | Requires plugin installation and account authorization. |
| Stitch | Not available in current callable tools | No integration was added. |
| SEO tools | Not connected | Built-in metadata, sitemap, robots, and semantic HTML are available locally. |
| CMS | Not connected | Intentionally deferred; current content is TypeScript data. |
| Google Analytics | Requires authorization | Do not add until a measurement ID and consent approach are approved. |
| Search Console | Requires authorization | Requires site ownership verification after deployment. |
| Cloudinary | Requires authorization | Not connected; current local Sharp + Next Image pipeline is sufficient. |
| Sanity / Contentful | Requires authorization | Not connected; deferred to a demonstrated content-scale need. |
| Supabase | Requires authorization | Not connected; deferred until form/upload or data requirements are approved. |

## 6. Environment Variables

Defined as names only in `.env.example`:

```text
NEXT_PUBLIC_SITE_URL=
INQUIRY_EMAIL_TO=
INQUIRY_PROVIDER_API_KEY=
UPLOAD_STORAGE_BUCKET=
UPLOAD_STORAGE_REGION=
UPLOAD_STORAGE_ACCESS_KEY=
UPLOAD_STORAGE_SECRET_KEY=
OPENAI_API_KEY=
```

`OPENAI_API_KEY` is optional and must only be set when the explicit API/CLI image-generation fallback is approved. Never commit `.env.local`.

## 7. Tests Performed

- Verified Git installation and initialized local `main` branch.
- Verified GitHub connector authentication without changing GitHub state.
- Verified `.env.local` and original images are ignored by Git.
- Installed and verified `sharp` as the image-processing dependency.
- Ran `npm run images:optimize`; it correctly completed with an empty source directory.
- Ran `npm run lint`; passed with no warnings or errors.
- Ran `npm run build`; passed and generated all 31 static routes.
- Loaded the local app in the Codex browser, captured a full-page screenshot, inspected its DOM, and confirmed no console warnings/errors.
- Verified responsive viewport override/reset and CTA foreground contrast in the browser runtime.

## 8. Remaining Manual Actions

1. Configure local Git commit identity before the first commit: `git config --global user.name "..."` and `git config --global user.email "..."`.
2. Create or select a GitHub remote repository only when you authorize it; no remote exists yet.
3. Set `NEXT_PUBLIC_SITE_URL` once the production domain is decided.
4. For API-based image generation, create the key in the OpenAI platform and set `OPENAI_API_KEY` locally; do not send it in chat.
5. For the future inquiry form, choose an email provider and upload-storage provider before setting the corresponding server-side variables.
6. Connect optional Figma, analytics, CMS, Cloudinary, Search Console, or Supabase services only after you authorize the relevant account and scope.
