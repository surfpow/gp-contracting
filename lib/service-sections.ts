export type ServiceSlug = "residential" | "commercial" | "tenant-improvements";

export type ServicePageSlug = ServiceSlug | "specialized";

export type ServiceHubSlug = "residential" | "commercial" | "specialized";

export type ResidentialSubPageSlug =
  | "custom-home-construction"
  | "home-renovations"
  | "multi-family-development";

export type CommercialSubPageSlug =
  | "commercial-construction"
  | "restaurant-bar-construction";

export type SpecializedSubPageSlug =
  | "structural-building-envelope"
  | "building-systems-upgrades"
  | "accessibility-outdoor-living";

export type ServiceSubPageSlugByHub = {
  residential: ResidentialSubPageSlug;
  commercial: CommercialSubPageSlug;
  specialized: SpecializedSubPageSlug;
};

export type ServiceSubPageSlug =
  | ResidentialSubPageSlug
  | CommercialSubPageSlug
  | SpecializedSubPageSlug;

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
  const section = serviceSections.find((entry) => entry.slug === slug);
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
  { parentHub: "commercial", slug: "commercial-construction" },
  { parentHub: "commercial", slug: "restaurant-bar-construction" },
  { parentHub: "specialized", slug: "structural-building-envelope" },
  { parentHub: "specialized", slug: "building-systems-upgrades" },
  { parentHub: "specialized", slug: "accessibility-outdoor-living" },
];

export const serviceHubLabels: Record<ServiceHubSlug, string> = {
  residential: "Residential",
  commercial: "Commercial",
  specialized: "Specialized",
};

export const serviceSubPageLabels: Record<ServiceSubPageSlug, string> = {
  "custom-home-construction": "Custom Home Construction",
  "home-renovations": "Home Renovations",
  "multi-family-development": "Multi-Family Development",
  "commercial-construction": "Commercial Construction",
  "restaurant-bar-construction": "Restaurant & Bar Construction",
  "structural-building-envelope": "Structural & Building Envelope",
  "building-systems-upgrades": "Building Systems Upgrades",
  "accessibility-outdoor-living": "Accessibility & Outdoor Living",
};

export function getAllServiceRoutePaths(): string[] {
  const hubPaths: ServicePageSlug[] = [
    "residential",
    "commercial",
    "specialized",
    "tenant-improvements",
  ];

  return [
    "/services",
    ...hubPaths.map((slug) => servicePageHref(slug)),
    ...serviceSubPages.map(({ parentHub, slug }) =>
      serviceSubPageHref(parentHub, slug),
    ),
  ];
}

export const serviceSections: ServiceSection[] = [
  {
    id: 1,
    slug: "residential",
    title: "Residential",
    description:
      "From custom home builds to kitchen and bathroom renovations, we bring precision craftsmanship to every residential project. Whether ground-up construction or a thoughtful remodel, we treat your home as if it were our own.",
    imageUrl: "/images/projects/residential-modern-farmhouse-exterior.png",
    imageAlt:
      "Modern white farmhouse-style custom home exterior with paver driveway",
    servicesHref: "/services/residential",
    projectsHref: "/projects/residential",
    primaryCtaLabel: "Explore Residential Services",
    secondaryCtaLabel: "View Residential Projects",
    reverse: false,
  },
  {
    id: 2,
    slug: "commercial",
    title: "Commercial",
    description:
      "Office spaces, retail storefronts, and industrial facilities built to code and delivered on schedule. GP Contracting Group brings the same integrity and attention to detail to every commercial project across Greater Vancouver.",
    imageUrl: "/images/projects/commercial-interior-build-out.jpeg",
    imageAlt:
      "GP Contracting Group worker framing a commercial interior build-out with metal stud walls and exposed ceiling infrastructure",
    servicesHref: "/services/commercial",
    projectsHref: "/projects/commercial",
    primaryCtaLabel: "Explore Commercial Services",
    secondaryCtaLabel: "View Commercial Projects",
    reverse: true,
  },
  {
    id: 3,
    slug: "tenant-improvements",
    title: "Tenant Improvements",
    description:
      "Full build-outs and fit-outs for restaurants, fitness facilities, retail spaces, and more. We work closely with landlords and tenants to deliver spaces that are ready for business — on time and on budget.",
    imageUrl: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
    imageAlt:
      "Marble Slab Creamery tenant improvement storefront at The Bay Centre",
    servicesHref: "/services/tenant-improvements",
    projectsHref: "/projects/tenant-improvements",
    primaryCtaLabel: "Explore Tenant Improvement Services",
    secondaryCtaLabel: "View Tenant Improvement Projects",
    reverse: false,
  },
];
