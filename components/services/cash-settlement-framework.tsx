"use client";

import { useRef } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { CashSettlementGuidePage } from "@/lib/services-content";

type FrameworkProps = {
  section: CashSettlementGuidePage["framework"];
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
 * Five-question decision framework. Large numerals + a continuous rail make
 * this read as a checklist instrument, not a prose FAQ dump.
 */
export function CashSettlementFramework({ section }: FrameworkProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="framework-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 40%, rgba(45,52,112,0.9) 100%), repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(255,255,255,0.04) 47px, rgba(255,255,255,0.04) 48px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="text-sm font-medium tracking-widest text-brand-navy-light uppercase"
        >
          Decision Framework
        </TimelineContent>
        <TimelineContent
          as="h2"
          id="framework-heading"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-4 max-w-3xl font-serif text-3xl tracking-tight text-neutral-50 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>

        <ol className="relative mt-14 space-y-0 md:mt-16">
          {/* Continuous rail */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[1.125rem] w-px bg-white/15 md:left-[1.625rem]"
          />

          {section.questions.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");
            const isLast = index === section.questions.length - 1;

            return (
              <li
                key={item.question}
                className={isLast ? "" : "pb-10 md:pb-12"}
              >
                <TimelineContent
                  as="div"
                  animationNum={2 + index}
                  timelineRef={ref}
                  customVariants={variants}
                  className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 md:grid-cols-[3.25rem_1fr] md:gap-x-8"
                >
                  <div className="relative z-10 flex justify-center">
                    <span className="flex size-9 items-center justify-center rounded-full border border-brand-navy-light/40 bg-brand-dark font-mono text-xs font-medium tracking-wider text-brand-navy-light tabular-nums md:size-12 md:text-sm">
                      {number}
                    </span>
                  </div>
                  <div className="min-w-0 pt-1 md:pt-2">
                    <h3 className="font-serif text-xl tracking-tight text-neutral-50 md:text-2xl">
                      {item.question}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8">
                      {item.answer}
                    </p>
                  </div>
                </TimelineContent>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
