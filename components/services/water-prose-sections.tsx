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
import type { WaterFloodDamageServicePage } from "@/lib/services-content";

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
      filter: "blur(4px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      transform: "translateY(0px)",
      filter: "blur(0px)",
      transition: {
        delay: i * STAGGER_MARKETING_S,
        duration: DURATION_MARKETING_S,
        ease: EASE_OUT,
      },
    }),
  };
}

export function WaterMultiUnitSection({
  section,
}: {
  section: WaterFloodDamageServicePage["multiUnit"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={ref}
            customVariants={variants}
            className="text-sm font-medium tracking-widest text-brand-navy-light uppercase"
          >
            {section.eyebrow}
          </TimelineContent>
          <div
            className="mt-4 h-px w-12 bg-brand-navy-light/60"
            aria-hidden="true"
          />
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={ref}
            customVariants={variants}
            className="mt-6 font-serif text-3xl leading-tight tracking-tight text-neutral-50 md:text-4xl"
          >
            {section.heading}
          </TimelineContent>
        </div>

        <div className="mt-10 space-y-6 lg:col-span-7 lg:mt-0">
          {section.body.map((paragraph, index) => (
            <TimelineContent
              key={paragraph.slice(0, 48)}
              as="p"
              animationNum={index + 2}
              timelineRef={ref}
              customVariants={variants}
              className="text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8"
            >
              {paragraph}
            </TimelineContent>
          ))}
          <TimelineContent
            as="p"
            animationNum={section.body.length + 2}
            timelineRef={ref}
            customVariants={variants}
            className="border-t border-white/10 pt-6 font-mono text-sm leading-relaxed tracking-tight text-brand-navy-light tabular-nums md:text-[0.9375rem]"
          >
            {section.credentialLine}
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}

export function WaterClaimSideSection({
  section,
}: {
  section: WaterFloodDamageServicePage["claimSide"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const [first, second] = section.paragraphs;
  const linkLabel = section.overviewLinkLabel;
  const linkIndex = second.indexOf(linkLabel);
  const beforeLink = second.slice(0, linkIndex);
  const afterLink = second.slice(linkIndex + linkLabel.length);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-16 md:px-8 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
        >
          {first}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={ref}
          customVariants={variants}
          className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
        >
          {beforeLink}
          <Link
            href={section.overviewHref}
            className="font-medium text-brand-navy underline decoration-brand-navy/30 underline-offset-4 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:decoration-brand-navy"
          >
            {linkLabel}
          </Link>
          {afterLink}
        </TimelineContent>
      </div>
    </section>
  );
}
