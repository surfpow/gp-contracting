"use client";

import {
  BadgeCheck,
  FileCheck2,
  MapPinned,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  DURATION_MARKETING_S,
  EASE_OUT,
  STAGGER_MARKETING_S,
} from "@/lib/motion";

type CredentialGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const GROUPS: CredentialGroup[] = [
  {
    title: "Licensing and Compliance",
    icon: ShieldCheck,
    items: [
      "Licensed general contractor in British Columbia",
      "Registered and in good standing with WorkSafeBC",
      "Insured for residential, commercial, strata, and insurance restoration work, with $5M general liability",
      "Bondable, including performance and labour and material payment bonds where a project requires them",
    ],
  },
  {
    title: "Warranty and Consumer Protection",
    icon: BadgeCheck,
    items: [
      "Lifetime workmanship warranty on our construction, with a named contact rather than a claims inbox",
      "Authorized to build and enroll new homes under BC's third-party home warranty insurance program",
      "Available for corrective and completion work under home warranty programs where an original builder cannot fulfill their obligations",
    ],
  },
  {
    title: "Insurance Restoration Standing",
    icon: FileCheck2,
    items: [
      "Claims-funded fire, water, and storm reconstruction has been part of our work since the company was founded",
      "Direct working coordination with insurance carriers and independent adjusting firms, including Coast Claims",
      "Detailed scopes, transparent documentation, and supplement handling that keeps claims clean",
      "Experienced in occupied and time-sensitive reconstruction, where the schedule matters as much as the build",
    ],
  },
  {
    title: "Where We Work",
    icon: MapPinned,
    items: [
      "Based in Richmond, serving clients across British Columbia",
      "Lower Mainland, Fraser Valley, and Vancouver Island projects run with the same crews standards, documentation, and oversight",
      "One standard, every project, regardless of postal code",
    ],
  },
];

function makeRevealVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
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

export function CredentialsSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const variants = makeRevealVariants(reducedMotion);

  return (
    <section className="bg-white px-4 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.div
            className="lg:sticky lg:top-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={0}
            variants={variants}
          >
            <p className="text-sm font-medium tracking-widest text-brand-navy uppercase">
              Professional Standing
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight text-neutral-900 md:text-4xl md:leading-tight">
              Licensed, Insured, and Built to Be Checked
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
              GP Contracting operates with the licensing, insurance, and
              documentation discipline that insurers, strata councils, property
              managers, and municipalities expect of the contractors they trust.
              Verify everything; we would.
            </p>
          </motion.div>
        </div>

        <ul className="divide-y divide-neutral-200 border-y border-neutral-200 lg:col-span-7">
          {GROUPS.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.li
                key={group.title}
                custom={index + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
                className="py-8 first:pt-8 last:pb-8"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-navy/10 text-brand-navy"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed text-neutral-600 md:text-[0.9375rem] md:leading-7"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
