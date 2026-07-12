"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type TransitionContextValue = {
  startTransition: (href: string) => void;
  isLogoHidden: boolean;
};

const TransitionContext = createContext<TransitionContextValue | undefined>(
  undefined,
);

export const usePageTransition = (): TransitionContextValue => {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within TransitionProvider");
  }
  return ctx;
};

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isLogoHidden, setIsLogoHidden] = useState(false);

  const startTransition = useCallback(
    (href: string) => {
      if (overlayVisible) return;

      setIsLogoHidden(true);
      setOverlayVisible(true);

      const sweepDuration = 600;
      const logoFadeDuration = 300;

      window.setTimeout(() => {
        router.push(href);
      }, Math.max(sweepDuration, logoFadeDuration));

      window.setTimeout(() => {
        setOverlayVisible(false);
        setIsLogoHidden(false);
      }, sweepDuration * 2);
    },
    [overlayVisible, router],
  );

  return (
    <TransitionContext.Provider value={{ startTransition, isLogoHidden }}>
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            key="page-transition-overlay"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black"
          />
        )}
      </AnimatePresence>

      {children}
    </TransitionContext.Provider>
  );
}
