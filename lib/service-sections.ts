export type ServiceSlug = "residential" | "commercial" | "tenant-improvements";

export type ServiceSection = {
  id: number;
  slug: ServiceSlug;
  title: string;
  description: string;
  imageUrl: string;
  servicesHref: string;
  projectsHref: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  reverse: boolean;
};

export function serviceSectionAnchor(slug: ServiceSlug) {
  return `services-${slug}`;
}

export const serviceSections: ServiceSection[] = [
  {
    id: 1,
    slug: "residential",
    title: "Residential",
    description:
      "From custom home builds to kitchen and bathroom renovations, we bring precision craftsmanship to every residential project. Whether ground-up construction or a thoughtful remodel, we treat your home as if it were our own.",
    imageUrl: "/images/projects/residential-modern-farmhouse-exterior.png",
    servicesHref: "/#services-residential",
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
    imageUrl: "/images/projects/commercial-foundation-concrete-pump-site.png",
    servicesHref: "/#services-commercial",
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
    servicesHref: "/#services-tenant-improvements",
    projectsHref: "/projects/tenant-improvements",
    primaryCtaLabel: "Explore Tenant Improvement Services",
    secondaryCtaLabel: "View Tenant Improvement Projects",
    reverse: false,
  },
];
