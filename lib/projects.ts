export const PROJECTS_HREF = "/projects";

export const OUR_WORK_NAV_LABEL = "Our Work";

export const SEE_RECENT_PROJECTS = {
  label: "See Recent Projects",
  description:
    "Recent work across residential, commercial, and tenant improvement projects.",
  href: PROJECTS_HREF,
} as const;

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  title: string;
  objectPosition?: string;
};

/** Unified gallery for the /projects page and home hero parallax. */
export const recentProjectGallery: ProjectGalleryItem[] = [
  {
    title: "Modern Farmhouse Build",
    src: "/images/projects/residential-modern-farmhouse-exterior.png",
    alt: "Modern white farmhouse-style custom home exterior with paver driveway",
  },
  {
    title: "Multi-Family Development",
    src: "/images/projects/multi-family-development-overview.jpeg",
    alt: "Multi-family development site with concrete pump truck and foundation formwork",
  },
  {
    title: "Custom Home Construction",
    src: "/images/projects/sunnyday-customhomebuild.png",
    alt: "Custom home under construction on a sunny day",
  },
  {
    title: "Steel Framing",
    src: "/images/projects/residential-modern-hillside-home-under-construction.png",
    alt: "Modern hillside home under construction with structural framing",
  },
  {
    title: "Kitchen Remodel",
    src: "/images/projects/home-renovations-kitchen-after.png",
    alt: "Renovated kitchen with modern finishes and open layout",
  },
  {
    title: "Roofing Project",
    src: "/images/projects/structural-building-envelope-roofing-overview.jpeg",
    alt: "Roof trusses and OSB sheathing on a residential home under construction",
  },
  {
    title: "Custom Home Build",
    src: "/images/projects/residential-construction-in-progress-garage.png",
    alt: "Residential construction in progress with garage framing",
  },
  {
    title: "Custom Interior Finishes",
    src: "/images/projects/residential-floating-staircase-glass-railing.png",
    alt: "Residential floating staircase with glass railing and open layout",
  },
  {
    title: "Restaurant Build",
    src: "/images/projects/commercial-dominos-storefront-exterior.png",
    alt: "Domino's Pizza commercial storefront exterior at dusk",
  },
  {
    title: "Acoustic Ceilings",
    src: "/images/projects/building-systems-upgrades-overview.jpeg",
    alt: "GP Contracting Group crew installing acoustic ceiling tiles in a commercial office",
  },
  {
    title: "Wood Frame Construction",
    src: "/images/projects/residential-framing-hilltop-view.png",
    alt: "Residential wood framing on a hilltop with scenic view",
  },
  {
    title: "Fitness Facility",
    src: "/images/projects/tenant-improvement-dominos-interior.png",
    alt: "Commercial tenant improvement interior fit-out",
  },
  {
    title: "Commercial Construction",
    src: "/images/projects/tenant-improvement-dominos-grand-opening-exterior.png",
    alt: "Commercial storefront exterior at grand opening with branded signage",
    objectPosition: "center 55%",
  },
  {
    title: "Tenant Improvement",
    src: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
    alt: "Marble Slab Creamery tenant improvement storefront at The Bay Centre",
    objectPosition: "center 20%",
  },
  {
    title: "Commercial Exterior",
    src: "/images/projects/commercial-td-bank-atm-exterior.png",
    alt: "TD Bank commercial exterior with ATM",
  },
  {
    title: "Site Development",
    src: "/images/projects/site-development-crane-excavator-forest.png",
    alt: "Construction site with crane and excavator against a forest backdrop",
  },
  {
    title: "Home Renovation",
    src: "/images/projects/home-renovations-hero.jpeg",
    alt: "Open-concept renovated home with modern living room, dining area, and kitchen",
  },
  {
    title: "Commercial Build-Out",
    src: "/images/projects/commercial-interior-build-out.jpeg",
    alt: "GP Contracting Group worker framing a commercial interior build-out",
  },
  {
    title: "Restaurant Construction",
    src: "/images/projects/restaurant-bar-renovation-interior.jpeg",
    alt: "Commercial restaurant interior under construction with drywall and scaffolding",
  },
  {
    title: "Sport Court",
    src: "/images/projects/sport-court-outdoor-living.jpeg",
    alt: "Custom backyard basketball half-court with modular surfacing at sunset",
  },
  {
    title: "Structural Framing",
    src: "/images/projects/structural-building-envelope-hero.jpeg",
    alt: "Structural wood framing and roof trusses inside a residential build under a clear blue sky",
  },
  {
    title: "Accessibility Upgrade",
    src: "/images/projects/accessibility-renovations-overview.jpeg",
    alt: "Commercial entrance with automatic accessibility door and wheelchair-activated push buttons",
  },
  {
    title: "Luxury Hillside Home",
    src: "/images/projects/residential-luxury-hillside-construction.png",
    alt: "Luxury hillside home under construction with roof structure in progress",
  },
  {
    title: "Commercial Foundation",
    src: "/images/projects/commercial-foundation-concrete-pump-site.png",
    alt: "Commercial foundation construction site with concrete pump trucks",
  },
];

/** Shape consumed by the home page hero parallax. */
export const heroParallaxProjects = recentProjectGallery.map((item) => ({
  title: item.title,
  link: PROJECTS_HREF,
  thumbnail: item.src,
  objectPosition: item.objectPosition,
}));
