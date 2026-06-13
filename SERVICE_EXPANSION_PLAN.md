# Service Pages — Pillar-and-Spoke Expansion Plan

Incremental plan for expanding the `/services` section from four flat service pages into a full pillar-and-spoke structure:

**New top-level overview**

- `/services`

**Three trimmed category hub pages** (gateway pages — detail moves to sub-pages)

- `/services/residential`
- `/services/commercial`
- `/services/specialized`

**Eight dedicated sub-service pages**

- `/services/residential/custom-home-construction`
- `/services/residential/home-renovations`
- `/services/residential/multi-family-development`
- `/services/commercial/commercial-construction`
- `/services/commercial/restaurant-bar-construction`
- `/services/specialized/structural-building-envelope` *(combined: Roofing + Steel Framing)*
- `/services/specialized/building-systems-upgrades` *(combined: T-Bar & Acoustic Solutions + EV Charging & Electrical)*
- `/services/specialized/accessibility-outdoor-living` *(combined: Accessibility Renovations + Outdoor Features / Sport Courts)*

**Unchanged deep-dive page** (no sub-pages; receives SEO/schema/FAQ parity in Phase 7)

- `/services/tenant-improvements`

Status key: - [ ] not started · - [x] done

---

## Context / Current State

| Item | Current State |
|------|----------------|
| Shared site chrome | `SitePageShell`, `SiteHeader`, `SiteNav`, and `Footer` exist and wrap all service routes |
| Existing service routes | Four flat pages at `/services/{residential,commercial,tenant-improvements,specialized}` — all render via `ServicePageLayout` |
| Existing components | `ServiceHero`, `ServiceOverview`, `ServiceSubServices`, `ServiceDeepDiveSection`, `ServicePageCtas`, `ServicePageLayout` |
| Existing data model | `lib/services-content.ts` — `contentMode: "subServices"` (Residential, Commercial, Specialized) or `"deepDive"` (Tenant Improvements); sub-service detail lives inline on hub pages |
| Slug helpers | `lib/service-sections.ts` — `ServicePageSlug`, `servicePageHref()`, `getServiceSection()` for homepage-aligned labels and project links |
| Nav | `components/site-nav.tsx` — Services dropdown links to four flat hub URLs; no sub-service links; no `/services` overview |
| SEO | No `app/sitemap.ts`; service routes lack per-page `metadata`; no JSON-LD on service pages; root `app/layout.tsx` metadata is still placeholder |
| Prior plan status | `SERVICE_PAGES_PLAN.md` Phases 1–5 complete; Phase 6 (polish + metadata) partially outstanding — folded into this expansion's Phase 8 |

**Scope notes from target architecture:**

- **Commercial hub cards:** two sub-services only (`Commercial Construction`, `Restaurant & Bar Construction`). The current hub's `Fitness Facility Development` entry is **not** carried forward — it has no sub-page URL and should be dropped from the hub card grid during content migration.
- **Specialized consolidation:** six current sub-services become three combined sub-pages. Each combined page must read as one cohesive page with distinct H2 sections, anchor ids, keywords, and FAQ groups per bundled service — not two stitched blurbs.
- **Image budget:** sub-service pages allow **at most one image** (hero or none). Hubs retain one representative image per linking card. Design quality must come from typography, spacing, and section rhythm — not imagery volume.

Implementation guardrails:

- Keep all copy and section structure data-driven via `lib/services-content.ts` — no marketing copy hardcoded in route-level JSX.
- Reuse `ServiceHero`, `ServiceOverview`, `ServicePageCtas`, and layout patterns before introducing new primitives.
- For long-form marketing copy not yet written, use clearly marked `/* TODO: copy */` placeholders — do not invent paragraphs.
- Migrate existing `subServices` summaries and bullets as seed content for the new sub-page objects.
- Keep `npm run build` green at the end of every phase.
- Match established aesthetic: `font-serif` headings, navy brand accents, `bg-neutral-50` + `bg-brand-dark` contrast, generous whitespace.

**Known content gaps (track before launch):**

- All 52 FAQ question/answer pairs across the 8 sub-pages, 6 bundled sections, and tenant-improvements currently use a generic 4-question template (`defaultFaqs()`) with `TODO_COPY` answers. These need a copywriting pass to become specific, SEO-targeted questions (cost, timeline, permits, scope, etc.) before Phase 7's FAQPage schema delivers real SEO value. This is a content task, not a Phase 4 blocker, but should be tracked so it isn't missed before launch.

---

## Phase 1 — Expansion Plan (This Document)

**Goal:** Produce a phased implementation plan for review before any feature code is written.

### Tasks

