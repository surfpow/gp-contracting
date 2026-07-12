"use client";

import { useRef } from "react";
import {
  Building2,
  CloudRain,
  WashingMachine,
  Waves,
  WavesArrowDown,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { WaterSourceCard } from "@/lib/services-content";
import { cn } from "@/lib/utils";

const cardIcons: Record<WaterSourceCard["icon"], LucideIcon> = {
  pipe: Waves,
  roof: CloudRain,
  appliance: WashingMachine,
  sewer: WavesArrowDown,
  strata: Building2,
};

export type WaterSourceCardsProps = {
  heading: string;
  lead: string;
  cards: WaterSourceCard[];
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

/**
 * Five water-source cards. Wrapped responsive grid on all breakpoints —
 * multi-sentence copy reads better when every card stays visible than when a
 * carousel hides it behind a swipe. No embla dependency.
 */
export function WaterSourceCards({
  heading,
  lead,
  cards,
}: WaterSourceCardsProps) {
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
          {heading}
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={ref}
          customVariants={variants}
          className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
        >
          {lead}
        </TimelineContent>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 xl:grid-cols-5">
          {cards.map((card, index) => {
            const Icon = cardIcons[card.icon];

            return (
              <TimelineContent
                key={card.title}
                as="li"
                animationNum={index + 2}
                timelineRef={ref}
                customVariants={variants}
                className={cn(
                  "group border border-neutral-200 bg-white p-6 transition-[transform,border-color] duration-200 [transition-timing-function:var(--ease-out)] md:p-7",
                  "active:scale-[0.99]",
                  // Lift only on fine pointers — touch taps must not stick a hover translate
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:border-brand-navy/40 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5",
                  cards.length === 5 && index === 4
                    ? "sm:col-span-2 sm:max-w-md sm:justify-self-center xl:col-span-1 xl:max-w-none xl:justify-self-stretch"
                    : undefined,
                )}
              >
                <span className="flex size-10 items-center justify-center border border-brand-navy/15 text-brand-navy transition-[border-color,background-color,color] duration-200 [transition-timing-function:var(--ease-out)] group-hover:border-brand-navy group-hover:bg-brand-navy group-hover:text-white">
                  <Icon className="size-4" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-serif text-xl tracking-tight text-neutral-900 md:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-[0.9375rem] md:leading-7">
                  {card.body}
                </p>
              </TimelineContent>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
