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
import { PROJECTS_HREF, SEE_RECENT_PROJECTS } from "@/lib/projects";

export type ServiceImage = {
  src: string;
  alt: string;
};

export type ServiceBeforeAfterImage = {
  before: ServiceImage;
  after: ServiceImage;
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
  | "hardhat"
  | "shield"
  | "flame"
  | "droplets";

export type ServiceFaq = {
  question: string;
  answer: string;
  /** Optional follow-on link rendered after the answer (guides, related spokes). */
  relatedLink?: { href: string; label: string };
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
  image?: ServiceImage;
};

/** Image + copy band used to break deep-dive pages into readable sections. */
export type ServiceDeepDiveNarrative = {
  eyebrow?: string;
  heading: string;
  body: string[];
  image: ServiceImage;
  /** When true, image sits on the left (desktop). Default: image on the right. */
  reverse?: boolean;
};

export type ServiceDeepDive = {
  serviceName: string;
  intro: string;
  focusAreas: ServiceDeepDiveFocusArea[];
  projectContexts: ServiceDeepDiveContext[];
  narratives?: ServiceDeepDiveNarrative[];
  outcomes?: string[];
  processNotes?: string[];
};

type ServicePageContentBase = {
  slug: ServicePageSlug;
  heroHeading: string;
  heroSubheading: string;
  heroImage: ServiceImage;
  overview: string[];
  overviewImage?: ServiceImage;
  overviewImages?: ServiceImage[];
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
    /** Optional related-service cards (e.g. Restaurant & Bar on TI). */
    relatedServiceCards?: ServiceLinkingCard[];
    relatedServicesHeading?: string;
    relatedServicesEyebrow?: string;
  };

export type ServicePageContent = DeepDiveServicePage;

// ---------------------------------------------------------------------------
// Insurance restoration overview (top-level service page)
// ---------------------------------------------------------------------------

export type ServiceListGroup = {
  heading: string;
  items: string[];
};

export type ServiceCompanyFact = {
  label: string;
  value: string;
};

export type ServiceWarrantyCallout = {
  heading: string;
  body: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
};

export type ServiceClosingCta = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
};

export type InsuranceRestorationServicePage = SeoFields &
  ServiceSchemaFields & {
    contentMode: "insuranceOverview";
    slug: "insurance-restoration";
    heroHeading: string;
    heroSubheading: string;
    heroImage: ServiceImage;
    heroIcon: ServiceHeroIconName;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    whatWeRestore: {
      heading: string;
      body: string;
      listGroups: ServiceListGroup[];
    };
    contractorChoice: {
      heading: string;
      /** Short italic statement rendered as a pull quote above the body. */
      pullQuote: string;
      body: string[];
    };
    process: {
      heading: string;
      intro: string;
      steps: ServiceProcessStep[];
    };
    warranty: ServiceWarrantyCallout;
    /** Compact trust signals shown above the detailed facts table. */
    credentialsStrip: string[];
    companyFacts: {
      heading: string;
      facts: ServiceCompanyFact[];
    };
    serviceArea: {
      heading: string;
      body: string;
    };
    /** Spoke pages under this hub (e.g. Fire Damage Rebuilds). */
    linkingCards: ServiceLinkingCard[];
    linkingCardsEyebrow?: string;
    linkingCardsHeading?: string;
    faqHeading: string;
    faqs: ServiceFaq[];
    closingCta: ServiceClosingCta;
    keywords: string[];
  };

// ---------------------------------------------------------------------------
// Insurance restoration spoke: fire damage rebuilds
// ---------------------------------------------------------------------------

export type FireComparisonPanel = {
  title: string;
  items: string[];
};

export type FireTimelineStop = {
  title: string;
  body: string;
};

export type FireAudiencePanel = {
  title: string;
  body: string;
  image: ServiceImage;
};

export type FireDamageRebuildsServicePage = SeoFields &
  ServiceSchemaFields & {
    contentMode: "fireDamageRebuilds";
    slug: "fire-damage-rebuilds";
    parentHub: "insurance-restoration";
    heroIcon: ServiceHeroIconName;
    heroHeading: string;
    heroSubheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    comparison: {
      heading: string;
      lead: string;
      left: FireComparisonPanel;
      right: FireComparisonPanel;
      closing: string;
    };
    damageLayers: {
      heading: string;
      intro: string;
      steps: ServiceProcessStep[];
      outro: string;
    };
    audience: {
      heading: string;
      lead: string;
      panels: FireAudiencePanel[];
    };
    timeline: {
      eyebrow: string;
      heading: string;
      stops: FireTimelineStop[];
    };
    /** Compact credentials band items (middot-separated in the UI). */
    credentials: string[];
    /** Overview hub link used for contextual internal linking. */
    overviewHref: string;
    overviewLinkLabel: string;
    faqHeading: string;
    faqs: ServiceFaq[];
    closingCta: ServiceClosingCta;
    keywords: string[];
  };

export type WaterHiddenDamageItem = {
  icon: "frame" | "layers" | "insulation" | "mould" | "zap";
  title: string;
  body: string;
};

export type WaterSourceCard = {
  icon: "pipe" | "roof" | "appliance" | "sewer" | "strata";
  title: string;
  body: string;
};

export type WaterScopeRow = {
  title: string;
  body: string;
  image: ServiceImage;
};

export type WaterFloodDamageServicePage = SeoFields &
  ServiceSchemaFields & {
    contentMode: "waterFloodDamage";
    slug: "water-flood-damage";
    parentHub: "insurance-restoration";
    heroIcon: ServiceHeroIconName;
    heroHeading: string;
    heroSubheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    hiddenDamage: {
      heading: string;
      paragraphs: string[];
      panelTitle: string;
      items: WaterHiddenDamageItem[];
    };
    waterSources: {
      heading: string;
      lead: string;
      cards: WaterSourceCard[];
    };
    multiUnit: {
      eyebrow: string;
      heading: string;
      body: string[];
      credentialLine: string;
    };
    rebuildScope: {
      eyebrow: string;
      heading: string;
      rows: WaterScopeRow[];
    };
    claimSide: {
      heading: string;
      paragraphs: string[];
      overviewHref: string;
      overviewLinkLabel: string;
    };
    faqHeading: string;
    faqs: ServiceFaq[];
    closingCta: ServiceClosingCta;
    keywords: string[];
  };

export type CashSettlementComparisonRow = {
  criterion: string;
  cash: string;
  restore: string;
  /** Emphasize this row as the decision driver (first row). */
  emphasize?: boolean;
};

export type CashSettlementGuideQuestion = {
  question: string;
  answer: string;
};

export type CashSettlementProsCons = {
  heading: string;
  items: string[];
};

/**
 * Editorial decision guide under insurance restoration.
 * Distinct from service spokes: Article schema, long-form sections,
 * purpose-built comparison table and five-question framework.
 */