- [x] **1.1** Document target URL architecture (overview, hubs, eight sub-pages, tenant-improvements parity).
- [x] **1.2** Document combined-page handling requirements (H2 sections, anchor ids, per-service keywords and FAQs).
- [x] **1.3** Document data model expansion requirements in `lib/services-content.ts` and type updates in `lib/service-sections.ts`.
- [x] **1.4** Document design constraints (image-optional sub-pages, typographic premium layout, component reuse).
- [x] **1.5** Document technical SEO requirements (metadata, JSON-LD, sitemap, internal linking, nav).
- [x] **1.6** Define phased task breakdown with acceptance criteria and progress log — then **pause for stakeholder review**.

### Files to create / touch

```
SERVICE_EXPANSION_PLAN.md                            (new)
```

### Acceptance criteria

- Plan matches the format, tone, and rigor of `SERVICE_PAGES_PLAN.md`.
- All target routes, data shapes, SEO requirements, and design constraints are captured.
- Implementation order is explicit; no feature code has been written yet.
- Stakeholder has reviewed and approved before Phase 2 begins.

---

## Phase 2 — Routing Scaffold

**Goal:** Nested route folders and `page.tsx` stubs for every new URL, with zero 404s and stable shared layout — using placeholder renders only.

### Tasks

- [x] **2.1** Create `/services` overview route: `app/services/page.tsx`.
- [x] **2.2** Create nested sub-service routes (eight total):

  **Residential**

  - `app/services/residential/custom-home-construction/page.tsx`
  - `app/services/residential/home-renovations/page.tsx`
  - `app/services/residential/multi-family-development/page.tsx`

  **Commercial**

  - `app/services/commercial/commercial-construction/page.tsx`
  - `app/services/commercial/restaurant-bar-construction/page.tsx`

  **Specialized**

  - `app/services/specialized/structural-building-envelope/page.tsx`
  - `app/services/specialized/building-systems-upgrades/page.tsx`
  - `app/services/specialized/accessibility-outdoor-living/page.tsx`

- [x] **2.3** Keep existing hub routes (`residential`, `commercial`, `specialized`, `tenant-improvements`) rendering without regression during scaffold (may still use current layout until Phase 4).
- [x] **2.4** Add minimal stub content to each new route (e.g. `SitePageShell` + heading with slug) so `npm run build` passes.
- [x] **2.5** Add slug/path helper functions in `lib/service-sections.ts` (or a sibling module) for nested sub-service paths, e.g. `serviceSubPageHref("residential", "custom-home-construction")` → `/services/residential/custom-home-construction`.
- [x] **2.6** Smoke-test all 13 service URLs resolve (1 overview + 3 hubs + 1 tenant-improvements + 8 sub-pages).

### Files to create / touch

```
app/services/page.tsx                                              (new)
app/services/residential/custom-home-construction/page.tsx         (new)
app/services/residential/home-renovations/page.tsx                 (new)
app/services/residential/multi-family-development/page.tsx       (new)
app/services/commercial/commercial-construction/page.tsx           (new)
app/services/commercial/restaurant-bar-construction/page.tsx       (new)
app/services/specialized/structural-building-envelope/page.tsx     (new)
app/services/specialized/building-systems-upgrades/page.tsx        (new)
app/services/specialized/accessibility-outdoor-living/page.tsx     (new)
components/services/service-route-stub.tsx                         (new)
components/services/service-sub-page-stub.tsx                      (new)
lib/service-sections.ts                                            (touch, nested slug helpers)
```

### Acceptance criteria

- All 13 service URLs render with shared header/footer and no 404s.
- Nested folder structure matches the target architecture exactly.
- `npm run build` passes.
- No full content or layout work required yet — stubs only.

---

## Phase 3 — Data Model Expansion & Content Migration

**Goal:** Extend `lib/services-content.ts` to support hub pages, standalone sub-service pages, and combined bundled sections — with migrated seed content and `/* TODO: copy */` placeholders for long-form copy.

### Tasks

- [x] **3.1** Define `ServiceHubSlug` type: `"residential" | "commercial" | "specialized"`.
- [x] **3.2** Define nested `ServiceSubPageSlug` unions per hub (eight slugs total) and a composite `SubServicePath` type pairing `parentHub` + `slug`.
- [x] **3.3** Define **hub content shape** (`contentMode: "hub"`):

  - `slug`, `heroHeading`, `heroSubheading`, `heroImage`
  - trimmed `overview: string[]` (shorter than current — hub is a gateway, not a deep dive)
  - `linkingCards: { name, blurb, href, image }[]`
  - `projectsHref`, `projectsCtaLabel` (Specialized hub: quote-only — no projects CTA, per prior decision)
  - SEO fields: `title`, `metaDescription`

