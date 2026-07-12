"use client";

import { useRef } from "react";
import { useReducedMotion, type Variants } from "framer-motion";

import { SectionPhotoBackdrop } from "@/components/services/section-photo-backdrop";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { StrategicUpgradesGuidePage } from "@/lib/services-content";

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

export function StrategicLeverageSection({
  section,
}: {
  section: StrategicUpgradesGuidePage["leverage"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const hasPhoto = Boolean(section.backgroundImage);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden px-4 py-16 md:px-8 md:py-24 lg:py-32 ${
        hasPhoto ? "bg-brand-dark" : "bg-white"
      }`}
    >
      {section.backgroundImage ? (
        // PLACEHOLDER: placeholder-upgrade-finishes.png - swap for real GP photo
        <SectionPhotoBackdrop image={section.backgroundImage} scrim="left" />
      ) : null}
      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={ref}
            customVariants={variants}
            className={`font-serif text-3xl leading-tight tracking-tight md:text-4xl ${
              hasPhoto ? "text-neutral-50" : "text-neutral-900"
            }`}
          >
            {section.heading}
          </TimelineContent>
        </div>
        <div className="mt-10 space-y-6 lg:col-span-7 lg:mt-0">
          {section.body.map((paragraph, index) => (
            <TimelineContent
              key={paragraph.slice(0, 48)}
              as="p"
              animationNum={index + 1}
              timelineRef={ref}
              customVariants={variants}
              className={`text-base leading-relaxed md:text-lg md:leading-8 ${
                hasPhoto ? "text-neutral-200" : "text-neutral-600"
              }`}
            >
              {paragraph}
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StrategicResaleSection({
  section,
}: {
  section: StrategicUpgradesGuidePage["resale"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const hasPhoto = Boolean(section.backgroundImage);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden px-4 py-16 md:px-8 md:py-24 lg:py-32 ${
        hasPhoto ? "bg-brand-dark" : "bg-white"
      }`}
    >
      {section.backgroundImage ? (
        // PLACEHOLDER: placeholder-finished-interior.png - swap for real GP photo
        <SectionPhotoBackdrop image={section.backgroundImage} scrim="left" />
      ) : null}
      <div className="relative mx-auto max-w-3xl">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className={`font-serif text-3xl tracking-tight md:text-4xl ${
            hasPhoto ? "text-neutral-50" : "text-neutral-900"
          }`}
        >
          {section.heading}
        </TimelineContent>
        {section.body.map((paragraph, index) => (
          <TimelineContent
            key={paragraph.slice(0, 48)}
            as="p"
            animationNum={index + 1}
            timelineRef={ref}
            customVariants={variants}
            className={`mt-6 text-base leading-relaxed md:text-lg md:leading-8 ${
              hasPhoto ? "text-neutral-200" : "text-neutral-600"
            }`}
          >
            {paragraph}
          </TimelineContent>
        ))}
        <TimelineContent
          as="div"
          animationNum={section.body.length + 1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-10"
        >
          <blockquote
            className={`border-l-4 pl-6 ${
              hasPhoto ? "border-brand-navy-light" : "border-brand-navy"
            }`}
          >
            <p
              className={`font-serif text-xl leading-snug tracking-tight italic md:text-2xl md:leading-snug ${
                hasPhoto ? "text-neutral-50" : "text-neutral-900"
              }`}
            >
              {section.pullQuote}
            </p>
          </blockquote>
        </TimelineContent>
      </div>
    </section>
  );
}

export function StrategicCommercialSection({
  section,
}: {
  section: StrategicUpgradesGuidePage["commercial"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const hasPhoto = Boolean(section.backgroundImage);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden px-4 py-16 md:px-8 md:py-24 lg:py-32 ${
        hasPhoto ? "bg-brand-dark" : "bg-neutral-50"
      }`}
    >
      {section.backgroundImage ? (
        // PLACEHOLDER: placeholder-strategic-commercial.png - swap for real GP photo
        <SectionPhotoBackdrop image={section.backgroundImage} scrim="left" />
      ) : null}
      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={ref}
            customVariants={variants}
            className={`font-serif text-3xl leading-tight tracking-tight md:text-4xl ${
              hasPhoto ? "text-neutral-50" : "text-neutral-900"
            }`}
          >
            {section.heading}
          </TimelineContent>
        </div>
        <div className="mt-10 space-y-6 lg:col-span-7 lg:mt-0">
          {section.body.map((paragraph, index) => (
            <TimelineContent
              key={paragraph.slice(0, 48)}
              as="p"
              animationNum={index + 1}
              timelineRef={ref}
              customVariants={variants}
              className={`text-base leading-relaxed md:text-lg md:leading-8 ${
                hasPhoto ? "text-neutral-200" : "text-neutral-600"
              }`}
            >
              {paragraph}
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StrategicHonestySection({
  section,
}: {
  section: StrategicUpgradesGuidePage["honesty"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);
  const hasPhoto = Boolean(section.backgroundImage);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden px-4 py-16 md:px-8 md:py-24 lg:py-32 ${
        hasPhoto ? "bg-brand-dark" : "bg-white"
      }`}
    >
      {section.backgroundImage ? (
        // PLACEHOLDER: placeholder-upgrade-finished-kitchen.png - swap for real GP photo
        <SectionPhotoBackdrop image={section.backgroundImage} scrim="full" />
      ) : null}
      <div className="relative mx-auto max-w-3xl">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className={`font-serif text-3xl tracking-tight md:text-4xl ${
            hasPhoto ? "text-neutral-50" : "text-neutral-900"
          }`}
        >
          {section.heading}
        </TimelineContent>
        {section.body.map((paragraph, index) => (
          <TimelineContent
            key={paragraph.slice(0, 48)}
            as="p"
            animationNum={index + 1}
            timelineRef={ref}
            customVariants={variants}
            className={`mt-6 text-base leading-relaxed md:text-lg md:leading-8 ${
              hasPhoto ? "text-neutral-200" : "text-neutral-600"
            }`}
          >
            {paragraph}
          </TimelineContent>
        ))}
      </div>
    </section>
  );
}
