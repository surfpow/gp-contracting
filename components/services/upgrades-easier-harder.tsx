"use client";

import { useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { UpgradesDuringClaimGuidePage } from "@/lib/services-content";

type EasierHarderProps = {
  section: UpgradesDuringClaimGuidePage["easierHarder"];
};

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

/**
 * Asymmetric easier/harder instrument: light ease column vs denser plan column.
 * Distinct from the cash settlement pros/cons boxes.
 */
export function UpgradesEasierHarder({ section }: EasierHarderProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="easier-harder-heading"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="h2"
          id="easier-harder-heading"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-0 md:overflow-hidden md:border md:border-neutral-200">
          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={ref}
            customVariants={variants}
            className="bg-white p-6 md:border-r md:border-neutral-200 md:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
                <Check className="size-4" aria-hidden="true" strokeWidth={2.25} />
              </span>
              <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-brand-navy uppercase">
                {section.easier.heading}
              </h3>
            </div>
            <ul className="mt-8 space-y-5">
              {section.easier.items.map((item) => (
                <li
                  key={item.slice(0, 48)}
                  className="border-l-2 border-brand-navy/25 pl-4 text-base leading-relaxed text-neutral-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={ref}
            customVariants={variants}
            className="border border-neutral-200 bg-brand-dark p-6 md:border-0 md:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full border border-brand-navy-light/40 text-brand-navy-light">
                <ArrowUpRight
                  className="size-4"
                  aria-hidden="true"
                  strokeWidth={2.25}
                />
              </span>
              <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-brand-navy-light uppercase">
                {section.harder.heading}
              </h3>
            </div>
            <ul className="mt-8 space-y-5">
              {section.harder.items.map((item) => (
                <li
                  key={item.slice(0, 48)}
                  className="border-l-2 border-brand-navy-light/35 pl-4 text-base leading-relaxed text-neutral-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}
