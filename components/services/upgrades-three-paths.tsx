"use client";

import { useRef } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { UpgradesDuringClaimGuidePage } from "@/lib/services-content";

type ThreePathsProps = {
  section: UpgradesDuringClaimGuidePage["threePaths"];
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
 * Three upgrade paths as horizontal lanes (not a comparison matrix).
 * Each path owns its own column with numbered identity and two fields.
 */
export function UpgradesThreePaths({ section }: ThreePathsProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="three-paths-heading"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="h2"
          id="three-paths-heading"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-50 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:mt-16 md:grid-cols-3">
          {section.paths.map((path, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <TimelineContent
                key={path.path}
                as="li"
                animationNum={1 + index}
                timelineRef={ref}
                customVariants={variants}
                className="flex flex-col bg-brand-dark p-6 md:p-8"
              >
                <span className="font-mono text-xs font-medium tracking-wider text-brand-navy-light tabular-nums">
                  {number}
                </span>
                <h3 className="mt-4 font-serif text-2xl tracking-tight text-neutral-50">
                  {path.path}
                </h3>

                <div className="mt-8 flex flex-1 flex-col gap-6 border-t border-white/10 pt-6">
                  <div>
                    <p className="font-sans text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                      {section.looksLikeLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300 md:text-[0.9375rem] md:leading-7">
                      {path.looksLike}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-semibold tracking-[0.14em] text-brand-navy-light uppercase">
                      {section.youPayLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-100 md:text-[0.9375rem] md:leading-7">
                      {path.youPay}
                    </p>
                  </div>
                </div>
              </TimelineContent>
            );
          })}
        </ol>

        <TimelineContent
          as="p"
          animationNum={4}
          timelineRef={ref}
          customVariants={variants}
          className="mt-10 max-w-3xl text-base leading-relaxed text-neutral-300 md:mt-12 md:text-lg md:leading-8"
        >
          {section.footer}
        </TimelineContent>
      </div>
    </section>
  );
}
