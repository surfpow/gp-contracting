"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { TimelineContent } from "@/components/ui/timeline-animation";
import type { FireTimelineStop } from "@/lib/services-content";

export type FireRebuildTimelineProps = {
  eyebrow: string;
  heading: string;
  stops: FireTimelineStop[];
};

export function FireRebuildTimeline({
  eyebrow,
  heading,
  stops,
}: FireRebuildTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-dark px-4 py-16 md:px-8 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
          {eyebrow}
        </p>
        <div
          className="mt-4 h-px w-12 bg-brand-navy-light/60"
          aria-hidden="true"
        />
        <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tight text-neutral-50 md:text-4xl">
          {heading}
        </h2>

        <div className="relative mt-14 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-neutral-700/70 md:left-[0.8125rem]"
          />
          {reducedMotion ? (
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-brand-navy-light md:left-[0.8125rem]"
            />
          ) : (
            <motion.div
              aria-hidden="true"
              style={{ scaleY: lineScale }}
              className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-brand-navy-light md:left-[0.8125rem]"
            />
          )}

          <ol className="relative space-y-10 md:space-y-14">
            {stops.map((stop, index) => (
              <li key={stop.title} className="relative pl-10 md:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 flex size-6 items-center justify-center md:size-7"
                >
                  <span className="size-2.5 rounded-full bg-brand-navy-light ring-4 ring-brand-dark md:size-3" />
                </span>

                {reducedMotion ? (
                  <div>
                    <p className="text-xs font-medium tracking-[0.18em] text-brand-navy-light uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-serif text-xl tracking-tight text-neutral-50 md:text-2xl">
                      {stop.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8">
                      {stop.body}
                    </p>
                  </div>
                ) : (
                  <TimelineContent
                    animationNum={index}
                    timelineRef={sectionRef}
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    <p className="text-xs font-medium tracking-[0.18em] text-brand-navy-light uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-serif text-xl tracking-tight text-neutral-50 md:text-2xl">
                      {stop.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8">
                      {stop.body}
                    </p>
                  </TimelineContent>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
