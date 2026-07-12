"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { FireComparisonPanel } from "@/lib/services-content";

export type FireComparisonPanelsProps = {
  heading: string;
  lead: string;
  left: FireComparisonPanel;
  right: FireComparisonPanel;
  closing: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function FireComparisonPanels({
  heading,
  lead,
  left,
  right,
  closing,
}: FireComparisonPanelsProps) {
  const reducedMotion = useReducedMotion() ?? false;

  const panelTransition = reducedMotion
    ? { duration: 0.35, ease: "easeOut" as const }
    : { type: "spring" as const, stiffness: 80, damping: 20, mass: 0.9 };

  const listTransition = reducedMotion
    ? { duration: 0.25 }
    : { duration: 0.45, ease: EASE };

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
          {lead}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -48 }
            }
            whileInView={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, x: 0 }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={panelTransition}
            className="bg-neutral-50 px-6 py-8 md:px-8 md:py-10"
          >
            <h3 className="font-serif text-xl tracking-tight text-neutral-900 md:text-2xl">
              {left.title}
            </h3>
            <ul className="mt-6 space-y-4">
              {left.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    ...listTransition,
                    delay: reducedMotion ? 0 : 0.08 + index * 0.06,
                  }}
                  className="flex items-start gap-3 text-base leading-relaxed text-neutral-600"
                >
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-neutral-400"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 48 }
            }
            whileInView={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, x: 0 }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              ...panelTransition,
              delay: reducedMotion ? 0 : 0.08,
            }}
            className="bg-brand-dark px-6 py-8 md:px-8 md:py-10"
          >
            <h3 className="font-serif text-xl tracking-tight text-neutral-50 md:text-2xl">
              {right.title}
            </h3>
            <ul className="mt-6 space-y-4">
              {right.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    ...listTransition,
                    delay: reducedMotion ? 0 : 0.12 + index * 0.06,
                  }}
                  className="flex items-start gap-3 text-base leading-relaxed text-neutral-300"
                >
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-brand-navy-light"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-neutral-600 md:mt-12 md:text-lg md:leading-8">
          {closing}
        </p>
      </div>
    </section>
  );
}
