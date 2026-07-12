"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { StrategicUpgradesGuidePage } from "@/lib/services-content";

type SeriesNavProps = {
  section: StrategicUpgradesGuidePage["series"];
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
 * Series navigator: vertical stage spine with "you are here" marker.
 * Distinct from the five-question rail on the cash settlement guide.
 */
export function StrategicSeriesNav({ section }: SeriesNavProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="series-nav-heading"
    >
      <div className="mx-auto max-w-4xl">
        <TimelineContent
          as="h2"
          id="series-nav-heading"
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

        <ol className="relative mt-12 space-y-0 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-neutral-200 md:left-[0.9375rem]"
          />
          {section.stages.map((stage, index) => (
            <TimelineContent
              key={stage.label}
              as="li"
              animationNum={index + 2}
              timelineRef={ref}
              customVariants={variants}
              className="relative flex gap-5 pb-10 last:pb-0 md:gap-8"
            >
              <span
                aria-hidden="true"
                className={`relative z-10 mt-1.5 size-6 shrink-0 rounded-full border-2 md:mt-1 md:size-8 ${
                  stage.current
                    ? "border-brand-navy bg-brand-navy"
                    : "border-neutral-300 bg-white"
                }`}
              />
              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className={`font-sans text-xs font-semibold tracking-[0.14em] uppercase ${
                    stage.current ? "text-brand-navy" : "text-neutral-400"
                  }`}
                >
                  {stage.current ? "You are here" : `Stage ${index + 1}`}
                </p>
                <h3 className="mt-2 font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                  {stage.label}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-600 md:leading-7">
                  {stage.description}
                </p>
                {stage.links && stage.links.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                    {stage.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 font-medium text-brand-navy underline underline-offset-4 decoration-brand-navy/30 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:decoration-brand-navy"
                        >
                          {link.label}
                          <ArrowRight
                            className="size-3.5 transition-transform duration-150 [transition-timing-function:var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </TimelineContent>
          ))}
        </ol>
      </div>
    </section>
  );
}
