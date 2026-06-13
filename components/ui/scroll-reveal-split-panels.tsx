"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME =
  "relative aspect-[3/4] w-full min-h-[360px] shrink-0 overflow-hidden md:w-[40%] md:min-h-[520px]";

export function useScrollRevealSplitPanels(
  ref: RefObject<HTMLElement | null>,
) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const translateY = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return { shouldReduceMotion, opacity, clipPath, translateY };
}

export function useScrollRevealSplitRef() {
  return useRef<HTMLDivElement>(null);
}

type ScrollRevealContentPanelProps = {
  children: ReactNode;
  className?: string;
  shouldReduceMotion: boolean;
  translateY: MotionValue<number>;
};

export function ScrollRevealContentPanel({
  children,
  className,
  shouldReduceMotion,
  translateY,
}: ScrollRevealContentPanelProps) {
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y: translateY }} className={className}>
      {children}
    </motion.div>
  );
}

type ScrollRevealImagePanelProps = {
  children: ReactNode;
  className?: string;
  shouldReduceMotion: boolean;
  opacity: MotionValue<number>;
  clipPath: MotionValue<string>;
};

export function ScrollRevealImagePanel({
  children,
  className = SCROLL_REVEAL_IMAGE_PANEL_CLASSNAME,
  shouldReduceMotion,
  opacity,
  clipPath,
}: ScrollRevealImagePanelProps) {
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{
        opacity,
        clipPath,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
