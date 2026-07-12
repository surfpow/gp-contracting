"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT, DURATION_MARKETING_S } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type CredentialsStripProps = {
  items: string[];
  /** Optional line under the grid (e.g. spoke → hub link). */
  footer?: ReactNode;
  className?: string;
  /**
   * `section` = full-bleed band with its own fade-in (fire spoke).
   * `embedded` = static grid inside a parent that already handles motion.
   */
  variant?: "section" | "embedded";
};

function CredentialsGrid({
  items,
  footer,
  className,
}: {
  items: string[];
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <ul className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="border-l-2 border-brand-navy/30 pl-4 text-sm leading-snug text-neutral-700 md:text-[0.9375rem] md:leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
      {footer ? (
        <div className="mt-6 text-sm text-neutral-500">{footer}</div>
      ) : null}
    </div>
  );
}

/**
 * Compact credentials band: readable sentence case in a balanced grid,
 * left accent rules instead of pipe-separated uppercase soup.
 */
export function CredentialsStrip({
  items,
  footer,
  className,
  variant = "section",
}: CredentialsStripProps) {
  const reducedMotion = useReducedMotion() ?? false;

  if (variant === "embedded") {
    return (
      <CredentialsGrid items={items} footer={footer} className={className} />
    );
  }

  return (
    <section className="border-y border-neutral-200 bg-neutral-50 px-4 py-10 md:px-8 md:py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={
          reducedMotion
            ? { duration: 0.2 }
            : { duration: DURATION_MARKETING_S, ease: EASE_OUT }
        }
        className={cn("mx-auto max-w-6xl", className)}
      >
        <CredentialsGrid items={items} footer={footer} />
      </motion.div>
    </section>
  );
}