- [x] **3.4** Define **sub-service page content shape** (`contentMode: "subService"`):

  - `slug` (nested), `parentHub`
  - `title` / `h1` pairing service with location (Greater Vancouver, Vancouver Island, Fraser Valley)
  - `metaDescription`
  - `heroHeading`, `heroSubheading`, `heroImage?` (optional — omit for text-only heroes)
  - `overview: string[]` (seed from migrated summary; extended paragraphs as `/* TODO: copy */`)
  - `features` or `processSteps` section (expand migrated `bullets[]` into stepped/grid layout data)
  - `whyGp: { heading, body, pullQuote? }` — body as `/* TODO: copy */`
  - `faqs: { question, answer }[]` (3–5 per page; answers as `/* TODO: copy */` where needed)
  - `relatedSubServices: { name, href }[]` (sibling links within same hub)
  - `projectsHref` (down-link to `/projects/[category]`)
  - schema fields: `serviceType`, `areaServed: string[]`
  - `keywords: string[]` (location-paired)

- [x] **3.5** Define **combined sub-service page shape** — extends sub-service base with:

  - `bundledSections: { anchorId, heading, keywords, overview, features/processSteps, faqs }[]`
  - Required anchor ids:
    - `structural-building-envelope`: `#roofing`, `#steel-framing`
    - `building-systems-upgrades`: `#acoustic-ceilings`, `#ev-charging-electrical`
    - `accessibility-outdoor-living`: `#accessibility-renovations`, `#outdoor-features-sport-courts`

- [x] **3.6** Extend **tenant-improvements deep-dive** with SEO/FAQ/schema fields for parity:

  - `title`, `metaDescription`, `faqs[]`, `serviceType`, `areaServed`
  - Preserve existing `deepDive` body structure; add FAQ answers as `/* TODO: copy */` where needed

- [x] **3.7** Migrate existing `subServices` data into new sub-page objects:

  | Source (current hub) | Target sub-page slug |
  |----------------------|----------------------|
  | Custom Home Construction | `residential/custom-home-construction` |
  | Home Renovations | `residential/home-renovations` |
  | Multi-Family Development | `residential/multi-family-development` |
  | Commercial Construction | `commercial/commercial-construction` |
  | Restaurant & Bar Construction | `commercial/restaurant-bar-construction` |
  | Roofing + Steel Framing | `specialized/structural-building-envelope` (bundled) |
  | T-Bar & Acoustic + EV Charging | `specialized/building-systems-upgrades` (bundled) |
  | Accessibility + Outdoor Features | `specialized/accessibility-outdoor-living` (bundled) |

- [x] **3.8** Build hub `linkingCards` from sub-page names, blurbs, hrefs, and representative images (one image per card).
- [x] **3.9** Add accessor helpers: `getServiceHubContent()`, `getSubServicePageContent()`, `getAllServiceRoutes()` (for sitemap generation).
- [x] **3.10** Preserve type safety; update `ServicePageSlug` / exports in `lib/service-sections.ts` as needed without breaking project-page consumers.

### Files to create / touch

```
lib/services-content.ts                              (touch, major expansion)
lib/service-sections.ts                              (touch, nested slug types + href helpers)
```

### Acceptance criteria

- One centralized data source drives hubs, sub-pages, and tenant-improvements parity fields.
- All eight sub-pages have complete seed content (hero, overview, features/process, FAQs structure).
- Combined pages model `bundledSections` with correct anchor ids.
- Long-form copy uses `/* TODO: copy */` placeholders — no invented marketing paragraphs.
- `npm run build` passes with updated types (routes may still use stubs).

---

## Phase 4 — Hub Page Template

**Goal:** Refactor the three multi-item hub pages (Residential, Commercial, Specialized) into trimmed overview + linking-card grid layouts. Tenant Improvements remains on the deep-dive template.

### Tasks

- [x] **4.1** Create `ServiceHubLayout` (or refactor `ServicePageLayout` to branch on `contentMode`) for hub pages.
- [x] **4.2** Create `ServiceLinkingCards` component — responsive grid of cards, each with:
  - representative image
  - service name (`font-serif` heading)
  - short blurb
  - "Learn More" link → sub-service URL
- [x] **4.3** Trim hub `ServiceHero` + `ServiceOverview` to gateway-length copy (data-driven from hub content object).
- [x] **4.4** Remove inline `ServiceSubServices` full-detail rows from hub pages — detail moves to sub-pages only.
- [x] **4.5** Wire hub routes to new hub content mode:
  - `/services/residential` → 3 cards
  - `/services/commercial` → 2 cards (no Fitness Facility card)
  - `/services/specialized` → 3 cards
