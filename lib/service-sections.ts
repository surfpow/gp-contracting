import {
  PROJECTS_HREF,
  SEE_RECENT_PROJECTS,
} from "@/lib/projects";

export type ServiceSlug = "residential" | "commercial" | "tenant-improvements";

export type ServicePageSlug = ServiceSlug | ServiceHubSlug;

export type ServiceHubSlug =
  | "residential"
  | "commercial"
  | "specialized"
  | "insurance-restoration";

export type ResidentialSubPageSlug =
  | "custom-home-construction"
  | "home-renovations"
  | "multi-family-development";

export type CommercialSubPageSlug = "restaurant-bar-construction";

export type SpecializedSubPageSlug =
  | "structural-building-envelope"
  | "building-systems-upgrades"
  | "accessibility-outdoor-living";

/** Spoke pages under /services/insurance-restoration/{slug} — add entries as built. */
export type InsuranceRestorationSubPageSlug =
  | "fire-damage-rebuilds"
  | "water-flood-damage"
  | "cash-settlement-vs-restoration"
  | "upgrades-during-insurance-claim"
  | "strategic-upgrades";

export type ServiceSubPageSlugByHub = {
  residential: ResidentialSubPageSlug;
  commercial: CommercialSubPageSlug;
  specialized: SpecializedSubPageSlug;
  "insurance-restoration": InsuranceRestorationSubPageSlug;
};

export type ServiceSubPageSlug =
  | ResidentialSubPageSlug
  | CommercialSubPageSlug
  | SpecializedSubPageSlug
  | InsuranceRestorationSubPageSlug;

export type SubServicePath = {
  [H in ServiceHubSlug]: {
    parentHub: H;
    slug: ServiceSubPageSlugByHub[H];
  };
}[ServiceHubSlug];

export type ServiceSection = {
  id: number;
  slug: ServiceSlug;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  servicesHref: string;
  projectsHref: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  reverse: boolean;
};

export function serviceSectionAnchor(slug: ServiceSlug) {
  return `services-${slug}`;
}

export function getServiceSection(slug: ServiceSlug) {
  const section = serviceSectionCatalog[slug];
  if (!section) {
    throw new Error(`Unknown service slug: ${slug}`);
  }
  return section;
}

export function servicePageHref(slug: ServicePageSlug) {
  return `/services/${slug}`;
}

export function serviceSubPageHref<H extends ServiceHubSlug>(
  parentHub: H,
  slug: ServiceSubPageSlugByHub[H],
) {
  return `/services/${parentHub}/${slug}`;
}

export const serviceSubPages: SubServicePath[] = [
  { parentHub: "residential", slug: "custom-home-construction" },
  { parentHub: "residential", slug: "home-renovations" },
  { parentHub: "residential", slug: "multi-family-development" },
  { parentHub: "commercial", slug: "restaurant-bar-construction" },
  { parentHub: "specialized", slug: "structural-building-envelope" },
  { parentHub: "specialized", slug: "building-systems-upgrades" },
  { parentHub: "specialized", slug: "accessibility-outdoor-living" },
  { parentHub: "insurance-restoration", slug: "fire-damage-rebuilds" },
  { parentHub: "insurance-restoration", slug: "water-flood-damage" },
  {
    parentHub: "insurance-restoration",
    slug: "cash-settlement-vs-restoration",
  },
  {
    parentHub: "insurance-restoration",
    slug: "upgrades-during-insurance-claim",
  },
  {
    parentHub: "insurance-restoration",
    slug: "strategic-upgrades",
  },
];

/**
 * @deprecated Prefer `serviceSubPages`. Kept as an alias for insurance spokes
 * that were registered before they appeared in the main sub-page catalog.
 */
export const insuranceRestorationSubPages: {
  parentHub: "insurance-restoration";
  slug: InsuranceRestorationSubPageSlug;
}[] = serviceSubPages.filter(
  (page): page is {
    parentHub: "insurance-restoration";
    slug: InsuranceRestorationSubPageSlug;
  } => page.parentHub === "insurance-restoration",
);

export const serviceHubLabels: Record<ServiceHubSlug, string> = {
  residential: "Residential",
  commercial: "Commercial",
  specialized: "Specialized",
  "insurance-restoration": "Insurance Restoration",
};

