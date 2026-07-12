"use client";

import { useRef } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
} from "@/lib/motion";
import type { StrategicUpgradesGuidePage } from "@/lib/services-content";

type ValueMapProps = {
  section: StrategicUpgradesGuidePage["valueMap"];
};

function revealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }
  // Tighter stagger than STAGGER_MARKETING_S: seven categories would
  // otherwise cascade for ~350ms before the last row starts.
  const stagger = 0.035;
  return {
    hidden: {
      opacity: 0,
      transform: "translateY(12px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        delay: i * stagger,
        duration: DURATION_MARKETING_S,
        ease: EASE_OUT,
      },
    }),
  };
}

const YIELD_WIDTH: Record<1 | 2 | 3 | 4, string> = {
  4: "w-full",
  3: "w-3/4",
  2: "w-1/2",
  1: "w-1/4",
};

/**
 * Category value map: ranked yield ladder with proportional meters.
 * Not a comparison matrix and not a two-column easier/harder split.
 */
export function StrategicValueMap({ section }: ValueMapProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="value-map-heading"
    >
      <div className="mx-auto max-w-4xl">
        <TimelineContent
          as="h2"
          id="value-map-heading"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
        >
          {section.intro}
        </TimelineContent>

        <ol className="mt-12 space-y-0 md:mt-16">
          {section.categories.map((category, index) => (
            <TimelineContent
              key={category.title}
              as="li"
              animationNum={index + 2}
              timelineRef={ref}
              customVariants={variants}
              className="border-t border-neutral-200 py-7 first:border-t-0 first:pt-0 md:py-8"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-10">
                <div>
                  <p className="font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                    {category.title}
                  </p>
                  <p className="mt-2 font-sans text-xs font-semibold tracking-[0.12em] text-brand-navy uppercase">
                    {category.yieldLabel}
                  </p>
                  <div
                    className="mt-4 h-1 w-full max-w-[11rem] bg-neutral-200"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-full bg-brand-navy ${YIELD_WIDTH[category.yieldLevel]}`}
                    />
                  </div>
                </div>
                <p className="text-base leading-relaxed text-neutral-600 md:pt-1 md:text-[1.05rem] md:leading-8">
                  {category.body}
                </p>
              </div>
            </TimelineContent>
          ))}
        </ol>
      </div>
    </section>
  );
}