- [x] **4.6** Retain `ServicePageCtas` on hubs (Specialized: `Get a Quote` only).
- [x] **4.7** Validate responsive card grid across mobile/tablet/desktop.
- [x] **4.8** Remove the legacy adapter once residential, commercial, and specialized hubs are wired to `getServiceHubContent()`: delete `hubToLegacySubServicesPage()`, `subServicePageToLegacy()`, and `bundledSectionToLegacy()`; remove the adapter-built hub entries from the `servicePages` array; remove `contentMode: "subServices"` from the data model if nothing else produces it; and remove or deprecate the `ServiceSubServices` component if it has no remaining consumers after the hub refactor. `getServicePageContent()` and the deep-dive types/helpers **must** remain for tenant-improvements — only the hub-related adapter code is removed.

### Files to create / touch

```
components/services/service-hub-layout.tsx           (new, or refactor service-page-layout)
components/services/service-linking-cards.tsx          (new)
components/services/service-page-layout.tsx          (touch, deep-dive only for tenant)
components/services/service-page-ctas.tsx              (touch, accept hub + deep-dive props)
lib/services-content.ts                              (touch, remove legacy hub adapter)
components/services/service-subservices.tsx            (delete if no remaining consumers)
app/services/residential/page.tsx                    (touch)
app/services/commercial/page.tsx                     (touch)
app/services/specialized/page.tsx                    (touch)
app/services/tenant-improvements/page.tsx            (touch only if layout branching changes)
```

### Acceptance criteria

- Hub pages show short overview + linking-card grid only — no full sub-service detail sections.
- Every card links to the correct nested sub-service URL.
- Commercial hub shows exactly two cards.
- Specialized hub shows exactly three combined-service cards.
- Tenant Improvements still renders deep-dive layout unchanged.
- Legacy hub adapter code is removed; `npm run build` passes with no unused-export warnings for the removed functions.
- `npm run build` passes.

---

## Phase 5 — Sub-Service Page Template

**Goal:** Premium typographic sub-service layout supporting optional single image, combined bundled sections, FAQ accordion, and internal cross-links — without relying on imagery to carry the design.

### Tasks

- [x] **5.1** Create `ServiceSubPageLayout` composing:
  - `ServiceHero` variant with **optional** `heroImage` (text-only hero when omitted)
  - `ServiceOverview`
  - features/process section (numbered steps or clean feature grid — data-driven)
  - "Why GP Contracting Group" section (pull-quote or stat treatment)
  - bundled sections renderer (for combined pages only) — each with `id={anchorId}`, H2, keywords meta (rendered or data-only for SEO), content, and section-scoped FAQs
  - FAQ accordion / styled Q&A (`ServiceFaqSection`)
  - related sub-services links (sibling nav within hub)
  - back-to-hub link
  - `ServicePageCtas` (projects + quote, or quote-only for specialized sub-pages per hub policy)

- [x] **5.2** Extend `ServiceHero` to accept optional image — when absent, use full-width typographic hero on `bg-brand-dark` without image column.

- [x] **5.3** Create `ServiceFeaturesSection` — renders `processSteps[]` or `features[]` from data (numbered stepped layout matching `ServiceDeepDiveSection` rhythm).

- [x] **5.4** Create `ServiceWhyGpSection` — pull-quote/stat treatment on contrasting background.

- [x] **5.5** Create `ServiceFaqSection` — elegant accordion or styled Q&A list; accessible (`aria-expanded`, keyboard nav). Use Radix/shadcn Accordion if added, or a minimal custom disclosure — match brand typography.

- [x] **5.6** Create `ServiceBundledSections` — renders combined-page sections as cohesive page flow (not visually disjointed blocks).

- [x] **5.7** Create `ServiceRelatedLinks` — sibling sub-service links + back to hub + projects down-link.

- [x] **5.8** Wire all eight sub-service routes to `ServiceSubPageLayout` consuming Phase 3 data.

- [x] **5.9** Enforce image budget: at most one `Image` per sub-page render tree.

- [x] **5.10** Validate responsive behavior and hierarchy on pages with and without hero images.

### Files to create / touch

```
components/services/service-sub-page-layout.tsx      (new)
components/services/service-hero.tsx                 (touch, optional image)
components/services/service-features-section.tsx     (new)
components/services/service-why-gp-section.tsx     (new)
components/services/service-faq-section.tsx            (new)
components/services/service-bundled-sections.tsx     (new)
components/services/service-related-links.tsx        (new)
components/ui/accordion.tsx                          (new, if using shadcn accordion primitive)
app/services/residential/*/page.tsx                  (touch, all 3)
app/services/commercial/*/page.tsx                   (touch, all 2)
app/services/specialized/*/page.tsx                  (touch, all 3)
lib/services-content.ts                              (touch, if layout integration reveals gaps)
```

