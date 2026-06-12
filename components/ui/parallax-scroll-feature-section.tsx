"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type FeatureSection = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  reverse: boolean;
};

const sections: FeatureSection[] = [
  {
    id: 1,
    title: "Residential",
    description:
      "From custom home builds to kitchen and bathroom renovations, we bring precision craftsmanship to every residential project. Whether ground-up construction or a thoughtful remodel, we treat your home as if it were our own.",
    imageUrl: "/images/projects/residential-modern-farmhouse-exterior.png",
    reverse: false,
  },
  {
    id: 2,
    title: "Commercial",
    description:
      "Office spaces, retail storefronts, and industrial facilities built to code and delivered on schedule. GP Contracting Group brings the same integrity and attention to detail to every commercial project across Greater Vancouver.",
    imageUrl: "/images/projects/commercial-foundation-concrete-pump-site.png",
    reverse: true,
  },
  {
    id: 3,
    title: "Tenant Improvements",
    description:
      "Full build-outs and fit-outs for restaurants, fitness facilities, retail spaces, and more. We work closely with landlords and tenants to deliver spaces that are ready for business — on time and on budget.",
    imageUrl: "/images/projects/tenant-improvement-marble-slab-bay-centre.png",
    reverse: false,
  },
];

function FeatureSectionRow({ section }: { section: FeatureSection }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const translateY = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div
      ref={ref}
      className={`flex min-h-screen flex-col items-center justify-center gap-12 px-4 md:flex-row md:gap-40 md:px-10 ${
        section.reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div style={{ y: translateY }}>
        <h3 className="font-serif text-4xl tracking-tight text-neutral-900 md:max-w-sm md:text-5xl lg:text-6xl">
          {section.title}
        </h3>
        <motion.p
          style={{ y: translateY }}
          className="mt-6 max-w-sm text-base leading-relaxed text-neutral-600 md:mt-10 md:text-lg"
        >
          {section.description}
        </motion.p>
      </motion.div>
      <motion.div
        style={{
          opacity,
          clipPath,
        }}
        className="relative shrink-0"
      >
        <Image
          src={section.imageUrl}
          alt={section.title}
          width={320}
          height={320}
          className="size-72 object-cover md:size-80"
        />
      </motion.div>
    </div>
  );
}

export function ParallaxScrollFeatureSection() {
  return (
    <section id="services" className="bg-neutral-50">
      <div className="flex flex-col px-4 pt-24 md:px-0 md:pt-32">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-16">
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            What We Build
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
            Craftsmanship You Can Trust
          </h2>
        </div>
        {sections.map((section) => (
          <FeatureSectionRow key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