export type CashSettlementGuidePage = SeoFields &
  ServiceSchemaFields & {
    contentMode: "cashSettlementGuide";
    slug: "cash-settlement-vs-restoration";
    parentHub: "insurance-restoration";
    heroIcon: ServiceHeroIconName;
    heroEyebrow: string;
    heroEyebrowHref: string;
    heroHeading: string;
    heroSubheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
    heroImage?: ServiceImage;
    /** Social share image. Placeholder illustrative photo; swap for real GP work. */
    ogImage?: ServiceImage;
    comparison: {
      heading: string;
      intro: string;
      cashColumnLabel: string;
      restoreColumnLabel: string;
      criterionLabel: string;
      rows: CashSettlementComparisonRow[];
      callout: string;
    };
    risk: {
      heading: string;
      body: string[];
      pullQuote: string;
      fireHref: string;
      fireLinkLabel: string;
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    optionRestore: {
      heading: string;
      body: string[];
      advantages: CashSettlementProsCons;
      drawbacks: CashSettlementProsCons;
      ownContractor: {
        heading: string;
        body: string[];
      };
    };
    optionCash: {
      heading: string;
      body: string[];
      advantages: CashSettlementProsCons;
      risks: CashSettlementProsCons;
      callout: string;
    };
    business: {
      heading: string;
      body: string[];
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    framework: {
      heading: string;
      questions: CashSettlementGuideQuestion[];
    };
    whereGpFits: {
      heading: string;
      body: string[];
      overviewHref: string;
      overviewLinkLabel: string;
      /** Contextual link to the strategic upgrades guide. */
      strategicHref?: string;
      strategicLinkLabel?: string;
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    faqHeading: string;
    faqs: ServiceFaq[];
    closingCta: ServiceClosingCta;
    keywords: string[];
  };

/**
 * Editorial guide: upgrading during an insurance-funded restoration.
 * Distinct signature components from the cash settlement guide (quick answer,
 * three-path lanes, easier/harder split) while sharing Article schema and
 * photo-backdrop conventions.
 */
export type UpgradesDuringClaimGuidePage = SeoFields &
  ServiceSchemaFields & {
    contentMode: "upgradesDuringClaimGuide";
    slug: "upgrades-during-insurance-claim";
    parentHub: "insurance-restoration";
    heroIcon: ServiceHeroIconName;
    heroEyebrow: string;
    heroEyebrowHref: string;
    heroHeading: string;
    heroSubheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
    heroImage?: ServiceImage;
    /** Social share image. Placeholder illustrative photo; swap for real GP work. */
    ogImage?: ServiceImage;
    quickAnswer: {
      label: string;
      body: string;
      cashSettlementHref: string;
      cashSettlementLinkLabel: string;
      fireHref: string;
      fireLinkLabel: string;
    };
    likeKind: {
      heading: string;
      body: string[];
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    threeOpenings: {
      heading: string;
      blocks: { title: string; body: string }[];
    };
    threePaths: {
      heading: string;
      looksLikeLabel: string;
      youPayLabel: string;
      paths: { path: string; looksLike: string; youPay: string }[];
      footer: string;
    };
    easierHarder: {
      heading: string;
      easier: { heading: string; items: string[] };
      harder: { heading: string; items: string[] };
    };
    deadline: {
      heading: string;
      body: string[];
      pullQuote: string;
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    business: {
      heading: string;
      body: string[];
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    gpConversation: {
      heading: string;
      body: string[];
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
      /** Contextual link to the strategic upgrades guide. */
      nextGuideHref?: string;
      nextGuideLinkLabel?: string;
    };
    faqHeading: string;
    faqs: ServiceFaq[];
    closingCta: ServiceClosingCta;
    keywords: string[];
  };

export type StrategicUpgradeCategory = {
  title: string;
  yieldLabel: string;
  /** Relative yield weight for the value-map meter (1–4). */
  yieldLevel: 1 | 2 | 3 | 4;
  body: string;
};

export type StrategicUpgradeEvaporateItem = {
  title: string;
  body: string;
  /** Optional inline link rendered after this item's body. */
  linkHref?: string;
  linkLabel?: string;
};

export type StrategicSeriesStage = {
  label: string;
  description: string;
  /** When true, this page is the current stage (no outbound primary link). */
  current?: boolean;
  links?: { href: string; label: string }[];
};

/**
 * Editorial guide: where upgrade dollars work hardest during restoration.
 * Signature components: category value map, evaporating-spend list, series
 * navigator. Shares Article schema and photo-backdrop conventions with the
 * other insurance guides; layout identity is intentionally distinct.
 */
export type StrategicUpgradesGuidePage = SeoFields &
  ServiceSchemaFields & {
    contentMode: "strategicUpgradesGuide";
    slug: "strategic-upgrades";
    parentHub: "insurance-restoration";
    heroIcon: ServiceHeroIconName;
    heroEyebrow: string;
    heroEyebrowHref: string;
    heroHeading: string;
    heroSubheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
    heroImage?: ServiceImage;
    /** Social share image. Placeholder illustrative photo; swap for real GP work. */
    ogImage?: ServiceImage;
    quickAnswer: {
      label: string;
      body: string;
    };
    leverage: {
      heading: string;
      body: string[];
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    valueMap: {
      heading: string;
      intro: string;
      categories: StrategicUpgradeCategory[];
    };
    evaporates: {
      heading: string;
      intro: string;
      items: StrategicUpgradeEvaporateItem[];
    };
    resale: {
      heading: string;
      body: string[];
      pullQuote: string;
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    commercial: {
      heading: string;
      body: string[];
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    honesty: {
      heading: string;
      body: string[];
      /** Full-bleed section background. Placeholder illustrative photo; swap for real GP work. */
      backgroundImage?: ServiceImage;
    };
    series: {
      heading: string;
      intro: string;
      stages: StrategicSeriesStage[];
    };
    faqHeading: string;
    faqs: ServiceFaq[];
    closingCta: ServiceClosingCta;
    keywords: string[];
  };

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
    overviewImage?: ServiceImage;
    overviewImages?: ServiceImage[];
    overviewBeforeAfterImage?: ServiceBeforeAfterImage;
    featuresSectionImage?: ServiceImage;
    processSteps: ServiceProcessStep[];
    whyGp: ServiceWhyGp;
    faqs: ServiceFaq[];
    relatedSubServices: ServiceLinkingCard[];
    projectsHref: string;
    keywords: string[];
    h1: string;
  };

export type ServiceBundledOverviewCta = {
  label: string;
  href?: string;
  placement?: "image" | "text";
  variant?: "primary" | "outline";
};

export type ServiceBundledSection = {
  anchorId: string;
  heading: string;
  icon: ServiceHeroIconName;
  keywords: string[];
  overview: string[];
  overviewImage?: ServiceImage;
  overviewCta?: ServiceBundledOverviewCta;
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
  overview?: string[];
  overviewImage?: ServiceImage;
  overviewImages?: ServiceImage[];
  overviewBeforeAfterImage?: ServiceBeforeAfterImage;
  featuresSectionImage?: ServiceImage;
  whyGp?: ServiceWhyGp;
  faqs?: ServiceFaq[];
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
    overview: seed.overview ?? [summary, TODO_COPY],
    overviewImage: seed.overviewImage,
    overviewImages: seed.overviewImages,
    overviewBeforeAfterImage: seed.overviewBeforeAfterImage,
    featuresSectionImage: seed.featuresSectionImage,
    processSteps: bulletsToProcessSteps(bullets),
    whyGp: seed.whyGp ?? defaultWhyGp(),
    faqs: seed.faqs ?? defaultFaqs(serviceName),
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
    projectsHref: PROJECTS_HREF,
    serviceType: "Custom Home Construction",
    keywordCities: ["Richmond", "Surrey"],
    overviewImage: {
      src: "/images/projects/sunnyday-customhomebuild.png",
      alt: "Custom home framing under construction on a hillside lot with forest and coastal views on a sunny day",
    },
    overview: [
      "Build your dream home with GP Contracting Group, where tailored design meets exceptional craftsmanship. Our skilled team works alongside you at every stage, shaping a home that reflects your personal style and answers your specific needs, all while holding to budget and schedule. From first concept to final walkthrough, we deliver a seamless process, and not just a house, but a space you'll be proud to call home.",
      "Every custom build begins with a real conversation about how you live and what you need from your home, followed by a thorough pre-construction phase where scope, materials, and budget are mapped out before any work begins, so there are no surprises once construction starts. You'll work with one dedicated project manager from groundbreaking through your final walkthrough, with regular updates so you're never left wondering where things stand. Whether it's a custom build on a hillside lot in Coquitlam or a family home in Langley, GP Contracting Group holds every project to the same disciplined process from start to finish.",
    ],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "Building a custom home takes more than good design. It takes a contractor who can manage engineering, permitting, trades, and finishing at a high level, all while keeping you informed every step of the way. As a family-owned company, GP Contracting Group brings that structural capability and disciplined pre-construction process to every custom home we build, whether it's a single-family home in Richmond or a larger property on Vancouver Island. We work alongside your architect and designer, or connect you with trusted partners if you don't have one, so your vision is backed by a team that's accountable from the first sketch to the final walkthrough.",
      pullQuote: "Your home, built like it's our own.",
    },
    faqs: [
      {
        question:
          "Do you only build from the ground up, or do you also take on major home rebuilds?",
        answer:
          "Both. Most of our custom home work is ground-up new construction, but we also take on major rebuilds where most of the existing structure is removed and replaced, from foundation to roofline. Whatever the starting point, we bring the same engineering, permitting, and trade coordination to the project.",
      },
      {
        question: "Which areas do you build custom homes in?",
        answer:
          "We design and build custom homes throughout Richmond, Vancouver, Surrey, Coquitlam, and across Greater Vancouver, Vancouver Island, and the Fraser Valley. If you're unsure whether your property falls within our service area, reach out and we'll let you know.",
      },
      {
        question:
          "How do I get started on a custom home with GP Contracting Group?",
        answer:
          "It starts with a conversation about your vision, budget, and the property itself. From there, we'll walk the site (or review the lot) and give you an honest sense of what's feasible before you commit to full design, so you have a realistic picture of cost and timeline from day one.",
      },
      {
        question:
          "Do I need to have my own architect or designer before contacting you?",
        answer:
          "Not at all. Some clients come to us with a design team already in place, and we build alongside them. If you don't have one, we can connect you with trusted architects and designers and manage the design-build process as one accountable team.",
      },
      {
        question: "Does GP Contracting Group handle permits and approvals?",
        answer:
          "Yes. We manage design, permitting, and construction from start to finish, including coordination with municipal building departments across Greater Vancouver, Vancouver Island, and the Fraser Valley, so you don't have to navigate that process on your own.",
      },
    ],
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
      src: "/images/projects/home-renovations-hero.jpeg",
      alt: "Open-concept renovated home with modern living room, dining area, and kitchen",
    },
    heroIcon: "hammer",
    linkingCardImage: {
      src: "/images/projects/residential-modern-kitchen-island.png",
      alt: "Modern residential kitchen with large island and pendant lighting",
    },
    projectsHref: PROJECTS_HREF,
    serviceType: "Home Renovations",
    keywordCities: ["Vancouver", "Burnaby"],
    overviewBeforeAfterImage: {
      before: {
        src: "/images/projects/home-renovations-kitchen-before.jpeg",
        alt: "Kitchen before renovation with oak cabinets and tile countertops",
      },
      after: {
        src: "/images/projects/home-renovations-kitchen-after.png",
        alt: "Modern renovated kitchen with white cabinetry, quartz countertops, and hardwood floors",
      },
    },
    overview: [
      "Great design starts with understanding your space and the way you live in it. At GP Contracting Group, we take the time to learn your needs and goals, then reimagine your home with both function and style in mind. Whether it's a kitchen overhaul, a bathroom upgrade, or a whole-home transformation, we listen carefully to your needs and deliver finishes that work for how you actually live.",
      "A renovation is only as good as the team behind it. From the first site visit through to your final walkthrough, GP Contracting Group keeps the process clear, calm, and on schedule, handling everything from structural work and permits to finish selections and trade coordination. Whether you're updating a kitchen in Burnaby, transforming a bathroom in North Vancouver, or taking on a full whole-home renovation in Surrey, we make sure the result reflects how you actually want to live.",
    ],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "Renovating your home is a significant investment, and the details matter at every stage. GP Contracting Group brings an honest, structured pre-construction process to every renovation, so you know the full scope, timeline, and cost before any work begins. As a family-owned company, we treat your home with the same care and accountability we'd bring to our own, and your dedicated project manager stays with you from first consultation through to the final walkthrough, keeping you informed every step of the way.",
      pullQuote: "Your space, reimagined with care.",
    },
    faqs: [
      {
        question: "Do I need to move out during a renovation?",
        answer:
          "Depends on the scope. For a single room like a kitchen or bathroom, most clients stay in the home. For whole-home renovations or anything involving major structural work, we'll be upfront about what's realistic and help you plan around it.",
      },
      {
        question:
          "How do you handle surprises inside the walls, like old wiring or water damage?",
        answer:
          "It happens on older homes, and we plan for it. During pre-construction we identify as many risks as possible upfront, and when something unexpected comes up during the build, we document it, walk you through the options, and agree on a path forward before proceeding.",
      },
      {
        question:
          "Can you work with my existing layout or do I need a full redesign?",
        answer:
          "Both. Some clients want to keep the footprint and just modernize the finishes and fixtures. Others want walls moved, layouts rethought, or an addition added. We'll work with whatever direction makes the most sense for your home and budget.",
      },
      {
        question: "How do I know the quote I'm getting is accurate?",
        answer:
          "We don't give ballpark numbers to win the job. Our pre-construction process produces a detailed proposal with clear allowances tied to your actual scope, so what you approve is what you pay, and any changes go through a formal process so nothing catches you off guard.",
      },
      {
        question: "How far in advance should I plan my renovation?",
        answer:
          "For larger renovations, planning a few months ahead gives you the best result. The pre-construction phase, where we finalize scope, selections, and permits, takes time done properly, and starting early means construction can begin on a schedule that actually works for you.",
      },
    ],
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
    projectsHref: PROJECTS_HREF,
    serviceType: "Multi-Family Development",
    keywordCities: ["Surrey", "Coquitlam"],
    overviewImage: {
      src: "/images/projects/multi-family-development-overview.jpeg",
      alt: "Multi-family development site with concrete pump truck and foundation formwork against a forested hillside",
    },
    overview: [
      "Grow your investment with multi-family construction built to the same standard as our custom home work. Whether it's a duplex, a townhouse complex, or a low-rise development, we deliver multi-unit projects designed for rental income, long-term durability, and lasting property value.",
      "From design and permits through to final construction, GP Contracting Group handles every detail, coordinating trades, schedules, and code compliance across each unit so the process stays on track from start to finish. Multi-family development moves at a different pace and scale than single-family work, and we bring the project management discipline to match, whether you're building a duplex in Richmond or a townhouse complex in Langley.",
    ],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "Multi-family development requires a contractor who understands both the construction side and the investment side. At GP Contracting Group, we approach every multi-unit project with an eye on durability, code compliance, and the kind of finish quality that holds up for tenants and appeals to future buyers. As a family-owned company with experience across residential and commercial construction, we bring the structural capability and trade coordination that multi-family work demands, and we keep you informed at every stage so your project stays on budget and on schedule.",
      pullQuote: "Built for tenants. Built to last.",
    },
    faqs: [
      {
        question: "What size of multi-family project do you take on?",
        answer:
          "We work across a range of scales, from duplexes and triplexes to townhouse complexes and small low-rise developments. If you're unsure whether your project fits, reach out and we'll give you a straightforward answer after reviewing the scope.",
      },
      {
        question: "How do you manage trade coordination across multiple units?",
        answer:
          "We run a single coordinated schedule across all units, with one project manager accountable for the full build. Trades are sequenced to avoid bottlenecks between units, and you get regular progress updates so you always know where the project stands.",
      },
      {
        question:
          "Do you handle rezoning and development permits for multi-family projects?",
        answer:
          "We manage building permits and coordinate with municipal requirements throughout Greater Vancouver, Vancouver Island, and the Fraser Valley. For rezoning or development permit applications, we can advise on the process and work alongside your development consultant or planner if one is involved.",
      },
      {
        question:
          "How do you spec a multi-family build differently from a custom home?",
        answer:
          "Multi-family construction prioritizes durability, acoustic performance between units, and finishes that hold up over time for tenants. We select materials and building systems with that in mind, balancing long-term performance with your budget and rental market expectations.",
      },
      {
        question: "What affects the timeline for a multi-family development?",
        answer:
          "Lot size, number of units, permitting complexity, and site conditions all play a role. We map out a realistic timeline during pre-construction so you have an honest picture before any work begins, and we build in proper sequencing so trades aren't waiting on each other mid-project.",
      },
    ],
  },
];

const commercialSubServiceSeeds: SubServiceSeed[] = [
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
    projectsHref: PROJECTS_HREF,
    serviceType: "Restaurant & Bar Construction",
    keywordCities: ["Vancouver", "Richmond"],
    overviewImage: {
      src: "/images/projects/restaurant-bar-renovation-interior.jpeg",
      alt: "Commercial restaurant interior under construction with drywall, scaffolding, and workers finishing walls",
    },
    overview: [
      "Building a restaurant or bar is unlike any other commercial project. The kitchen has to move efficiently under pressure, the ventilation has to meet health code, the bar has to flow for staff and guests at the same time, and the whole space has to be ready to open on a date that doesn't move. GP Contracting Group has built purpose-built hospitality environments for some of BC's most active franchise operators, and we understand what it takes to deliver these projects on time and to spec.",
      "We have completed restaurant builds in under 60 days from permit to open doors, with repeat clients who come back to us for every new location. That track record comes from tight trade sequencing, deep familiarity with commercial kitchen and health authority requirements, and a project management approach that treats your opening date as a hard deadline, not a target. Whether you're building your first location in Vancouver or expanding across the Lower Mainland, we bring the experience to get it done right.",
    ],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "Restaurant and bar construction has no room for vague timelines or last-minute surprises. Health authority inspections, equipment installation windows, and opening day commitments all depend on a build that moves on schedule. GP Contracting Group has earned repeat business from franchise operators across British Columbia by delivering exactly that, on time, code-compliant, and built for the demands of daily food service. As a family-owned company, we treat every location like it matters, because to our clients, it does.",
      pullQuote: "Your opening date is our deadline.",
    },
    faqs: [
      {
        question:
          "What makes restaurant construction different from other commercial builds?",
        answer:
          "Restaurants involve a level of technical coordination that most commercial builds don't, including commercial kitchen layouts, Type 1 and Type 2 hood systems, grease interceptors, health authority compliance, and equipment rough-ins that have to be sequenced correctly the first time. We know how these systems work together and how to get them inspected and approved without holding up your timeline.",
      },
      {
        question: "How quickly can you turn around a restaurant build?",
        answer:
          "We have delivered full restaurant builds in under 60 days from permit to open. Timeline depends on scope, permitting, and how early we get involved in pre-construction, but we're experienced at building to tight hospitality deadlines and we'll give you an honest picture of what's achievable from the start.",
      },
      {
        question: "Do you work with franchise operators on multiple locations?",
        answer:
          "Yes, and it's an area where we have a strong track record. Repeat clients come back to us for new locations because we understand their brand standards, their fit-out requirements, and how to replicate a build efficiently across sites.",
      },
      {
        question:
          "How do you coordinate health authority and building permit requirements?",
        answer:
          "We manage both streams simultaneously during pre-construction, so health authority requirements are built into the design and construction scope from the start rather than addressed as an afterthought. This keeps inspections on track and avoids costly revisions late in the build.",
      },
      {
        question:
          "Can you help with the layout and design of the kitchen and bar, or do we need to bring our own designer?",
        answer:
          "We can work either way. If you have a designer or franchise fit-out package, we build to that spec. If you need input on layout, flow, and equipment placement to get the most out of your space, we can contribute to that conversation during pre-construction.",
      },
    ],
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
      src: "/images/projects/structural-building-envelope-hero.jpeg",
      alt: "Structural wood framing and roof trusses inside a residential build under a clear blue sky",
    },
    heroIcon: "layers",
    linkingCardImage: {
      src: "/images/projects/residential-luxury-hillside-construction.png",
      alt: "Luxury hillside home under construction with roof structure in progress",
    },
    overview: [
      "The building envelope is what stands between your structure and the elements. GP Contracting Group delivers roofing systems and structural steel framing with engineered approvals, disciplined installation, and a standard of workmanship that holds up over time, whether we're protecting a residential roof in North Vancouver or erecting a structural steel frame for a commercial build in Surrey.",
      "These are technically demanding services that require proper sequencing, the right materials for site conditions, and installation that meets or exceeds BC building code. We manage the full scope from pre-construction planning through to inspections and sign-off, with one accountable project manager coordinating every stage. When the work is structural or envelope-grade, there is no room for shortcuts, and we don't take any.",
    ],
    processSteps: [],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "Structural and building envelope work requires a contractor who understands the engineering side as much as the installation side. GP Contracting Group brings both. Our roofing and structural steel framing work is carried out to engineered specifications, with proper approvals in place before installation begins and quality assurance checks throughout. As a family-owned company that has delivered this work across residential and commercial projects throughout Greater Vancouver, Vancouver Island, and the Fraser Valley, we hold ourselves to a standard that protects your structure for the long term.",
    },
    faqs: [
      {
        question:
          "Do you take on both residential and commercial work under structural and building envelope services?",
        answer:
          "Yes. Our roofing work spans both residential and commercial buildings. Our structural steel framing work is primarily commercial and mixed-use. Both services are delivered to the same engineered, code-compliant standard regardless of project type.",
      },
      {
        question:
          "How do roofing and structural steel framing fit together as a combined service?",
        answer:
          "Both are envelope and structure-grade services that require engineered specifications, proper approvals, and disciplined installation, which is why they sit together. Whether we're protecting a building from the outside in with a roofing system or building the structural frame from the ground up, the underlying standard is the same.",
      },
      {
        question: "How do I get a quote for structural or building envelope work?",
        answer:
          "Contact us to start with a consultation. We'll review the scope, the site, and any existing drawings or engineering, then put together a detailed proposal with honest numbers before any work begins.",
      },
      {
        question: "Do you manage permits and inspections for these services?",
        answer:
          "Yes. We manage the permitting process and coordinate inspections with the relevant authorities across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
      },
    ],
    relatedSubServices: [],
    projectsHref: PROJECTS_HREF,
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
        overviewImage: {
          src: "/images/projects/structural-building-envelope-roofing-overview.jpeg",
          alt: "Roof trusses and OSB sheathing on a residential home under construction against a clear blue sky",
        },
        overview: [
          "Roofing systems installed for long-term weather protection, proper drainage, and peace of mind.",
          "Whether it's a low-slope membrane system on a commercial building or a pitched roof on a custom home, we select materials suited to the specific site conditions, climate exposure, and performance requirements of each project. Every installation includes proper flashing, drainage planning, and transition details, because that's where roofs fail when the work isn't done right. We work across both residential and commercial roofing in Richmond, Burnaby, Coquitlam, and throughout the Lower Mainland and Fraser Valley.",
        ],
        processSteps: bulletsToProcessSteps([
          "Quality materials selected for site conditions and lifespan",
          "Weather protection and waterproofing best practices",
          "Proper drainage, flashing, and detail work at transitions",
          "Extended warranty options on qualifying installations",
        ]),
        faqs: [
          {
            question: "Do you handle both residential and commercial roofing?",
            answer:
              "Yes. We work across both, from pitched residential roofs to low-slope commercial membrane systems. The materials and installation methods differ, but the standard we hold ourselves to doesn't.",
          },
          {
            question: "What roofing systems do you install?",
            answer:
              "We work with a range of systems selected based on the building type, slope, climate exposure, and budget. For residential projects this typically includes asphalt shingle, metal, and torch-on systems. For commercial, flat and low-slope membrane systems including TPO and modified bitumen. We'll recommend what's right for your specific situation during pre-construction.",
          },
          {
            question: "How do you handle flashing and waterproofing details?",
            answer:
              "Carefully. The majority of roofing failures trace back to poor flashing and transition details, not the membrane itself. We treat every penetration, edge, and transition as a critical point in the installation and don't cut corners on waterproofing practices.",
          },
          {
            question: "Do you offer warranties on your roofing work?",
            answer:
              "Yes. Extended warranty options are available on qualifying installations depending on the system and manufacturer. We'll walk you through what's available and what it covers during the pre-construction phase.",
          },
          {
            question:
              "How do I know when my roof needs replacing versus repairing?",
            answer:
              "We can assess that during an initial consultation. In some cases a targeted repair extends the roof's lifespan significantly. In others, the underlying condition of the substrate or membrane means a full replacement is the more cost-effective long-term solution. We give you an honest picture either way.",
          },
        ],
      },
      {
        anchorId: "steel-framing",
        heading: "Steel Framing",
        icon: "frame",
        keywords: locationKeywords("Steel Framing"),
        overview: [
          "Custom steel framing fabricated and installed to engineered specifications with seismic compliance in mind.",
          "Structural steel framing requires precision at every connection point. We work from engineer-approved drawings, coordinate seismic compliance requirements with the structural engineering team, and carry out quality assurance inspections throughout the erection process. This isn't finish work, it's the skeleton the rest of the building depends on, and we approach it accordingly.",
        ],
        processSteps: bulletsToProcessSteps([
          "Custom fabrication for structural and architectural steel",
          "Seismic compliance coordinated with engineering requirements",
          "Engineer-approved connections and installation methods",
          "Quality assurance inspections throughout erection",
        ]),
        faqs: [
          {
            question:
              "What kinds of structural steel framing projects do you take on?",
            answer:
              "We handle structural steel framing for commercial buildings, mixed-use developments, and larger residential projects where steel is specified as the primary structural system. If your project has engineer-stamped drawings calling for structural steel, we can work from that documentation and manage the installation through to inspection sign-off.",
          },
          {
            question:
              "How do you ensure seismic compliance on structural steel projects?",
            answer:
              "Seismic compliance is built into our process from the start. We work from engineer-approved connection details, coordinate with the structural engineer of record throughout installation, and carry out inspections at key milestones to confirm the work meets the approved drawings before proceeding to the next stage.",
          },
          {
            question:
              "Do you work with the structural engineer directly or do we need to coordinate that ourselves?",
            answer:
              "We work directly with the structural engineer of record throughout the project. You don't need to manage that coordination yourself. If you don't yet have an engineer retained, we can advise on that during pre-construction.",
          },
          {
            question:
              "What does the quality assurance process look like on a steel framing project?",
            answer:
              "We carry out inspections at defined stages throughout the erection process, not just at the end. Connection details, anchor bolts, and critical structural elements are verified against the engineer-approved drawings as the work progresses, so issues are caught and resolved before they become expensive problems.",
          },
          {
            question:
              "How early should I bring GP Contracting Group into a structural steel project?",
            answer:
              "As early as possible. Getting us involved during pre-construction means we can review the drawings, flag any constructability concerns, confirm material lead times, and build a realistic schedule before work begins. Structural steel projects that run into problems mid-erection are almost always the result of insufficient pre-construction planning.",
          },
        ],
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
    overviewImage: {
      src: "/images/projects/building-systems-upgrades-overview.jpeg",
      alt: "GP Contracting Group crew installing acoustic ceiling tiles in a commercial office space under renovation",
    },
    overview: [
      "Modern buildings demand more from their systems than they did a decade ago. GP Contracting Group delivers acoustic ceiling installations and electrical infrastructure upgrades that integrate cleanly into both new builds and existing spaces, whether it's a suspended T-bar ceiling for a commercial office in Richmond or EV charging infrastructure for a residential property or commercial space across Greater Vancouver.",
      "These are finishing and systems-level services that have to be planned carefully and installed precisely. Done right, they're invisible in the best way, the ceiling looks clean, the lighting integrates seamlessly, and the electrical infrastructure handles modern demand without issue. GP Contracting Group brings the same disciplined pre-construction process and trade coordination to building systems work that we bring to every other service we offer.",
    ],
    processSteps: [],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "Building systems upgrades are often the last thing clients think about and the first thing they notice when the work isn't done well. GP Contracting Group coordinates acoustic ceiling and electrical upgrade work as part of a properly sequenced build, so these systems integrate with the rest of the space rather than being added as an afterthought. As a family-owned company with experience across residential, commercial, and tenant improvement projects, we hold the same standard on systems work as we do on structural work, because the details at every stage are what make a finished space feel right.",
    },
    faqs: [
      {
        question:
          "Do you handle both residential and commercial building systems work?",
        answer:
          "Yes. We install acoustic ceiling systems and EV charging and electrical upgrades across residential, commercial, and multi-unit properties throughout Greater Vancouver, Vancouver Island, and the Fraser Valley.",
      },
      {
        question:
          "Can building systems upgrades be incorporated into a larger renovation or build?",
        answer:
          "Absolutely, and that's often the most efficient way to do it. Coordinating acoustic ceiling and electrical work as part of a broader renovation or fit-out means the sequencing is right and the systems integrate cleanly with the rest of the project rather than being added separately later.",
      },
      {
        question: "How do I get a quote for building systems work?",
        answer:
          "Contact us to start with a consultation. We'll assess the space, review any existing drawings or electrical documentation, and put together a detailed proposal before any work begins.",
      },
      {
        question: "Do you manage permits and inspections for this work?",
        answer:
          "Yes. Electrical work requires permits and inspections, and we manage that process across Greater Vancouver, Vancouver Island, and the Fraser Valley. Acoustic ceiling installations in commercial spaces may also require coordination with building management, which we handle as part of the project.",
      },
    ],
    relatedSubServices: [],
    projectsHref: PROJECTS_HREF,
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
          "A well-installed acoustic ceiling does more than control sound. It defines the visual character of a space, integrates lighting and access panels cleanly, and sets the tone for the entire interior. We work across commercial offices, retail spaces, and residential applications in Vancouver, North Vancouver, Coquitlam, and throughout the Lower Mainland, installing suspended ceiling systems that are level, aligned, and finished to a standard that holds up under daily use.",
        ],
        processSteps: bulletsToProcessSteps([
          "Sound absorption solutions for offices and commercial spaces",
          "Lighting integration within ceiling grid layouts",
          "Access panels positioned for maintenance and inspections",
          "Clean installation with aligned grids and finished details",
        ]),
        faqs: [
          {
            question:
              "What spaces are T-bar and acoustic ceiling systems suited for?",
            answer:
              "They work well across a wide range of spaces, from commercial offices and retail environments where sound control and lighting integration matter, to residential spaces where a clean, finished ceiling is the goal. If you're not sure whether a suspended system is the right fit for your space, we can walk you through the options during a consultation.",
          },
          {
            question: "How do you integrate lighting into a suspended ceiling grid?",
            answer:
              "Lighting placement is planned during the layout phase before any grid work begins. We coordinate the grid layout with the lighting plan so fixtures land on module, access panels are positioned where they're actually needed, and the finished ceiling looks intentional rather than improvised.",
          },
          {
            question: "How long does a T-bar ceiling installation take?",
            answer:
              "It depends on the size and complexity of the space. A straightforward commercial office can typically be completed in a few days. Larger or more complex installations with custom grid layouts, bulkheads, or integrated systems take longer. We give you a realistic timeline during pre-construction so you can plan around it.",
          },
          {
            question:
              "Can you work in an occupied space or does the area need to be cleared?",
            answer:
              "We can phase the work to minimize disruption where possible. For commercial spaces that need to stay operational, we'll discuss scheduling and sequencing during pre-construction so the installation fits around your operations.",
          },
          {
            question:
              "Do acoustic ceiling systems actually make a meaningful difference to sound in a space?",
            answer:
              "Yes, when specified and installed correctly. The difference between a bare concrete ceiling and a properly installed acoustic tile system is significant in terms of echo, speech intelligibility, and ambient noise levels. We can advise on tile specifications based on the performance requirements of your space.",
          },
        ],
      },
      {
        anchorId: "ev-charging-electrical",
        heading: "EV Charging & Electrical Upgrades",
        icon: "plug",
        keywords: locationKeywords("EV Charging & Electrical"),
        overview: [
          "Electrical infrastructure upgrades to support EV charging, panel capacity, and modern power demands.",
          "EV charging infrastructure is increasingly expected in both residential and commercial properties, and retrofitting a building that wasn't designed for it requires careful load assessment, panel evaluation, and conduit planning. GP Contracting Group manages the full scope from load assessment and panel upgrades through to charger installation and utility coordination, across homes in Surrey and Langley as well as commercial properties throughout Greater Vancouver and Vancouver Island.",
        ],
        processSteps: bulletsToProcessSteps([
          "EV charger installation for residential and commercial properties",
          "Panel upgrades and load assessments for new demand",
          "Conduit and routing planned for future expansion",
          "Coordination with utility requirements and inspections",
        ]),
        faqs: [
          {
            question: "Do I need a panel upgrade before installing EV chargers?",
            answer:
              "It depends on your current panel capacity and how many chargers you're adding. We carry out a load assessment as part of the pre-installation process to determine whether your existing panel can support the new demand or whether an upgrade is needed before installation begins. We won't quote the charger work without understanding the full electrical picture first.",
          },
          {
            question:
              "Can you install EV charging for a multi-unit residential building or commercial parking lot?",
            answer:
              "Yes. Multi-unit and commercial EV charging installations involve a different scope than a single residential charger, including load management systems, conduit routing across multiple stalls, and utility coordination. We have the capability to plan and manage that full scope so the infrastructure handles current demand and can be expanded as needed.",
          },
          {
            question: "What level of EV charger do you install?",
            answer:
              "We install Level 2 chargers for both residential and commercial applications, which is the standard for overnight residential charging and workplace or commercial use. For specific charger brands or smart charging systems, we can work with your preferred equipment or advise on what fits your situation.",
          },
          {
            question:
              "How do you handle utility coordination and permits for electrical upgrades?",
            answer:
              "We manage the permitting process and coordinate with BC Hydro and the relevant municipal authorities across Greater Vancouver, Vancouver Island, and the Fraser Valley. Electrical work of this scope requires permits and inspections, and we handle that process as part of the installation.",
          },
          {
            question:
              "Can you plan the conduit and wiring now to make future expansion easier?",
            answer:
              "Yes, and we recommend it. Running conduit for additional circuits during the initial installation costs very little compared to retrofitting later. We build expansion capacity into the design from the start so adding chargers down the line is straightforward.",
          },
        ],
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
      "Some of the most meaningful construction work is the kind that changes how someone moves through their space every day. GP Contracting Group delivers accessibility renovations and custom outdoor recreation environments built to a standard that holds up, whether it's a code-compliant accessibility upgrade for a commercial franchise in Vancouver or a custom sport court for a family in Langley.",
      "These are projects where the details matter as much as the construction itself. An accessibility renovation has to meet code, function reliably, and feel considered rather than clinical. An outdoor sport court has to be built on properly graded ground, with the right surfacing and drainage, to perform well for years. GP Contracting Group brings the same disciplined pre-construction process and trade coordination to these projects that we bring to every build we take on.",
    ],
    processSteps: [],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "GP Contracting Group has delivered accessibility upgrades for commercial franchise operators who require code-compliant, high-quality installations across multiple locations, and custom outdoor recreation spaces for residential clients throughout Greater Vancouver. As a family-owned company, we approach both types of work with care and attention to the people who will actually use the space every day. Whether the project is a single accessibility modification or a full outdoor recreation build, we hold the same standard from start to finish.",
    },
    faqs: [
      {
        question:
          "Do you handle both residential and commercial work under accessibility and outdoor living?",
        answer:
          "Yes. Our accessibility renovation work spans both residential aging-in-place modifications and commercial accessibility upgrades for franchise operators and commercial buildings. Our outdoor recreation work is primarily residential. Both are delivered to the same standard of quality and care.",
      },
      {
        question:
          "Can accessibility and outdoor living work be combined with a larger renovation project?",
        answer:
          "Yes, and coordinating it as part of a broader renovation is often more efficient. We can scope accessibility modifications or outdoor builds alongside other renovation work so the sequencing is right and trades aren't duplicating mobilization costs.",
      },
      {
        question: "How do I get a quote for accessibility or outdoor living work?",
        answer:
          "Contact us to start with a consultation. We'll visit the site, assess what's involved, and put together a detailed proposal with clear numbers before any work begins.",
      },
      {
        question: "Do you manage permits for accessibility renovations?",
        answer:
          "Yes. Accessibility renovations that affect building structure or require code compliance need permits, and we manage that process across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
      },
    ],
    relatedSubServices: [],
    projectsHref: PROJECTS_HREF,
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
        overviewImage: {
          src: "/images/projects/accessibility-renovations-overview.jpeg",
          alt: "Commercial entrance with automatic accessibility door and wheelchair-activated push buttons",
        },
        overview: [
          "Renovations that improve mobility, safety, and independence for aging-in-place and accessibility needs.",
          "We have completed accessibility upgrades for commercial franchise locations including accessible washrooms, automatic door systems, and barrier-free layouts built to BC building code requirements. For residential clients, we bring the same precision to aging-in-place modifications, ramp installations, and bathroom conversions, treating every project as one that genuinely matters to the person it's built for. We work across North Vancouver, Surrey, Abbotsford, and throughout the Lower Mainland and Fraser Valley.",
        ],
        processSteps: bulletsToProcessSteps([
          "Aging-in-place modifications for comfort and safety",
          "Wheelchair accessibility ramps, doorways, and layouts",
          "Bathroom grab bars, curbless showers, and fixture adjustments",
          "Code-aware upgrades aligned with occupant requirements",
        ]),
        faqs: [
          {
            question: "What kinds of accessibility renovations do you take on?",
            answer:
              "We handle a wide range of accessibility work including wheelchair ramps, barrier-free bathroom conversions, grab bar installation, automatic door systems, widened doorways, and aging-in-place modifications for both residential and commercial properties. If you have a specific requirement in mind, reach out and we'll let you know what's involved.",
          },
          {
            question:
              "Do your accessibility renovations meet BC building code requirements?",
            answer:
              "Yes. All accessibility work we carry out is designed and installed to meet the relevant BC building code requirements and, where applicable, the accessibility standards required by commercial building operators and franchise networks. We manage the permitting and inspection process as part of the project.",
          },
          {
            question: "Can you match the existing finishes and materials in the space?",
            answer:
              "We do our best to match existing finishes so the accessibility upgrades integrate with the rest of the space rather than looking like an addition. For commercial clients with specific brand standards, we work to those specifications.",
          },
          {
            question:
              "How disruptive is an accessibility renovation to an occupied home or business?",
            answer:
              "It depends on the scope. Smaller modifications like grab bars and fixture adjustments can often be completed in a day or two with minimal disruption. Larger work like barrier-free bathroom conversions or ramp installations requires more time, and we'll plan the sequencing around your situation during pre-construction.",
          },
          {
            question:
              "Can you handle accessibility upgrades across multiple commercial locations?",
            answer:
              "Yes. We have experience delivering accessibility upgrades for commercial franchise operators across multiple sites, coordinating to consistent standards and timelines across locations.",
          },
        ],
      },
      {
        anchorId: "outdoor-features-sport-courts",
        heading: "Custom Outdoor Features / Sport Courts",
        icon: "sun",
        keywords: locationKeywords("Outdoor Features & Sport Courts"),
        overviewImage: {
          src: "/images/projects/sport-court-outdoor-living.jpeg",
          alt: "Custom backyard basketball half-court with modular surfacing and patio pavers at sunset",
        },
        overviewCta: {
          label: "Start your consultation",
          placement: "text",
          variant: "outline",
        },
        overview: [
          "Custom outdoor recreation spaces — from backyard basketball courts to tailored leisure and sport environments.",
          "A sport court or custom outdoor recreation space is only as good as the groundwork underneath it. We handle site grading, drainage, surfacing, fencing, and lighting as a coordinated scope rather than separate trades working in sequence, so the finished court performs the way it should from day one and holds up through BC's wet seasons. We have built sport courts for residential clients across Greater Vancouver and Vancouver Island, and we bring the same level of care to every outdoor build regardless of size.",
        ],
        processSteps: bulletsToProcessSteps([
          "Backyard basketball courts with proper surfacing and drainage",
          "Custom outdoor recreation spaces for family and community use",
          "Site grading, fencing, and lighting coordination",
          "Durable materials selected for weather and heavy use",
        ]),
        faqs: [
          {
            question:
              "What types of sport courts and outdoor recreation spaces do you build?",
            answer:
              "We build backyard basketball courts, multi-sport surfaces, and custom outdoor recreation spaces tailored to the site and the client's needs. Each project starts with a site assessment to understand grading, drainage, and space constraints before we scope the build.",
          },
          {
            question: "What surfacing options are available for sport courts?",
            answer:
              "Surfacing depends on the intended use, budget, and site conditions. We'll walk you through the options that suit your specific court type and climate exposure during pre-construction, and recommend materials selected for durability and performance in BC's weather.",
          },
          {
            question: "How important is site grading and drainage for a sport court?",
            answer:
              "It's the foundation the entire court depends on. Poor grading leads to standing water, surface deterioration, and uneven play. We handle grading and drainage as part of the court build, not as an afterthought, so the surface performs correctly and lasts.",
          },
          {
            question: "Can you add lighting and fencing to a sport court?",
            answer:
              "Yes. Lighting and fencing are part of the scope we coordinate as part of the full outdoor build. We plan placement and specification during pre-construction so everything integrates cleanly with the court layout and the property.",
          },
          {
            question: "How long does it take to build a backyard sport court?",
            answer:
              "Timeline depends on site preparation requirements, surfacing type, and any additional features like lighting or fencing. Most residential sport court builds can be completed within a few weeks once site prep is done. We give you a realistic schedule during pre-construction so you know what to expect.",
          },
        ],
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

function tenantImprovementsLinkingCard(): ServiceLinkingCard {
  return {
    name: "Tenant Improvements",
    blurb:
      "Commercial tenant improvements and interior build-outs for offices, retail, and mixed-use spaces — ready for business on time and on budget.",
    href: servicePageHref("tenant-improvements"),
    icon: "storefront",
    image: {
      src: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
      alt: "Marble Slab Creamery tenant improvement storefront at The Bay Centre",
    },
  };
}

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
      : slug === "insurance-restoration"
        ? {
            heroHeading: "Insurance Restoration",
            heroSubheading: config.heroSubheading,
            heroImage: config.heroImage ?? {
              src: "/images/projects/home-renovations-hero.jpeg",
              alt: "Residential renovation and restoration work in progress",
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
    linkingCards: [
      ...subPages.map(subPageLinkingCard),
      ...(slug === "commercial" ? [tenantImprovementsLinkingCard()] : []),
    ],
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
    projectsHref: PROJECTS_HREF,
    projectsCtaLabel: SEE_RECENT_PROJECTS.label,
  }),
  buildHubPage("commercial", {
    heroIcon: "building",
    heroSubheading:
      "Tenant improvements and restaurant & bar builds — code-compliant, schedule-driven, and built for daily operations.",
    overview: [
      "From commercial tenant improvements to specialized hospitality environments, GP Contracting Group delivers construction that performs under real-world use.",
    ],
    title: "Commercial Construction Services | GP Contracting Group",
    metaDescription:
      "Tenant improvements and restaurant & bar construction across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
    projectsHref: PROJECTS_HREF,
    projectsCtaLabel: SEE_RECENT_PROJECTS.label,
  }),
  buildHubPage("insurance-restoration", {
    heroIcon: "shield",
    heroSubheading:
      "Claims-funded reconstruction after fire, water, and storm damage — coordinated with your adjuster from first scope to final sign-off.",
    overview: [
      "When property damage puts your building into an insurance claim, GP Contracting Group carries your project from damage assessment through adjuster coordination, permits, rebuild, and claim closure — backed by a lifetime workmanship warranty.",
    ],
    title: "Insurance Restoration Services | GP Contracting Group",
    metaDescription:
      "Insurance restoration construction for homes and commercial spaces across the Lower Mainland, Fraser Valley, and Vancouver Island.",
  }),
  buildHubPage("specialized", {
    heroIcon: "wrench",
    heroSubheading:
      "Targeted construction capabilities — structural envelope, building systems, accessibility, and outdoor living.",
    overview: [
      "Beyond our core residential, commercial, and insurance restoration work, GP Contracting Group delivers specialized construction services that require technical precision and engineered approvals.",
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
// Services overview + insurance restoration + tenant improvements
// ---------------------------------------------------------------------------

export const servicesOverviewContent: ServicesOverviewContent = {
  contentMode: "overview",
  heroHeading: "Construction Services",
  heroSubheading:
    "Precision craftsmanship across residential, commercial, insurance restoration, tenant improvements, and specialized construction.",
  heroIcon: "hardhat",
  overview: [
    "GP Contracting Group delivers construction services across Greater Vancouver, Vancouver Island, and the Fraser Valley — with the accountability and craftsmanship that define every GP project.",
    "Explore our full range of work below, from ground-up residential and commercial builds to insurance restoration, tenant improvements, and specialized construction capabilities.",
  ],
  title: "Construction Services | GP Contracting Group",
  metaDescription:
    "Explore residential, commercial, insurance restoration, tenant improvement, and specialized construction services from GP Contracting Group.",
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
        "Tenant improvements and restaurant & bar builds delivered on schedule and to code.",
      href: servicePageHref("commercial"),
      icon: "building",
      image: {
        src: "/images/projects/commercial-interior-build-out.jpeg",
        alt: "GP Contracting Group worker framing a commercial interior build-out with metal stud walls and exposed ceiling infrastructure",
      },
    },
    {
      name: "Insurance Restoration",
      blurb:
        "Claims-funded rebuilds after fire, water, and storm damage — coordinated with your adjuster and backed by a lifetime warranty.",
      href: servicePageHref("insurance-restoration"),
      icon: "shield",
      image: {
        src: "/images/projects/home-renovations-hero.jpeg",
        alt: "Residential renovation and restoration work in progress",
      },
    },
    {
      name: "Specialized",
      blurb:
        "Roofing, steel framing, accessibility upgrades, EV infrastructure, and outdoor recreation spaces.",
      href: servicePageHref("specialized"),
      icon: "wrench",
      image: {
        src: "/images/projects/structural-building-envelope-hero.jpeg",
        alt: "Structural wood framing and roof trusses inside a residential build under a clear blue sky",
      },
    },
  ],
};

const insuranceRestorationPage: InsuranceRestorationServicePage = {
  contentMode: "insuranceOverview",
  slug: "insurance-restoration",
  heroIcon: "shield",
  heroHeading: "Insurance Restoration for Homes and Businesses Across BC",
  heroSubheading:
    "When fire, water, or storm damage puts your property into an insurance claim, the contractor you choose determines how well it comes back. GP Contracting Group is a licensed BC general contractor handling claims-funded reconstruction for houses, condos, strata buildings, and commercial spaces throughout the Lower Mainland, the Fraser Valley, and Vancouver Island. One team carries your project from damage assessment through adjuster coordination, permits, rebuild, and claim closure. Insurance restoration has been part of our work since the company was founded, and every rebuild is backed by our lifetime warranty.",
  heroImage: {
    src: "/images/projects/home-renovations-hero.jpeg",
    alt: "Residential renovation and restoration work in progress",
  },
  primaryCtaLabel: "Book a Free Scope Review",
  primaryCtaHref: "/#contact",
  title:
    "Insurance Restoration Contractor | Lower Mainland, Fraser Valley & Vancouver Island | GP Contracting Group",
  metaDescription:
    "GP Contracting rebuilds homes and commercial spaces after fire, water, and storm damage across the Lower Mainland, Fraser Valley, and Vancouver Island. We coordinate directly with your adjuster from first scope to final sign-off. Backed by a lifetime warranty.",
  serviceType: "Insurance Restoration",
  areaServed: [...SERVICE_AREA_SERVED],
  keywords: locationKeywordsWithCities("Insurance Restoration", [
    "Richmond",
    "Vancouver",
    "Victoria",
  ]),
  whatWeRestore: {
    heading: "Residential and Commercial Loss, Handled by One Contractor",
    body: "Most restoration firms are built around either houses or storefronts. GP does both, because the construction fundamentals behind a flooded retail space and a fire-damaged family home are the same: accurate scoping, honest pricing, clean documentation, and trades who do it right the first time.",
    listGroups: [
      {
        heading: "Residential losses we rebuild",
        items: [
          "Fire and smoke damage, from a single room to full structural rebuilds",
          "Water damage from burst pipes, appliance failures, and roof leaks",
          "Flood and storm damage, including wind and fallen trees",
          "Sewer backup and the remediation that follows",
          "Mould discovered during repairs or renovations",
          "Strata and condo water losses, including common-property coordination",
        ],
      },
      {
        heading: "Commercial losses we rebuild",
        items: [
          "Retail, office, and restaurant flood recovery",
          "Fire and smoke restoration for tenanted commercial buildings",
          "Reconstruction scheduled around your business hours where the site allows it",
          "Tenant improvement standards maintained through the rebuild, so the space reopens better than it closed",
        ],
      },
    ],
  },
  contractorChoice: {
    heading:
      "Your Insurer Suggests a Contractor. You Don't Have to Take the Suggestion.",
    pullQuote:
      "In BC, the reconstruction contractor on an insurance claim is the property owner's decision.",
    body: [
      "Insurers and adjusters maintain preferred vendor lists, and those lists exist to control cost and close files quickly. That is a reasonable goal for an insurance company. It is not always the same goal as rebuilding your property properly.",
      "Hiring GP directly means the contractor on site answers to you. We still work hand in hand with your adjuster on scope and pricing, but our obligation is to the owner: rebuild to pre-loss condition or better, use materials that match what was lost, and document everything so the claim supports the work actually required. If you are weighing your options, ask us about cash settlement versus contractor-managed restoration. We walk through the decision in detail.",
    ],
  },
  process: {
    heading: "How a Claims-Funded Rebuild Works With GP",
    intro:
      "Insurance reconstruction runs on documentation and coordination. Here is how we manage a claim from first call to closed file:",
    steps: [
      {
        title: "Walk the Loss Together",
        description:
          "We assess the damage on site with you, photograph and document every affected system, and identify hidden damage risks (wet subfloors, framing, insulation) before anyone prices anything.",
      },
      {
        title: "Align Scope With Your Adjuster",
        description:
          "We build a detailed line-item scope and work through it directly with your insurer and adjusting firm. We regularly coordinate with independent adjusters, including Coast Claims, and with all major Canadian insurers.",
      },
      {
        title: "Plan, Permit, Engineer",
        description:
          "Drawings, material specifications, municipal permits, and any required structural engineering are arranged before demolition finishes, so the rebuild starts without dead time.",
      },
      {
        title: "Rebuild From Structure Out",
        description:
          "Framing, envelope, and building systems first, verified and inspected, then finishes. Hidden damage found mid-build is documented and submitted as a scope adjustment rather than buried or ignored.",
      },
      {
        title: "Close the Claim, Keep the Warranty",
        description:
          "Final inspections, completion documentation for your insurer, and handover. Our lifetime warranty applies to the reconstruction, and you get a direct warranty contact, not a general inbox.",
      },
    ],
  },
  warranty: {
    heading: "Backed for Life, Not for a Policy Period",
    body: "Every GP insurance restoration carries our lifetime workmanship warranty. If something we rebuilt fails, we come back and make it right. No expiry date, no fine print maze.",
    contactName: "PJ Saini",
    contactPhone: "+1 (778) 891 9076",
    contactEmail: "info@gpcontracting.ca",
  },
  credentialsStrip: [
    "Licensed BC general contractor",
    "WorkSafeBC registered",
    "$5M general liability",
    "Lifetime workmanship warranty",
    "Insurance restoration since founding",
    "Lower Mainland, Fraser Valley & Vancouver Island",
  ],
  companyFacts: {
    heading: "GP Contracting: The Details Insurers and Adjusters Ask For",
    facts: [
      { label: "Company", value: "GP Contracting Group" },
      {
        label: "Address",
        value: "Unit 138 - 11782 River Rd, Richmond, BC",
      },
      { label: "Phone", value: "+1 (778) 891 9076" },
      { label: "Email", value: "info@gpcontracting.ca" },
      {
        label: "Service area",
        value: "Lower Mainland, Fraser Valley, and Vancouver Island",
      },
      {
        label: "Restoration services",
        value:
          "Fire and smoke rebuilds, water and flood reconstruction, storm and structural repair, strata water losses, commercial loss recovery",
      },
      {
        label: "Also offering",
        value:
          "Custom homes, renovations, commercial buildouts, tenant improvements, roofing, steel framing",
      },
      {
        label: "Insurance restoration since",
        value: "The company's founding",
      },
      {
        label: "Credentials",
        value:
          "Licensed BC general contractor, WorkSafeBC registered, bonded and insured. $5M general liability; $2M strata certificates available with the strata corporation named as additional insured.",
      },
      {
        label: "Warranty",
        value: "Lifetime workmanship warranty on all reconstruction",
      },
      {
        label: "Claim coordination",
        value:
          "Property owners, strata councils, property managers, independent adjusters including Coast Claims, structural engineers, and all major Canadian insurers",
      },
    ],
  },
  serviceArea: {
    heading: "One Standard Across BC",
    body: "GP Contracting Group is based in Richmond and works throughout the region: Vancouver, Burnaby, Surrey, Richmond, Delta, Langley, Abbotsford, Chilliwack, and the communities between, plus Vancouver Island projects including Victoria and Nanaimo. Wherever the loss happens, the same crew standards, documentation, and warranty apply. If you are outside these areas, call us anyway; for the right project we travel.",
  },
  linkingCardsEyebrow: "Loss Types",
  linkingCardsHeading: "Start With the Damage You Are Facing",
  linkingCards: [
    {
      name: "Fire Damage Rebuilds",
      blurb:
        "Structural repair, smoke and heat reconstruction, permits, and adjuster coordination from the day cleanup ends to the day you get the keys back.",
      href: serviceSubPageHref("insurance-restoration", "fire-damage-rebuilds"),
      icon: "flame",
      image: {
        src: "/images/projects/residential-modern-living-room-fireplace.png",
        alt: "Modern residential living room with fireplace and finished interior millwork",
      },
    },
    {
      name: "Water & Flood Damage",
      blurb:
        "Reconstruction after remediation: framing, subfloors, envelope, and finishes for homes, strata, and commercial spaces across coastal BC.",
      href: serviceSubPageHref("insurance-restoration", "water-flood-damage"),
      icon: "droplets",
      image: {
        src: "/images/projects/home-renovations-kitchen-before.jpeg",
        alt: "Kitchen interior before renovation showing exposed structure and finishes ready for rebuild",
      },
    },
  ],
  faqHeading: "Insurance Restoration Questions, Answered",
  faqs: [
    {
      question: "Am I allowed to pick my own restoration contractor in BC?",
      answer:
        "Yes. The choice of who rebuilds your property belongs to you as the owner, not to your insurance company. Insurers may recommend a vendor from their preferred list, and you are free to accept or decline. Many owners hire an independent general contractor like GP specifically so that the company doing the work answers to them rather than to the insurer's cost targets.",
    },
    {
      question: "Will GP deal with my adjuster, or is that on me?",
      answer:
        "We handle it. Scope development, line-item pricing, documentation, photographs, and progress reporting all flow between us and your adjusting firm directly. We work with independent adjusters such as Coast Claims and with every major Canadian insurer. You stay informed at each stage without having to translate construction language into insurance language yourself.",
    },
    {
      question: "Does insurance cover the full cost of the rebuild?",
      answer:
        "The approved scope of loss is paid through your claim, subject to your policy terms and deductible. Our job is to make sure the approved scope actually reflects the damage, which is where thorough documentation earns its keep. Anything you choose to upgrade beyond pre-loss condition is owner-funded, and we price it as separate line items so the boundary between claim and betterment is always visible.",
    },
    {
      question:
        "My business flooded. Can you rebuild without shutting us down completely?",
      answer:
        "Often, yes. For commercial and retail losses we look at phased reconstruction, after-hours work, and containment strategies that keep part of the space operating where safety and the scope allow. We build commercial spaces and tenant improvements as a core service, so a claims-funded commercial rebuild gets the same planning discipline as new buildout work.",
    },
    {
      question:
        "What happens if you find more damage after demolition starts?",
      answer:
        "It gets documented, photographed, and submitted to your adjuster as a supplemental scope, and work in that area pauses until it is approved. Hidden damage is normal in water and fire losses. What matters is that it is handled transparently instead of being covered over or turned into a surprise invoice.",
    },
    {
      question: "How long will my restoration take?",
      answer:
        "It depends on the size of the loss and how quickly the scope is approved. A contained water loss in a kitchen or a single commercial unit often runs several weeks. A major fire rebuild can run the better part of a year once permits, engineering, and material lead times are counted. We give you a realistic schedule at scope stage and update it whenever the claim or the site changes it.",
    },
    {
      question: "Do you handle strata and condo water damage?",
      answer:
        "Yes, including the coordination layer that makes strata losses complicated: what falls to the strata policy versus the owner's policy, common-property repairs, property manager communication, and the certificates strata corporations require. We carry $2M strata certificates with the strata named as additional insured.",
    },
    {
      question: "What does your lifetime warranty actually cover?",
      answer:
        "Our workmanship, for the life of the rebuild. If something we constructed fails because of how we built it, we return and correct it at no cost, whether that is two years after handover or ten. Manufacturer warranties on materials and fixtures apply on their own terms alongside ours.",
    },
  ],
  closingCta: {
    heading: "In the Middle of a Claim Right Now?",
    body: "The most expensive mistakes in insurance restoration happen early: accepting an under-scoped estimate, signing with the insurer's vendor by default, or starting demolition before the damage is fully documented. A free scope review with GP takes about fifteen minutes and tells you whether your claim is on track before anything is locked in.",
    ctaLabel: "Book a Free Scope Review",
    ctaHref: "/#contact",
  },
};

const fireDamageRebuildsPage: FireDamageRebuildsServicePage = {
  contentMode: "fireDamageRebuilds",
  slug: "fire-damage-rebuilds",
  parentHub: "insurance-restoration",
  heroIcon: "flame",
  heroHeading: "Fire Damage Rebuilds, From Structural Repair to Move-Back Day",
  heroSubheading:
    "Licensed BC general contractor rebuilding fire-damaged homes and commercial spaces across the Lower Mainland, the Fraser Valley, and Vancouver Island. We take over where cleanup ends and stay until the claim is closed and the keys are back in your hand.",
  primaryCtaLabel: "Book a Free Scope Review",
  primaryCtaHref: "/#contact",
  title:
    "Fire Damage Rebuild Contractor | Lower Mainland, Fraser Valley & Vancouver Island | GP Contracting",
  metaDescription:
    "After the fire is out and the cleanup crew leaves, GP Contracting rebuilds. Structural repair, smoke damage reconstruction, permits, and insurance coordination for homes and commercial spaces across the Lower Mainland, Fraser Valley, and Vancouver Island. Lifetime warranty on every rebuild.",
  serviceType: "Fire Damage Rebuilds",
  areaServed: [...SERVICE_AREA_SERVED],
  keywords: locationKeywordsWithCities("Fire Damage Rebuilds", [
    "Richmond",
    "Vancouver",
    "Victoria",
  ]),
  comparison: {
    heading: "Cleanup Gets You to Zero. The Rebuild Gets You Home.",
    lead: "After a fire, two very different kinds of companies show up, and owners are rarely told the difference. Mitigation firms stabilize and clean. Rebuilding what the fire took requires a licensed general contractor. GP is the second kind.",
    left: {
      title: "What a mitigation company handles",
      items: [
        "Board-up and emergency stabilization",
        "Smoke, soot, and odour cleanup",
        "Content packing and cleaning",
        "Water extraction from firefighting",
        "Demolition of unsalvageable material",
      ],
    },
    right: {
      title: "What GP handles as your rebuild contractor",
      items: [
        "Structural repair: framing, roof structure, load-bearing assemblies",
        "Building envelope: exterior walls, roofing, windows, weather barrier",
        "Full mechanical, electrical, and plumbing reinstatement",
        "Interior reconstruction and finish work, matched to pre-loss quality or better",
        "Permits, structural engineering, and municipal coordination",
        "Scope documentation and pricing worked directly with your adjuster",
      ],
    },
    closing:
      "If a mitigation crew is already on site, good. We coordinate with them, then carry the project the rest of the way as one accountable contractor.",
  },
  damageLayers: {
    heading: "Fire Is Never Just Fire",
    intro:
      "Most fire losses involve four kinds of damage, and a scope that only counts the burn is a scope that will run short:",
    steps: [
      {
        title: "Flame damage.",
        description:
          "The obvious loss: burned structure, finishes, and contents in the fire area itself.",
      },
      {
        title: "Smoke and soot.",
        description:
          "Travels far beyond the burn through wall cavities, ductwork, and attic spaces. Porous materials like wood, drywall, and fabric often need replacement, not cleaning, once contamination passes a threshold.",
      },
      {
        title: "Heat damage.",
        description:
          "Warped framing, compromised wiring insulation, delaminated finishes, and cracked glass in rooms the flames never reached.",
      },
      {
        title: "Water damage.",
        description:
          "Firefighting puts enormous volumes of water into a building. Saturated drywall, insulation, and subfloors frequently make up a large share of the final scope. Many fire claims are also water claims, and we scope both from day one.",
      },
    ],
    outro:
      "Our first job on any fire loss is mapping all four layers before pricing anything, so the scope your insurer approves reflects the building's real condition.",
  },
  audience: {
    heading: "Houses, Strata Buildings, Restaurants, and Retail",
    lead: "GP rebuilds fire losses on both sides of the market, because we build on both sides of the market.",
    panels: [
      {
        title: "Residential",
        body: "Kitchen fires, electrical fires, chimney and fireplace losses, and full-structure rebuilds. We restore homes to the standard they were built to, and where owners want to fund upgrades during the rebuild, we price the betterment separately so the claim stays clean.",
        image: {
          src: "/images/projects/residential-modern-living-room-fireplace.png",
          alt: "Modern residential living room with fireplace and finished interior millwork",
        },
      },
      {
        title: "Commercial",
        body: "Restaurant and commercial kitchen fires are their own discipline: hood and suppression systems, code-triggered upgrades, health authority requirements, and landlords and tenants with different policies covering different parts of the same space. We build restaurants and commercial interiors as a core service, so a fire rebuild in a tenanted space gets a contractor who already knows how these projects are put together and who covers what.",
        image: {
          src: "/images/projects/restaurant-bar-renovation-interior.jpeg",
          alt: "Commercial restaurant interior under construction with drywall, scaffolding, and workers finishing walls",
        },
      },
    ],
  },
  timeline: {
    eyebrow: "The Process",
    heading: "What the Road Back Actually Looks Like",
    stops: [
      {
        title: "The first 48 hours.",
        body: "Emergency stabilization, site security, and documentation. Everything is photographed before anything moves. If mitigation is underway, we align with that crew so demolition decisions do not destroy evidence your claim needs.",
      },
      {
        title: "Weeks one to four: scope and approval.",
        body: "We map all four damage layers, build the line-item scope, and work it through with your adjuster and insurer. We coordinate regularly with independent adjusting firms, including Coast Claims, and with all major Canadian insurers. Engineering and permit applications start in parallel so approval delays do not stack.",
      },
      {
        title: "The rebuild.",
        body: "Structure first: framing, envelope, roof, verified by inspection. Then systems: electrical, plumbing, HVAC, including any code-required upgrades your policy provides for. Finishes last, matched to what was lost. Hidden damage found along the way is documented and submitted as a supplement, never buried.",
      },
      {
        title: "Move-back and claim closure.",
        body: "Final inspections, completion documentation for the insurer, and handover. The rebuild carries GP's lifetime workmanship warranty, with a direct warranty contact: PJ Saini, +1 (778) 891 9076, info@gpcontracting.ca.",
      },
    ],
  },
  credentials: [
    "Licensed BC general contractor",
    "WorkSafeBC registered",
    "$5M general liability",
    "Lifetime workmanship warranty",
    "Insurance restoration since founding",
    "Lower Mainland, Fraser Valley & Vancouver Island",
  ],
  overviewHref: servicePageHref("insurance-restoration"),
  overviewLinkLabel: "Insurance Restoration",
  faqHeading: "Fire Rebuild Questions, Answered",
  faqs: [
    {
      question:
        "The restoration company my insurer sent is already cleaning up. Do I still need a rebuild contractor?",
      answer:
        "Usually, yes. Most mitigation firms stop at cleanup and demolition; reconstruction is a separate scope requiring a licensed general contractor. Some offer rebuild divisions, but you are not required to use them. You can have GP price and perform the rebuild while the mitigation company finishes its phase, and we will coordinate the handoff.",
    },
    {
      question:
        "The fire was contained to one room. Why is the scope so much bigger than the room?",
      answer:
        "Because smoke, heat, and firefighting water rarely stay where the flames were. Soot travels through ducts and wall cavities, heat damages wiring and finishes in adjacent spaces, and suppression water soaks floors below. A one-room fire with a four-room scope is normal, and an accurate scope now beats a supplemental fight later.",
    },
    {
      question:
        "Our restaurant had a kitchen fire. Who deals with the landlord's insurer versus ours?",
      answer:
        "Typically the building shell falls under the landlord's policy and the tenant improvements, equipment, and business contents fall under yours, with the lease deciding the grey areas. We work through that split regularly on commercial losses and keep the scopes separated so each policy pays for its own side without the rebuild stalling in between.",
    },
    {
      question:
        "Will the rebuilt structure meet today's building code even if the original didn't?",
      answer:
        "Yes, and this is often to your benefit. Reconstruction must meet current BC Building Code, and most policies include code upgrade coverage for exactly this reason. We identify code-triggered items during scoping so they are claimed properly instead of surfacing as surprises mid-build.",
    },
    {
      question:
        "Can we change the layout or finishes while we're rebuilding anyway?",
      answer:
        "Often, yes. A rebuild is the cheapest moment you will ever have to relocate a wall or upgrade a kitchen, because the structure is already open. The claim pays to restore what existed; you fund the difference for anything beyond that, priced as separate line items so the boundary is always visible.",
    },
    {
      question: "How long until we're back in?",
      answer:
        "Partial fire losses commonly run a few months. Full structural rebuilds usually run most of a year once engineering, permits, and material lead times are counted. The honest answer depends on scope approval speed and your municipality's permit timelines, and we give you a real schedule at scope stage rather than an optimistic one at signing.",
    },
    {
      question: "What happens if you open a wall and find more damage?",
      answer:
        "We photograph it, document it, and submit it to your adjuster as a supplemental scope before rebuilding over it. Hidden damage is routine in fire losses. Handled transparently, it extends the claim; handled badly, it becomes your problem two years later. We do the former, and our lifetime warranty means we stand behind the result either way.",
    },
  ],
  closingCta: {
    heading: "The Fire Is Out. Now Get the Rebuild Right.",
    body: "The decisions made in the first weeks after a fire, what gets demolished, what gets documented, and who prices the scope, shape everything that follows. Before you sign with anyone, a free scope review with GP tells you whether the claim in front of you actually covers the rebuild you need.",
    ctaLabel: "Book a Free Scope Review",
    ctaHref: "/#contact",
  },
};

const waterFloodDamagePage: WaterFloodDamageServicePage = {
  contentMode: "waterFloodDamage",
  slug: "water-flood-damage",
  parentHub: "insurance-restoration",
  heroIcon: "droplets",
  heroHeading:
    "Water and Flood Damage Reconstruction for Homes, Strata, and Commercial Spaces",
  heroSubheading:
    "The dry-out crew stops when the moisture readings do. GP Contracting is the licensed BC general contractor that rebuilds what the water actually damaged: structure, subfloors, envelope, systems, and finishes, across the Lower Mainland, the Fraser Valley, and Vancouver Island.",
  primaryCtaLabel: "Book a Free Scope Review",
  primaryCtaHref: "/#contact",
  title:
    "Water & Flood Damage Reconstruction | Lower Mainland, Fraser Valley & Vancouver Island | GP Contracting",
  metaDescription:
    "Drying is only the first step. GP Contracting rebuilds water and flood damaged homes, strata units, and commercial spaces across the Lower Mainland, Fraser Valley, and Vancouver Island: structural repair, subfloors, envelope, and full interior reconstruction. Lifetime warranty.",
  serviceType: "Water and Flood Damage Reconstruction",
  areaServed: [...SERVICE_AREA_SERVED],
  keywords: locationKeywordsWithCities("Water and Flood Damage Reconstruction", [
    "Richmond",
    "Vancouver",
    "Victoria",
  ]),
  hiddenDamage: {
    heading: "Dry Is Not the Same as Rebuilt",
    paragraphs: [
      "When water gets into a building, the visible loss is usually the smallest part. Extraction and drying matter, and the remediation companies that do them are the right first call. But a dried building is not a repaired one, and handing you back a dry shell is where most restoration outfits stop.",
      "Reconstruction is general contractor work. Assessing whether saturated framing still carries load, deciding what the envelope needs so the water does not come back, pulling permits, and rebuilding interiors to the standard they were built to: that is the part GP does, and we have done it since the company was founded. Every rebuild carries our lifetime workmanship warranty.",
    ],
    panelTitle: "What the moisture meter misses",
    items: [
      {
        icon: "frame",
        title: "Rotted framing and base plates",
        body: "Saturated studs and plates lose structural capacity long after the surface reads dry.",
      },
      {
        icon: "layers",
        title: "Swollen and heaved subfloors",
        body: "Sheathing that has cupped or delaminated will telegraph through any new flooring laid over it.",
      },
      {
        icon: "insulation",
        title: "Dead insulation",
        body: "Wet batt insulation slumps and never recovers its rated performance inside the closed wall.",
      },
      {
        icon: "mould",
        title: "Concealed mould",
        body: "Growth inside cavities and under sheet flooring that drying alone does not remove.",
      },
      {
        icon: "zap",
        title: "Compromised wiring and connections",
        body: "Water-exposed electrical that passes today and fails later if it is not assessed and replaced.",
      },
    ],
  },
  waterSources: {
    heading: "Where the Water Came From Changes How We Rebuild",
    lead: "Every water loss has a source, and the source decides the scope. These are the five we rebuild most.",
    cards: [
      {
        icon: "pipe",
        title: "Burst and frozen pipes",
        body: "Pressurized supply lines can flood a floor in minutes and push water into cavities you cannot see. These losses usually mean framing replacement, subfloor work, and rebuilding finishes across more rooms than the burst itself touched.",
      },
      {
        icon: "roof",
        title: "Roof leaks and storm damage",
        body: "Coastal BC rain and wind drive water through roofing, flashings, skylights, and window assemblies. The rebuild is as much building envelope work as interior work, and we treat the entry point, not just the stain on the ceiling.",
      },
      {
        icon: "appliance",
        title: "Appliance and fixture failures",
        body: "Dishwashers, water heaters, washing machine hoses, and toilet supply lines. Small sources, big spread: water follows gravity into the levels below, and multi-floor scopes are the norm rather than the exception.",
      },
      {
        icon: "sewer",
        title: "Sewer backup",
        body: "Category three water contaminates everything porous it touches. After specialist decontamination, we handle the strip-out verification and full reconstruction of the affected levels.",
      },
      {
        icon: "strata",
        title: "Strata and multi-unit losses",
        body: "One failed pipe, four affected units, two insurance policies, and a strata council in the middle. We rebuild the units and the common property while keeping each scope attached to the right policy.",
      },
    ],
  },
  multiUnit: {
    eyebrow: "Multi-Unit & Commercial",
    heading: "When Water Crosses Unit Lines",
    body: [
      "Water losses in strata buildings and commercial spaces are coordination problems as much as construction problems. What belongs to the strata policy versus the owner's, what the landlord covers versus the tenant, which repairs need council approval, and who signs off on common property: we work inside that structure every week, and we keep the paperwork as clean as the rebuild.",
      "For businesses, the schedule is the scope. We phase commercial water rebuilds around operations where the site allows it, because we build offices, retail, and restaurants as a core service and we know what it costs a tenant to stay dark.",
    ],
    credentialLine:
      "$2M strata certificates available with the strata corporation named as additional insured. [VERIFY WITH OWNER]",
  },
  rebuildScope: {
    eyebrow: "Rebuild Scope",
    heading: "What the Reconstruction Actually Covers",
    rows: [
      {
        title: "Structure and framing",
        body: "Rotted studs, plates, joists, and headers replaced with new material and engineered connections where loads demand it, verified by inspection before anything closes up.",
        image: {
          src: "/images/projects/residential-framing-hilltop-view.png",
          alt: "Residential wood framing under construction with hilltop views through open walls",
        },
      },
      {
        title: "Subfloors and levelling",
        body: "Heaved or delaminated sheathing replaced, substrates levelled properly, so the new flooring performs instead of telegraphing the old damage.",
        image: {
          src: "/images/projects/residential-construction-in-progress-garage.png",
          alt: "Residential construction in progress with open framing and unfinished floor structure",
        },
      },
      {
        title: "Envelope and moisture protection",
        body: "Weather barrier, flashing, insulation, and vapour control repaired or upgraded so the assembly sheds water the way it should have in the first place.",
        image: {
          src: "/images/projects/structural-building-envelope-roofing-overview.jpeg",
          alt: "Structural building envelope and roofing work on a residential project",
        },
      },
      {
        title: "Systems and finishes",
        body: "Electrical, plumbing, and HVAC assessed and brought to current code, then drywall, paint, flooring, millwork, and fixtures rebuilt to pre-loss quality or better.",
        image: {
          src: "/images/projects/home-renovations-kitchen-after.png",
          alt: "Finished kitchen interior after renovation with cabinetry, counters, and fixtures",
        },
      },
    ],
  },
  claimSide: {
    heading: "The Claim Side, Handled",
    paragraphs: [
      "Water claims are won or lost on documentation. We photograph and record before demolition, build the line-item scope, and work it through directly with your adjuster and insurer. We coordinate regularly with independent adjusting firms, including Coast Claims, and with all major Canadian insurers, and hidden damage found during strip-out is submitted as a supplement, never absorbed or ignored.",
      "The full claims-funded rebuild process, from first scope review to closed file, is laid out on our insurance restoration overview.",
    ],
    overviewHref: servicePageHref("insurance-restoration"),
    overviewLinkLabel: "insurance restoration overview",
  },
  faqHeading: "Water Damage Questions, Answered",
  faqs: [
    {
      question:
        "The remediation company says everything is dry. Why do I still need a contractor?",
      answer:
        "Because dry describes moisture content, not condition. Framing that rotted, subfloors that heaved, insulation that slumped, and wiring that sat underwater are all dry now too. A licensed general contractor assesses what the water actually did to the building and rebuilds it; that scope starts where the drying equipment leaves.",
    },
    {
      question: "Does insurance cover water damage in BC, or only some kinds?",
      answer:
        "Most policies cover sudden and accidental water losses: burst pipes, appliance failures, storm intrusion. Gradual damage from a slow leak that developed over months is often excluded, and sewer backup frequently needs its own endorsement. Your policy wording decides, and we document the loss thoroughly so the covered scope is fully captured either way.",
    },
    {
      question:
        "My upstairs neighbour's pipe flooded my condo. Whose insurance pays for what?",
      answer:
        "In most BC stratas, the strata policy covers common property and the building's original fixtures, your policy covers your contents and improvements, and the strata's deductible may be chargeable depending on the bylaws and the cause. It is genuinely situational. We keep the repair scopes separated by policy so each insurer pays its own share and the rebuild does not stall while they sort it out.",
    },
    {
      question: "What happens if you find mould when the walls come open?",
      answer:
        "Work in that area pauses, the finding is documented, and remediation by an environmental specialist is coordinated and submitted to the claim before we rebuild. Sealing mould behind new drywall is the one shortcut that always comes back, and we do not take it.",
    },
    {
      question:
        "The water only damaged part of the floor. Can you just patch that section?",
      answer:
        "Sometimes, but continuous finishes complicate it. Flooring that runs room to room often cannot be patched without a visible seam or a discontinued-product problem, which is why insurers frequently approve replacement across the continuous area rather than a patch. We flag matching issues at scope stage so the decision is made once, on paper, not twice on site.",
    },
    {
      question:
        "Our office flooded overnight. How fast can reconstruction realistically start?",
      answer:
        "Rebuild speed is set by drying completion and scope approval, not by contractor willingness. What we can do immediately is document, scope, and get pricing in front of your adjuster while remediation finishes, then phase the rebuild so the least-damaged areas of your space come back online first.",
    },
    {
      question: "Will the repair stop this from happening again?",
      answer:
        "Where the cause is part of the building, yes, that is part of the scope. Envelope failures get corrected assemblies, not just new drywall. Where code or your policy's upgrade coverage allows improvements like proper flashing details or upgraded vapour control, we claim them properly and build them in.",
    },
  ],
  closingCta: {
    heading: "Still Drying Out? This Is the Moment to Plan the Rebuild.",
    body: "The scope conversations that happen while the fans are still running decide what your claim will pay for. A free scope review with GP, before demolition finishes, means the hidden damage gets counted while it is still visible and the rebuild starts the day the site is ready instead of weeks after.",
    ctaLabel: "Book a Free Scope Review",
    ctaHref: "/#contact",
  },
};

const cashSettlementGuidePage: CashSettlementGuidePage = {
  contentMode: "cashSettlementGuide",
  slug: "cash-settlement-vs-restoration",
  parentHub: "insurance-restoration",
  heroIcon: "shield",
  heroEyebrow: "Insurance Restoration Guide",
  heroEyebrowHref: "/services/insurance-restoration",
  heroHeading:
    "Cash Settlement or Insurance Restoration? Read This Before You Sign",
  heroSubheading:
    "After a fire or flood, your insurer may offer you a cheque instead of a rebuild. That offer changes who carries the risk, who controls the quality, and what happens when the walls come open. Here is how to weigh it, whether the damaged property is your home or your business.",
  primaryCtaLabel: "Book a Free Scope Review",
  primaryCtaHref: "/#contact",
  title:
    "Cash Settlement or Insurance Restoration? A Decision Guide for BC Property Owners | GP Contracting",
  metaDescription:
    "Offered a cash settlement after fire or water damage? Before you sign, compare the payout against insurance-funded restoration. A practical guide for homeowners and business owners across the Lower Mainland, Fraser Valley, and Vancouver Island.",
  serviceType: "Cash Settlement vs Insurance Restoration",
  areaServed: [...SERVICE_AREA_SERVED],
  keywords: locationKeywordsWithCities(
    "Cash Settlement vs Insurance Restoration",
    ["Richmond", "Vancouver", "Victoria"],
  ),
  // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-hero-rebuild.png for real GP photo
  heroImage: {
    src: "/images/insurance-restoration/placeholder-hero-rebuild.png",
    alt: "Residential interior mid-rebuild with exposed framing and natural light",
  },
  // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-og-rebuild.png for real GP photo
  ogImage: {
    src: "/images/insurance-restoration/placeholder-og-rebuild.png",
    alt: "Wide view of a residential interior mid-rebuild with exposed framing",
  },
  comparison: {
    heading: "The Two Paths, Side by Side",
    intro:
      "Every claim eventually forks into one of two paths. Either the insurance company funds the restoration directly, or it pays you a lump sum and steps away. The table below is the short version of everything that follows.",
    criterionLabel: "What you are weighing",
    cashColumnLabel: "Take the cash",
    restoreColumnLabel: "Restore through the claim",
    rows: [
      {
        criterion: "Damage found after demolition",
        cash: "Your cost. The claim is closed",
        restore: "Documented and submitted against the open claim",
        emphasize: true,
      },
      {
        criterion: "If the work costs more than estimated",
        cash: "You cover the gap",
        restore: "Approved scope adjusts with actual conditions",
      },
      {
        criterion: "Who runs the project",
        cash: "You coordinate everything yourself",
        restore: "Your contractor and the adjuster coordinate together",
      },
      {
        criterion: "Finish quality",
        cash: "Whatever the cheque stretches to",
        restore: "Insurer funds like kind and quality replacement",
      },
      {
        criterion: "Who your contractor answers to",
        cash: "You",
        restore:
          "You. Choosing your own contractor is still your call",
      },
      {
        criterion: "The payout amount",
        cash: "Locked at the adjuster's initial estimate",
        restore: "Follows the real, documented scope",
      },
    ],
    callout:
      "The first row is the one that decides most claims. Accepting a settlement closes the file. Rotted subfloor, hidden mould, or compromised framing discovered three weeks later is no longer the insurer's problem. It is yours.",
  },
  risk: {
    heading:
      "The Real Question Is Not the Money. It Is Who Owns the Risk",
    body: [
      "An adjuster's estimate is built from what is visible at inspection. But fire and water damage rarely stop at what is visible. Water travels inside wall cavities. Smoke penetrates insulation. The true scope of a loss is only known after demolition, and demolition happens after you have made your decision.",
      "With an open claim, that uncertainty belongs to the insurer. Newly discovered damage gets photographed, documented, and submitted as a supplemental scope, and the approved budget grows with the real conditions. With a cash settlement, that same uncertainty transfers to you the moment you sign. The estimate becomes a ceiling instead of a starting point.",
      "This is why the settlement cheque that looks generous on paper needs to be tested against a properly built scope before you accept it, not after.",
    ],
    pullQuote:
      "An estimate written before demolition is a guess with a dollar sign. Make sure someone who builds for a living has checked it before it becomes your budget.",
    fireHref: "/services/insurance-restoration/fire-damage-rebuilds",
    fireLinkLabel: "Fire damage rebuilds",
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-risk-demo.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-risk-demo.png",
      alt: "Gutted room with exposed wall framing after demolition",
    },
  },
  optionRestore: {
    heading: "Option One: The Insurer Funds the Restoration Directly",
    body: [
      "On this path, the insurance company pays for the reconstruction as it happens, usually through a contractor working to an approved scope. Many insurers will suggest a firm from their vendor network, and for straightforward losses that arrangement can work fine.",
    ],
    advantages: {
      heading: "Advantages",
      items: [
        "The claim stays open, so hidden damage becomes a documented change to the scope rather than a surprise bill",
        "Cost overruns on approved work are absorbed by the claim, not your savings",
        "Payment flows directly from insurer to contractor, so the rebuild is not waiting on your cash flow",
        "Coordination between the contractor and the adjuster is handled for you",
      ],
    },
    drawbacks: {
      heading: "Drawbacks",
      items: [
        "Network contractors are typically selected for volume and cost control. Speed of file closure is the incentive, not craftsmanship",
        "Like kind and quality can drift in practice. Custom millwork becomes stock cabinetry, and quality flooring becomes the builder-grade equivalent, unless someone on your side is documenting what was actually there",
        "You have less say in schedule, sequencing, and finish decisions unless you assert it",
      ],
    },
    ownContractor: {
      heading:
        "You Can Bring In Your Own Contractor. Most People Are Never Told This",
      body: [
        "Here is the part of the process that surprises almost every property owner we speak with. Your policy exists to fund the restoration of your property to its pre-loss condition. In most cases it does not dictate which contractor performs that work. In British Columbia, you can generally propose a qualified contractor of your own choosing, even when the insurer has already suggested one from its network.",
        "That matters because the standard your policy promises, like kind and quality, is only as good as the team advocating for it. A contractor working for you will document the finishes you actually had, price the scope to restore them properly, and put that case in front of the adjuster. A contractor working through the insurer's vendor program has a different client.",
        "Policy wordings vary, so confirm the specifics with your broker before relying on this. But do not assume the first crew assigned to your file is the only crew allowed on it.",
      ],
    },
  },
  optionCash: {
    heading: "Option Two: Take the Settlement and Run the Rebuild Yourself",
    body: [
      "On this path, the adjuster values the loss, the insurer pays you that amount less your deductible, and the file closes. From there the project is entirely yours: your contractor, your schedule, your decisions.",
    ],
    advantages: {
      heading: "Advantages",
      items: [
        "Full control over who builds, what materials go in, and when the work happens",
        "Freedom to combine the restoration with upgrades or renovations you were already planning, funding the difference yourself",
        "No adjuster in the approval loop once the cheque clears",
      ],
    },
    risks: {
      heading: "Risks",
      items: [
        "The settlement is calculated on visible damage and standard assumptions. If the real scope is larger, the shortfall is yours",
        "Hidden damage found during demolition is not covered. The claim no longer exists",
        "Depending on your policy, settling in cash may affect how depreciation is paid out, which can leave you with less than the full replacement value",
        "Every piece of coordination, from permits to trades to documentation, lands on you",
      ],
    },
    callout:
      "Before accepting any settlement, have the offer reviewed against a contractor-built scope. A short review can reveal whether the number in front of you restores your property or just closes the insurer's file. GP does this as a free scope review, with no obligation attached.",
  },
  business: {
    heading:
      "A Different Calculation When It Is Your Business on the Line",
    body: [
      "Most guides on this decision are written for homeowners. But when the flooded or fire-damaged space is a storefront, a clinic, a restaurant, or an office, the trade-offs shift in ways that deserve their own weighing.",
      "Time carries a different cost. Every week of reconstruction is a week of lost revenue, and for many businesses the deciding factor is not which path pays more but which path reopens the doors sooner. An open claim with direct insurer payment usually starts faster than a settlement that first has to land in your account, but only if the scope gets approved without stalling. This is where a contractor who speaks the adjuster's language earns their keep.",
      "The lease complicates the scope. In leased commercial space, the boundary between the landlord's building insurance and your tenant coverage decides who claims what. Base building repairs and tenant improvements are often two separate conversations, sometimes with two separate insurers. Sorting that boundary out early prevents the worst outcome, which is a rebuild stalled while two policies point at each other.",
      "Business interruption coverage interacts with your choice. If your policy includes interruption coverage, the restoration timeline directly affects that side of the claim as well. A properly sequenced rebuild with documented milestones supports both claims at once.",
      "GP builds commercial spaces and tenant improvements as a core service, not a sideline, and restores them under insurance with the same crews and the same standard. If your loss involves a commercial space, bring the lease and the policy to the scope review. Both documents change the answer.",
    ],
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-business-shell.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-business-shell.png",
      alt: "Empty commercial interior shell with metal studs and open ceiling grid",
    },
  },
  framework: {
    heading: "Five Questions That Decide It",
    questions: [
      {
        question: "How confident are you in the estimate?",
        answer:
          "If no independent contractor has reviewed the adjuster's scope, you are not choosing between cash and restoration. You are choosing between an unverified number and an open file. Verify first, decide second.",
      },
      {
        question: "How likely is hidden damage?",
        answer:
          "Water losses, older buildings, and anything involving concealed cavities carry high hidden-damage risk. The higher that risk, the more valuable an open claim becomes, because the claim absorbs what demolition reveals.",
      },
      {
        question: "Can you carry a shortfall?",
        answer:
          "If the project runs 30 percent past the settlement, does that break you? If the honest answer is yes, the open claim's cost protection is worth more than the settlement's freedom.",
      },
      {
        question: "What is your time worth?",
        answer:
          "A cash settlement makes you the project manager: scoping, permits, trades, sequencing, documentation. Some owners want that control. Most discover it is a second job arriving at the worst possible moment.",
      },
      {
        question: "Do you already have a contractor you trust?",
        answer:
          "The settlement path only works as well as the builder running it. And on the restoration path, remember that you can generally bring your own contractor into the claim. Either way, the contractor question comes before the money question, not after.",
      },
    ],
  },
  whereGpFits: {
    heading: "Either Path, One Standard",
    body: [
      "GP Contracting is a licensed, family-owned general contractor serving the Lower Mainland, the Fraser Valley, and Vancouver Island. We rebuild homes and commercial spaces after fire and water losses on both sides of this decision. On open claims, we coordinate directly with your adjuster, document scope the way insurers require, and handle supplemental scopes when demolition reveals more than the inspection did. On cash settlements, we give you a real construction budget before you sign, so the number you accept is one that actually finishes the job.",
      "Every rebuild we deliver, insurance-funded or owner-funded, carries our lifetime warranty. The claim closes. Our accountability does not.",
    ],
    overviewHref: "/services/insurance-restoration",
    overviewLinkLabel: "Insurance restoration overview",
    strategicHref: "/services/insurance-restoration/strategic-upgrades",
    strategicLinkLabel: "Where upgrade dollars work hardest",
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-finished-interior.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-finished-interior.png",
      alt: "Restored open-plan living interior with hardwood floors",
    },
  },
  faqHeading: "Settlement and Restoration Questions, Answered",
  faqs: [
    {
      question:
        "Can I accept a cash settlement for part of the claim and restore the rest through insurance?",
      answer:
        "Sometimes. Insurers will occasionally split a claim, for example cashing out contents while funding the structural rebuild directly. Whether that is available depends on your policy and adjuster, and it is worth asking about explicitly if part of the loss is straightforward and part is not.",
    },
    {
      question:
        "I already accepted a settlement and the money is not enough. What are my options?",
      answer:
        "It depends on what you signed and when. In some cases a claim can be reopened if significant related damage is discovered, but there is no guarantee. Speak with your broker and, for a larger shortfall, consider getting legal advice on the release you signed. On the construction side, we can help you re-scope the project to make the remaining budget go as far as possible.",
    },
    {
      question: "How does depreciation affect a cash settlement?",
      answer:
        "Many policies pay replacement cost in two stages: actual cash value up front, with the depreciation holdback released once repairs are actually completed. If you settle in cash and never complete the work, or complete less of it, some policies pay out less in total. Read the replacement cost conditions in your policy carefully before deciding, and ask your broker how the holdback is triggered.",
    },
    {
      question:
        "If I stay on the insurance-funded path, will the insurer pay my contractor directly?",
      answer:
        "Usually, yes. On an approved scope, payment typically flows from the insurer to the contractor as work progresses, less your deductible. That is one of the practical advantages of keeping the claim open: the rebuild is not gated on your personal cash flow.",
    },
    {
      question:
        "Can I upgrade my property during an insurance-funded restoration?",
      answer:
        "Yes, and it is often the smartest time to do it, since walls are already open and trades are already mobilized. The claim pays to restore what existed. You fund the difference for anything beyond that, priced as separate line items so the boundary stays clean for the adjuster. We are happy to price the upgrade scenarios alongside the restoration scope.",
      relatedLink: {
        href: "/services/insurance-restoration/upgrades-during-insurance-claim",
        label: "Can you upgrade during an insurance claim?",
      },
    },
  ],
  closingCta: {
    heading: "Do Not Sign Until Someone Has Checked the Number",
    body: "The settlement offer in your hands was built from a single inspection of visible damage. Whether you take the cash or keep the claim open, that number deserves a second set of eyes from someone who prices rebuilds every week. A free scope review with GP takes a fraction of the time the decision deserves, and it costs you nothing either way.",
    ctaLabel: "Book a Free Scope Review",
    ctaHref: "/#contact",
  },
};