### Acceptance criteria

- All eight sub-pages render complete typographic layouts from data.
- Combined pages show distinct H2 sections with working in-page anchor ids.
- Each combined page includes per-section FAQs alongside page-level FAQs where modeled.
- Sub-pages with no `heroImage` still look intentional and premium.
- No sub-page renders more than one image.
- `npm run build` passes.

---

## Phase 6 — `/services` Overview Page

**Goal:** New top-level services overview linking to the four category hubs with homepage-quality presentation.

### Tasks

- [x] **6.1** Add overview page content to `lib/services-content.ts`:
  - hero heading/subheading + `heroIcon`
  - intro paragraphs
  - four hub cards: `{ name, blurb, href, icon, image? }` → residential, commercial, specialized, tenant-improvements
  - `title`, `metaDescription`

- [x] **6.2** Create `ServicesOverviewLayout` (or dedicated page component) — hero + intro + four hub linking cards (reuse `ServiceLinkingCards` or a variant).

- [x] **6.3** Wire `app/services/page.tsx` to overview layout and data.

- [x] **6.4** Add breadcrumb or subtle wayfinding (e.g. "Services" label in hero eyebrow) consistent with hub pages.

- [x] **6.5** Validate responsive layout and link targets for all four hub cards.

### Files to create / touch

```
app/services/page.tsx                                (touch, full implementation)
components/services/services-overview-layout.tsx     (new)
components/services/service-linking-cards.tsx        (touch, reuse or extend for hub-scale cards)
lib/services-content.ts                              (touch, overview content object)
```

### Acceptance criteria

- `/services` renders a complete overview with links to all four category destinations.
- Visual quality matches homepage bar (typography, spacing, brand colors).
- `npm run build` passes.

---

## Phase 7 — Technical SEO Pass

**Goal:** Per-page metadata, JSON-LD structured data, sitemap, and internal linking graph across the full services tree.

### Tasks

- [x] **7.1** Add `export const metadata` (`title` + `description`) to every service route:
  - `/services`
  - 4 hubs + tenant-improvements
  - 8 sub-pages

- [x] **7.2** Create JSON-LD helper(s) in `lib/` (e.g. `lib/service-schema.ts`):
  - **Service** schema per sub-page (`serviceType`, `areaServed`, provider, url)
  - **FAQPage** schema per sub-page (and tenant-improvements) from `faqs[]`
  - **LocalBusiness** schema helper (site-wide, rendered once): Richmond, BC; phone `+1 778 891 9076`; `areaServed`: Greater Vancouver, Vancouver Island, Fraser Valley

- [x] **7.3** Render JSON-LD via Next's recommended `<script type="application/ld+json">`:
  - **LocalBusiness** — once, site-wide, in `app/layout.tsx` (or a shared root-level component included there); do **not** repeat on individual service pages
  - **Service** + **FAQPage** — per sub-page and tenant-improvements via page components or a shared `ServiceJsonLd` component

- [x] **7.4** Create `app/sitemap.ts` including all service routes (overview, hubs, sub-pages, tenant-improvements) plus existing project routes.

- [x] **7.5** Wire internal links:
  - hub linking cards → sub-pages
  - sub-page → sibling `relatedSubServices`
  - sub-page → parent hub (breadcrumb or related links)
  - sub-page → `/projects/[category]` via `projectsHref`
  - overview → hubs

- [x] **7.6** Add tenant-improvements FAQ section + JSON-LD for parity with sub-pages.

- [x] **7.7** Verify combined-page anchor links are crawlable (real `id` attributes on H2 sections).

### Files to create / touch

```
lib/service-schema.ts                                (new)
components/services/service-json-ld.tsx                (new, optional — Service + FAQPage per page)
components/local-business-json-ld.tsx                  (new, optional — or inline in layout)
app/layout.tsx                                       (touch, site-wide LocalBusiness JSON-LD once)
app/sitemap.ts                                       (new)
app/services/page.tsx                                (touch, metadata)
app/services/residential/page.tsx                    (touch, metadata)
app/services/commercial/page.tsx                     (touch, metadata)
app/services/specialized/page.tsx                    (touch, metadata)
app/services/tenant-improvements/page.tsx            (touch, metadata + FAQ + JSON-LD)
app/services/residential/*/page.tsx                  (touch, metadata + JSON-LD, all 3)
app/services/commercial/*/page.tsx                   (touch, metadata + JSON-LD, all 2)
app/services/specialized/*/page.tsx                  (touch, metadata + JSON-LD, all 3)
components/services/service-faq-section.tsx          (touch, tenant-improvements integration)
lib/services-content.ts                              (touch, metadata field consumption)
```

