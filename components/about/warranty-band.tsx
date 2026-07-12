"use client";

import { Mail, Phone } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";

const WARRANTY_CONTACT = {
  name: "PJ Saini",
  phoneDisplay: "+1 (778) 891 9076",
  phoneHref: "tel:+17788919076",
  email: "info@gpcontracting.ca",
  emailHref: "mailto:info@gpcontracting.ca",
} as const;

function makeRevealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
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

export function WarrantyBand() {
  const reducedMotion = useReducedMotion() ?? false;
  const variants = makeRevealVariants(reducedMotion);

  return (
    <section className="border-t border-brand-navy-light/40 bg-brand-dark px-4 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.p
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
          className="text-sm font-medium tracking-widest text-brand-navy-light uppercase"
        >
          Our Warranty
        </motion.p>
        <motion.h2
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
          className="mt-4 max-w-3xl font-serif text-3xl tracking-tight text-neutral-50 md:text-4xl md:leading-tight lg:text-5xl"
        >
          Guaranteed for Life, With a Human Attached
        </motion.h2>
        <motion.p
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={variants}
          className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg md:leading-8"
        >
          Every project GP builds carries our lifetime workmanship warranty. If
          something we constructed fails because of how we built it, we come
          back and make it right, whether that is two years after handover or
          ten. No expiry date, no policy-period fine print, and no anonymous
          claims process. When you need us, you call the person below and you
          get a person.
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
          className="mt-12 border-t border-white/10 pt-10 md:mt-14 md:pt-12"
        >
          <p className="font-serif text-2xl tracking-tight text-white md:text-3xl lg:text-4xl">
            {WARRANTY_CONTACT.name}
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-4">
            <a
              href={WARRANTY_CONTACT.phoneHref}
              className="group inline-flex items-center gap-3 text-xl font-medium tracking-tight text-neutral-50 transition-colors duration-200 hover:text-brand-navy-light md:text-2xl"
            >
              <Phone
                className="size-5 shrink-0 text-brand-navy-light md:size-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>{WARRANTY_CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={WARRANTY_CONTACT.emailHref}
              className="group inline-flex items-center gap-3 text-xl font-medium tracking-tight text-neutral-50 transition-colors duration-200 hover:text-brand-navy-light md:text-2xl"
            >
              <Mail
                className="size-5 shrink-0 text-brand-navy-light md:size-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>{WARRANTY_CONTACT.email}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
