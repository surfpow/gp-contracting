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
import type { StrategicUpgradesGuidePage } from "@/lib/services-content";

type EvaporatesProps = {
  section: StrategicUpgradesGuidePage["evaporates"];
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
 * Low-yield "evaporation" list: dark field, fading rules, honest nos.
 * Contrasts the light value-map ladder above it; not a two-column split.
 */
export function StrategicEvaporates({ section }: EvaporatesProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="evaporates-heading"
    >
      <div className="mx-auto max-w-4xl">
        <TimelineContent
          as="h2"
          id="evaporates-heading"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-50 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8"
        >
          {section.intro}
        </TimelineContent>

        <ul className="mt-12 space-y-0 md:mt-16">
          {section.items.map((item, index) => (
            <TimelineContent
              key={item.title}
              as="li"
              animationNum={index + 2}
              timelineRef={ref}
              customVariants={variants}
              className="relative py-8 md:py-9"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/25 via-white/10 to-transparent"
              />
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="font-sans text-sm font-medium tracking-widest text-brand-navy-light/70"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl tracking-tight text-neutral-100 md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-400 md:leading-8">
                    {item.linkHref && item.linkLabel && item.body.includes("{link}")
                      ? item.body.split("{link}").map((part, partIndex, parts) => (
                          <span key={`${item.title}-${partIndex}`}>
                            {part}
                            {partIndex < parts.length - 1 ? (
                              <Link
                                href={item.linkHref!}
                                className="font-medium text-brand-navy-light underline underline-offset-4 decoration-brand-navy-light/40 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:decoration-brand-navy-light"
                              >
                                {item.linkLabel}
                              </Link>
                            ) : null}
                          </span>
                        ))
                      : item.body}
                  </p>
                </div>
              </div>
            </TimelineContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