const upgradesDuringClaimGuidePage: UpgradesDuringClaimGuidePage = {
  contentMode: "upgradesDuringClaimGuide",
  slug: "upgrades-during-insurance-claim",
  parentHub: "insurance-restoration",
  heroIcon: "shield",
  heroEyebrow: "Insurance Restoration Guide",
  heroEyebrowHref: "/services/insurance-restoration",
  heroHeading: "Can You Upgrade During an Insurance Claim?",
  heroSubheading:
    "Yes, and the rebuild is often the cheapest moment you will ever have to do it. But the rules matter. Here is how upgrading during an insurance-funded restoration actually works in BC, for your home or your business.",
  primaryCtaLabel: "Book a Free Scope Review",
  primaryCtaHref: "/#contact",
  title:
    "Can You Upgrade During an Insurance Claim? Your Options in BC | GP Contracting",
  metaDescription:
    "Rebuilding after fire or water damage does not mean putting everything back exactly as it was. How upgrades work during an insurance claim in BC, what the approved budget can cover, what betterment means, and when to decide. For homes and businesses across the Lower Mainland, Fraser Valley, and Vancouver Island.",
  serviceType: "Upgrades During an Insurance Claim",
  areaServed: [...SERVICE_AREA_SERVED],
  keywords: locationKeywordsWithCities(
    "Upgrades During an Insurance Claim",
    ["Richmond", "Vancouver", "Victoria"],
  ),
  // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-hero-kitchen.png for real GP photo
  heroImage: {
    src: "/images/insurance-restoration/placeholder-upgrade-hero-kitchen.png",
    alt: "Kitchen mid-renovation with unfinished cabinets and open wall cavity",
  },
  // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-og.png for real GP photo
  ogImage: {
    src: "/images/insurance-restoration/placeholder-upgrade-og.png",
    alt: "Kitchen mid-renovation with unfinished cabinets and open wall cavity",
  },
  quickAnswer: {
    label: "The Short Answer",
    body: "BC property owners can upgrade during an insurance claim through three legitimate routes. First, better finishes within the approved budget, where trade pricing and sourcing flexibility deliver more than the retail equivalent without triggering betterment. Second, targeted upgrades where you fund only the documented difference between the restoration scope and what you actually want. Third, a combined restore-and-renovate project, where the claim covers what existed and you fund a genuine redesign. Two rules govern all three: insurance restores to like kind and quality, and anything beyond that is betterment you pay for. And one deadline governs everything: decide during scope and design, because the same upgrade decided after demolition costs several times more.",
    cashSettlementHref:
      "/services/insurance-restoration/cash-settlement-vs-restoration",
    cashSettlementLinkLabel: "Cash settlement vs. restoration",
    fireHref: "/services/insurance-restoration/fire-damage-rebuilds",
    fireLinkLabel: "Fire damage rebuilds",
  },
  likeKind: {
    heading: "What the Claim Pays For: Like Kind and Quality",
    body: [
      "Every property policy in BC makes the same core promise: restore the property to its pre-loss condition using materials of like kind and quality. Those five words decide almost every disagreement in a restoration.",
      'Pre-loss condition means what was actually there the day before the damage. If your kitchen had solid hardwood floors, the claim funds equivalent hardwood, not laminate. If your office had commercial-grade millwork, the claim funds commercial-grade millwork, not flat-pack shelving. The standard is equivalence to what existed, and holding the scope to that standard is half the value a good contractor brings, because the person documenting what was there is the person who decides whether "like kind" means what you had or what is cheapest to install.',
      "The flip side of the promise is just as firm. Insurance restores. It does not improve. Anything that ends up better than pre-loss condition is called betterment, and betterment is yours to fund. That sounds limiting. In practice it leaves far more room than most owners expect, for three reasons.",
    ],
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-finishes.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-upgrade-finishes.png",
      alt: "Hardwood flooring planks, stone slab, and tile staged during a rebuild",
    },
  },
  threeOpenings: {
    heading: 'Why "Restore Only" Still Leaves Room to Upgrade',
    blocks: [
      {
        title: "The budget buys work, not brands.",
        body: "The approved line item for your cabinets reflects what the insurer expects comparable cabinets to cost. Contractors buy at trade pricing, not retail, and have flexibility in where materials come from. When equivalent or better product can be sourced for the approved amount, you end up with a stronger finish at the same cost to the insurer. Nothing extra is charged, so no betterment is triggered.",
      },
      {
        title: "Open walls are already paid for.",
        body: "Demolition, structural prep, and rough-in are the expensive stages of any renovation, and in a restoration the claim has already covered them. While walls are open, adding insulation, upgrading wiring, running data cable, roughing in for future fixtures, or improving sound separation between rooms costs a fraction of what the same work costs as a standalone project. The claim funds the rebuild. You fund only the small increment of doing it better while it is open.",
      },
      {
        title: "You can pay the difference.",
        body: "For a true upgrade, a changed layout, a finish that genuinely exceeds what was there, a system that did not exist before, you fund the delta between the approved restoration scope and the upgraded scope. Priced and documented as separate line items, the insurer's portion stays clean and uncontested while you get the result you actually want.",
      },
    ],
  },
  threePaths: {
    heading: "Three Ways Owners Actually Do This",
    looksLikeLabel: "What it looks like",
    youPayLabel: "What you pay",
    paths: [
      {
        path: "Better within budget",
        looksLike:
          "The restoration scope as approved, with sourcing and trade pricing stretched to deliver the strongest finish the line items allow",
        youPay: "Nothing beyond your deductible",
      },
      {
        path: "Targeted upgrades",
        looksLike:
          "The restoration scope plus specific improvements: a reworked kitchen, upgraded bathroom, insulation and wiring while walls are open",
        youPay:
          "Only the documented difference, itemized separately from the claim",
      },
      {
        path: "Restore and renovate",
        looksLike:
          "The damage becomes the trigger for the renovation you were already considering. The claim covers what existed; you fund the redesign",
        youPay:
          "A real additional investment, run as one coordinated project",
      },
    ],
    footer:
      "All three are routine when the claim is documented properly from the start. Which one fits depends on your budget, your appetite for a bigger project, and honestly, how much you liked the space before the damage.",
  },
  easierHarder: {
    heading: "What Upgrades Easily, and What Does Not",
    easier: {
      heading: "Easier, often within or near the approved budget:",
      items: [
        "Finish substitutions: a different cabinet style, upgraded countertop, better tile, provided the sourced cost stays inside the line item",
        "Insulation and soundproofing added while framing is open",
        "A properly designed lighting layout instead of a one-for-one fixture swap, since electrical rough-in is already happening",
        "Fixture upgrades in bathrooms and kitchens, where trade pricing frequently covers a category jump",
        "Paint, trim, and door hardware improvements, which are small deltas with outsized daily impact",
      ],
    },
    harder: {
      heading: "Harder, requiring real planning and real money:",
      items: [
        "Moving walls. A layout change shifts the project from restoration into renovation, bringing permits, engineering, and time",
        "Adding square footage. A claim never funds new footprint. An addition can run in parallel as its own scope, but it is its own project",
        "Wholesale system replacements, new heating type, upgraded electrical service, replumbing. Usually betterment, though when a damaged system must be replaced anyway, the marginal cost of upgrading rather than matching can be surprisingly small",
        "Major mechanical additions like radiant floors or central cooling, which have to be decided before the rebuild sequence locks",
      ],
    },
  },
  deadline: {
    heading: "Decide Before the Drawings Are Final",
    body: [
      "Every path above shares one sequencing rule that outweighs the rest: upgrade decisions belong in the scope and design stage, before construction documents are finalized and trades are scheduled.",
      "An upgrade decided during design is a line on a drawing. The same upgrade decided in week four of construction is a change order, with re-pricing, re-sequencing, idle trades, and sometimes physical rework. The cost multiplies, and some options simply close once the rebuild is underway. If any part of you is wondering whether to improve while rebuilding, raise it at the scope review. Exploring it costs nothing. Discovering it too late costs plenty.",
    ],
    pullQuote:
      "The claim already paid for the demolition. The question is whether you decide what to do with that opening before the drawings close, or after.",
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-open-walls.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-upgrade-open-walls.png",
      alt: "Open framed wall with insulation and electrical rough-in during a rebuild",
    },
  },
  business: {
    heading: "Upgrading a Commercial Space During a Claim",
    body: [
      "For business owners, the logic gets stronger, not weaker. A damaged commercial space is already closed or partially closed, which means the most expensive part of any commercial renovation, the downtime, is already being spent. Rebuilding the space exactly as it was and then closing again in two years for the improvements you already know you want is paying for that downtime twice.",
      "The same restoration window can absorb the tenant improvement work you have been deferring: a reworked floor plan, updated finishes that match where the brand is going, better lighting, improved accessibility. The claim funds restoration to pre-loss condition; you fund the improvement delta, itemized separately, exactly as in a residential claim.",
      "Two commercial-specific cautions. In leased space, the line between the landlord's building policy and your tenant coverage decides who claims what, and any layout or systems change likely needs landlord consent, so bring the lease into the conversation early. And permits for commercial alterations can take longer than the restoration scope itself, which makes the decide-early rule even less forgiving. GP builds tenant improvements as a core service and runs these hybrid restoration-plus-TI projects as one coordinated scope, one schedule, one point of accountability.",
    ],
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-commercial-ti.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-upgrade-commercial-ti.png",
      alt: "Commercial interior fit-out with metal studs and open ceiling grid",
    },
  },
  gpConversation: {
    heading: "The Upgrade Conversation, Before Anything Is Committed",
    body: [
      "At the scope review, before construction begins, we walk through three things in plain terms. What the insurer has approved, line by line, and what we can realistically source for those amounts. Where the approved budget already has room to deliver better than a one-for-one replacement. And which upgrades cross into betterment, with honest pricing on each, so the decision is yours with real numbers in front of you.",
      "Everything you choose gets documented with the insurer's portion and your portion clearly separated, which keeps the claim clean and keeps the project auditable. And whichever path you take, the finished work carries our lifetime warranty, on the restored scope and the upgraded scope alike.",
    ],
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-finished-kitchen.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-upgrade-finished-kitchen.png",
      alt: "Finished upgraded open-plan kitchen with stone island and hardwood floors",
    },
    nextGuideHref: "/services/insurance-restoration/strategic-upgrades",
    nextGuideLinkLabel: "Where upgrade dollars work hardest",
  },
  faqHeading: "Upgrade Questions, Answered",
  faqs: [
    {
      question: "Does upgrading during the rebuild put my claim at risk?",
      answer:
        "Not when it is structured properly. The insurer approves and funds the restoration scope. Upgrades are priced, invoiced, and documented as separate items funded by you. Problems arise when the two get blended, for example when upgrade costs are quietly folded into claim line items. That is the thing to avoid, and clean documentation is how you avoid it.",
    },
    {
      question:
        'Who decides what counts as "like kind and quality" for what I had?',
      answer:
        "In practice, it is negotiated between your contractor and the adjuster based on documentation of what existed. This is why photographing and itemizing pre-loss finishes matters so much. An owner who can show what was actually there gets a scope that reflects it. If you have photos of your space from before the damage, gather them now. They are worth real money in the scope.",
    },
    {
      question:
        "Can I use my own money to change the layout while the insurance rebuild is happening?",
      answer:
        "Yes. A layout change moves that portion of the work from restoration into renovation, which means design, possibly engineering and permits, and homeowner funding for the difference. Run inside the same project it is far cheaper than doing it later as a standalone renovation, but it must be decided before drawings are finalized.",
    },
    {
      question:
        "If my damaged furnace or panel has to be replaced anyway, do I pay full price to upgrade it?",
      answer:
        "No, and this is one of the best openings a claim creates. The insurer funds replacement of the damaged unit with an equivalent one. If you want the better unit, you pay only the difference between the equivalent model and the upgrade, not the full cost of new equipment. When a system is being replaced regardless, the marginal cost of stepping up is often modest.",
    },
    {
      question:
        "My business was damaged. Can I combine the insurance rebuild with the renovation I was already planning?",
      answer:
        "Yes, and it is usually the most cost-effective moment to do it, because the downtime is already happening. The claim restores the space to pre-loss condition, your investment funds the improvements, and the two scopes run as one coordinated project. Involve your landlord early if you lease, since alterations beyond restoration typically need consent under the lease.",
    },
  ],
  closingCta: {
    heading: "The Walls Are Coming Open Either Way",
    body: "A restoration is a renovation you did not choose, but it comes with a choice anyway: put everything back exactly as it was, or use the opening. A free scope review with GP walks through what your approved budget can really deliver, what an upgrade would honestly cost, and what we would do in your position. No commitment, and the exploring costs you nothing.",
    ctaLabel: "Book a Free Scope Review",
    ctaHref: "/#contact",
  },
};

