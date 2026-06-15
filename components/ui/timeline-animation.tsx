"use client";

import {
  motion,
  useInView,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type RefObject,
} from "react";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

type ViewportOptions = {
  amount?: number;
  margin?: `${number}px ${number}px ${number}px ${number}px`;
  once?: boolean;
};

type TimelineContentProps<T extends ElementType> = {
  as?: T;
  animationNum?: number;
  timelineRef?: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  viewport?: ViewportOptions;
  delay?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

function getMotionComponent(tag: ElementType) {
  if (typeof tag === "string" && tag in motion) {
    return motion[tag as keyof typeof motion] as typeof motion.div;
  }

  return motion.div;
}

export function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum = 0,
  timelineRef,
  customVariants,
  viewport = { amount: 0.3, margin: "0px 0px -120px 0px", once: true },
  className,
  children,
  ...props
}: TimelineContentProps<T>) {
  const MotionComponent = getMotionComponent(as ?? "div");
  const isInView = useInView(timelineRef ?? { current: null }, {
    once: viewport.once ?? true,
    amount: viewport.amount ?? 0.3,
    margin: viewport.margin,
  });

  const variants = customVariants ?? defaultVariants;

  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...(props as HTMLMotionProps<"div">)}
    >
      {children}
    </MotionComponent>
  );
}

export const TimelineAnimation = TimelineContent;
