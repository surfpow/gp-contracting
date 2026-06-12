# Service Pages — Incremental Implementation Plan

Incremental plan for building four dedicated service pages:

- `/services/residential`
- `/services/commercial`
- `/services/tenant-improvements`
- `/services/specialized`

Status key: - [ ] not started · - [x] done

---

## Context / Current State

| Item | Current State |
|------|----------------|
| Shared site chrome | `SiteHeader`, `SitePageShell`, and `Footer` already exist (delivered in Phase 1 of the prior implementation plan) |
| Existing service data | `lib/service-sections.ts` exists and should be reused where relevant for labels/slugs/link alignment |
| UI primitives | `components/ui/button.tsx` should be reused for all service page CTAs |
| Current routes | No dedicated `/services/*` routes are present yet |
| Current nav behavior | Services dropdown still points to homepage anchors; needs migration to dedicated service page routes |
| Visual direction | Match established aesthetic: `font-serif` headings, navy brand accents, `bg-neutral-50` + `bg-brand-dark` contrast, generous whitespace and premium spacing rhythm |

Implementation guardrails:

- Keep copy and section structure data-driven via `lib/services-content.ts`.
- Reuse existing layout/components before introducing new primitives.
- Keep visual and interaction consistency with homepage and existing project pages.
- Support two content patterns in the model:
  - multi-item sub-services pages (Residential, Commercial, Specialized)
  - deep-dive single-service page (Tenant Improvements)

---

## Phase 1 — Routing & Shared Layout Scaffold

**Goal:** Route-level scaffolding for all four service pages using existing site chrome, with zero 404s and stable layout.

### Tasks

- [ ] **1.1** Create route files for:
  - `/services/residential`
  - `/services/commercial`
  - `/services/tenant-improvements`
  - `/services/specialized`
- [ ] **1.2** Wire each route to the shared page scaffold (`SitePageShell` + `SiteHeader` + `Footer`) with a stable `<main>` region.
- [ ] **1.3** Add a reusable `ServicePageLayout` (or equivalent shared section shell components) so all four pages share structure and avoid duplicated JSX.
- [ ] **1.4** Ensure each route has a temporary minimal render using shared layout + placeholder data state (before full content sections are implemented).
- [ ] **1.5** Smoke-test all four routes resolve with nav + footer continuity and no layout shift.

### Files to create / touch

```
app/services/residential/page.tsx                  (new)
app/services/commercial/page.tsx                   (new)
app/services/tenant-improvements/page.tsx          (new)
app/services/specialized/page.tsx                  (new)
components/services/service-page-layout.tsx        (new)
components/site-page-shell.tsx                     (touch, only if shared API needs extension)
```

### Acceptance criteria

- `/services/residential`, `/services/commercial`, `/services/tenant-improvements`, and `/services/specialized` render with shared header/footer.
- No 404s for any service route.
- No visible top-of-page layout shift when routes load.
- Shared layout abstraction is in place and used by all four routes.

---

## Phase 2 — Service Data Model

**Goal:** Centralize detailed service page copy and media in one data source, including two structural content modes.

### Tasks

- [ ] **2.1** Create `lib/services-content.ts` with a typed model for all four service pages.
- [ ] **2.2** Define shared per-page fields:
  - `slug`
  - `heroHeading`
  - `heroSubheading`
  - `heroImage` (src + alt)
  - `overview` copy (brand-voice paragraph(s))
  - `contentMode`: `"subServices"` or `"deepDive"`
- [ ] **2.3** Define `subServices` schema for multi-item pages:
  - `{ name, summary, bullets[], image }`
  - Keep detailed offering points data-driven in bullets (not embedded in JSX).
- [ ] **2.4** Define `deepDive` schema for Tenant Improvements:
  - `serviceName`
  - `intro`
  - `focusAreas[]` (space planning, modern finishes, lighting design, mechanical optimization)
  - `projectContexts[]` (office tenant build-outs, retail tenant build-outs)
  - optional `outcomes[]` / `processNotes[]` if needed for layout richness
