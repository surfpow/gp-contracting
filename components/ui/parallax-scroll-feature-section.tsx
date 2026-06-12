"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  serviceSectionAnchor,
  serviceSections,
  type ServiceSection,
} from "@/lib/service-sections";

function FeatureSectionRow({ section }: { section: ServiceSection }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
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

  const textContent = (
    <>
      <h3 className="font-serif text-4xl tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
        {section.title}
      </h3>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 md:mt-10 md:text-lg">
        {section.description}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-4">
        <Button asChild size="lg">
          <Link href={section.servicesHref}>{section.primaryCtaLabel}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={section.projectsHref}>{section.secondaryCtaLabel}</Link>
        </Button>
      </div>
    </>
  );

  const imagePanelClassName =
    "relative aspect-[3/4] w-full min-h-[360px] shrink-0 overflow-hidden md:w-[40%] md:min-h-[520px]";

  const image = (
    <Image
      src={section.imageUrl}
      alt={section.imageAlt}
      fill
      sizes="(max-width: 768px) 100vw, 40vw"
      className="object-cover"
      priority={section.id === 1}
    />
  );

  return (
    <div
      ref={ref}
      id={serviceSectionAnchor(section.slug)}
      className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col-reverse items-center justify-center gap-10 px-4 py-12 scroll-mt-20 md:flex-row md:gap-24 md:px-10 md:py-0 md:scroll-mt-24 ${
        section.reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {shouldReduceMotion ? (
        <div className="w-full md:w-[55%] md:max-w-xl">{textContent}</div>
      ) : (
        <motion.div
          style={{ y: translateY }}
          className="w-full md:w-[55%] md:max-w-xl"
        >
          {textContent}
        </motion.div>
      )}

      {shouldReduceMotion ? (
        <div className={imagePanelClassName}>{image}</div>
      ) : (
        <motion.div
          style={{
            opacity,
            clipPath,
          }}
          className={imagePanelClassName}
        >
          {image}
        </motion.div>
      )}
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
