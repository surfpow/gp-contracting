"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServiceImage, ServiceProcessStep } from "@/lib/services-content";

function autoNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function revealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }
  return {
    hidden: {
      opacity: 0,
      transform: "translateY(12px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        delay: i * STAGGER_MARKETING_S,
        duration: DURATION_MARKETING_S,
        ease: EASE_OUT,
      },
    }),
  };
}

type ServiceFeatureStepsProps = {
  steps: ServiceProcessStep[];
  className?: string;
};

/**
 * Numbered step / feature grid shared by the page-level features section and
 * combined-page bundled sections. Steps whose `title` is just the auto-number
 * (seeded from migrated bullets) render as numbered statements; steps with a
 * real title render as titled feature cells.
 */
export function ServiceFeatureSteps({ steps, className }: ServiceFeatureStepsProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10",
        className,
      )}
    >
      {steps.map((step, index) => {
        const hasTitle = step.title !== autoNumber(index);

        return (
          <div
            key={`${step.title}-${step.description}`}
            className="border-t-2 border-brand-navy/20 pt-6"
          >
            <span className="text-sm font-medium tabular-nums text-neutral-400">
              {autoNumber(index)}
            </span>
            {hasTitle && (
              <h3 className="mt-2 font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                {step.title}
              </h3>
            )}
            <p
              className={
                hasTitle
                  ? "mt-3 text-base leading-relaxed text-neutral-600"
                  : "mt-3 text-base leading-relaxed text-neutral-700 md:text-lg md:leading-8"
              }
            >
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

type ServiceFeatureStepsEditorialProps = {
  steps: ServiceProcessStep[];
  className?: string;
};

/**
 * Flagship What's Included list: single-column editorial rows with serif
 * numerals and hairline rules. Opt-in via presentation.featuresVariant.
 */
function ServiceFeatureStepsEditorial({
  steps,
  className,
}: ServiceFeatureStepsEditorialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  if (steps.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn("border-t border-neutral-200", className)}>
      {steps.map((step, index) => {
        const hasTitle = step.title !== autoNumber(index);

        return (
          <TimelineContent
            key={`${step.title}-${step.description}`}
            as="div"
            animationNum={index}
            timelineRef={ref}
            customVariants={variants}
            className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-neutral-200 py-8 md:grid-cols-[5rem_1fr] md:gap-x-8 md:py-10"
          >
            <span
              className="font-serif text-2xl tabular-nums tracking-tight text-brand-navy md:text-3xl"
              aria-hidden="true"
            >
              {autoNumber(index)}
            </span>
            <div>
              {hasTitle && (
                <h3 className="font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                  {step.title}
                </h3>
              )}
              <p
                className={cn(
                  "text-base leading-relaxed text-neutral-700 md:text-lg md:leading-8",
                  hasTitle && "mt-3 text-neutral-600",
                )}
              >
                {step.description}
              </p>
            </div>
          </TimelineContent>
        );
      })}
    </div>
  );
}

export type ServiceFeaturesSectionProps = {
  steps: ServiceProcessStep[];
  eyebrow?: string;
  heading?: string;
  image?: ServiceImage;
  /**
   * `editorial` = flagship single-column list with stagger. Default `standard`
   * keeps the original two-column grid for all non-opted-in pages.
   */
  variant?: "standard" | "editorial";
};

export function ServiceFeaturesSection({
  steps,
  eyebrow = "Scope of Work",
  heading = "What's Included",
  image,
  variant = "standard",
}: ServiceFeaturesSectionProps) {
  if (steps.length === 0) {
    return null;
  }

  const isEditorial = variant === "editorial";

  return (
    <section
      className={cn(
        "bg-white px-4 md:px-8",
        isEditorial ? "py-20 md:py-28 lg:py-36" : "py-16 md:py-24 lg:py-32",
      )}
    >
      <div className={cn("mx-auto", isEditorial ? "max-w-3xl" : "max-w-6xl")}>
        <div className={isEditorial ? undefined : "max-w-3xl"}>
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            {eyebrow}
          </p>
          <h2
            className={cn(
              "mt-4 font-serif tracking-tight text-neutral-900",
              isEditorial
                ? "text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight"
                : "text-3xl md:text-4xl",
            )}
          >
            {heading}
          </h2>
        </div>

        {isEditorial ? (
          <ServiceFeatureStepsEditorial
            steps={steps}
            className="mt-12 md:mt-16"
          />
        ) : (
          <ServiceFeatureSteps steps={steps} className="mt-14 md:mt-16" />
        )}

        {image && (
          <div className="relative mt-14 aspect-[3/4] w-full overflow-hidden md:mt-16 md:aspect-[16/10]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