const strategicUpgradesGuidePage: StrategicUpgradesGuidePage = {
  contentMode: "strategicUpgradesGuide",
  slug: "strategic-upgrades",
  parentHub: "insurance-restoration",
  heroIcon: "shield",
  heroEyebrow: "Insurance Restoration Strategy",
  heroEyebrowHref: "/services/insurance-restoration",
  heroHeading: "Rebuild It Back, or Build It Better?",
  heroSubheading:
    "The claim restores what you had. This guide is about the smarter question: if you are going to put money on top, where does it actually work? A category-by-category look at where upgrade dollars earn their keep during a restoration, and where they quietly evaporate.",
  primaryCtaLabel: "Book a Free Scope Review",
  primaryCtaHref: "/#contact",
  title:
    "Strategic Upgrades During Insurance Restoration: Where the Budget Works Hardest | GP Contracting",
  metaDescription:
    "The insurance claim already paid for demolition, trades, and rebuild. Where should upgrade dollars actually go? A practical playbook for homes and businesses across the Lower Mainland, Fraser Valley, and Vancouver Island: the categories that reward investment during restoration, the ones that waste it, and how to decide.",
  serviceType: "Strategic Upgrades During Insurance Restoration",
  areaServed: [...SERVICE_AREA_SERVED],
  keywords: locationKeywordsWithCities(
    "Strategic Upgrades During Insurance Restoration",
    ["Richmond", "Vancouver", "Victoria"],
  ),
  // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-strategic-hero-bath.png for real GP photo
  heroImage: {
    src: "/images/insurance-restoration/placeholder-strategic-hero-bath.png",
    alt: "Finished premium bathroom with freestanding tub and frameless glass shower",
  },
  // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-strategic-og.png for real GP photo
  ogImage: {
    src: "/images/insurance-restoration/placeholder-strategic-og.png",
    alt: "Finished premium bathroom with freestanding tub and frameless glass shower",
  },
  quickAnswer: {
    label: "The Short Answer",
    body: "During an insurance restoration, the expensive stages of any renovation, demolition, structural prep, and rough-in, are already funded by the claim. That makes upgrade dollars unusually efficient, but only in the areas the restoration already touches. Value concentrates in a handful of categories: kitchens and bathrooms, flooring, lighting, insulation while walls are open, and built-in storage. It evaporates in others: rooms the claim never opened, hidden over-speccing, and trend-driven choices. The discipline is spending where the claim has already done the heavy lifting, and stopping where it has not.",
  },
  leverage: {
    heading: "Why a Dollar Spent Now Buys More Than a Dollar Spent Later",
    body: [
      "Ask anyone who has renovated: the money is not in the pretty parts. It is in tearing out, hauling away, reframing, rewiring, and re-plumbing before a single visible finish goes in. In a standalone renovation, that preparation routinely consumes half the budget or more before anything looks different.",
      "In an insurance restoration, the claim has already absorbed those stages for every area in scope. The trades are mobilized. The permits are pulled. The dust is already a fact of life. Which means any upgrade dollar you choose to add skips straight past preparation and lands entirely on the part you will actually see and live with.",
      "That is the whole strategy in one sentence: the claim pays for the opening, so your money buys only finish. The same kitchen upgrade that costs a set amount inside a restoration can cost dramatically more two years later as a standalone project, because you would be paying for the opening all over again. What follows is where that leverage is strongest.",
    ],
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-finishes.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-upgrade-finishes.png",
      alt: "Hardwood flooring, stone slab, and tile staged beside an open wall during a rebuild",
    },
  },
  valueMap: {
    heading: "The High-Yield Categories",
    intro:
      "These are the areas where the combination of an already-open space and trade pricing consistently delivers the most visible result per dollar added.",
    categories: [
      {
        title: "Kitchens",
        yieldLabel: "Highest impact",
        yieldLevel: 4,
        body: "The most-used and most-seen room in the house, and the one buyers and guests judge first. If the claim opened the kitchen, the increment for a meaningfully better layout, counters, and cabinet fronts is the best-spent money on the project.",
      },
      {
        title: "Bathrooms",
        yieldLabel: "Highest impact",
        yieldLevel: 4,
        body: "Water losses hit bathrooms constantly, which means the tile, glass, and fixtures are often already in scope. Trade pricing on fixtures and the already-funded waterproofing stage make a genuine step up affordable here.",
      },
      {
        title: "Flooring",
        yieldLabel: "Strong impact",
        yieldLevel: 3,
        body: "When flooring is being replaced anyway across connected spaces, upgrading the material is a per-square-metre delta, not a new project. It is also the upgrade that unifies everything else visually.",
      },
      {
        title: "Lighting",
        yieldLabel: "Strong impact, small delta",
        yieldLevel: 3,
        body: "Electrical rough-in is already happening. A designed lighting plan instead of a one-for-one fixture swap changes how every finished surface reads, for a fraction of the attention the other categories demand.",
      },
      {
        title: "Insulation and sound separation",
        yieldLabel: "Invisible, permanent, cheap right now",
        yieldLevel: 2,
        body: "The one upgrade that is only ever affordable while framing is exposed. Between bedrooms, around bathrooms, under floors: this is the last chance to buy quiet at open-wall prices.",
      },
      {
        title: "Built-in storage and millwork",
        yieldLabel: "Strong impact",
        yieldLevel: 3,
        body: "Closets, mudroom built-ins, a proper pantry. Carpentry is on site and finishing is already scheduled, which is precisely when custom storage stops being a luxury line item.",
      },
      {
        title: "Paint, trim, and hardware",
        yieldLabel: "Small money, daily payoff",
        yieldLevel: 1,
        body: "The cheapest category on the page and the one you touch every single day. Almost never worth skipping.",
      },
    ],
  },
  evaporates: {
    heading: "The Low-Yield Spends, Named Honestly",
    intro:
      "A contractor who only ever says yes is not advising you. These are the spends we regularly talk clients out of, because the restoration's leverage does not extend to them.",
    items: [
      {
        title: "Rooms the claim never touched",
        body: "The efficiency of upgrading during restoration comes from the opening already being paid for. In an undamaged room, there is no opening. Work there is a standalone renovation at standalone prices, and bundling it into the project timeline does not change the math, it just hides it.",
      },
      {
        title: "Relocating plumbing without a reason",
        body: "Moving a sink or toilet a metre for preference, not function, drags rough-in, slab or subfloor work, and inspection into what was a finish decision. If the layout works, spend on what you touch and see instead.",
      },
      {
        title: "Over-speccing what no one experiences",
        body: "There is a sensible version of upgrading hidden systems, covered in {link}, when a damaged system must be replaced anyway. Beyond that, premium spend buried in walls that neither comfort nor resale will ever register is budget taken from categories that would show it.",
        linkHref: "/services/insurance-restoration/upgrades-during-insurance-claim",
        linkLabel: "the previous guide",
      },
      {
        title: "Chasing the trend of the year",
        body: "A restoration is a long-horizon reset. Materials and colours at the peak of fashion date the fastest, which means paying a premium now for the thing most likely to feel tired first. Spend the premium on quality and proportion; they do not expire.",
      },
      {
        title: "Stretching into betterment without a plan",
        body: "Upgrades priced casually mid-project become change orders, and change orders during a restoration are the most expensive way to buy anything. Every upgrade on this page belongs in the scope stage, priced and decided before drawings close.",
      },
    ],
  },
  resale: {
    heading: "Restored to Yesterday, or Ready for the Market?",
    body: [
      'Like kind and quality restores your property to its pre-loss condition. But if the pre-loss condition was a 1990s kitchen, the claim funds a faithful reconstruction of a 1990s kitchen, and the market will price it as one.',
      'This is where a modest, well-placed owner contribution changes the arithmetic. The claim carries the reconstruction; your increment carries the difference between "repaired" and "current." For owners thinking about selling within a few years, the categories in Section 2 are also the ones assessments and buyers reward: kitchens, bathrooms, flooring, light. For owners staying put, the same list is simply where daily quality of life lives. Either way, the restoration is the one moment this repositioning is available at increment pricing rather than full renovation pricing.',
    ],
    pullQuote:
      "The insurer is obligated to rebuild the property you had. Whether that is the property you want to own for the next decade is a separate question, and it is yours.",
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-finished-interior.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-finished-interior.png",
      alt: "Finished open-plan living interior with hardwood floors and natural light",
    },
  },
  commercial: {
    heading: "For Business Owners: Where TI Upgrade Dollars Concentrate",
    body: [
      "The same logic applies to a damaged commercial space, with one difference: the scarce resource is not the open wall, it is the closure. The doors are already shut for the restoration, so improvements made now cost zero additional downtime, and downtime is usually the largest hidden cost of any commercial renovation.",
      "Where the leverage concentrates in commercial spaces: customer-facing finishes, because they are what the reopening announces; lighting, which does more for perceived quality per dollar than any other commercial spend; layout efficiency, if the claim already opened the relevant walls, since seating counts, workflow, and storage all live there; and accessibility improvements, which are easiest and cheapest to deliver while the space is already under construction and which widen who can walk through the door.",
      "The same disciplines apply. Improvements are itemized separately from the restoration scope, the lease decides what needs landlord consent, and everything is priced before drawings close. GP delivers tenant improvements as a core service, so the restoration crew and the TI crew are the same crew, one scope, one schedule, one standard.",
    ],
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-strategic-commercial.png for real GP photo
    // OWNER CONFIRM: commercial insurance restoration + TI capability asserted (also on prior two guides)
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-strategic-commercial.png",
      alt: "Finished commercial interior with wood service counter and pendant lighting",
    },
  },
  honesty: {
    heading: "Priced in Line Items, Split in Writing",
    body: [
      "Every upgrade conversation at GP ends in a document, not a handshake. The scope shows the insurer-funded restoration line by line, and each owner-funded upgrade as its own priced item beside it. You can see exactly where the claim's money stops and yours starts, approve or strike any line independently, and hand the whole thing to your adjuster without a single blurred boundary.",
      "That transparency is not paperwork for its own sake. It keeps the claim uncontested, keeps the upgrade decisions unemotional, and means the project you approve is the project you get. And whichever lines you keep, restored and upgraded alike, the finished work carries our lifetime warranty.",
    ],
    // PLACEHOLDER: swap public/images/insurance-restoration/placeholder-upgrade-finished-kitchen.png for real GP photo
    backgroundImage: {
      src: "/images/insurance-restoration/placeholder-upgrade-finished-kitchen.png",
      alt: "Finished upgraded kitchen with stone island and hardwood floors",
    },
  },
  series: {
    heading: "The Insurance Restoration Series",
    intro:
      "Where this guide sits in the sequence, depending on where you are in your claim.",
    stages: [
      {
        label: "When damage strikes",
        description:
          "Stabilization, documentation, and understanding the rebuild ahead.",
        links: [
          {
            href: "/services/insurance-restoration/fire-damage-rebuilds",
            label: "Fire Damage Rebuilds",
          },
          {
            href: "/services/insurance-restoration/water-flood-damage",
            label: "Water and Flood Damage",
          },
        ],
      },
      {
        label: "Weighing your options",
        description:
          "The settlement decision and your rights during the claim.",
        links: [
          {
            href: "/services/insurance-restoration/cash-settlement-vs-restoration",
            label: "Cash Settlement vs. Restoration",
          },
          {
            href: "/services/insurance-restoration/upgrades-during-insurance-claim",
            label: "Can You Upgrade During a Claim?",
          },
        ],
      },
      {
        label: "Spending intelligently",
        description:
          "You are here. Where the approved budget and your increment work hardest.",
        current: true,
      },
      {
        label: "The starting point",
        description: "The overview for the full insurance restoration service.",
        links: [
          {
            href: "/services/insurance-restoration",
            label: "Insurance Restoration Overview",
          },
        ],
      },
    ],
  },
  faqHeading: "Strategic Upgrade Questions, Answered",
  faqs: [
    {
      question: "Is upgrading worth it if the damage is small?",
      answer:
        "Usually only within the damaged area itself. The leverage comes from the claim funding demolition and rough-in, so a small loss creates a small opening. Upgrading finishes inside that opening still benefits from trades being on site; expanding beyond it is standalone renovation at standalone prices. A scope review will tell you honestly how far the opening extends.",
    },
    {
      question: "How do I decide how much of my own money to put in?",
      answer:
        "Start from the end, not the beginning. Decide what the property needs to be worth to you, as a home for the next decade or as an asset heading to market, then work backward to the two or three categories that close that gap. A capped, category-targeted contribution decided at scope stage almost always outperforms an open-ended budget decided room by room mid-project.",
    },
    {
      question: "Will adding upgrades slow down the restoration?",
      answer:
        "Decided at scope stage, upgrades typically add little or nothing to the schedule, because they ride the same trades and sequence as the restoration. Decided mid-construction, they almost always cost time as well as money, since re-pricing, material lead times, and re-sequencing enter the picture. The calendar argument for deciding early is as strong as the financial one.",
    },
    {
      question:
        "Can savings on one line item be moved to another part of the project?",
      answer:
        "Within a line item, choosing a different material at the same approved cost is routine. Moving approved money between categories, for example from flooring into cabinetry, is a different matter: some adjusters accommodate it, others hold the scope as approved. We raise it with your adjuster explicitly rather than assuming, because an unapproved reallocation is exactly the kind of blur that turns a clean claim into a disputed one.",
    },
    {
      question: "Which upgrades hold their value best over time?",
      answer:
        "The unglamorous ones. Quality flooring, well-built cabinetry, proper lighting, and sound insulation are still earning their keep in fifteen years. Highly specific style statements and trend materials depreciate the fastest. If resale is anywhere in your thinking, spend on quality and proportion in the Section 2 categories and stay conservative on the fashion decisions.",
    },
  ],
  closingCta: {
    heading: "The Opening Is Already Paid For",
    body: "Every restoration includes a brief window where better is unusually cheap, and it closes when the drawings do. A free scope review with GP maps your specific claim against the categories on this page: what the approved budget already covers, where a modest increment would work hardest, and what we would leave alone. Straight answers, real numbers, no obligation.",
    ctaLabel: "Book a Free Scope Review",
    ctaHref: "/#contact",
  },
};

