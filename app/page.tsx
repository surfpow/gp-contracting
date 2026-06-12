import { HeroParallax } from "@/components/ui/hero-parallax";
import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/sections/about";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { Partners } from "@/components/sections/partners";
import { Footer } from "@/components/sections/footer";

const projectImages = {
  residentialFarmhouse: "/images/projects/residential-modern-farmhouse-exterior.png",
  residentialHillside: "/images/projects/residential-modern-hillside-home-under-construction.png",
  residentialLuxuryHillside: "/images/projects/residential-luxury-hillside-construction.png",
  residentialKitchen: "/images/projects/residential-modern-kitchen-island.png",
  residentialLivingRoom: "/images/projects/residential-modern-living-room-fireplace.png",
  residentialStaircase: "/images/projects/residential-floating-staircase-glass-railing.png",
  residentialFramingHilltop: "/images/projects/residential-framing-hilltop-view.png",
  residentialConstructionGarage: "/images/projects/residential-construction-in-progress-garage.png",
  commercialDominosExterior: "/images/projects/commercial-dominos-storefront-exterior.png",
  commercialFoundation: "/images/projects/commercial-foundation-concrete-pump-site.png",
  commercialTdBank: "/images/projects/commercial-td-bank-atm-exterior.png",
  siteDevelopmentCrane: "/images/projects/site-development-crane-excavator-forest.png",
  tenantMarbleSlab: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
  tenantDominosInterior: "/images/projects/tenant-improvement-dominos-interior.png",
  tenantDominosGrandOpening: "/images/projects/tenant-improvement-dominos-grand-opening-exterior.png",
} as const;

export const projects = [
  { title: "Custom Home Build", link: "#", thumbnail: projectImages.residentialFarmhouse },
  { title: "Commercial Renovation", link: "#", thumbnail: projectImages.commercialFoundation },
  { title: "Steel Framing", link: "#", thumbnail: projectImages.residentialHillside },
  { title: "Kitchen Remodel", link: "#", thumbnail: projectImages.residentialKitchen },
  { title: "Roofing Project", link: "#", thumbnail: projectImages.residentialLuxuryHillside },
  { title: "Home Renovation", link: "#", thumbnail: projectImages.residentialConstructionGarage },
  { title: "Bathroom Upgrade", link: "#", thumbnail: projectImages.residentialStaircase },
  { title: "Restaurant Build", link: "#", thumbnail: projectImages.commercialDominosExterior },
  { title: "Acoustic Ceilings", link: "#", thumbnail: projectImages.residentialLivingRoom },
  { title: "Multi-Family Development", link: "#", thumbnail: projectImages.residentialFramingHilltop },
  { title: "Fitness Facility", link: "#", thumbnail: projectImages.tenantDominosInterior },
  {
    title: "Bar Construction",
    link: "#",
    thumbnail: projectImages.tenantDominosGrandOpening,
    objectPosition: "center 55%",
  },
  {
    title: "Tenant Improvement",
    link: "#",
    thumbnail: projectImages.tenantMarbleSlab,
    objectPosition: "center 20%",
  },
  { title: "Commercial Exterior", link: "#", thumbnail: projectImages.commercialTdBank },
  { title: "Smart Home Integration", link: "#", thumbnail: projectImages.siteDevelopmentCrane },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroParallax products={projects} />
      <About />
      <Partners />
      <ParallaxScrollFeatureSection />
      <Footer />
    </>
  );
}
