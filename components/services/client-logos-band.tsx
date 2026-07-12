"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { LogoCloud, type Logo } from "@/components/ui/logo-cloud-2";
import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ClientLogosBandProps = {
  eyebrow: string;
  heading: string;
  logos: Logo[];
  caption?: string;
  className?: string;
};

function makeRevealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
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
 * Quiet credibility band for service pages: eyebrow, heading, LogoCloud,
 * optional caption. Reuses the homepage partner marks without changing
 * the homepage Partners section.
 */
export function ClientLogosBand({
  eyebrow,
  heading,
  logos,
  caption,
  className,
}: ClientLogosBandProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const variants = makeRevealVariants(reducedMotion);

  if (logos.length === 0) return null;

  return (
    <section
      className={cn(
        "border-y border-neutral-200 bg-neutral-50 px-4 py-14 md:px-8 md:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
          className="text-center"
        >
          <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-2xl tracking-tight text-neutral-900 md:text-3xl">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants}
          className="mt-8 md:mt-10"
        >
          <LogoCloud logos={logos} />
        </motion.div>

        {caption ? (
          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={variants}
            className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-neutral-600 md:mt-10 md:text-base md:leading-7"
          >
            {caption}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