### Acceptance criteria

- Every service URL exports meaningful `title` and `description`.
- Sub-pages and tenant-improvements emit valid Service + FAQPage JSON-LD.
- LocalBusiness schema is rendered once in `app/layout.tsx` (not duplicated on service pages).
- `app/sitemap.ts` lists all 13 service URLs.
- Internal link graph is complete with no broken paths.
- `npm run build` passes.

---

## Phase 8 — Nav, Cross-Linking, Accessibility & Final Polish

**Goal:** Update navigation to reflect pillar-and-spoke structure; complete responsive/a11y pass; resolve outstanding items from the prior plan's Phase 6.

### Tasks

- [x] **8.1** Update `components/site-nav.tsx` Services dropdown:
  - Top-level link to `/services` overview
  - Hub entries for Residential, Commercial, Tenant Improvements, Specialized
  - Nested sub-service links grouped under Residential, Commercial, and Specialized (desktop mega-menu columns; indented list on mobile)
  - Sub-service labels match data `name` fields

- [x] **8.2** Update homepage service section links (`lib/service-sections.ts` `servicesHref` values) from `/#services-*` anchors to `/services/[hub]` where appropriate.

- [x] **8.3** Audit and update footer service links (`components/sections/footer.tsx`) — e.g. the main "Services" nav item currently points at `/#services`; align footer service/project links with the new hub and sub-page structure where applicable.

- [x] **8.4** Responsive pass across all 13 service URLs (mobile/tablet/desktop).

- [x] **8.5** Accessibility pass:
  - descriptive alt text on all images (hubs, cards, optional sub-page heroes)
  - FAQ accordion keyboard and screen-reader behavior
  - `prefers-reduced-motion` respect on any accordion/transition animations
  - anchor scroll offset under fixed header for combined-page in-page links

- [x] **8.6** Visual consistency pass against homepage — typography, spacing, button treatment, section rhythm.

- [x] **8.7** Final QA smoke run: all routes, all internal links, metadata spot-check, sitemap spot-check.

- [x] **8.8** Update progress log in this document.

### Files to create / touch

```
components/site-nav.tsx                              (touch, pillar-and-spoke dropdown)
components/sections/footer.tsx                       (touch, service link audit)
lib/service-sections.ts                              (touch, homepage servicesHref alignment)
components/services/service-hero.tsx                 (touch, a11y + reduced motion)
components/services/service-faq-section.tsx          (touch, a11y)
components/services/service-linking-cards.tsx        (touch, responsive/a11y)
components/services/service-sub-page-layout.tsx      (touch, polish)
components/services/service-hub-layout.tsx           (touch, polish)
components/services/services-overview-layout.tsx     (touch, polish)
SERVICE_EXPANSION_PLAN.md                            (touch, progress log)
```

### Acceptance criteria

- Services nav reflects full hub + sub-service structure with working links.
- All 13 service pages are visually consistent and stable across breakpoints.
- Accessibility essentials (alt text, accordion a11y, reduced motion, scroll offsets) are in place.
- `npm run build` passes.
- No broken internal links across services/projects/contact paths.
- Ready for copywriting pass to replace `/* TODO: copy */` placeholders.

---

## Suggested Implementation Order

Execute phases sequentially:

```
Phase 1 (this plan — review gate)
→ Phase 2 (routing scaffold)
→ Phase 3 (data model + content migration)
→ Phase 4 (hub page template)
→ Phase 5 (sub-service page template)
→ Phase 6 (/services overview page)
→ Phase 7 (technical SEO)
→ Phase 8 (nav + a11y + polish)
```

Notes:

- **Phase 1 gate:** Do not start Phase 2 until this plan is reviewed and approved.
- Keep Phase 3 early so all downstream UI remains data-driven.
- Phase 4 and Phase 5 can be validated hub-by-hub (Residential first, then Commercial, then Specialized) within the phase, but complete each phase before moving on.
- Phase 7 depends on Phase 5 FAQ sections and Phase 6 overview route being in place.
- Specialized sub-pages and hub retain **quote-only** CTA policy (no projects button) unless explicitly revised.
- `npm run build` must pass at the end of every phase.

---

## Route & Content Reference

### Full URL map (13 pages)

