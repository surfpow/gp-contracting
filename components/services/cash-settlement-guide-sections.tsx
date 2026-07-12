"use client";

import { useRef } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { useReducedMotion, type Variants } from "framer-motion";

import { SectionPhotoBackdrop } from "@/components/services/section-photo-backdrop";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { CashSettlementGuidePage } from "@/lib/services-content";

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

function ProsConsList({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: string[];
  tone: "pro" | "con";
}) {
  const Icon = tone === "pro" ? Check : Minus;
  const iconClass =
    tone === "pro"
      ? "text-brand-navy"
      : "text-neutral-400";

  return (
    <div>
      <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
        {heading}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-base leading-relaxed text-neutral-600"
          >
            <Icon
              className={`mt-1 size-4 shrink-0 ${iconClass}`}
              aria-hidden="true"
              strokeWidth={2}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CashSettlementRiskSection({
  section,
}: {
  section: CashSettlementGuidePage["risk"];
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
        // PLACEHOLDER: placeholder-risk-demo.png - swap for real GP photo
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
          {section.body.map((paragraph, index) => {
            const isFirst = index === 0;
            // Contextual link without rewriting the finished copy.
            const fireAnchor = "fire and water damage";
            const fireIdx = isFirst ? paragraph.indexOf(fireAnchor) : -1;

            return (
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
                {fireIdx >= 0 ? (
                  <>
                    {paragraph.slice(0, fireIdx)}
                    <Link
                      href={section.fireHref}
                      className={`font-medium underline underline-offset-4 transition-colors duration-150 [transition-timing-function:var(--ease-out)] ${
                        hasPhoto
                          ? "text-brand-navy-light decoration-brand-navy-light/40 hover:decoration-brand-navy-light"
                          : "text-brand-navy decoration-brand-navy/30 hover:decoration-brand-navy"
                      }`}
                    >
                      {fireAnchor}
                    </Link>
                    {paragraph.slice(fireIdx + fireAnchor.length)}
                  </>
                ) : (
                  paragraph
                )}
              </TimelineContent>
            );
          })}
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

export function CashSettlementOptionRestore({
  section,
}: {
  section: CashSettlementGuidePage["optionRestore"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
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
            className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
          >
            {paragraph}
          </TimelineContent>
        ))}

        <div className="mt-12 grid grid-cols-1 gap-8 border border-neutral-200 bg-white p-6 md:mt-16 md:grid-cols-2 md:gap-12 md:p-10">
          <TimelineContent
            as="div"
            animationNum={section.body.length + 1}
            timelineRef={ref}
            customVariants={variants}
          >
            <ProsConsList
              heading={section.advantages.heading}
              items={section.advantages.items}
              tone="pro"
            />
          </TimelineContent>
          <TimelineContent
            as="div"
            animationNum={section.body.length + 2}
            timelineRef={ref}
            customVariants={variants}
          >
            <ProsConsList
              heading={section.drawbacks.heading}
              items={section.drawbacks.items}
              tone="con"
            />
          </TimelineContent>
        </div>

        <TimelineContent
          as="div"
          animationNum={section.body.length + 3}
          timelineRef={ref}
          customVariants={variants}
          className="mt-12 border-t-2 border-brand-navy/20 pt-10 md:mt-16 md:pt-12"
        >
          <h3 className="max-w-3xl font-serif text-2xl tracking-tight text-neutral-900 md:text-3xl">
            {section.ownContractor.heading}
          </h3>
          <div className="mt-6 max-w-3xl space-y-5">
            {section.ownContractor.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </TimelineContent>
      </div>
    </section>
  );
}

export function CashSettlementOptionCash({
  section,
}: {
  section: CashSettlementGuidePage["optionCash"];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={ref}
          customVariants={variants}
          className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
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
            className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
          >
            {paragraph}
          </TimelineContent>
        ))}

        <div className="mt-12 grid grid-cols-1 gap-8 border border-neutral-200 bg-neutral-50 p-6 md:mt-16 md:grid-cols-2 md:gap-12 md:p-10">
          <TimelineContent
            as="div"
            animationNum={section.body.length + 1}
            timelineRef={ref}
            customVariants={variants}
          >
            <ProsConsList
              heading={section.advantages.heading}
              items={section.advantages.items}
              tone="pro"
            />
          </TimelineContent>
          <TimelineContent
            as="div"
            animationNum={section.body.length + 2}
            timelineRef={ref}
            customVariants={variants}
          >
            <ProsConsList
              heading={section.risks.heading}
              items={section.risks.items}
              tone="con"
            />
          </TimelineContent>
        </div>

        <TimelineContent
          as="div"
          animationNum={section.body.length + 3}
          timelineRef={ref}
          customVariants={variants}
        >
          <aside
            className="mt-8 border-l-4 border-brand-navy bg-neutral-50 px-6 py-5 md:mt-10 md:px-8 md:py-6"
            aria-label="Scope review callout"
          >
            <p className="max-w-3xl text-base leading-relaxed text-neutral-700 md:text-lg md:leading-8">
              {section.callout}
            </p>
          </aside>
        </TimelineContent>
      </div>
    </section>
  );
}

export function CashSettlementBusinessSection({
  section,
}: {
  section: CashSettlementGuidePage["business"];
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
        // PLACEHOLDER: placeholder-business-shell.png - swap for real GP photo
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

export function CashSettlementWhereGpFits({
  section,
}: {
  section: CashSettlementGuidePage["whereGpFits"];
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
        <TimelineContent
          as="p"
          animationNum={section.body.length + 1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <Link
            href={section.overviewHref}
            className={`font-medium underline underline-offset-4 transition-colors duration-150 [transition-timing-function:var(--ease-out)] ${
              hasPhoto
                ? "text-brand-navy-light decoration-brand-navy-light/40 hover:decoration-brand-navy-light"
                : "text-brand-navy decoration-brand-navy/30 hover:decoration-brand-navy"
            }`}
          >
            {section.overviewLinkLabel}
          </Link>
          {section.strategicHref && section.strategicLinkLabel ? (
            <>
              <span
                aria-hidden="true"
                className={hasPhoto ? "text-neutral-500" : "text-neutral-300"}
              >
                /
              </span>
              <Link
                href={section.strategicHref}
                className={`font-medium underline underline-offset-4 transition-colors duration-150 [transition-timing-function:var(--ease-out)] ${
                  hasPhoto
                    ? "text-brand-navy-light decoration-brand-navy-light/40 hover:decoration-brand-navy-light"
                    : "text-brand-navy decoration-brand-navy/30 hover:decoration-brand-navy"
                }`}
              >
                {section.strategicLinkLabel}
              </Link>
            </>
          ) : null}
        </TimelineContent>
      </div>
    </section>
  );
}
