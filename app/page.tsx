import { HeroParallax } from "@/components/ui/hero-parallax";
import { SiteHeader } from "@/components/site-header";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { Partners } from "@/components/sections/partners";
import { Footer } from "@/components/sections/footer";
import { heroParallaxProjects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroParallax products={heroParallaxProjects} />
      <Partners />
      <ParallaxScrollFeatureSection />
      <Footer />
    </>
  );
}
