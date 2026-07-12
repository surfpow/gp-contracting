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

type ComparisonProps = {
  section: CashSettlementGuidePage["comparison"];
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
 * Purpose-built two-path comparison matrix. Desktop reads as a true table;
 * mobile stacks each criterion as a paired card so both paths stay visible.
 */
export function CashSettlementComparison({ section }: ComparisonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-neutral-50 px-4 py-16 md:px-8 md:py-24 lg:py-32"
      aria-labelledby="comparison-heading"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="h2"
          id="comparison-heading"
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

        {/* Desktop table */}
        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={ref}
          customVariants={variants}
          className="mt-12 hidden overflow-hidden border border-neutral-200 bg-white md:mt-16 md:block"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-neutral-200">
                <th
                  scope="col"
                  className="w-[32%] bg-white px-6 py-5 font-sans text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase"
                >
                  {section.criterionLabel}
                </th>
                <th
                  scope="col"
                  className="w-[34%] bg-neutral-100 px-6 py-5 font-serif text-lg font-normal tracking-tight text-neutral-900"
                >
                  {section.cashColumnLabel}
                </th>
                <th
                  scope="col"
                  className="w-[34%] bg-brand-dark px-6 py-5 font-serif text-lg font-normal tracking-tight text-neutral-50"
                >
                  {section.restoreColumnLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr
                  key={row.criterion}
                  className={
                    row.emphasize
                      ? "border-b border-brand-navy/20 bg-brand-navy/[0.04]"
                      : "border-b border-neutral-100 last:border-b-0"
                  }
                >
                  <th
                    scope="row"
                    className={`px-6 py-5 align-top font-sans text-sm font-medium leading-snug text-neutral-900 md:text-[0.9375rem] ${
                      row.emphasize
                        ? "border-l-4 border-l-brand-navy"
                        : "border-l-4 border-l-transparent"
                    }`}
                  >
                    {row.criterion}
                    {row.emphasize && (
                      <span className="mt-1.5 block text-[11px] font-semibold tracking-[0.12em] text-brand-navy uppercase">
                        Decides most claims
                      </span>
                    )}
                  </th>
                  <td className="bg-neutral-50/80 px-6 py-5 align-top text-sm leading-relaxed text-neutral-600 md:text-base">
                    {row.cash}
                  </td>
                  <td className="bg-brand-dark/5 px-6 py-5 align-top text-sm leading-relaxed text-neutral-700 md:text-base">
                    {row.restore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TimelineContent>

        {/* Mobile stacked cards */}
        <div className="mt-12 space-y-4 md:hidden">
          {section.rows.map((row, index) => (
            <TimelineContent
              key={row.criterion}
              as="div"
              animationNum={2 + index}
              timelineRef={ref}
              customVariants={variants}
            >
              <article
                className={`overflow-hidden border ${
                  row.emphasize
                    ? "border-brand-navy/30 bg-white"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div
                  className={`border-b border-neutral-100 px-5 py-4 ${
                    row.emphasize ? "border-l-4 border-l-brand-navy" : ""
                  }`}
                >
                  <h3 className="font-sans text-sm font-medium leading-snug text-neutral-900">
                    {row.criterion}
                  </h3>
                  {row.emphasize && (
                    <p className="mt-1.5 text-[11px] font-semibold tracking-[0.12em] text-brand-navy uppercase">
                      Decides most claims
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1">
                  <div className="border-b border-neutral-100 bg-neutral-50 px-5 py-4">
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                      {section.cashColumnLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {row.cash}
                    </p>
                  </div>
                  <div className="bg-brand-dark px-5 py-4">
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-brand-navy-light uppercase">
                      {section.restoreColumnLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      {row.restore}
                    </p>
                  </div>
                </div>
              </article>
            </TimelineContent>
          ))}
        </div>

        <TimelineContent
          as="div"
          animationNum={3 + section.rows.length}
          timelineRef={ref}
          customVariants={variants}
        >
          <aside
            className="mt-8 border-l-4 border-brand-navy bg-white px-6 py-5 md:mt-10 md:px-8 md:py-6"
            aria-label="Key takeaway"
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
