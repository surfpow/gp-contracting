import {
  getServiceSection,
  type ServicePageSlug,
  type ServiceSlug,
} from "@/lib/service-sections";

export type ServiceImage = {
  src: string;
  alt: string;
};

export type ServiceSubService = {
  name: string;
  summary: string;
  bullets: string[];
  image: ServiceImage;
};

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
};

export type SubServicesServicePage = ServicePageContentBase & {
  contentMode: "subServices";
  subServices: ServiceSubService[];
};

export type DeepDiveServicePage = ServicePageContentBase & {
  contentMode: "deepDive";
  deepDive: ServiceDeepDive;
};

export type ServicePageContent = SubServicesServicePage | DeepDiveServicePage;

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
  };
}

export const servicePages: ServicePageContent[] = [
  {
    slug: "residential",
    contentMode: "subServices",
    ...sectionHero("residential"),
    overview: [
      "GP Contracting Group brings precision craftsmanship to every residential project across Greater Vancouver — from ground-up custom homes to thoughtful renovations and multi-family developments.",
      "We collaborate closely with homeowners, architects, and designers to deliver spaces that reflect how you live, with premium materials, efficient systems, and finishes built to last.",
    ],
    subServices: [
      {
        name: "Custom Home Construction",
        summary:
          "Ground-up custom homes designed and built with architectural collaboration, premium materials, and modern performance standards.",
        bullets: [
          "Architectural collaboration from concept through completion",
          "Premium materials and refined finish selections",
          "Energy-efficient design and building envelope detailing",
          "Smart home integration and future-ready infrastructure",
        ],
        image: {
          src: "/images/projects/residential-modern-farmhouse-exterior.png",
          alt: "Modern white farmhouse-style custom home exterior with paver driveway",
        },
      },
      {
        name: "Home Renovations",
        summary:
          "Kitchen, bathroom, and whole-home renovations that modernize your space while respecting the character of your home.",
        bullets: [
          "Kitchen remodeling with optimized layouts and cabinetry",
          "Bathroom upgrades with modern fixtures and waterproofing",
          "Space optimization for flow, storage, and natural light",
          "Contemporary fixtures, finishes, and lighting throughout",
        ],
        image: {
          src: "/images/projects/residential-modern-kitchen-island.png",
          alt: "Modern residential kitchen with large island and pendant lighting",
        },
      },
      {
        name: "Multi-Family Development",
        summary:
          "Multi-unit residential construction delivered with the same accountability and craftsmanship as our custom home work.",
        bullets: [
          "Duplex, townhouse, and low-rise multi-family builds",
          "Coordinated scheduling across units and trades",
          "Durable specifications suited to rental and owner-occupied use",
          "Code-compliant construction with clear project communication",
        ],
        image: {
          src: "/images/projects/residential-framing-hilltop-view.png",
          alt: "Residential framing on a hilltop lot with forest and water views",
        },
      },
    ],
  },
  {
    slug: "commercial",
    contentMode: "subServices",
    ...sectionHero("commercial"),
    overview: [
      "From ground-up commercial builds to specialized hospitality and fitness environments, GP Contracting Group delivers commercial construction that is code-compliant, schedule-driven, and built for daily operations.",
      "We understand that commercial success depends on details — ventilation, layout efficiency, durable finishes, and systems that perform under real-world use.",
    ],
    subServices: [
      {
        name: "Commercial Construction",
        summary:
          "General commercial construction for offices, retail, industrial, and mixed-use spaces across Greater Vancouver.",
        bullets: [
          "New builds and structural additions for commercial properties",
          "Code-compliant construction with coordinated trade management",
          "Durable material selections suited to high-traffic environments",
          "Clear scheduling and communication from mobilization to handover",
        ],
        image: {
          src: "/images/projects/commercial-foundation-concrete-pump-site.png",
          alt: "Commercial foundation construction site with concrete pump trucks and forest backdrop",
        },
      },
      {
        name: "Restaurant & Bar Construction",
        summary:
          "Purpose-built restaurant and bar environments designed around kitchen efficiency, guest flow, and operational durability.",
        bullets: [
          "Kitchen layouts optimized for prep, service, and safety",
          "Ventilation systems and grease management coordination",
          "Bar design with service lines, storage, and guest sightlines",
          "Seating optimization for capacity, comfort, and ambiance",
        ],
        image: {
          src: "/images/projects/tenant-improvement-dominos-grand-opening-exterior.png",
          alt: "Restaurant storefront exterior at grand opening with branded signage",
        },
      },
      {
        name: "Fitness Facility Development",
        summary:
          "Fitness and wellness spaces engineered for equipment loads, member comfort, and long-term facility performance.",
        bullets: [
          "Equipment layouts with clear circulation and zoning",
          "Specialized flooring for impact, hygiene, and durability",
          "Shower facilities, changerooms, and moisture management",
          "Climate control and ventilation for active-use environments",
        ],
        image: {
          src: "/images/projects/commercial-dominos-storefront-exterior.png",
          alt: "Commercial storefront exterior with large windows and branded fascia",
        },
      },
    ],
  },
  {
    slug: "tenant-improvements",
    contentMode: "deepDive",
    ...sectionHero("tenant-improvements"),
    overview: [
      "Tenant improvements transform raw or outdated commercial space into environments ready for business — on time, on budget, and aligned with landlord requirements.",
      "GP Contracting Group partners with tenants and property owners to deliver office and retail build-outs with thoughtful planning, modern finishes, and mechanical systems that support how the space will actually be used.",
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
  },
  {
    slug: "specialized",
    contentMode: "subServices",
    heroHeading: "Specialized",
    heroSubheading:
      "Targeted construction capabilities — from roofing and steel framing to accessibility upgrades, EV infrastructure, and custom outdoor recreation spaces.",
    heroImage: {
      src: "/images/projects/site-development-crane-excavator-forest.png",
      alt: "Construction site with crane and excavator against a forest backdrop",
    },
    overview: [
      "Beyond our core residential, commercial, and tenant improvement work, GP Contracting Group delivers specialized construction services that require technical precision, engineered approvals, and disciplined installation.",
      "Each specialized scope is managed with the same accountability and quality standards that define every GP project.",
    ],
    subServices: [
      {
        name: "Roofing",
        summary:
          "Roofing systems installed for long-term weather protection, proper drainage, and peace of mind.",
        bullets: [
          "Quality materials selected for site conditions and lifespan",
          "Weather protection and waterproofing best practices",
          "Proper drainage, flashing, and detail work at transitions",
          "Extended warranty options on qualifying installations",
        ],
        image: {
          src: "/images/projects/residential-luxury-hillside-construction.png",
          alt: "Luxury hillside home under construction with roof structure in progress",
        },
      },
      {
        name: "Steel Framing",
        summary:
          "Custom steel framing fabricated and installed to engineered specifications with seismic compliance in mind.",
        bullets: [
          "Custom fabrication for structural and architectural steel",
          "Seismic compliance coordinated with engineering requirements",
          "Engineer-approved connections and installation methods",
          "Quality assurance inspections throughout erection",
        ],
        image: {
          src: "/images/projects/residential-framing-hilltop-view.png",
          alt: "Structural framing on a hillside residential build site",
        },
      },
      {
        name: "T-Bar & Acoustic Solutions",
        summary:
          "Suspended ceiling and acoustic systems that improve sound performance while integrating lighting and access.",
        bullets: [
          "Sound absorption solutions for offices and commercial spaces",
          "Lighting integration within ceiling grid layouts",
          "Access panels positioned for maintenance and inspections",
          "Clean installation with aligned grids and finished details",
        ],
        image: {
          src: "/images/projects/residential-modern-living-room-fireplace.png",
          alt: "Modern interior living space with refined ceiling and lighting details",
        },
      },
      {
        name: "Accessibility Renovations",
        summary:
          "Renovations that improve mobility, safety, and independence for aging-in-place and accessibility needs.",
        bullets: [
          "Aging-in-place modifications for comfort and safety",
          "Wheelchair accessibility ramps, doorways, and layouts",
          "Bathroom grab bars, curbless showers, and fixture adjustments",
          "Code-aware upgrades aligned with occupant requirements",
        ],
        image: {
          src: "/images/projects/residential-floating-staircase-glass-railing.png",
          alt: "Residential floating staircase with glass railing and open layout",
        },
      },
      {
        name: "EV Charging & Electrical Upgrades",
        summary:
          "Electrical infrastructure upgrades to support EV charging, panel capacity, and modern power demands.",
        bullets: [
          "EV charger installation for residential and commercial properties",
          "Panel upgrades and load assessments for new demand",
          "Conduit and routing planned for future expansion",
          "Coordination with utility requirements and inspections",
        ],
        image: {
          src: "/images/projects/commercial-td-bank-atm-exterior.png",
          alt: "Commercial building exterior with integrated electrical and site services",
        },
      },
      {
        name: "Custom Outdoor Features / Sport Courts",
        summary:
          "Custom outdoor recreation spaces — from backyard basketball courts to tailored leisure and sport environments.",
        bullets: [
          "Backyard basketball courts with proper surfacing and drainage",
          "Custom outdoor recreation spaces for family and community use",
          "Site grading, fencing, and lighting coordination",
          "Durable materials selected for weather and heavy use",
        ],
        image: {
          src: "/images/projects/site-development-crane-excavator-forest.png",
          alt: "Site development with heavy equipment preparing outdoor construction area",
        },
      },
    ],
  },
];

const servicePagesBySlug = Object.fromEntries(
  servicePages.map((page) => [page.slug, page]),
) as Record<ServicePageSlug, ServicePageContent>;

export function getServicePageContent(slug: ServicePageSlug): ServicePageContent {
  const page = servicePagesBySlug[slug];
  if (!page) {
    throw new Error(`Unknown service page slug: ${slug}`);
  }
  return page;
}

export function isSubServicesPage(
  page: ServicePageContent,
): page is SubServicesServicePage {
  return page.contentMode === "subServices";
}

export function isDeepDivePage(page: ServicePageContent): page is DeepDiveServicePage {
  return page.contentMode === "deepDive";
}