| URL | Page type |
|-----|-----------|
| `/services` | Overview |
| `/services/residential` | Hub (3 cards) |
| `/services/commercial` | Hub (2 cards) |
| `/services/specialized` | Hub (3 cards) |
| `/services/tenant-improvements` | Deep-dive (unchanged structure + SEO parity) |
| `/services/residential/custom-home-construction` | Sub-service |
| `/services/residential/home-renovations` | Sub-service |
| `/services/residential/multi-family-development` | Sub-service |
| `/services/commercial/commercial-construction` | Sub-service |
| `/services/commercial/restaurant-bar-construction` | Sub-service |
| `/services/specialized/structural-building-envelope` | Combined sub-service |
| `/services/specialized/building-systems-upgrades` | Combined sub-service |
| `/services/specialized/accessibility-outdoor-living` | Combined sub-service |

### Combined-page anchor ids

| Page slug | Section anchor ids |
|-----------|-------------------|
| `structural-building-envelope` | `#roofing`, `#steel-framing` |
| `building-systems-upgrades` | `#acoustic-ceilings`, `#ev-charging-electrical` |
| `accessibility-outdoor-living` | `#accessibility-renovations`, `#outdoor-features-sport-courts` |

### Location keywords (pair with service names in titles/H1s)

- Greater Vancouver
- Vancouver Island
- Fraser Valley

---