- [ ] **2.5** Populate content for all four pages:
  - **Residential**:
    - Custom Home Construction (architectural collaboration, premium materials, energy-efficient design, smart home integration)
    - Home Renovations (kitchen remodeling, bathroom upgrades, space optimization, modern fixtures)
    - Multi-Family Development
  - **Commercial**:
    - General Commercial Construction overview
    - Restaurant & Bar Construction (kitchen layouts, ventilation systems, bar design, seating optimization)
    - Fitness Facility Development (equipment layouts, specialized flooring, shower facilities, climate control)
  - **Tenant Improvements**:
    - Deep-dive single service, not a multi-card sub-service list
    - Space planning, modern finishes, lighting design, mechanical optimization
    - Framed around office and retail tenant build-outs
  - **Specialized**:
    - Roofing (quality materials, weather protection, proper drainage, extended warranties)
    - Steel Framing (custom fabrication, seismic compliance, engineer approved, quality assurance)
    - T-Bar & Acoustic Solutions (sound absorption, lighting integration, access panels, clean installation)
    - Accessibility Renovations (aging-in-place modifications, wheelchair accessibility)
    - EV Charging & Electrical Upgrades
    - Custom Outdoor Features / Sport Courts (backyard basketball courts, custom outdoor recreation spaces)
- [ ] **2.6** Keep all copy data-driven (no hardcoded marketing copy in route-level JSX).
- [ ] **2.7** Reuse `lib/service-sections.ts` where relevant to avoid duplicated slug/label constants.

### Files to create / touch

```
lib/services-content.ts                              (new)
lib/service-sections.ts                              (touch, only if alignment helpers are needed)
components/services/service-page-layout.tsx          (touch, consume content model)
app/services/residential/page.tsx                    (touch, consume data)
app/services/commercial/page.tsx                     (touch, consume data)
app/services/tenant-improvements/page.tsx            (touch, consume data)
app/services/specialized/page.tsx                    (touch, consume data)
```

### Acceptance criteria

- One centralized data source drives all service page text/media.
- All four pages have complete hero + overview content.
- Residential, Commercial, and Specialized content is modeled as detailed sub-services.
- Tenant Improvements content is modeled as a deep-dive single-service structure (not a sub-services array requirement).
- Route components compose sections only; they do not embed marketing copy strings.

---

## Phase 3 — Hero & Overview Sections

**Goal:** Implement top-of-page storytelling sections consistent with site design language.

### Tasks

- [ ] **3.1** Build hero band section(s) with:
  - Large `font-serif` heading
  - Supporting subheading
  - Hero image
- [ ] **3.2** Match visual treatment to existing aesthetic:
  - Navy brand accent usage
  - `bg-neutral-50` / `bg-brand-dark` contrast strategy
  - Generous vertical spacing rhythm
- [ ] **3.3** Build overview section from data-driven paragraph content.
- [ ] **3.4** Ensure hero/overview sections are reusable across all four pages through shared components.

### Files to create / touch

```
components/services/service-hero.tsx                 (new, optional if layout-only approach is used)
components/services/service-overview.tsx             (new, optional if layout-only approach is used)
components/services/service-page-layout.tsx          (touch, integrate hero + overview)
app/services/residential/page.tsx                    (touch)
app/services/commercial/page.tsx                     (touch)
app/services/tenant-improvements/page.tsx            (touch)
app/services/specialized/page.tsx                    (touch)
```

### Acceptance criteria

- Each service page renders a complete hero and overview from data.
- Typography, spacing, and color rhythm align with homepage quality.
- Hero/overview logic remains shared rather than duplicated per page.

---

## Phase 4 — Service Detail Sections

**Goal:** Build detailed service body content with the correct pattern per page type.

### Tasks

