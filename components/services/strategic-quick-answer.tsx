"use client";

import { useRef } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { StrategicUpgradesGuidePage } from "@/lib/services-content";

type QuickAnswerProps = {
  section: StrategicUpgradesGuidePage["quickAnswer"];
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
 * Ledger-style short answer: top rule + accounting label, not the left-rail
 * aside used on the upgrades-during-claim guide.
 */
export function StrategicQuickAnswer({ section }: QuickAnswerProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-12 md:px-8 md:py-16"
      aria-labelledby="strategic-quick-answer-label"
    >
      <div className="mx-auto max-w-3xl">
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
        >
          <aside
            className="border-t-2 border-brand-navy bg-neutral-50 px-6 py-8 md:px-10 md:py-10"
            aria-label="Short answer summary"
          >
            <p
              id="strategic-quick-answer-label"
              className="font-sans text-xs font-semibold tracking-[0.16em] text-brand-navy uppercase"
            >
              {section.label}
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg md:leading-8">
              {section.body}
            </p>
          </aside>
        </TimelineContent>
      </div>
    </section>
  );
}
