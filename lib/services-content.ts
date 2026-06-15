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
  overviewImage?: ServiceImage;
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
      src: "/images/projects/commercial-construction-hero.jpeg",
      alt: "Domino's Pizza commercial storefront exterior at dusk with illuminated signage",
    },
    heroIcon: "warehouse",
    linkingCardImage: {
      src: "/images/projects/commercial-foundation-concrete-pump-site.png",
      alt: "Commercial foundation construction site with concrete pump trucks and forest backdrop",
    },
    projectsHref: PROJECTS_HREF,
    serviceType: "Commercial Construction",
    keywordCities: ["Vancouver", "Burnaby"],
    overviewImage: {
      src: "/images/projects/commercial-construction-overview.jpeg",
      alt: "Commercial interior under construction with exposed ceiling structure and concrete floors",
    },
    overview: [
      "Commercial construction demands a contractor who can deliver on schedule, meet code, and build spaces that hold up under daily operational use. At GP Contracting Group, we bring the same disciplined pre-construction process and trade coordination to commercial projects that we bring to our residential work, whether it's a ground-up office build, a retail fit-out, or an industrial facility.",
      "We have delivered fast-tracked commercial builds for some of the most recognized franchise brands operating in British Columbia, including projects completed in under 60 days from start to open doors. That kind of timeline takes precise trade coordination, airtight scheduling, and a team that knows how to move without cutting corners. From first permit to final inspection, GP Contracting Group brings that same urgency and accountability to every commercial project we take on.",
    ],
    whyGp: {
      heading: "Why GP Contracting Group",
      body: "Commercial clients need a contractor they can count on to stay on schedule and communicate clearly, because delays cost money. GP Contracting Group has earned repeat business from major franchise operators and commercial clients across Greater Vancouver by doing exactly that, delivering on time, on budget, and to a standard that passes inspection the first time. As a family-owned company, we operate with one accountable point of contact from pre-construction through to handover, so you always know where your project stands.",
      pullQuote: "Built for business. Delivered on time.",
    },
    faqs: [
      {
        question: "What types of commercial construction projects do you take on?",
        answer:
          "We work across offices, retail spaces, mixed-use buildings, and industrial facilities. Whether it's ground-up construction or a significant interior build-out, we bring the same structured process and trade coordination to every project.",
      },
      {
        question: "How do you keep a commercial project on schedule?",
        answer:
          "It starts with honest pre-construction planning, where we map out the full scope, trade sequencing, and key milestones before work begins. During the build, one project manager is accountable for the schedule end to end, and you receive regular updates so nothing catches you off guard.",
      },
      {
        question:
          "Can you work around an occupied building or active business operations?",
        answer:
          "Yes. We plan phasing and working hours around your operational needs where possible, and we'll be upfront during pre-construction about what's realistic so you can plan accordingly.",
      },
      {
        question: "Do you handle commercial building permits and inspections?",
        answer:
          "Yes. We manage the full permitting process and coordinate inspections with the relevant municipal authorities across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
      },
      {
        question: "How is commercial construction priced?",
        answer:
          "Commercial projects are scoped and priced based on building type, size, finishes, and site conditions. We produce a detailed proposal during pre-construction so you have a clear, itemized picture of costs before committing, with no vague estimates or surprises mid-build.",
      },
    ],
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
    projectsHref: PROJECTS_HREF,
    projectsCtaLabel: SEE_RECENT_PROJECTS.label,
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
    projectsHref: PROJECTS_HREF,
    projectsCtaLabel: SEE_RECENT_PROJECTS.label,
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
        src: "/images/projects/commercial-interior-build-out.jpeg",
        alt: "GP Contracting Group worker framing a commercial interior build-out with metal stud walls and exposed ceiling infrastructure",
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
  overviewImage: {
    src: "/images/projects/tenant-improvements-overview.jpeg",
    alt: "Marble Slab Creamery restaurant interior with service counter, digital menu boards, and branded finishes",
  },
  overview: [
    "Tenant improvements transform raw or outdated commercial space into environments ready for business — on time, on budget, and aligned with landlord requirements.",
    "GP Contracting Group partners with tenants and property owners to deliver office and retail build-outs with thoughtful planning, modern finishes, and mechanical systems that support how the space will actually be used.",
  ],
  title: "Tenant Improvements | GP Contracting Group",
  metaDescription:
    "Office and retail tenant build-outs across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
  serviceType: "Tenant Improvements",
  areaServed: [...SERVICE_AREA_SERVED],
  faqs: [
    {
      question:
        "What's the difference between a tenant improvement and a general renovation?",
      answer:
        "A tenant improvement is specifically a build-out or fit-out of a leased commercial space, typically carried out within the constraints of a base building and a landlord agreement. It involves coordinating with property management, working within existing mechanical and structural systems, and meeting lease timelines that often can't move. We manage all of that as part of the process.",
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
        "It starts with proper pre-construction planning, where we review the lease drawings, identify base building constraints early, and build a realistic schedule before any work begins. From there, one project manager is accountable for keeping trades on sequence and flagging anything that could affect the timeline before it becomes a problem.",
    },
    {
      question:
        "Can you handle the permits and landlord approvals required for a tenant improvement?",
      answer:
        "Yes. We manage the permitting process and coordinate with landlord representatives and municipal authorities across Greater Vancouver, Vancouver Island, and the Fraser Valley. Getting these approvals moving early is part of how we protect the construction schedule.",
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