- [ ] **4.1** Build reusable sub-services section (cards/rows) for `contentMode: "subServices"` pages.
- [ ] **4.2** Build reusable deep-dive section for `contentMode: "deepDive"` pages.
- [ ] **4.3** Implement detailed sub-services for Residential:
  - Custom Home Construction (architectural collaboration, premium materials, energy-efficient design, smart home integration)
  - Home Renovations (kitchen remodeling, bathroom upgrades, space optimization, modern fixtures)
  - Multi-Family Development
- [ ] **4.4** Implement detailed sub-services for Commercial:
  - General Commercial Construction overview
  - Restaurant & Bar Construction (kitchen layouts, ventilation systems, bar design, seating optimization)
  - Fitness Facility Development (equipment layouts, specialized flooring, shower facilities, climate control)
- [ ] **4.5** Implement deep-dive Tenant Improvements body content:
  - Space planning
  - Modern finishes
  - Lighting design
  - Mechanical optimization
  - Office and retail tenant build-out framing
- [ ] **4.6** Implement detailed sub-services for Specialized:
  - Roofing (quality materials, weather protection, proper drainage, extended warranties)
  - Steel Framing (custom fabrication, seismic compliance, engineer approved, quality assurance)
  - T-Bar & Acoustic Solutions (sound absorption, lighting integration, access panels, clean installation)
  - Accessibility Renovations (aging-in-place modifications, wheelchair accessibility)
  - EV Charging & Electrical Upgrades
  - Custom Outdoor Features / Sport Courts (backyard basketball courts, custom outdoor recreation spaces)
- [ ] **4.7** Validate responsive behavior and hierarchy for both section patterns across mobile/tablet/desktop.

### Files to create / touch

```
components/services/service-subservices.tsx          (new)
components/services/service-deep-dive.tsx            (new)
components/services/service-page-layout.tsx          (touch, route by content mode)
lib/services-content.ts                              (touch, final content tuning)
app/services/residential/page.tsx                    (touch)
app/services/commercial/page.tsx                     (touch)
app/services/tenant-improvements/page.tsx            (touch)
app/services/specialized/page.tsx                    (touch)
```

### Acceptance criteria

- Residential, Commercial, and Specialized pages render complete detailed sub-service content.
- Tenant Improvements renders a deep-dive single-service narrative (not a repeated sub-service list).
- All detail content includes clear structure, image support, and readable hierarchy.
- Layout remains consistent and legible across breakpoints.

---

## Phase 5 — CTAs & Cross-Linking

**Goal:** Add conversion/navigation pathways between service pages, project pages, and contact.

**Recorded decision — Specialized CTA scope:** `/services/specialized` does **not** include a "View Projects" CTA. Only `Get a Quote` appears on that page. Residential, Commercial, and Tenant Improvements each get both CTAs as planned.

### Tasks

- [ ] **5.1** Add primary project CTA on Residential, Commercial, and Tenant Improvements only:
  - Residential -> `/projects/residential`
  - Commercial -> `/projects/commercial`
  - Tenant Improvements -> `/projects/tenant-improvements`
- [ ] **5.2** Add `Get a Quote` CTA on all four service pages:
  - `Get a Quote` -> `/#contact`
- [ ] **5.3** Ensure `/services/specialized` renders **only** the `Get a Quote` CTA (no projects button).
- [ ] **5.4** Use shared `Button` primitive for CTA styling and consistent focus/hover states.
- [ ] **5.5** Update Services nav dropdown links in `components/site-nav.tsx` to:
  - `/services/residential`
  - `/services/commercial`
  - `/services/tenant-improvements`
  - `/services/specialized`
  instead of homepage anchors.
- [ ] **5.6** Verify cross-link behavior among service pages, project routes, and contact anchor.

### Files to create / touch

