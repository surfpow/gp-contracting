"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME,
  ScrollRevealContentPanel,
  ScrollRevealImagePanel,
  useScrollRevealSplitPanels,
  useScrollRevealSplitRef,
} from "@/components/ui/scroll-reveal-split-panels";
import {
  serviceSectionAnchor,
  serviceSections,
  type ServiceSection,
} from "@/lib/service-sections";

function FeatureSectionRow({ section }: { section: ServiceSection }) {
  const ref = useScrollRevealSplitRef();
  const { shouldReduceMotion, opacity, clipPath, translateY } =
    useScrollRevealSplitPanels(ref);

  const textContent = (
    <>
      <h3 className="font-serif text-4xl tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
        {section.title}
      </h3>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600 md:mt-10 md:text-lg">
        {section.description}
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center md:mt-12">
        <Button
          asChild
          className="h-12 w-full rounded-sm border border-brand-navy bg-brand-navy px-7 text-sm font-medium tracking-wide text-white shadow-[0_10px_28px_-12px_rgba(45,52,112,0.65)] transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:shadow-[0_14px_32px_-12px_rgba(18,24,38,0.55)] sm:w-auto"
        >
          <Link
            href={section.servicesHref}
            className="group inline-flex items-center justify-center gap-2.5"
          >
            {section.primaryCtaLabel}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 w-full rounded-sm border-neutral-300 bg-white/60 px-7 text-sm font-medium tracking-wide text-neutral-700 backdrop-blur-sm transition-all duration-300 hover:border-brand-navy/40 hover:bg-white hover:text-brand-navy sm:w-auto"
        >
          <Link
            href={section.projectsHref}
            className="group inline-flex items-center justify-center gap-2.5"
          >
            {section.secondaryCtaLabel}
            <ArrowRight className="size-4 text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-navy" />
          </Link>
        </Button>
      </div>
    </>
  );

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
      <ScrollRevealContentPanel
        shouldReduceMotion={shouldReduceMotion}
        translateY={translateY}
        className="w-full md:w-[55%] md:max-w-xl"
      >
        {textContent}
      </ScrollRevealContentPanel>

      <ScrollRevealImagePanel
        shouldReduceMotion={shouldReduceMotion}
        opacity={opacity}
        clipPath={clipPath}
        className={SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME}
      >
        {image}
      </ScrollRevealImagePanel>
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
