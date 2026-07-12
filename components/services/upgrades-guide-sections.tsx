"use client";

import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion, type Variants } from "framer-motion";

import { SectionPhotoBackdrop } from "@/components/services/section-photo-backdrop";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { UpgradesDuringClaimGuidePage } from "@/lib/services-content";

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

export function UpgradesLikeKindSection({
  section,
}: {
  section: UpgradesDuringClaimGuidePage["likeKind"];
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

export function UpgradesThreeOpeningsSection({
  section,
}: {
  section: UpgradesDuringClaimGuidePage["threeOpenings"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="three-openings-heading"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="h2"
          id="three-openings-heading"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
        >
          {section.heading}
        </TimelineContent>

        <ol className="relative mt-14 space-y-0 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[1.125rem] w-px bg-neutral-200 md:left-[1.625rem]"
          />
          {section.blocks.map((block, index) => {
            const number = String(index + 1).padStart(2, "0");
            const isLast = index === section.blocks.length - 1;
            return (
              <li key={block.title} className={isLast ? "" : "pb-10 md:pb-12"}>
                <TimelineContent
                  as="div"
                  animationNum={1 + index}
                  timelineRef={ref}
                  customVariants={variants}
                  className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 md:grid-cols-[3.25rem_1fr] md:gap-x-8"
                >
                  <div className="relative z-10 flex justify-center">
                    <span className="flex size-9 items-center justify-center rounded-full border border-brand-navy/30 bg-white font-mono text-xs font-medium tracking-wider text-brand-navy tabular-nums md:size-12 md:text-sm">
                      {number}
                    </span>
                  </div>
                  <div className="min-w-0 pt-1 md:pt-2">
                    <h3 className="font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
                      {block.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
                      {block.body}
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

export function UpgradesDeadlineSection({
  section,
}: {
  section: UpgradesDuringClaimGuidePage["deadline"];
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
        // PLACEHOLDER: placeholder-upgrade-open-walls.png - swap for real GP photo
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
          <TimelineContent
            as="div"
            animationNum={section.body.length + 1}
            timelineRef={ref}
            customVariants={variants}
          >
            <blockquote
              className={`border-l-4 pt-2 pl-6 ${
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
      </div>
    </section>
  );
}

export function UpgradesBusinessSection({
  section,
}: {
  section: UpgradesDuringClaimGuidePage["business"];
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
        // PLACEHOLDER: placeholder-upgrade-commercial-ti.png - swap for real GP photo
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

export function UpgradesGpConversationSection({
  section,
}: {
  section: UpgradesDuringClaimGuidePage["gpConversation"];
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
        {section.nextGuideHref && section.nextGuideLinkLabel ? (
          <TimelineContent
            as="p"
            animationNum={section.body.length + 1}
            timelineRef={ref}
            customVariants={variants}
            className="mt-8"
          >
            <Link
              href={section.nextGuideHref}
              className={`font-medium underline underline-offset-4 transition-colors duration-150 [transition-timing-function:var(--ease-out)] ${
                hasPhoto
                  ? "text-brand-navy-light decoration-brand-navy-light/40 hover:decoration-brand-navy-light"
                  : "text-brand-navy decoration-brand-navy/30 hover:decoration-brand-navy"
              }`}
            >
              {section.nextGuideLinkLabel}
            </Link>
          </TimelineContent>
        ) : null}
      </div>
    </section>
  );
}