```
components/services/service-page-layout.tsx          (touch, CTA placement)
components/ui/button.tsx                             (touch only if variant adjustments are required)
components/site-nav.tsx                              (touch, Services dropdown targets)
app/services/residential/page.tsx                    (touch)
app/services/commercial/page.tsx                     (touch)
app/services/tenant-improvements/page.tsx            (touch)
app/services/specialized/page.tsx                    (touch, Get a Quote only)
```

### Acceptance criteria

- Residential, Commercial, and Tenant Improvements include working `View [Category] Projects` + `Get a Quote` actions.
- Specialized includes only `Get a Quote` — no projects CTA is rendered.
- Services dropdown links open dedicated service pages, not homepage anchors.
- CTA styling matches current site button language and focus behavior.
- No broken internal links across services/projects/contact paths.

---

## Phase 6 — Polish & Consistency

**Goal:** Final production-quality pass for responsive behavior, accessibility, metadata, and visual consistency.

### Tasks

- [ ] **6.1** Responsive pass across mobile/tablet/desktop for all four service pages.
- [ ] **6.2** Accessibility pass:
  - descriptive alt text coverage
  - motion fallback for `prefers-reduced-motion`
  - anchor/scroll offset behavior under fixed header
- [ ] **6.3** Add per-page SEO metadata (`title` + `description`) for:
  - `/services/residential`
  - `/services/commercial`
  - `/services/tenant-improvements`
  - `/services/specialized`
- [ ] **6.4** Visual consistency pass against homepage for typography, spacing, button treatment, and section rhythm.
- [ ] **6.5** Final QA smoke run for routes, links, and content rendering.

### Files to create / touch

```
app/services/residential/page.tsx                    (touch, metadata + polish)
app/services/commercial/page.tsx                     (touch, metadata + polish)
app/services/tenant-improvements/page.tsx            (touch, metadata + polish)
app/services/specialized/page.tsx                    (touch, metadata + polish)
components/services/service-page-layout.tsx          (touch, responsive/a11y refinements)
components/services/service-hero.tsx                 (touch, if created)
components/services/service-overview.tsx             (touch, if created)
components/services/service-subservices.tsx          (touch)
components/services/service-deep-dive.tsx            (touch)
```

### Acceptance criteria

- All four pages are visually consistent and stable across target breakpoints.
- Accessibility essentials (alt text, reduced motion handling, scroll offsets) are in place.
- Each service page exposes meaningful metadata title/description.
- Final QA shows no obvious regressions relative to homepage quality bar.

---

## Suggested Implementation Order

Execute phases sequentially:

```
Phase 1 (routes/layout scaffold)
→ Phase 2 (detailed data model)
→ Phase 3 (hero + overview)
→ Phase 4 (sub-services + deep-dive body sections)
→ Phase 5 (CTAs + nav cross-linking)
→ Phase 6 (polish + metadata)
```

Notes:

- Keep Phase 2 early so all downstream UI remains data-driven.
- Specialized CTA scope is decided: `Get a Quote` only (no projects button).
- Phase 6 is the final gate before merge.

---

## Progress Log

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| 2026-06-12 | Scope Revision | - [x] | Plan updated from 3 pages to 4 pages; detailed service content requirements expanded |
| 2026-06-12 | Phase 5 Decision | - [x] | Specialized page: `Get a Quote` only — no "View Projects" CTA |
| 2026-06-12 | 1 | - [ ] | Not started (four-route scaffold) |
| 2026-06-12 | 2 | - [ ] | Not started (detailed model + deep-dive structure) |
| 2026-06-12 | 3 | - [ ] | Not started (hero + overview) |
| 2026-06-12 | 4 | - [ ] | Not started (sub-services + TI deep-dive body) |
| 2026-06-12 | 5 | - [ ] | Not started (CTAs/nav; Specialized = Get a Quote only) |
| 2026-06-12 | 6 | - [ ] | Not started (polish + metadata + QA) |

_Update this log as each phase is completed._
