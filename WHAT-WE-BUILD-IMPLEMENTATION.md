# What We Build — Implementation Plan

Incremental plan for upgrading the **What We Build** section (Residential, Commercial, Tenant Improvements cards) with enlarged split-layout image panels, dual CTAs, and placeholder project routes.

**Status key:** `- [ ]` not started · `- [x]` done

---

## Current State

| Item | Location |
|------|----------|
| Section component | `components/ui/parallax-scroll-feature-section.tsx` |
| Section wrapper id | `#services` (homepage anchor) |
| Card layout | Side-by-side text + small square image (`size-72` / `size-80`) |
| Hero image reference | `components/ui/hero-parallax.tsx` — `h-96 w-[30rem]` full-bleed cover panels |
| Button primitive | `components/ui/button.tsx` (`default`, `outline`, `secondary`) |
| Nav / footer pattern | Inline header in `app/page.tsx` + `<SiteNav />` + `<Footer />` |
| Project routes | **None** — links would 404 today |

There is no separate Services page. Service deep-links should use homepage anchors (e.g. `/#services-residential`).

---

## Target URLs & Copy

| Card | Section anchor | Primary CTA | Secondary CTA |
|------|----------------|-------------|---------------|
| Residential | `/#services-residential` | Explore Residential Services | View Residential Projects → `/projects/residential` |
| Commercial | `/#services-commercial` | Explore Commercial Services | View Commercial Projects → `/projects/commercial` |
| Tenant Improvements | `/#services-tenant-improvements` | Explore Tenant Improvement Services | View Tenant Improvement Projects → `/projects/tenant-improvements` |

---

## Design Direction

- **Enlarged split layout** — keep the side-by-side text + image row on desktop; image grows from the current small square (`size-72` / `size-80`) to a large panel (~40% row width) with a tall aspect ratio. Text occupies the remaining ~60% beside it — **no overlay**.
- **Text treatment** — title + description in the text column on `bg-neutral-50`: `font-serif` headings in `text-neutral-900`, body in `text-neutral-600`. No gradient or dark overlay on the image.
- **CTAs (Phase 4)** — primary: `Button` `default` (brand navy); secondary: `Button` `outline`. Both sit in the **text column** below the description, not over the image.
- **Motion** — preserve existing scroll-driven reveal (opacity / clip-path / translate) on the image panel; adapt sizing/clip targets to the larger panel.
- **Alternating layout** — keep `reverse` as-is to flip which side the image appears on (desktop). Mobile: stack **image above text**, image still prominent.
- **Section rhythm** — retain `bg-neutral-50` section background; light-on-light text column contrasts with bold photo panels (consistent with About `bg-brand-dark` + feature `bg-neutral-50` pattern).

---

## Phase 1 — Placeholder Project Pages

**Goal:** `/projects/*` routes resolve with site chrome; no 404s when CTAs ship.

### Tasks

- [x] **1.1** Extract a reusable site header from `app/page.tsx` (e.g. `components/site-header.tsx`) — logo + fixed nav, same classes as homepage.
- [x] **1.2** Create a minimal inner-page layout pattern: `<SiteHeader />` + `<main>` + `<Footer />`.
- [x] **1.3** Add `app/projects/residential/page.tsx` — "Coming Soon" message, category title, link back home.
- [x] **1.4** Add `app/projects/commercial/page.tsx` — same pattern.
- [x] **1.5** Add `app/projects/tenant-improvements/page.tsx` — same pattern.
- [x] **1.6** Style coming-soon pages: `bg-neutral-50` or `bg-brand-dark` hero band, centered `font-serif` heading, muted body copy — consistent with About/Footer aesthetic.
- [x] **1.7** Smoke-test all three routes in dev.

### Files to create / touch

```
components/site-header.tsx                (new)
components/site-page-shell.tsx            (new)
components/projects/project-coming-soon.tsx (new)
app/projects/residential/page.tsx         (new)
app/projects/commercial/page.tsx          (new)
app/projects/tenant-improvements/page.tsx (new)
app/page.tsx                              (refactor to use SiteHeader)
```

### Acceptance criteria

- Visiting `/projects/residential`, `/projects/commercial`, `/projects/tenant-improvements` shows nav, footer, and a clear "Coming Soon" state.
- No layout shift or missing logo on project pages.

---

## Phase 2 — Data Model & Service Anchors

