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
import { servicePrimaryButtonClass } from "@/components/services/service-page-ctas";
import { cn } from "@/lib/utils";

export type ParallaxFeatureRow = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
};

export type ParallaxScrollFeatureSectionProps = {
  /** Defaults to homepage "What We Build" catalog when omitted. */
  eyebrow?: string;
  heading?: string;
  rows?: ParallaxFeatureRow[];
  /** Homepage dual CTAs. Off for service spoke usage. Default true when using catalog. */
  showCtas?: boolean;
  className?: string;
  contentClassName?: string;
};

function FeatureSectionRow({
  section,
  showCtas,
  priority,
}: {
  section: ParallaxFeatureRow & {
    id?: number;
    slug?: ServiceSection["slug"];
    servicesHref?: string;
    projectsHref?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  showCtas: boolean;
  priority?: boolean;
}) {
  const ref = useScrollRevealSplitRef();
  const { shouldReduceMotion, opacity, clipPath, translateY } =
    useScrollRevealSplitPanels(ref);

  const textContent = (
    <>
      <h3
        className={cn(
          "font-serif tracking-tight text-neutral-900",
          showCtas
            ? "text-4xl md:text-5xl lg:text-6xl"
            : "text-2xl md:text-3xl lg:text-4xl",
        )}
      >
        {section.title}
      </h3>
      <p
        className={cn(
          "max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg",
          showCtas ? "mt-6 md:mt-10" : "mt-5 md:mt-6",
        )}
      >
        {section.description}
      </p>
      {showCtas && section.servicesHref && section.projectsHref && (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center md:mt-12">
          <Button asChild className={servicePrimaryButtonClass}>
            <Link
              href={section.servicesHref}
              className="group inline-flex items-center justify-center gap-2.5"
            >
              {section.primaryCtaLabel}
              <ArrowRight className="size-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-sm border-neutral-300 bg-white/60 px-7 text-sm font-medium tracking-wide text-neutral-700 backdrop-blur-sm transition-[transform,colors,border-color,background-color] duration-200 [transition-timing-function:var(--ease-out)] hover:border-brand-navy/40 hover:bg-white hover:text-brand-navy sm:w-auto"
          >
            <Link
              href={section.projectsHref}
              className="group inline-flex items-center justify-center gap-2.5"
            >
              {section.secondaryCtaLabel}
              <ArrowRight className="size-4 text-neutral-400 transition-transform duration-150 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5 group-hover:text-brand-navy" />
            </Link>
          </Button>
        </div>
      )}
    </>
  );

  const image = (
    <Image
      src={section.imageUrl}
      alt={section.imageAlt}
      fill
      sizes="(max-width: 768px) 100vw, 40vw"
      className="object-cover"
      priority={priority}
    />
  );

  return (
    <div
      ref={ref}
      id={section.slug ? serviceSectionAnchor(section.slug) : undefined}
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-center gap-10 px-4 py-12 md:flex-row md:gap-24 md:px-10",
        showCtas
          ? "min-h-screen scroll-mt-20 md:py-0 md:scroll-mt-24"
          : "md:items-start md:py-4",
        section.reverse ? "md:flex-row-reverse" : "",
      )}
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

export function ParallaxScrollFeatureSection({
  eyebrow = "What We Build",
  heading = "Craftsmanship You Can Trust",
  rows,
  showCtas,
  className,
  contentClassName,
}: ParallaxScrollFeatureSectionProps = {}) {
  const resolvedRows: (ParallaxFeatureRow & {
    id?: number;
    slug?: ServiceSection["slug"];
    servicesHref?: string;
    projectsHref?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  })[] =
    rows ??
    serviceSections.map((section) => ({
      id: section.id,
      slug: section.slug,
      title: section.title,
      description: section.description,
      imageUrl: section.imageUrl,
      imageAlt: section.imageAlt,
      reverse: section.reverse,
      servicesHref: section.servicesHref,
      projectsHref: section.projectsHref,
      primaryCtaLabel: section.primaryCtaLabel,
      secondaryCtaLabel: section.secondaryCtaLabel,
    }));

  const withCtas = showCtas ?? rows === undefined;

  return (
    <section id={rows ? undefined : "services"} className={cn("bg-neutral-50", className)}>
      <div
        className={cn(
          "flex flex-col px-4 md:px-0",
          withCtas ? "pt-24 md:pt-32" : "py-16 md:py-24 lg:py-32",
          contentClassName,
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-2xl md:mb-16",
            withCtas ? "mb-8 text-center" : "mb-14 max-w-3xl text-left md:mb-20 md:px-10",
          )}
        >
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
            {heading}
          </h2>
        </div>
        <div className={withCtas ? undefined : "flex flex-col gap-16 md:gap-24"}>
          {resolvedRows.map((section) => (
            <FeatureSectionRow
              key={section.title}
              section={section}
              showCtas={withCtas}
              priority={withCtas && section.id === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
