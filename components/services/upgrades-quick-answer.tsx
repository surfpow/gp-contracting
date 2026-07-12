"use client";

import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { UpgradesDuringClaimGuidePage } from "@/lib/services-content";

type QuickAnswerProps = {
  section: UpgradesDuringClaimGuidePage["quickAnswer"];
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
 * Featured-snippet summary: visually distinct from prose sections so search
 * and skimmers can lift the short answer without scanning the whole guide.
 */
export function UpgradesQuickAnswer({ section }: QuickAnswerProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-12 md:px-8 md:py-16"
      aria-labelledby="quick-answer-label"
    >
      <div className="mx-auto max-w-3xl">
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
        >
          <aside
            className="relative overflow-hidden border border-neutral-200 bg-neutral-50"
            aria-label="Short answer summary"
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 bg-brand-navy"
            />
            <div className="px-6 py-7 pl-7 md:px-10 md:py-9 md:pl-11">
              <p
                id="quick-answer-label"
                className="font-sans text-xs font-semibold tracking-[0.16em] text-brand-navy uppercase"
              >
                {section.label}
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg md:leading-8">
                {section.body}
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
                <Link
                  href={section.cashSettlementHref}
                  className="font-medium text-brand-navy underline underline-offset-4 decoration-brand-navy/30 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:decoration-brand-navy"
                >
                  {section.cashSettlementLinkLabel}
                </Link>
                <span aria-hidden="true" className="text-neutral-300">
                  /
                </span>
                <Link
                  href={section.fireHref}
                  className="font-medium text-brand-navy underline underline-offset-4 decoration-brand-navy/30 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:decoration-brand-navy"
                >
                  {section.fireLinkLabel}
                </Link>
              </p>
            </div>
          </aside>
        </TimelineContent>
      </div>
    </section>
  );
}
