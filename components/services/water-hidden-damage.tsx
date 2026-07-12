"use client";

import { useRef } from "react";
import {
  Bug,
  Frame,
  Layers,
  ThermometerSnowflake,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion, type Variants } from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import type { WaterHiddenDamageItem } from "@/lib/services-content";

const itemIcons: Record<WaterHiddenDamageItem["icon"], LucideIcon> = {
  frame: Frame,
  layers: Layers,
  insulation: ThermometerSnowflake,
  mould: Bug,
  zap: Zap,
};

export type WaterHiddenDamageProps = {
  heading: string;
  paragraphs: string[];
  panelTitle: string;
  items: WaterHiddenDamageItem[];
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
 * Signature inventory band: narrative left, bordered "moisture meter misses"
 * panel right. Panel chrome is static; inventory rows stagger in (no nested
 * TimelineContent wrapping the whole aside — that double-faded the signature).
 */
export function WaterHiddenDamage({
  heading,
  paragraphs,
  panelTitle,
  items,
}: WaterHiddenDamageProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const variants = revealVariants(reduced);

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
        <div className="lg:col-span-5">
          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={ref}
            customVariants={variants}
            className="font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl"
          >
            {heading}
          </TimelineContent>
          <div className="mt-8 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <TimelineContent
                key={paragraph.slice(0, 48)}
                as="p"
                animationNum={index + 1}
                timelineRef={ref}
                customVariants={variants}
                className="text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8"
              >
                {paragraph}
              </TimelineContent>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-7">
          <div className="relative overflow-hidden border border-neutral-200 bg-brand-navy/[0.03]">
            <div
              className="absolute inset-x-0 top-0 h-px bg-brand-navy/40"
              aria-hidden="true"
            />
            <div className="px-6 py-7 md:px-8 md:py-9">
              <TimelineContent
                as="p"
                animationNum={paragraphs.length + 1}
                timelineRef={ref}
                customVariants={variants}
                className="text-sm font-medium tracking-widest text-brand-navy uppercase"
              >
                {panelTitle}
              </TimelineContent>
              <ul className="mt-6">
                {items.map((item, index) => {
                  const Icon = itemIcons[item.icon];
                  return (
                    <TimelineContent
                      key={item.title}
                      as="li"
                      animationNum={paragraphs.length + 2 + index}
                      timelineRef={ref}
                      customVariants={variants}
                      className={
                        index === 0
                          ? "border-t border-neutral-200/80 pt-5"
                          : "mt-5 border-t border-neutral-200/80 pt-5"
                      }
                    >
                      <div className="flex gap-4">
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-brand-navy/15 bg-white text-brand-navy">
                          <Icon
                            className="size-4"
                            aria-hidden="true"
                            strokeWidth={1.75}
                          />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg tracking-tight text-neutral-900 md:text-xl">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 md:text-base md:leading-7">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </TimelineContent>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
