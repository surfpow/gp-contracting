"use client";

import { useRef, type RefObject } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

import { SectionPhotoBackdrop } from "@/components/services/section-photo-backdrop";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { ServiceImage, ServiceWhyGp } from "@/lib/services-content";

export type ServiceWhyGpSectionProps = {
  whyGp: ServiceWhyGp;
  /**
   * Optional ambient photographic background. Decorative only (under scrim);
   * never present as project photography. Opt-in via presentation.
   * When set, enables the elevated reveal motion for this section.
   */
  backgroundImage?: ServiceImage;
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
      transform: "translateY(14px)",
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

function WhyGpStaticBody({ whyGp }: { whyGp: ServiceWhyGp }) {
  return (
    <>
      <div className="lg:col-span-5">
        <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
          Why Choose Us
        </p>
        <div className="mt-4 h-px w-12 bg-brand-navy-light/60" aria-hidden="true" />
        <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tight text-neutral-50 md:text-4xl">
          {whyGp.heading}
        </h2>
      </div>

      <div className="mt-10 lg:col-span-7 lg:mt-0">
        {whyGp.pullQuote ? (
          <>
            <blockquote className="border-l-2 border-brand-navy-light/70 pl-6 font-serif text-2xl leading-snug tracking-tight text-neutral-100 italic md:pl-8 md:text-3xl">
              {whyGp.pullQuote}
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8">
              {whyGp.body}
            </p>
          </>
        ) : (
          <p className="text-lg leading-relaxed text-neutral-200 md:text-xl md:leading-9">
            {whyGp.body}
          </p>
        )}
      </div>
    </>
  );
}

function WhyGpElevatedBody({
  whyGp,
  variants,
  timelineRef,
}: {
  whyGp: ServiceWhyGp;
  variants: Variants;
  timelineRef: RefObject<HTMLElement | null>;
}) {
  return (
    <>
      <div className="lg:col-span-5">
        <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
          Why Choose Us
        </p>
        <div
          className="mt-4 h-px w-12 bg-brand-navy-light/60"
          aria-hidden="true"
        />
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={variants}
          className="mt-6 font-serif text-3xl leading-tight tracking-tight text-neutral-50 md:text-4xl"
        >
          {whyGp.heading}
        </TimelineContent>
      </div>

      <div className="mt-10 lg:col-span-7 lg:mt-0">
        {whyGp.pullQuote ? (
          <>
            <TimelineContent
              as="blockquote"
              animationNum={1}
              timelineRef={timelineRef}
              customVariants={variants}
              className="border-l-2 border-brand-navy-light/70 pl-6 font-serif text-2xl leading-snug tracking-tight text-neutral-100 italic md:pl-8 md:text-3xl"
            >
              {whyGp.pullQuote}
            </TimelineContent>
            <TimelineContent
              as="p"
              animationNum={2}
              timelineRef={timelineRef}
              customVariants={variants}
              className="mt-8 text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8"
            >
              {whyGp.body}
            </TimelineContent>
          </>
        ) : (
          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={variants}
            className="text-lg leading-relaxed text-neutral-200 md:text-xl md:leading-9"
          >
            {whyGp.body}
          </TimelineContent>
        )}
      </div>
    </>
  );
}

export function ServiceWhyGpSection({
  whyGp,
  backgroundImage,
}: ServiceWhyGpSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const hasPhoto = Boolean(backgroundImage);

  // Static path preserves the original template for pages that have not opted in.
  if (!hasPhoto) {
    return (
      <section className="bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16">
          <WhyGpStaticBody whyGp={whyGp} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-brand-dark px-4 py-20 md:px-8 md:py-28 lg:py-36"
    >
      {/* PLACEHOLDER: placeholder-why-gp-interior.png - ambient section backdrop only (not project photography) */}
      <SectionPhotoBackdrop image={backgroundImage!} scrim="left" />

      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16">
        <WhyGpElevatedBody
          whyGp={whyGp}
          variants={variants}
          timelineRef={ref}
        />
      </div>
    </section>
  );
}
