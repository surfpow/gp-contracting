import {
  getAllServiceRoutePaths,
  getServiceSection,
  servicePageHref,
  serviceSubPageHref,
  serviceSubPageLabels,
  type CommercialSubPageSlug,
  type ResidentialSubPageSlug,
  type ServiceHubSlug,
  type ServicePageSlug,
  type ServiceSlug,
  type ServiceSubPageSlug,
  type ServiceSubPageSlugByHub,
  type SpecializedSubPageSlug,
  type SubServicePath,
} from "@/lib/service-sections";

export type ServiceImage = {
  src: string;
  alt: string;
};

/**
 * Semantic icon names rendered by `ServiceHero` (mapped to lucide-react
 * components there). Kept as strings so server components can pass them
 * across the client boundary.
 */
export type ServiceHeroIconName =
  | "home"
  | "hammer"
  | "building"
  | "warehouse"
  | "storefront"
  | "restaurant"
  | "layers"
  | "frame"
  | "grid"
  | "plug"
  | "zap"
  | "accessibility"
  | "tree"
  | "sun"
  | "wrench"
  | "hardhat";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServiceLinkingCard = {
  name: string;
  blurb: string;
  href: string;
  icon: ServiceHeroIconName;
  /** Optional — text-only consumers (e.g. related-links) ignore it. */
  image?: ServiceImage;
};

export type ServiceWhyGp = {
  heading: string;
  body: string;
  pullQuote?: string;
};

export type SeoFields = {
  title: string;
  metaDescription: string;
};

export type ServiceSchemaFields = {
  serviceType: string;
  areaServed: string[];
};

/** Placeholder for long-form marketing copy to be written by stakeholders. */
export const TODO_COPY = "/* TODO: copy */";

export const SERVICE_AREA_SERVED = [
  "Greater Vancouver",
  "Vancouver Island",
  "Fraser Valley",
] as const;

// ---------------------------------------------------------------------------
// Deep-dive page types (tenant-improvements)
// ---------------------------------------------------------------------------

export type ServiceDeepDiveFocusArea = {
  title: string;
  description: string;
};

export type ServiceDeepDiveContext = {
  title: string;
  description: string;
};

export type ServiceDeepDive = {
  serviceName: string;
  intro: string;
  focusAreas: ServiceDeepDiveFocusArea[];
  projectContexts: ServiceDeepDiveContext[];
  outcomes?: string[];
  processNotes?: string[];
};

type ServicePageContentBase = {
  slug: ServicePageSlug;
  heroHeading: string;
  heroSubheading: string;
  heroImage: ServiceImage;
  overview: string[];
  projectsHref?: string;
  projectsCtaLabel?: string;
};

export type DeepDiveServicePage = ServicePageContentBase &
  SeoFields &
  ServiceSchemaFields & {
    contentMode: "deepDive";
    heroIcon?: ServiceHeroIconName;
    deepDive: ServiceDeepDive;
    faqs: ServiceFaq[];
  };

export type ServicePageContent = DeepDiveServicePage;

// ---------------------------------------------------------------------------
// Pillar-and-spoke content types (Phase 3+)
// ---------------------------------------------------------------------------

export type HubServicePage = ServicePageContentBase &
  SeoFields & {
    contentMode: "hub";
    slug: ServiceHubSlug;
    heroIcon: ServiceHeroIconName;
    linkingCards: ServiceLinkingCard[];
  };

export type SubServicePageBase = SeoFields &
  ServiceSchemaFields & {
    heroHeading: string;
    heroSubheading: string;
    heroImage?: ServiceImage;
    heroIcon: ServiceHeroIconName;
    linkingCardImage: ServiceImage;
    overview: string[];
    processSteps: ServiceProcessStep[];
    whyGp: ServiceWhyGp;
    faqs: ServiceFaq[];
    relatedSubServices: ServiceLinkingCard[];
    projectsHref: string;
    keywords: string[];
    h1: string;
  };

