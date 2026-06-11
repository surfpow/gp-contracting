import Image from "next/image";
import Link from "next/link";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { SiteNav } from "@/components/site-nav";
import { About } from "@/components/sections/about";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { Partners } from "@/components/sections/partners";

export const projects = [
  { title: "Custom Home Build", link: "#", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600" },
  { title: "Commercial Renovation", link: "#", thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600" },
  { title: "Steel Framing", link: "#", thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" },
  { title: "Kitchen Remodel", link: "#", thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" },
  { title: "Roofing Project", link: "#", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600" },
  { title: "Tenant Improvement", link: "#", thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" },
  { title: "Fitness Facility", link: "#", thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600" },
  { title: "Restaurant Build", link: "#", thumbnail: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600" },
  { title: "Multi-Family Development", link: "#", thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" },
  { title: "Acoustic Ceilings", link: "#", thumbnail: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600" },
  { title: "Bathroom Upgrade", link: "#", thumbnail: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600" },
  { title: "Bar Construction", link: "#", thumbnail: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=600" },
  { title: "Home Renovation", link: "#", thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600" },
  { title: "Commercial Exterior", link: "#", thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600" },
  { title: "Smart Home Integration", link: "#", thumbnail: "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?w=600" },
];

export default function Home() {
  return (
    <>
      <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="pointer-events-auto shrink-0">
          <Image
            src="https://vfqcqhylftsunnhxqysq.supabase.co/storage/v1/object/public/puzzle-bucket/GPlogo-removebg.png"
            alt="GP Contracting Group"
            width={140}
            height={36}
            className="h-auto w-[180px] md:w-[140px]"
            priority
          />
        </Link>
        <div className="pointer-events-auto">
          <SiteNav />
        </div>
      </header>
      <HeroParallax products={projects} />
      <About />
      <ParallaxScrollFeatureSection />
      <Partners />
    </>
  );
}
