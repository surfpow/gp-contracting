# What We Build — Implementation Plan

Incremental plan for upgrading the **What We Build** section (Residential, Commercial, Tenant Improvements cards) with large image panels, dual CTAs, and placeholder project routes.

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

- **Image-first panels** — full-width (edge-to-edge or near full-bleed within section), tall aspect ratio (~60–80vh per card), `object-cover`, similar visual weight to hero parallax cards.
- **Text treatment** — title + description overlaid on a dark gradient (`from-black/70` → transparent) or positioned in a bold split layout (text block over bottom-left / side on desktop). Use `font-serif` headings and `text-neutral-50` on dark overlays; body text `text-neutral-200/300`.
- **CTAs** — primary: `Button` `default` (brand navy); secondary: `outline` with light border on dark overlay (`border-white/30 text-white hover:bg-white/10`).
- **Motion** — preserve scroll-driven reveal (opacity / clip / translate) where it still fits; simplify if overlay layout conflicts with clip-path animation.
- **Section rhythm** — alternate light/dark or keep `bg-neutral-50` section with dark image panels for contrast (matches About `bg-brand-dark` + feature `bg-neutral-50` pattern).

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

- [ ] **2.1** Extend `FeatureSection` type with:
  - `slug`: `"residential" | "commercial" | "tenant-improvements"`
  - `servicesHref`: `"/#services-residential"` etc.
  - `projectsHref`: `"/projects/residential"` etc.
  - `primaryCtaLabel` / `secondaryCtaLabel` (or derive from title)
- [ ] **2.2** Update `sections` array with slug + href fields for all three cards.
- [ ] **2.3** Add per-card `id` on each row wrapper: `id="services-residential"`, `id="services-commercial"`, `id="services-tenant-improvements"`.
- [ ] **2.4** Verify anchor scroll: `/#services-residential` lands on the correct card (account for fixed header offset if needed — `scroll-mt-24` on card ids).
- [ ] **2.5** *(Optional, same phase or later)* Update `components/site-nav.tsx` service dropdown links from `#` to the new anchors.

### Files to touch

```
components/ui/parallax-scroll-feature-section.tsx
components/site-nav.tsx                 (optional)
```

### Acceptance criteria

- Each card is individually linkable from the URL bar.
- Data drives all hrefs — no hardcoded strings scattered in JSX.

---

## Phase 3 — Full-Width Image Panel Layout

**Goal:** Image becomes the dominant visual; text sits on or beside it in a premium layout.

### Tasks

- [ ] **3.1** Replace side-by-side flex row with a **single full-width panel** per card (`relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden`).
- [ ] **3.2** Image: `fill` + `object-cover` (or large fixed dimensions), bump Unsplash `w=` param to `1200`–`1600` for sharper panels.
- [ ] **3.3** Add gradient overlay (`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent` or lateral variant for alternating layouts).
- [ ] **3.4** Position content block (`absolute` bottom-left or centered) with max-width container (`max-w-2xl` / `max-w-3xl`), generous padding (`p-8 md:p-12 lg:p-16`).
- [ ] **3.5** Typography on overlay: title `font-serif text-4xl md:text-5xl lg:text-6xl text-white`, description `text-base md:text-lg text-neutral-200 leading-relaxed`.
- [ ] **3.6** Remove or repurpose `reverse` flag — use for alternating gradient/text position (left vs right) instead of image left/right.
- [ ] **3.7** Adapt scroll animations: apply motion to the panel or content block (fade/slide up on enter) rather than clip-path on a small thumbnail.
- [ ] **3.8** Spacing between cards: `space-y-0` or subtle gap; section header ("What We Build") stays above panels.
- [ ] **3.9** Mobile: ensure text remains readable; increase bottom gradient strength on small screens.

### Files to touch

```
components/ui/parallax-scroll-feature-section.tsx
next.config.ts                        (only if new image hosts added)
```

### Acceptance criteria

- At desktop and mobile, the image clearly dominates each card.
- Text is legible on all three images without hovering.
- Visual quality feels aligned with hero parallax (large, cinematic panels).

---

## Phase 4 — Dual CTA Buttons

**Goal:** Each card has primary (services anchor) and secondary (projects page) actions.

### Tasks

- [ ] **4.1** Import `Button` and `Link` into the feature section component.
- [ ] **4.2** Add CTA row below description: `flex flex-col sm:flex-row gap-3 md:gap-4 mt-8`.
- [ ] **4.3** Primary button: `<Button asChild><Link href={section.servicesHref}>…</Link></Button>` — `size="lg"`, consider `className` overrides for prominence on dark overlay.
- [ ] **4.4** Secondary button: `<Button variant="outline" asChild>…</Button>` — light border/text styles for dark background.
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
- [ ] **5.7** Remove dead code: old small-image layout, unused `reverse` semantics if replaced.

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
  reverse: boolean; // repurpose: alternate text alignment
};
```

### Panel structure sketch (Phase 3–4)

```tsx
<div id={`services-${section.slug}`} className="relative min-h-[70vh] w-full scroll-mt-24">
  <Image src={...} alt={...} fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
  <div className="absolute inset-0 flex items-end p-8 md:p-16">
    <div className="max-w-2xl">
      <h3>...</h3>
      <p>...</p>
      <div className="mt-8 flex flex-wrap gap-4">
        {/* Primary + Secondary Button */}
      </div>
    </div>
  </div>
</div>
```

---

## Progress Log

| Date | Phase | Notes |
|------|-------|-------|
| 2026-06-11 | 1 | SiteHeader, SitePageShell, ProjectComingSoon; three `/projects/*` routes; `npm run build` passes |

_Update this table as we complete each phase._

---

## Out of Scope (for now)

- Full Projects gallery / CMS
- Dedicated `/services` page
- Real project filtering logic on category pages
- New photography assets (continue using Unsplash placeholders until replaced)
