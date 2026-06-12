"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  serviceSectionAnchor,
  serviceSections,
  type ServiceSection,
} from "@/lib/service-sections";

function FeatureSectionRow({ section }: { section: ServiceSection }) {
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
      id={serviceSectionAnchor(section.slug)}
      className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col-reverse items-center justify-center gap-10 px-4 py-12 scroll-mt-20 md:flex-row md:gap-24 md:px-10 md:py-0 md:scroll-mt-24 ${
        section.reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        style={{ y: translateY }}
        className="w-full md:w-[55%] md:max-w-xl"
      >
        <h3 className="font-serif text-4xl tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
          {section.title}
        </h3>
        <motion.p
          style={{ y: translateY }}
          className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 md:mt-10 md:text-lg"
        >
          {section.description}
        </motion.p>
      </motion.div>

      <motion.div
        style={{
          opacity,
          clipPath,
        }}
        className="relative aspect-[3/4] w-full min-h-[360px] shrink-0 overflow-hidden md:w-[40%] md:min-h-[520px]"
      >
        <Image
          src={section.imageUrl}
          alt={section.title}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
          priority={section.id === 1}
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
        {serviceSections.map((section) => (
          <FeatureSectionRow key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
