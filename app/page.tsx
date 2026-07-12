import Image from "next/image";

import { ArcRevealHero } from "@/components/ui/arc-preloader-hero";
import { SiteHeader } from "@/components/site-header";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { DecisionSection } from "@/components/sections/decision-section";
import { Partners } from "@/components/sections/partners";
import { Footer } from "@/components/sections/footer";

const GP_LOGO_URL =
  "https://vfqcqhylftsunnhxqysq.supabase.co/storage/v1/object/public/puzzle-bucket/GPlogo-removebg.png";

export default function Home() {
  return (
    <>
      <ArcRevealHero
        introHold={900}
        revealDuration={1400}
        introClassName="bg-brand-dark"
        intro={
          <Image
            src={GP_LOGO_URL}
            alt="GP Contracting Group"
            width={320}
            height={120}
            priority
            className="h-28 w-auto brightness-0 invert md:h-40"
          />
        }
      >
        {/* Header lives inside the reveal so the preloader covers it */}
        <SiteHeader />
        <DecisionSection />
      </ArcRevealHero>
      <ParallaxScrollFeatureSection />
      <Partners />
      <Footer />
    </>
  );
}
