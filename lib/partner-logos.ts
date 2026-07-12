import type { Logo } from "@/components/ui/logo-cloud-2";

/**
 * Shared homepage partner marks, reused on relevant service pages.
 * Homepage `LogoCloud` default grid remains unchanged.
 */
export const PARTNER_LOGOS = {
  marbleSlab: {
    src: "/logo-marbleslab.png",
    alt: "Marble Slab Creamery",
    imgClassName:
      "h-4 w-auto origin-center scale-[1.85] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-5 md:scale-[1.85]",
  },
  dominos: {
    src: "/logo-dominos.png",
    alt: "Domino's Pizza",
    imgClassName:
      "h-4 w-auto origin-center scale-[1.5] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-5 md:scale-[1.5]",
  },
  td: {
    src: "/logo-td.png",
    alt: "TD Canada Trust",
    imgClassName:
      "h-4 w-auto origin-center scale-[2] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-5 md:scale-[2]",
  },
  evas: {
    src: "/logo-evas.png",
    alt: "Eva's Original",
    imgClassName:
      "h-4 w-auto origin-center scale-[3.5] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-5 md:scale-[3.5]",
  },
  barBurrito: {
    src: "/logo-barburrito.png",
    alt: "BarBurrito",
    imgClassName:
      "h-4 w-auto origin-center scale-[1.5] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-5 md:scale-[1.5]",
  },
  crazyZhang: {
    src: "/logo-crazyzhang.png",
    alt: "Crazy Zhang Fusion Tea & BBQ",
    imgClassName:
      "h-4 w-auto origin-center scale-[4.25] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-5 md:scale-[4.25]",
  },
  uppal: {
    src: "/logo-uppal.png",
    alt: "Uppal Building Supplies",
    imgClassName:
      "h-5 w-auto origin-center scale-[1.35] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-6 md:scale-[1.35]",
  },
  countryLumber: {
    src: "/logo-countrylumber.png",
    alt: "Country Lumber",
    imgClassName:
      "h-6 w-auto origin-center scale-[1.65] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-7 md:scale-[1.65]",
  },
} as const satisfies Record<string, Logo>;

export type ServiceClientLogosBand = {
  eyebrow: string;
  heading: string;
  logos: Logo[];
  caption?: string;
};

/** Hospitality / franchise food operators. */
const HOSPITALITY_LOGOS: Logo[] = [
  PARTNER_LOGOS.marbleSlab,
  PARTNER_LOGOS.dominos,
  PARTNER_LOGOS.evas,
  PARTNER_LOGOS.barBurrito,
  PARTNER_LOGOS.crazyZhang,
];

/** Franchise TI + commercial banking fit-outs. */
const TENANT_IMPROVEMENT_LOGOS: Logo[] = [
  PARTNER_LOGOS.dominos,
  PARTNER_LOGOS.marbleSlab,
  PARTNER_LOGOS.td,
  PARTNER_LOGOS.barBurrito,
];

/** Commercial hub: banking + flagship franchise work. */
const COMMERCIAL_HUB_LOGOS: Logo[] = [
  PARTNER_LOGOS.td,
  PARTNER_LOGOS.dominos,
  PARTNER_LOGOS.marbleSlab,
  PARTNER_LOGOS.barBurrito,
];

/** Residential building suppliers. */
const RESIDENTIAL_SUPPLY_LOGOS: Logo[] = [
  PARTNER_LOGOS.uppal,
  PARTNER_LOGOS.countryLumber,
];

/**
 * Optional client/supplier logo bands keyed by service page slug.
 * Homepage Partners section is intentionally not driven from this map.
 */
export const SERVICE_CLIENT_LOGOS: Record<string, ServiceClientLogosBand> = {
  "restaurant-bar-construction": {
    eyebrow: "Hospitality Experience",
    heading: "Built for operators who open on schedule",
    logos: HOSPITALITY_LOGOS,
    caption:
      "Selected hospitality and franchise projects across Greater Vancouver and beyond.",
  },
  "tenant-improvements": {
    eyebrow: "Commercial Experience",
    heading: "Trusted on franchise and commercial fit-outs",
    logos: TENANT_IMPROVEMENT_LOGOS,
    caption:
      "Selected commercial and franchise tenant improvement projects, from banks to quick-service brands.",
  },
  commercial: {
    eyebrow: "Commercial Experience",
    heading: "Work that holds up in real operating environments",
    logos: COMMERCIAL_HUB_LOGOS,
    caption:
      "Selected commercial clients across banking, franchise, and tenant improvement projects.",
  },
  "custom-home-construction": {
    eyebrow: "Supply Partners",
    heading: "Sourcing with BC's building suppliers",
    logos: RESIDENTIAL_SUPPLY_LOGOS,
    caption:
      "Material partnerships that support custom home builds with reliable supply and local knowledge.",
  },
  residential: {
    eyebrow: "Supply Partners",
    heading: "Sourcing with BC's building suppliers",
    logos: RESIDENTIAL_SUPPLY_LOGOS,
    caption:
      "Material partnerships that support residential construction across the Lower Mainland and beyond.",
  },
};

export function getServiceClientLogos(
  slug: string,
): ServiceClientLogosBand | null {
  return SERVICE_CLIENT_LOGOS[slug] ?? null;
}