**Goal:** Each card has stable ids and link targets before layout changes.

### Tasks

- [x] **2.1** Extend `FeatureSection` type with:
  - `slug`: `"residential" | "commercial" | "tenant-improvements"`
  - `servicesHref`: `"/#services-residential"` etc.
  - `projectsHref`: `"/projects/residential"` etc.
  - `primaryCtaLabel` / `secondaryCtaLabel` (or derive from title)
- [x] **2.2** Update `sections` array with slug + href fields for all three cards.
- [x] **2.3** Add per-card `id` on each row wrapper: `id="services-residential"`, `id="services-commercial"`, `id="services-tenant-improvements"`.
- [x] **2.4** Verify anchor scroll: `/#services-residential` lands on the correct card (account for fixed header offset if needed — `scroll-mt-24` on card ids).
- [x] **2.5** *(Optional, same phase or later)* Update `components/site-nav.tsx` service dropdown links from `#` to the new anchors.

### Files to touch

```
lib/service-sections.ts                     (new)
components/ui/parallax-scroll-feature-section.tsx
components/site-nav.tsx                 (optional)
```

### Acceptance criteria

- Each card is individually linkable from the URL bar.
- Data drives all hrefs — no hardcoded strings scattered in JSX.

---

## Phase 3 — Enlarged Split Layout

**Goal:** Keep the side-by-side text + image layout, but significantly enlarge the image so it takes up roughly 40% of the section width, with text occupying the remaining space alongside it.

### Tasks

- [x] **3.1** Retain the two-column flex row per card on desktop (`md:flex-row` / `md:flex-row-reverse` via `reverse`). Do **not** switch to full-width/full-bleed overlay panels.
- [x] **3.2** Enlarge the image from `size-72` / `size-80` to a large panel ~**40% row width** with a tall aspect ratio (e.g. `w-full md:w-[40%]` + `aspect-[3/4]` or `min-h-[420px] md:min-h-[520px]`). Use `object-cover` on the image. Ensure source assets render sharply at the larger size (local PNGs in `public/images/projects/`; use adequate `width`/`height` or `fill` + `sizes` for Next.js `Image`).
- [x] **3.3** Text column occupies the remaining ~**60%** beside the image — title, description, and (in Phase 4) CTAs live here. No text overlaid on the image.
- [x] **3.4** **No gradient/dark overlay** on the image — text legibility comes from the separate light text column, not from image treatment.
- [x] **3.5** Keep existing typography on the text side: title `font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900`, description `text-base md:text-lg text-neutral-600 leading-relaxed`.
- [x] **3.6** Keep the `reverse` flag as-is to alternate which side the image appears on (left vs right on desktop).
- [x] **3.7** Preserve scroll-driven motion (opacity, clip-path, translateY) on the image panel — adapt clip/reveal dimensions to the larger panel rather than the small square thumbnail.
- [x] **3.8** Desktop spacing: generous gap between columns (`md:gap-16` / `md:gap-24`); section header ("What We Build") stays above rows. Each row retains `min-h-screen` or equivalent vertical rhythm.
- [x] **3.9** Mobile: stack **image above text** (`flex-col`); image remains prominent (full width, tall aspect — do not shrink back to `size-72`). Text block below with comfortable padding.

### Files to touch

```
components/ui/parallax-scroll-feature-section.tsx
lib/service-sections.ts               (image paths already local; verify dimensions)
```

### Acceptance criteria

- On desktop, each card is a clean **two-column split**: ~40% image panel + ~60% text block side by side.
- Text is never overlaid on the image; no gradient overlays on photos.
- Image is visibly much larger than the current small square and feels like a premium feature panel.
- `reverse` correctly alternates image left/right on desktop.
- On mobile, image stacks above text and stays visually dominant.
- Scroll reveal animations still run smoothly on the enlarged image panel.

---

## Phase 4 — Dual CTA Buttons

**Goal:** Each card has primary (services anchor) and secondary (projects page) actions.

> **Layout note:** CTAs render in the **text column** below the description (Phase 3 split layout), not over the image. Use standard light-background button styles — not overlay/white-on-dark variants.

### Tasks