const tenantImprovementsPage: DeepDiveServicePage = {
  slug: "tenant-improvements",
  contentMode: "deepDive",
  heroIcon: "storefront",
  ...sectionHero("tenant-improvements"),
  heroImage: {
    src: "/images/projects/commercial-construction-hero.jpeg",
    alt: "Domino's Pizza commercial storefront exterior at dusk with illuminated signage",
  },
  overviewImages: [
    {
      src: "/images/projects/tenant-improvements-overview.jpeg",
      alt: "Marble Slab Creamery restaurant interior with service counter, digital menu boards, and branded finishes",
    },
    {
      src: "/images/projects/commercial-construction-overview-marble-slab.jpeg",
      alt: "Marble Slab Creamery commercial interior finishes during tenant improvement construction",
    },
  ],
  overview: [
    "Tenant improvements transform raw or outdated commercial space into environments ready for business — on time, on budget, and aligned with landlord requirements.",
    "GP Contracting Group partners with tenants and property owners to deliver office, retail, and mixed-use build-outs with thoughtful planning, durable finishes, and mechanical systems that hold up under daily use.",
  ],
  title: "Tenant Improvements | GP Contracting Group",
  metaDescription:
    "Commercial tenant improvements and interior build-outs for offices, retail, and mixed-use spaces across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
  serviceType: "Tenant Improvements",
  areaServed: [...SERVICE_AREA_SERVED],
  relatedServicesEyebrow: "Hospitality Specialty",
  relatedServicesHeading: "Restaurant & Bar Construction",
  relatedServiceCards: [
    {
      name: "Restaurant & Bar Construction",
      blurb:
        "Purpose-built restaurant and bar environments designed around kitchen efficiency, guest flow, and operational durability — including fast-tracked franchise builds.",
      href: serviceSubPageHref("commercial", "restaurant-bar-construction"),
      icon: "restaurant",
      image: {
        src: "/images/projects/tenant-improvement-dominos-grand-opening-exterior.png",
        alt: "Restaurant storefront exterior at grand opening with branded signage",
      },
    },
  ],
  faqs: [
    {
      question:
        "What's the difference between a tenant improvement and a general renovation?",
      answer:
        "A tenant improvement is specifically a build-out or fit-out of a leased commercial space, typically carried out within the constraints of a base building and a landlord agreement. It involves coordinating with property management, working within existing mechanical and structural systems, and meeting lease timelines that often can't move. We manage all of that as part of the process.",
    },
    {
      question: "What types of tenant improvement projects do you take on?",
      answer:
        "We work across offices, retail spaces, mixed-use buildings, and industrial facilities. Whether it's a full lease build-out, a significant interior remodel, or a franchise fit-out, we bring the same structured process and trade coordination to every project.",
    },
    {
      question: "Do you work directly with landlords as well as tenants?",
      answer:
        "Yes. Many of our tenant improvement projects involve three-way coordination between the tenant, the property owner, and us as the contractor. We're comfortable managing that communication on both sides and making sure the work meets landlord requirements alongside the tenant's brand and operational needs.",
    },
    {
      question:
        "How do you keep a tenant improvement on schedule when the lease start date is fixed?",
      answer:
        "It starts with proper pre-construction planning, where we review the lease drawings, identify base building constraints early, and build a realistic schedule before any work begins. From there, one project manager is accountable for keeping trades on sequence and flagging anything that could affect the timeline before it becomes a problem. You receive regular updates so nothing catches you off guard.",
    },
    {
      question:
        "Can you work around an occupied building or active business operations?",
      answer:
        "Yes. We plan phasing and working hours around your operational needs where possible, and we'll be upfront during pre-construction about what's realistic so you can plan accordingly.",
    },
    {
      question:
        "Can you handle the permits and landlord approvals required for a tenant improvement?",
      answer:
        "Yes. We manage the permitting process and coordinate with landlord representatives and municipal authorities across Greater Vancouver, Vancouver Island, and the Fraser Valley. Getting these approvals moving early is part of how we protect the construction schedule.",
    },
    {
      question: "How is a tenant improvement priced?",
      answer:
        "Projects are scoped and priced based on building type, size, finishes, and site conditions. We produce a detailed proposal during pre-construction so you have a clear, itemized picture of costs before committing, with no vague estimates or surprises mid-build.",
    },
    {
      question:
        "How far in advance should I engage a contractor for a tenant improvement?",
      answer:
        "As early as possible, ideally before you finalize your lease. Getting us involved during the design and lease negotiation phase means we can flag construction constraints, give you realistic cost and timeline estimates, and make sure your lease terms reflect what the build actually requires. Starting late is the most common reason tenant improvements run over schedule.",
    },
  ],
  deepDive: {
    serviceName: "Tenant Improvements",
    intro:
      "Every build-out needs coordination across design intent, base building constraints, and hard operational deadlines. We manage that complexity with one accountable point of contact — so your team can focus on the business ahead.",
    narratives: [
      {
        eyebrow: "Delivery",
        heading: "Built for Business. Delivered on Time.",
        body: [
          "Commercial clients need a contractor who stays on schedule and communicates clearly — because delays cost money.",
          "We have delivered fast-tracked commercial builds for some of the most recognized franchise brands in British Columbia, including projects completed in under 60 days from start to open doors. That kind of timeline takes precise trade coordination, airtight scheduling, and a team that knows how to move without cutting corners.",
        ],
        image: {
          src: "/images/projects/commercial-construction-overview.jpeg",
          alt: "Commercial interior under construction with exposed ceiling structure and concrete floors",
        },
      },
      {
        eyebrow: "Scope",
        heading: "Beyond the Fit-Out",
        body: [
          "When the scope goes beyond a standard lease build-out — including structural additions or more substantial commercial interior construction — we bring the same disciplined process.",
          "Code-compliant framing, coordinated trades, and durable material selections suited to high-traffic environments keep the work moving from mobilization through to a clean handover.",
        ],
        image: {
          src: "/images/projects/restaurant-bar-renovation-interior.jpeg",
          alt: "Commercial restaurant interior under construction with drywall, scaffolding, and workers finishing walls",
        },
        reverse: true,
      },
    ],
    focusAreas: [
      {
        title: "Space Planning",
        description:
          "We translate program requirements into efficient floor plans — balancing workflow, customer experience, storage, and code compliance before construction begins.",
      },
      {
        title: "Modern Finishes",
        description:
          "From flooring and millwork to wall treatments and branded touchpoints, we specify and install durable finishes that elevate the space and stand up to daily use.",
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
      {
        title: "New Builds & Structural Additions",
        description:
          "When the scope expands beyond a fit-out, we deliver code-compliant framing and trade coordination with the same standard we apply to every commercial build.",
      },
      {
        title: "Schedule-Driven Delivery",
        description:
          "Clear scheduling from mobilization to handover keeps franchise openings, lease start dates, and inspection milestones on track.",
      },
    ],
    projectContexts: [
      {
        title: "Office Tenant Build-Outs",
        description:
          "Open-plan and private office configurations, meeting rooms, reception areas, and IT infrastructure — delivered with minimal disruption to neighbouring tenants.",
        image: {
          src: "/images/projects/commercial-interior-build-out.jpeg",
          alt: "GP Contracting Group worker framing a commercial interior build-out with metal stud walls and exposed ceiling infrastructure",
        },
      },
      {
        title: "Retail Tenant Build-Outs",
        description:
          "Storefront improvements, sales floor layouts, back-of-house support, and customer-facing finishes that help your brand make a strong first impression on day one.",
        image: {
          src: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
          alt: "Marble Slab Creamery tenant improvement storefront at The Bay Centre",
        },
      },
      {
        title: "Franchise & Fast-Track Fit-Outs",
        description:
          "Repeat franchise locations and schedule-critical openings — including projects delivered in under 60 days from start to open doors — with brand-standard finishes and precise trade sequencing.",
        image: {
          src: "/images/projects/tenant-improvement-dominos-grand-opening-exterior.png",
          alt: "Restaurant storefront exterior at grand opening with branded signage",
        },
      },
      {
        title: "Industrial & Mixed-Use Spaces",
        description:
          "Interior build-outs and commercial improvements for industrial facilities and mixed-use buildings, coordinated around operational constraints and municipal requirements.",
        image: {
          src: "/images/projects/restaurant-bar-renovation-interior.jpeg",
          alt: "Commercial restaurant interior under construction with drywall, scaffolding, and workers finishing walls",
        },
      },
    ],
    outcomes: [
      "Spaces ready for occupancy and inspection on schedule",
      "Coordinated landlord, tenant, and trade communication",
      "Finishes and systems aligned with brand and operational needs",
      "Code-compliant construction that passes inspection the first time",
      "One accountable project manager from pre-construction to handover",
    ],
    processNotes: [
      "Early review of lease drawings and base building conditions",
      "Honest pre-construction planning with full scope, trade sequencing, and key milestones mapped before work begins",
      "Permitting and inspection coordination throughout construction",
      "Durable material selections suited to high-traffic environments",
      "Clear scheduling and communication from mobilization to handover",
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

export function getInsuranceRestorationContent(): InsuranceRestorationServicePage {
  return insuranceRestorationPage;
}

export function getFireDamageRebuildsContent(): FireDamageRebuildsServicePage {
  return fireDamageRebuildsPage;
}

export function getWaterFloodDamageContent(): WaterFloodDamageServicePage {
  return waterFloodDamagePage;
}

export function getCashSettlementGuideContent(): CashSettlementGuidePage {
  return cashSettlementGuidePage;
}

export function getUpgradesDuringClaimGuideContent(): UpgradesDuringClaimGuidePage {
  return upgradesDuringClaimGuidePage;
}

export function getStrategicUpgradesGuideContent(): StrategicUpgradesGuidePage {
  return strategicUpgradesGuidePage;
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

export function isInsuranceOverviewPage(page: {
  contentMode: string;
}): page is InsuranceRestorationServicePage {
  return page.contentMode === "insuranceOverview";
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