export const serviceSubPageLabels: Record<ServiceSubPageSlug, string> = {
  "custom-home-construction": "Custom Home Construction",
  "home-renovations": "Home Renovations",
  "multi-family-development": "Multi-Family Development",
  "restaurant-bar-construction": "Restaurant & Bar Construction",
  "structural-building-envelope": "Structural & Building Envelope",
  "building-systems-upgrades": "Building Systems Upgrades",
  "accessibility-outdoor-living": "Accessibility & Outdoor Living",
  "fire-damage-rebuilds": "Fire Damage Rebuilds",
  "water-flood-damage": "Water & Flood Damage",
  "cash-settlement-vs-restoration": "Cash Settlement vs. Restoration",
  "upgrades-during-insurance-claim": "Upgrades During an Insurance Claim",
  "strategic-upgrades": "Strategic Upgrades During Restoration",
};

export function getAllServiceRoutePaths(): string[] {
  const topLevelServicePaths: ServicePageSlug[] = [
    ...(["residential", "commercial", "specialized", "insurance-restoration"] as const),
    "tenant-improvements",
  ];

  return [
    "/services",
    ...topLevelServicePaths.map((slug) => servicePageHref(slug)),
    ...serviceSubPages.map(({ parentHub, slug }) =>
      serviceSubPageHref(parentHub, slug),
    ),
  ];
}

/** Full catalog used by service page heroes via `getServiceSection`. */
const serviceSectionCatalog: Record<ServiceSlug, ServiceSection> = {
  residential: {
    id: 1,
    slug: "residential",
    title: "Residential",
    description:
      "From custom home builds to kitchen and bathroom renovations, we bring precision craftsmanship to every residential project. Whether ground-up construction or a thoughtful remodel, we treat your home as if it were our own.",
    imageUrl: "/images/projects/residential-modern-farmhouse-exterior.png",
    imageAlt:
      "Modern white farmhouse-style custom home exterior with paver driveway",
    servicesHref: "/services/residential",
    projectsHref: PROJECTS_HREF,
    primaryCtaLabel: "Explore Residential Services",
    secondaryCtaLabel: SEE_RECENT_PROJECTS.label,
    reverse: false,
  },
  commercial: {
    id: 2,
    slug: "commercial",
    title: "Commercial",
    description:
      "Office spaces, retail storefronts, and industrial facilities built to code and delivered on schedule. GP Contracting Group brings the same integrity and attention to detail to every commercial project across Greater Vancouver.",
    imageUrl: "/images/projects/commercial-interior-build-out.jpeg",
    imageAlt:
      "GP Contracting Group worker framing a commercial interior build-out with metal stud walls and exposed ceiling infrastructure",
    servicesHref: "/services/commercial",
    projectsHref: PROJECTS_HREF,
    primaryCtaLabel: "Explore Commercial Services",
    secondaryCtaLabel: SEE_RECENT_PROJECTS.label,
    reverse: true,
  },
  "tenant-improvements": {
    id: 3,
    slug: "tenant-improvements",
    title: "Tenant Improvements",
    description:
      "Commercial tenant improvements and interior build-outs for offices, retail, and mixed-use spaces — coordinated with landlords, delivered on schedule, and built for daily operations.",
    imageUrl: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
    imageAlt:
      "Marble Slab Creamery tenant improvement storefront at The Bay Centre",
    servicesHref: "/services/tenant-improvements",
    projectsHref: PROJECTS_HREF,
    primaryCtaLabel: "Explore Tenant Improvement Services",
    secondaryCtaLabel: SEE_RECENT_PROJECTS.label,
    reverse: false,
  },
};

/** Homepage "What We Build" rows — commercial and TI are shown as one. */
export const serviceSections: ServiceSection[] = [
  serviceSectionCatalog.residential,
  {
    id: 2,
    slug: "tenant-improvements",
    title: "Commercial & Tenant Improvements",
    description:
      "Commercial tenant improvements and interior build-outs for offices, retail, and mixed-use spaces — coordinated with landlords, delivered on schedule, and built for daily operations.",
    imageUrl: serviceSectionCatalog["tenant-improvements"].imageUrl,
    imageAlt: serviceSectionCatalog["tenant-improvements"].imageAlt,
    servicesHref: "/services/tenant-improvements",
    projectsHref: PROJECTS_HREF,
    primaryCtaLabel: "Explore Commercial Services",
    secondaryCtaLabel: SEE_RECENT_PROJECTS.label,
    reverse: true,
  },
];