## Progress Log

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| 2026-06-12 | 1 | - [x] | `SERVICE_EXPANSION_PLAN.md` drafted; awaiting stakeholder review before Phase 2 |
| 2026-06-12 | 2 | - [x] | Routing scaffold: 9 new routes + nested slug helpers; `ServiceRouteStub` / `ServiceSubPageStub`; `npm run build` passes (13 service URLs) |
| 2026-06-12 | 3 | - [x] | Data model expansion: hubs, 8 sub-pages, overview, tenant SEO/FAQ; migrated seed content + `TODO_COPY` placeholders; legacy `getServicePageContent` adapter; `npm run build` passes |
| 2026-06-12 | 4 | - [x] | `ServiceHubLayout` + `ServiceLinkingCards`; hubs wired to `getServiceHubContent()`; legacy adapter + `ServiceSubServices` removed; `npm run build` passes |
| 2026-06-12 | 5 | - [x] | Sub-service template: optional-image `ServiceHero` (text-only variant), `ServiceFeaturesSection`, `ServiceWhyGpSection`, `ServiceFaqSection` (Radix accordion at `components/ui/accordion.tsx`, `aria-expanded` + keyboard + `motion-safe` animations), `ServiceBundledSections` (anchor ids on H2s with `scroll-mt` clearing fixed header), `ServiceRelatedLinks` (text-only; specialized = quote-only). All 8 routes wired via `getSubServicePageContent()`; Phase 2 sub-page stub deleted. Image budget verified: ≤1 image per sub-page (4 hero-image, 4 text-only). Small supporting touches: `serviceHubLabels` map in `lib/service-sections.ts`, `ServicePageCtas` props widened to structural pick, hero top padding raised to clear the fixed floating logo (also fixes pre-existing hub overlap on mobile). No `lib/services-content.ts` changes needed. `npm run build` passes |
| 2026-06-13 | 6 | - [x] | `/services` overview live: `ServicesOverviewLayout` (enhanced `ServiceHero` with `hardhat` icon + "ALL SERVICES" eyebrow + angled accent/entrance animation, `ServiceOverview` intro, 4-card grid via `columns={4}`). Extracted shared `serviceIcons` map (`components/services/service-icons.ts`) consumed by hero + cards. `ServiceLinkingCard` gained `icon` (required) + optional `image`; `ServiceLinkingCards` re-polished (rounded-xl, border, hover:border-brand-navy + hover:shadow-lg, icon chip) and applied retroactively to all 3 hubs. `service-route-stub.tsx` deleted. Card icons: residential→home, commercial→building, specialized→wrench, tenant-improvements→storefront. Validated mobile/tablet/desktop; all 4 cards link correctly. `npm run build` passes |
| 2026-06-13 | 7 | - [x] | Technical SEO pass: `export const metadata` on all 13 service routes (sourced from each content object's `title`/`metaDescription`; sub-pages also emit `keywords`). New `lib/service-schema.ts` (Service / FAQPage / LocalBusiness builders + `SITE_URL`, `absoluteUrl`, `collectPageFaqs`, `buildServiceMetadata`, `servicePagePath`). New JSON-LD components: `components/json-ld.tsx` (escaped `<script type="application/ld+json">`), `components/local-business-json-ld.tsx`, `components/services/service-json-ld.tsx`. LocalBusiness rendered once in `app/layout.tsx` (verified present on home/overview/hubs but NOT duplicated on service pages); Service + FAQPage rendered on the 8 sub-pages + tenant-improvements — combined pages merge page-level + bundled-section FAQs into one FAQPage (structural-building-envelope = 12 Q&A). `app/sitemap.ts` lists all 13 service routes via `getAllServiceRoutes()` + home + 3 project routes (17 URLs). Tenant-improvements gained a `ServiceFaqSection` (parity) via `ServicePageLayout`. Combined-page H2 anchor ids (#roofing, #steel-framing, #acoustic-ceilings, #ev-charging-electrical, #accessibility-renovations, #outdoor-features-sport-courts) verified as real DOM `id`s in prerendered HTML. Internal link graph audited in built output (hubs→sub-pages, sub-page→siblings+back-to-hub, overview→4 hubs, projectsHref; specialized stays quote-only). Root layout metadata replaced the `create-next-app` placeholder + `metadataBase`. `npm run build` passes. Also fixed unrelated: confirmed no `Facebook`/`Instagram` lucide imports exist (see notes). |
| 2026-06-13 | 8 | - [x] | Nav, cross-linking, a11y & final polish. **Nav** (`components/site-nav.tsx`): data-driven Services dropdown from `serviceSubPages`/`serviceSubPageLabels`/`serviceHubLabels`/`serviceSubPageHref()`. Desktop = mega-menu (`w-[820px]`) with an "All Services" header link to `/services` over a 4-column grid: Residential (3), Commercial (2), Specialized (3) — each hub heading links to its hub, with sub-service links beneath — plus a Tenant Improvements column (heading links to hub, blurb, no sub-links). Mobile = "Services" → overview, then collapsible hub rows (`MobileServiceHub`, `aria-expanded` + chevron, sub-links indented) for the 3 hubs + a direct Tenant Improvements link; fixed mobile Contact anchor to `#contact`. **8.2**: `servicesHref` in `lib/service-sections.ts` changed from `/#services-*` to `/services/{residential,commercial,tenant-improvements}` (homepage "What We Build" CTAs now deep-link into hubs; 0 legacy anchors remain). **8.3** footer (`components/sections/footer.tsx`): added a dedicated **Services** column (All Services + 4 hubs via helpers) and renamed the mixed column to **Explore** (Home/About/Contact + project links); removed the old `/#services` link; grid widened to 4 columns on lg. **8.5**: added `motion-reduce:animate-none motion-reduce:transition-none` to `NavigationMenuContent`/`Viewport` and `motion-reduce:transition-none` to the trigger chevron (hero + accordion were already motion-safe); verified descriptive alt text on all hub-card / overview-card / sub-page-hero images; FAQ accordions confirmed keyboard/SR-accessible across all 9 pages by shared-component reuse; combined-page H2 `scroll-mt` clears the fixed header (browser-verified). **8.6**: `ServiceFaqSection` gained a `background` prop (`neutral` default / `white`); tenant-improvements renders it on white so the deep-dive no longer stacks three `bg-neutral-50` sections (outcomes→FAQ→CTAs). All other page types verified for dark/neutral/white alternation. **8.4/8.7**: browser QA at 1440/768/390 — mega-menu structure, sub-page navigation, anchor-scroll offset, 4→2→1 card-grid collapse, and mobile collapsible all pass; `/sitemap.xml` = 17 URLs (13 service + 4); metadata spot-checked on overview/hub/sub-page/deep-dive. `npm run build` passes. |

_Update this log as each phase is completed._

---

## Expansion Complete

All eight phases of the pillar-and-spoke expansion are done. The `/services` section now ships:

- **13 live routes** — overview, 4 hubs, 8 sub-pages (5 standard + 3 combined), tenant-improvements deep-dive — all data-driven from `lib/services-content.ts`.
- **Technical SEO** — per-route metadata, Service + FAQPage JSON-LD on the 9 sub/deep-dive pages, a single site-wide LocalBusiness node, and a 17-URL `app/sitemap.ts`.
- **Full internal-link graph + nav** — pillar-and-spoke mega-menu (desktop) / collapsible menu (mobile), hub↔sub-page↔projects cross-links, homepage and footer aligned to the new structure.
- **A11y & responsive polish** — descriptive alt text, accessible FAQ accordions, `prefers-reduced-motion` respected, fixed-header-safe anchor offsets, and verified mobile/tablet/desktop layouts.

**Remaining before launch (copywriting pass — content, not engineering):**

- Replace all `TODO_COPY` (`/* TODO: copy */`) placeholders: sub-page second overview paragraphs, every `whyGp.body`, and combined bundled-section second paragraphs.
- Rewrite the generic 4-question FAQ templates (currently seeded by `defaultFaqs()` with `TODO_COPY` answers) into specific, SEO-targeted Q&A across the 8 sub-pages, 6 bundled sections, and tenant-improvements — these now feed live FAQPage schema, so real copy directly improves SEO value.