export type ServiceBundledSection = {
  anchorId: string;
  heading: string;
  icon: ServiceHeroIconName;
  keywords: string[];
  overview: string[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
};

export type StandardSubServicePage = SubServicePageBase & {
  contentMode: "subService";
  parentHub: "residential" | "commercial";
  slug: ResidentialSubPageSlug | CommercialSubPageSlug;
};

export type CombinedSubServicePage = SubServicePageBase & {
  contentMode: "combinedSubService";
  parentHub: "specialized";
  slug: SpecializedSubPageSlug;
  bundledSections: ServiceBundledSection[];
};

export type SubServicePageContent =
  | StandardSubServicePage
  | CombinedSubServicePage;

export type ServicesOverviewContent = SeoFields & {
  contentMode: "overview";
  heroHeading: string;
  heroSubheading: string;
  heroIcon: ServiceHeroIconName;
  overview: string[];
  hubCards: ServiceLinkingCard[];
};

// ---------------------------------------------------------------------------
// Content helpers
// ---------------------------------------------------------------------------

function sectionHero(slug: ServiceSlug) {
  const section = getServiceSection(slug);
  return {
    heroHeading: section.title,
    heroSubheading: section.description,
    heroImage: {
      src: section.imageUrl,
      alt: section.imageAlt,
    },
    projectsHref: section.projectsHref,
    projectsCtaLabel: section.secondaryCtaLabel,
  };
}

function serviceH1(serviceName: string) {
  return `${serviceName} in Greater Vancouver, Vancouver Island & the Fraser Valley`;
}

function locationKeywords(serviceName: string): string[] {
  return SERVICE_AREA_SERVED.map((area) => `${serviceName} ${area}`);
}

/** Region-paired keywords plus 1–2 city-specific terms for metadata (not visible H1s). */
function locationKeywordsWithCities(
  serviceName: string,
  cities: string[],
): string[] {
  return [
    ...locationKeywords(serviceName),
    ...cities.map((city) => `${serviceName} ${city}`),
  ];
}

function bulletsToProcessSteps(bullets: string[]): ServiceProcessStep[] {
  return bullets.map((description, index) => ({
    title: String(index + 1).padStart(2, "0"),
    description,
  }));
}

function defaultFaqs(serviceName: string): ServiceFaq[] {
  const label = serviceName.toLowerCase();

  return [
    {
      question: `What types of ${label} projects does GP Contracting Group handle?`,
      answer: TODO_COPY,
    },
    // Copywriting ref — cities served: Richmond, Vancouver, Burnaby, Surrey, Coquitlam, North Vancouver, Delta, New Westminster, Langley, Abbotsford, Victoria, Nanaimo (+ Greater Vancouver, Vancouver Island, Fraser Valley).
    {
      question: `Which areas do you serve for ${label}?`,
      answer: TODO_COPY,
    },
    {
      question: `How do I get a quote for ${label}?`,
      answer: TODO_COPY,
    },
    {
      question: `What is GP Contracting Group's approach to ${label}?`,
      answer: TODO_COPY,
    },
  ];
}

function defaultWhyGp(): ServiceWhyGp {
  return {
    heading: "Why GP Contracting Group",
    body: TODO_COPY,
  };
}

function relatedSubServicesFor<H extends ServiceHubSlug>(
  parentHub: H,
  slug: ServiceSubPageSlugByHub[H],
  pages: SubServicePageContent[],
): ServiceLinkingCard[] {
  return pages
    .filter((page) => page.parentHub === parentHub && page.slug !== slug)
    .map((page) => subPageLinkingCard(page));
}

function subPageLinkingCard(page: SubServicePageContent): ServiceLinkingCard {
  return {
    name: serviceSubPageLabels[page.slug],
    blurb: page.overview[0],
    href: serviceSubPageHref(page.parentHub, page.slug),
    icon: page.heroIcon,
    image: page.heroImage ?? page.linkingCardImage,
  };
}

type SubServiceSeed = {
  slug: ServiceSubPageSlug;
  parentHub: ServiceHubSlug;
  serviceName: string;
  heroSubheading: string;
  summary: string;
  bullets: string[];
  heroImage?: ServiceImage;
  heroIcon: ServiceHeroIconName;
  linkingCardImage: ServiceImage;
  projectsHref: string;
  serviceType: string;
  /** 1–2 cities for metadata keywords; visible headings stay region-level. */
  keywordCities?: string[];
};

function buildStandardSubServicePage(
  seed: SubServiceSeed & {
    parentHub: "residential" | "commercial";
  },
): StandardSubServicePage {
  const {
    serviceName,
    summary,
    bullets,
    heroSubheading,
    heroImage,
    heroIcon,
    linkingCardImage,
  } = seed;

  return {
    contentMode: "subService",
    parentHub: seed.parentHub,
    slug: seed.slug as ServiceSubPageSlugByHub[typeof seed.parentHub],
    h1: serviceH1(serviceName),
    title: `${serviceName} | GP Contracting Group`,
    metaDescription: `${summary} Serving Greater Vancouver, Vancouver Island, and the Fraser Valley.`,
    heroHeading: serviceName,
    heroSubheading,
    heroImage,
    heroIcon,
    linkingCardImage,
    overview: [summary, TODO_COPY],
    processSteps: bulletsToProcessSteps(bullets),
    whyGp: defaultWhyGp(),
    faqs: defaultFaqs(serviceName),
    relatedSubServices: [],
    projectsHref: seed.projectsHref,
    serviceType: seed.serviceType,
    areaServed: [...SERVICE_AREA_SERVED],
    keywords: seed.keywordCities
      ? locationKeywordsWithCities(serviceName, seed.keywordCities)
      : locationKeywords(serviceName),
  };
}

// ---------------------------------------------------------------------------
// Sub-service page content
// ---------------------------------------------------------------------------

const residentialSubServiceSeeds: SubServiceSeed[] = [
  {
    parentHub: "residential",
    slug: "custom-home-construction",
    serviceName: "Custom Home Construction",
    heroSubheading:
      "Ground-up custom homes designed and built with architectural collaboration, premium materials, and modern performance standards.",
    summary:
      "Ground-up custom homes designed and built with architectural collaboration, premium materials, and modern performance standards.",
    bullets: [
      "Architectural collaboration from concept through completion",
      "Premium materials and refined finish selections",
      "Energy-efficient design and building envelope detailing",
      "Smart home integration and future-ready infrastructure",
    ],
    heroImage: {
      src: "/images/projects/residential-modern-farmhouse-exterior.png",
      alt: "Modern white farmhouse-style custom home exterior with paver driveway",
    },
    heroIcon: "home",
    linkingCardImage: {
      src: "/images/projects/residential-modern-farmhouse-exterior.png",
      alt: "Modern white farmhouse-style custom home exterior with paver driveway",
    },
    projectsHref: "/projects/residential",
    serviceType: "Custom Home Construction",
    keywordCities: ["Richmond", "Surrey"],
  },
  {
    parentHub: "residential",
    slug: "home-renovations",
    serviceName: "Home Renovations",
    heroSubheading:
      "Kitchen, bathroom, and whole-home renovations that modernize your space while respecting the character of your home.",
    summary:
      "Kitchen, bathroom, and whole-home renovations that modernize your space while respecting the character of your home.",
    bullets: [
      "Kitchen remodeling with optimized layouts and cabinetry",
      "Bathroom upgrades with modern fixtures and waterproofing",
      "Space optimization for flow, storage, and natural light",
      "Contemporary fixtures, finishes, and lighting throughout",
    ],
    heroImage: {
      src: "/images/projects/residential-modern-kitchen-island.png",
      alt: "Modern residential kitchen with large island and pendant lighting",
    },
    heroIcon: "hammer",
    linkingCardImage: {
      src: "/images/projects/residential-modern-kitchen-island.png",
      alt: "Modern residential kitchen with large island and pendant lighting",
    },
    projectsHref: "/projects/residential",
    serviceType: "Home Renovations",
    keywordCities: ["Vancouver", "Burnaby"],
  },
  {
    parentHub: "residential",
    slug: "multi-family-development",
    serviceName: "Multi-Family Development",
    heroSubheading:
      "Multi-unit residential construction delivered with the same accountability and craftsmanship as our custom home work.",
    summary:
      "Multi-unit residential construction delivered with the same accountability and craftsmanship as our custom home work.",
    bullets: [
      "Duplex, townhouse, and low-rise multi-family builds",
      "Coordinated scheduling across units and trades",
      "Durable specifications suited to rental and owner-occupied use",
      "Code-compliant construction with clear project communication",
    ],
    heroIcon: "building",
    linkingCardImage: {
      src: "/images/projects/residential-framing-hilltop-view.png",
      alt: "Residential framing on a hilltop lot with forest and water views",
    },
    projectsHref: "/projects/residential",
    serviceType: "Multi-Family Development",
    keywordCities: ["Surrey", "Coquitlam"],
  },
];

const commercialSubServiceSeeds: SubServiceSeed[] = [
  {
    parentHub: "commercial",
    slug: "commercial-construction",
    serviceName: "Commercial Construction",
    heroSubheading:
      "General commercial construction for offices, retail, industrial, and mixed-use spaces across Greater Vancouver.",
    summary:
      "General commercial construction for offices, retail, industrial, and mixed-use spaces across Greater Vancouver.",
    bullets: [
      "New builds and structural additions for commercial properties",
      "Code-compliant construction with coordinated trade management",
      "Durable material selections suited to high-traffic environments",
      "Clear scheduling and communication from mobilization to handover",
    ],
    heroImage: {
      src: "/images/projects/commercial-foundation-concrete-pump-site.png",
      alt: "Commercial foundation construction site with concrete pump trucks and forest backdrop",
    },
    heroIcon: "warehouse",
    linkingCardImage: {
      src: "/images/projects/commercial-foundation-concrete-pump-site.png",
      alt: "Commercial foundation construction site with concrete pump trucks and forest backdrop",
    },
    projectsHref: "/projects/commercial",
    serviceType: "Commercial Construction",
    keywordCities: ["Vancouver", "Burnaby"],
  },
  {
    parentHub: "commercial",
    slug: "restaurant-bar-construction",
    serviceName: "Restaurant & Bar Construction",
    heroSubheading:
      "Purpose-built restaurant and bar environments designed around kitchen efficiency, guest flow, and operational durability.",
    summary:
      "Purpose-built restaurant and bar environments designed around kitchen efficiency, guest flow, and operational durability.",
    bullets: [
      "Kitchen layouts optimized for prep, service, and safety",
      "Ventilation systems and grease management coordination",
      "Bar design with service lines, storage, and guest sightlines",
      "Seating optimization for capacity, comfort, and ambiance",
    ],
    heroIcon: "restaurant",
    linkingCardImage: {
      src: "/images/projects/tenant-improvement-dominos-grand-opening-exterior.png",
      alt: "Restaurant storefront exterior at grand opening with branded signage",
    },
    projectsHref: "/projects/commercial",
    serviceType: "Restaurant & Bar Construction",
    keywordCities: ["Vancouver", "Richmond"],
  },
];

const residentialSubServicePages = residentialSubServiceSeeds.map((seed) =>
  buildStandardSubServicePage({
    ...seed,
    parentHub: "residential",
    slug: seed.slug as ResidentialSubPageSlug,
  }),
);

const commercialSubServicePages = commercialSubServiceSeeds.map((seed) =>
  buildStandardSubServicePage({
    ...seed,
    parentHub: "commercial",
    slug: seed.slug as CommercialSubPageSlug,
  }),
);

const specializedCombinedPages: CombinedSubServicePage[] = [
  {
    contentMode: "combinedSubService",
    parentHub: "specialized",
    slug: "structural-building-envelope",
    h1: serviceH1("Structural & Building Envelope"),
    title: "Structural & Building Envelope | GP Contracting Group",
    metaDescription:
      "Roofing and steel framing services for Greater Vancouver, Vancouver Island, and the Fraser Valley.",
    heroHeading: "Structural & Building Envelope",
    heroSubheading:
      "Roofing systems and custom steel framing — engineered, installed, and managed with technical precision.",
    heroImage: {
      src: "/images/projects/residential-luxury-hillside-construction.png",
      alt: "Luxury hillside home under construction with roof structure in progress",
    },
    heroIcon: "layers",
    linkingCardImage: {
      src: "/images/projects/residential-luxury-hillside-construction.png",
      alt: "Luxury hillside home under construction with roof structure in progress",
    },
    overview: [
      "GP Contracting Group delivers structural and building envelope work — from roofing systems to custom steel framing — with engineered approvals and disciplined installation.",
      TODO_COPY,
    ],
    processSteps: [],
    whyGp: defaultWhyGp(),
    faqs: defaultFaqs("structural and building envelope services"),
    relatedSubServices: [],
    projectsHref: "/projects/residential",
    serviceType: "Structural & Building Envelope",
    areaServed: [...SERVICE_AREA_SERVED],
    keywords: locationKeywordsWithCities("Structural & Building Envelope", [
      "North Vancouver",
      "Surrey",
    ]),
    bundledSections: [
      {
        anchorId: "roofing",
        heading: "Roofing",
        icon: "home",
        keywords: locationKeywords("Roofing"),
        overview: [
          "Roofing systems installed for long-term weather protection, proper drainage, and peace of mind.",
          TODO_COPY,
        ],
        processSteps: bulletsToProcessSteps([
          "Quality materials selected for site conditions and lifespan",
          "Weather protection and waterproofing best practices",
          "Proper drainage, flashing, and detail work at transitions",
          "Extended warranty options on qualifying installations",
        ]),
        faqs: defaultFaqs("roofing"),
      },
      {
        anchorId: "steel-framing",
        heading: "Steel Framing",
        icon: "frame",
        keywords: locationKeywords("Steel Framing"),
        overview: [
          "Custom steel framing fabricated and installed to engineered specifications with seismic compliance in mind.",
          TODO_COPY,
        ],
        processSteps: bulletsToProcessSteps([
          "Custom fabrication for structural and architectural steel",
          "Seismic compliance coordinated with engineering requirements",
          "Engineer-approved connections and installation methods",
          "Quality assurance inspections throughout erection",
        ]),
        faqs: defaultFaqs("steel framing"),
      },
    ],
  },
  {
    contentMode: "combinedSubService",
    parentHub: "specialized",
    slug: "building-systems-upgrades",
    h1: serviceH1("Building Systems Upgrades"),
    title: "Building Systems Upgrades | GP Contracting Group",
    metaDescription:
      "Acoustic ceiling solutions and EV charging electrical upgrades across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
    heroHeading: "Building Systems Upgrades",
    heroSubheading:
      "Acoustic ceiling systems and electrical infrastructure upgrades — integrated, code-compliant, and built for modern demands.",
    heroIcon: "zap",
    linkingCardImage: {
      src: "/images/projects/residential-modern-living-room-fireplace.png",
      alt: "Modern interior living space with refined ceiling and lighting details",
    },
    overview: [
      "From suspended acoustic ceilings to EV charging and electrical panel upgrades, GP Contracting Group delivers building systems work that integrates cleanly with your space.",
      TODO_COPY,
    ],
    processSteps: [],
    whyGp: defaultWhyGp(),
    faqs: defaultFaqs("building systems upgrades"),
    relatedSubServices: [],
    projectsHref: "/projects/commercial",
    serviceType: "Building Systems Upgrades",
    areaServed: [...SERVICE_AREA_SERVED],
    keywords: locationKeywordsWithCities("Building Systems Upgrades", [
      "Vancouver",
      "Burnaby",
    ]),
    bundledSections: [
      {
        anchorId: "acoustic-ceilings",
        heading: "T-Bar & Acoustic Solutions",
        icon: "grid",
        keywords: locationKeywords("Acoustic Ceilings"),
        overview: [
          "Suspended ceiling and acoustic systems that improve sound performance while integrating lighting and access.",
          TODO_COPY,
        ],
        processSteps: bulletsToProcessSteps([
          "Sound absorption solutions for offices and commercial spaces",
          "Lighting integration within ceiling grid layouts",
          "Access panels positioned for maintenance and inspections",
          "Clean installation with aligned grids and finished details",
        ]),
        faqs: defaultFaqs("acoustic ceilings"),
      },
      {
        anchorId: "ev-charging-electrical",
        heading: "EV Charging & Electrical Upgrades",
        icon: "plug",
        keywords: locationKeywords("EV Charging & Electrical"),
        overview: [
          "Electrical infrastructure upgrades to support EV charging, panel capacity, and modern power demands.",
          TODO_COPY,
        ],
        processSteps: bulletsToProcessSteps([
          "EV charger installation for residential and commercial properties",
          "Panel upgrades and load assessments for new demand",
          "Conduit and routing planned for future expansion",
          "Coordination with utility requirements and inspections",
        ]),
        faqs: defaultFaqs("EV charging and electrical upgrades"),
      },
    ],
  },
  {
    contentMode: "combinedSubService",
    parentHub: "specialized",
    slug: "accessibility-outdoor-living",
    h1: serviceH1("Accessibility & Outdoor Living"),
    title: "Accessibility & Outdoor Living | GP Contracting Group",
    metaDescription:
      "Accessibility renovations and custom outdoor recreation spaces across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
    heroHeading: "Accessibility & Outdoor Living",
    heroSubheading:
      "Accessibility renovations and custom outdoor recreation spaces — designed for safety, independence, and lasting enjoyment.",
    heroIcon: "tree",
    linkingCardImage: {
      src: "/images/projects/residential-floating-staircase-glass-railing.png",
      alt: "Residential floating staircase with glass railing and open layout",
    },
    overview: [
      "GP Contracting Group improves how people live in and use their spaces — from aging-in-place accessibility upgrades to custom outdoor sport and recreation environments.",
      TODO_COPY,
    ],
    processSteps: [],
    whyGp: defaultWhyGp(),
    faqs: defaultFaqs("accessibility and outdoor living"),
    relatedSubServices: [],
    projectsHref: "/projects/residential",
    serviceType: "Accessibility & Outdoor Living",
    areaServed: [...SERVICE_AREA_SERVED],
    keywords: locationKeywordsWithCities("Accessibility & Outdoor Living", [
      "North Vancouver",
      "Langley",
    ]),
    bundledSections: [
      {
        anchorId: "accessibility-renovations",
        heading: "Accessibility Renovations",
        icon: "accessibility",
        keywords: locationKeywords("Accessibility Renovations"),
        overview: [
          "Renovations that improve mobility, safety, and independence for aging-in-place and accessibility needs.",
          TODO_COPY,
        ],
        processSteps: bulletsToProcessSteps([
          "Aging-in-place modifications for comfort and safety",
          "Wheelchair accessibility ramps, doorways, and layouts",
          "Bathroom grab bars, curbless showers, and fixture adjustments",
          "Code-aware upgrades aligned with occupant requirements",
        ]),
        faqs: defaultFaqs("accessibility renovations"),
      },
      {
        anchorId: "outdoor-features-sport-courts",
        heading: "Custom Outdoor Features / Sport Courts",
        icon: "sun",
        keywords: locationKeywords("Outdoor Features & Sport Courts"),
        overview: [
          "Custom outdoor recreation spaces — from backyard basketball courts to tailored leisure and sport environments.",
          TODO_COPY,
        ],
        processSteps: bulletsToProcessSteps([
          "Backyard basketball courts with proper surfacing and drainage",
          "Custom outdoor recreation spaces for family and community use",
          "Site grading, fencing, and lighting coordination",
          "Durable materials selected for weather and heavy use",
        ]),
        faqs: defaultFaqs("outdoor features and sport courts"),
      },
    ],
  },
];

export const serviceSubServicePages: SubServicePageContent[] = [
  ...residentialSubServicePages,
  ...commercialSubServicePages,
  ...specializedCombinedPages,
];

serviceSubServicePages.forEach((page) => {
  page.relatedSubServices = relatedSubServicesFor(
    page.parentHub,
    page.slug,
    serviceSubServicePages,
  );
});

// ---------------------------------------------------------------------------
// Hub page content
// ---------------------------------------------------------------------------

function buildHubPage(
  slug: ServiceHubSlug,
  config: {
    heroSubheading: string;
    heroIcon: ServiceHeroIconName;
    overview: string[];
    title: string;
    metaDescription: string;
    projectsHref?: string;
    projectsCtaLabel?: string;
    heroImage?: ServiceImage;
  },
): HubServicePage {
  const subPages = serviceSubServicePages.filter((page) => page.parentHub === slug);

  const hero =
    slug === "specialized"
      ? {
          heroHeading: "Specialized",
          heroSubheading: config.heroSubheading,
          heroImage: config.heroImage ?? {
            src: "/images/projects/site-development-crane-excavator-forest.png",
            alt: "Construction site with crane and excavator against a forest backdrop",
          },
        }
      : {
          ...sectionHero(slug),
          heroSubheading: config.heroSubheading,
        };

  return {
    contentMode: "hub",
    slug,
    ...hero,
    heroIcon: config.heroIcon,
    overview: config.overview,
    linkingCards: subPages.map(subPageLinkingCard),
    projectsHref: config.projectsHref,
    projectsCtaLabel: config.projectsCtaLabel,
    title: config.title,
    metaDescription: config.metaDescription,
  };
}

export const serviceHubPages: HubServicePage[] = [
  buildHubPage("residential", {
    heroIcon: "home",
    heroSubheading:
      "Custom homes, renovations, and multi-family development across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
    overview: [
      "GP Contracting Group brings precision craftsmanship to residential projects — from ground-up custom homes to thoughtful renovations and multi-family developments.",
    ],
    title: "Residential Construction Services | GP Contracting Group",
    metaDescription:
      "Custom home construction, renovations, and multi-family development in Greater Vancouver, Vancouver Island, and the Fraser Valley.",
    projectsHref: "/projects/residential",
    projectsCtaLabel: "View Residential Projects",
  }),
  buildHubPage("commercial", {
    heroIcon: "building",
    heroSubheading:
      "Commercial construction and restaurant & bar builds — code-compliant, schedule-driven, and built for daily operations.",
    overview: [
      "From ground-up commercial builds to specialized hospitality environments, GP Contracting Group delivers construction that performs under real-world use.",
    ],
    title: "Commercial Construction Services | GP Contracting Group",
    metaDescription:
      "Commercial construction and restaurant & bar construction across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
    projectsHref: "/projects/commercial",
    projectsCtaLabel: "View Commercial Projects",
  }),
  buildHubPage("specialized", {
    heroIcon: "wrench",
    heroSubheading:
      "Targeted construction capabilities — structural envelope, building systems, accessibility, and outdoor living.",
    overview: [
      "Beyond our core residential and commercial work, GP Contracting Group delivers specialized construction services that require technical precision and engineered approvals.",
    ],
    title: "Specialized Construction Services | GP Contracting Group",
    metaDescription:
      "Roofing, steel framing, acoustic ceilings, EV charging, accessibility renovations, and outdoor recreation spaces across BC's Lower Mainland and Vancouver Island.",
    heroImage: {
      src: "/images/projects/site-development-crane-excavator-forest.png",
      alt: "Construction site with crane and excavator against a forest backdrop",
    },
  }),
];

// ---------------------------------------------------------------------------
// Services overview + tenant improvements
// ---------------------------------------------------------------------------

export const servicesOverviewContent: ServicesOverviewContent = {
  contentMode: "overview",
  heroHeading: "Construction Services",
  heroSubheading:
    "Precision craftsmanship across residential, commercial, tenant improvements, and specialized construction.",
  heroIcon: "hardhat",
  overview: [
    "GP Contracting Group delivers construction services across Greater Vancouver, Vancouver Island, and the Fraser Valley — with the accountability and craftsmanship that define every GP project.",
    "Explore our full range of work below, from ground-up residential and commercial builds to tenant improvements and specialized construction capabilities.",
  ],
  title: "Construction Services | GP Contracting Group",
  metaDescription:
    "Explore residential, commercial, tenant improvement, and specialized construction services from GP Contracting Group.",
  hubCards: [
    {
      name: "Residential",
      blurb:
        "Custom homes, renovations, and multi-family development built with precision craftsmanship.",
      href: servicePageHref("residential"),
      icon: "home",
      image: {
        src: "/images/projects/residential-modern-farmhouse-exterior.png",
        alt: "Modern white farmhouse-style custom home exterior with paver driveway",
      },
    },
    {
      name: "Commercial",
      blurb:
        "Offices, retail, restaurants, and commercial builds delivered on schedule and to code.",
      href: servicePageHref("commercial"),
      icon: "building",
      image: {
        src: "/images/projects/commercial-foundation-concrete-pump-site.png",
        alt: "Commercial foundation construction site with concrete pump trucks and forest backdrop",
      },
    },
    {
      name: "Specialized",
      blurb:
        "Roofing, steel framing, accessibility upgrades, EV infrastructure, and outdoor recreation spaces.",
      href: servicePageHref("specialized"),
      icon: "wrench",
      image: {
        src: "/images/projects/site-development-crane-excavator-forest.png",
        alt: "Construction site with crane and excavator against a forest backdrop",
      },
    },
    {
      name: "Tenant Improvements",
      blurb:
        "Office and retail tenant build-outs — ready for business on time and on budget.",
      href: servicePageHref("tenant-improvements"),
      icon: "storefront",
      image: {
        src: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
        alt: "Marble Slab Creamery tenant improvement storefront at The Bay Centre",
      },
    },
  ],
};

const tenantImprovementsPage: DeepDiveServicePage = {
  slug: "tenant-improvements",
  contentMode: "deepDive",
  heroIcon: "storefront",
  ...sectionHero("tenant-improvements"),
  overview: [
    "Tenant improvements transform raw or outdated commercial space into environments ready for business — on time, on budget, and aligned with landlord requirements.",
    "GP Contracting Group partners with tenants and property owners to deliver office and retail build-outs with thoughtful planning, modern finishes, and mechanical systems that support how the space will actually be used.",
  ],
  title: "Tenant Improvements | GP Contracting Group",
  metaDescription:
    "Office and retail tenant build-outs across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
  serviceType: "Tenant Improvements",
  areaServed: [...SERVICE_AREA_SERVED],
  faqs: defaultFaqs("tenant improvements"),
  deepDive: {
    serviceName: "Tenant Improvements",
    intro:
      "Whether you are opening a new location or refreshing an existing lease space, tenant improvements demand coordination across design intent, base building constraints, and operational deadlines. We manage that complexity so your team can focus on the business ahead.",
    focusAreas: [
      {
        title: "Space Planning",
        description:
          "We translate program requirements into efficient floor plans — balancing workflow, customer experience, storage, and code compliance before construction begins.",
      },
      {
        title: "Modern Finishes",
        description:
          "From flooring and millwork to wall treatments and branded touchpoints, we specify and install finishes that elevate the space and stand up to daily use.",
      },
      {
        title: "Lighting Design",
        description:
          "Layered lighting plans combine ambient, task, and accent fixtures to create welcoming environments while meeting energy and inspection requirements.",
      },
      {
        title: "Mechanical Optimization",
        description:
          "HVAC, plumbing, and electrical upgrades are coordinated with base building systems to improve comfort, efficiency, and long-term maintainability.",
      },
    ],
    projectContexts: [
      {
        title: "Office Tenant Build-Outs",
        description:
          "Open-plan and private office configurations, meeting rooms, reception areas, and IT infrastructure — delivered with minimal disruption to neighbouring tenants.",
      },
      {
        title: "Retail Tenant Build-Outs",
        description:
          "Storefront improvements, sales floor layouts, back-of-house support, and customer-facing finishes that help your brand make a strong first impression on day one.",
      },
    ],
    outcomes: [
      "Spaces ready for occupancy and inspection on schedule",
      "Coordinated landlord, tenant, and trade communication",
      "Finishes and systems aligned with brand and operational needs",
    ],
    processNotes: [
      "Early review of lease drawings and base building conditions",
      "Permitting and inspection coordination throughout construction",
      "Punch-list completion and turnover documentation at closeout",
    ],
  },
};

// ---------------------------------------------------------------------------
// Accessors
// ---------------------------------------------------------------------------

const subServicePageKey = (parentHub: ServiceHubSlug, slug: ServiceSubPageSlug) =>
  `${parentHub}/${slug}`;

const subServicePagesByKey = Object.fromEntries(
  serviceSubServicePages.map((page) => [
    subServicePageKey(page.parentHub, page.slug),
    page,
  ]),
) as Record<string, SubServicePageContent>;

const serviceHubPagesBySlug = Object.fromEntries(
  serviceHubPages.map((page) => [page.slug, page]),
) as Record<ServiceHubSlug, HubServicePage>;

export function getServicePageContent(
  slug: "tenant-improvements",
): DeepDiveServicePage {
  return tenantImprovementsPage;
}

export function getServiceHubContent(slug: ServiceHubSlug): HubServicePage {
  const page = serviceHubPagesBySlug[slug];
  if (!page) {
    throw new Error(`Unknown service hub slug: ${slug}`);
  }
  return page;
}

export function getSubServicePageContent<H extends ServiceHubSlug>(
  parentHub: H,
  slug: ServiceSubPageSlugByHub[H],
): SubServicePageContent {
  const page = subServicePagesByKey[subServicePageKey(parentHub, slug)];
  if (!page) {
    throw new Error(`Unknown sub-service page: ${parentHub}/${slug}`);
  }
  return page;
}

export function getServicesOverviewContent(): ServicesOverviewContent {
  return servicesOverviewContent;
}

export function getAllServiceRoutes(): string[] {
  return getAllServiceRoutePaths();
}

export function isDeepDivePage(page: ServicePageContent): page is DeepDiveServicePage {
  return page.contentMode === "deepDive";
}

export function isHubPage(page: { contentMode: string }): page is HubServicePage {
  return page.contentMode === "hub";
}

export function isStandardSubServicePage(
  page: SubServicePageContent,
): page is StandardSubServicePage {
  return page.contentMode === "subService";
}

export function isCombinedSubServicePage(
  page: SubServicePageContent,
): page is CombinedSubServicePage {
  return page.contentMode === "combinedSubService";
}

export type { SubServicePath };