- [ ] **4.1** Import `Button` and `Link` into the feature section component.
- [ ] **4.2** Add CTA row below description in the text column: `flex flex-col sm:flex-row gap-3 md:gap-4 mt-8`.
- [ ] **4.3** Primary button: `<Button asChild><Link href={section.servicesHref}>…</Link></Button>` — `size="lg"`, default brand navy variant.
- [ ] **4.4** Secondary button: `<Button variant="outline" asChild>…</Button>` — standard outline styles for light `bg-neutral-50` text column.
- [ ] **4.5** Confirm primary links work from project pages (absolute path `/#services-*`).
- [ ] **4.6** Confirm secondary links hit Phase 1 placeholder pages.

### Files to touch

```
components/ui/parallax-scroll-feature-section.tsx
```

### Acceptance criteria

- Three cards × two buttons = six working links.
- Buttons match site premium feel (not default unstyled links).
- Keyboard focus rings visible on CTAs.

---

## Phase 5 — Polish & Consistency

**Goal:** Production-ready finish across breakpoints, a11y, and site-wide consistency.

### Tasks

- [ ] **5.1** Fixed header offset: add `scroll-mt-20 md:scroll-mt-24` on card anchor ids.
- [ ] **5.2** `alt` text on images — descriptive per category.
- [ ] **5.3** Reduce motion: respect `prefers-reduced-motion` (disable or simplify framer animations).
- [ ] **5.4** Lighthouse / visual pass on mobile, tablet, desktop.
- [ ] **5.5** *(Optional)* Add `metadata` titles on project placeholder pages.
- [ ] **5.6** *(Optional)* Update footer or nav "Projects" links to category pages.
- [ ] **5.7** Remove dead code: old small-image sizing classes (`size-72` / `size-80`) once Phase 3 layout ships.

### Acceptance criteria

- No regressions to homepage scroll performance.
- Section feels cohesive with About (`brand-dark`) and Partners sections.
- All checkboxes in Phases 1–4 marked complete.

---

## Suggested Implementation Order

Work phases **sequentially** — each builds on the last:

```
Phase 1 (routes)  →  Phase 2 (data/anchors)  →  Phase 3 (layout)  →  Phase 4 (CTAs)  →  Phase 5 (polish)
```

Phases 1 and 2 can be parallelized if preferred, but **Phase 4 should wait until Phase 1** (project routes exist).

---

## Reference Snippets

### Extended section type (Phase 2)

```ts
type FeatureSection = {
  id: number;
  slug: "residential" | "commercial" | "tenant-improvements";
  title: string;
  description: string;
  imageUrl: string;
  servicesHref: string;
  projectsHref: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  reverse: boolean; // alternate image left/right on desktop
};
```

### Split layout sketch (Phase 3–4)

```tsx
<div
  id={serviceSectionAnchor(section.slug)}
  className="scroll-mt-20 md:scroll-mt-24 flex min-h-screen flex-col items-center justify-center gap-12 px-4 md:flex-row md:gap-24 md:px-10"
>
  {/* Text column ~60% — CTAs added in Phase 4 */}
  <motion.div className="w-full md:w-[55%] md:max-w-xl">
    <h3 className="font-serif text-4xl text-neutral-900 md:text-5xl lg:text-6xl">...</h3>
    <p className="mt-6 text-neutral-600 md:mt-10">...</p>
    <div className="mt-8 flex flex-wrap gap-4">{/* Primary + Secondary Button */}</div>
  </motion.div>

  {/* Image panel ~40% — scroll reveal, no overlay */}
  <motion.div className="relative w-full md:w-[40%] aspect-[3/4] overflow-hidden">
    <Image src={...} alt={...} fill className="object-cover" />
  </motion.div>
</div>
```

---

## Progress Log

| Date | Phase | Notes |
|------|-------|-------|
| 2026-06-11 | 1 | SiteHeader, SitePageShell, ProjectComingSoon; three `/projects/*` routes; `npm run build` passes |
| 2026-06-12 | 2 | `lib/service-sections.ts` with slugs, hrefs, CTA labels; per-card anchors + scroll offset; nav service links updated |
| 2026-06-12 | 3 | Enlarged split layout (~40/60); clip-path scroll reveal preserved on larger image panels |

_Update this table as we complete each phase._

---

## Out of Scope (for now)

- Full Projects gallery / CMS
- Dedicated `/services` page
- Real project filtering logic on category pages
- New photography assets (local project photos in `public/images/projects/` are in use; Unsplash no longer needed for this section)
