"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import type { ProjectGalleryItem } from "@/lib/projects";
import { cn } from "@/lib/utils";

export type ProjectsGalleryProps = {
  items: ProjectGalleryItem[];
};

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER_STEP_S = 0.04;
const MAX_STAGGER_DELAY_S = 0.48;
const PRIORITY_IMAGE_COUNT = 6;

function getStaggerDelay(index: number, reduced: boolean) {
  if (reduced) return 0;
  return Math.min(index * STAGGER_STEP_S, MAX_STAGGER_DELAY_S);
}

function makeRevealVariants(reduced: boolean): Variants {
  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.5, ease: EASE };

  return {
    hidden: { opacity: 0, y: 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...transition,
        delay: getStaggerDelay(index, reduced),
      },
    }),
  };
}

type GalleryLightboxProps = {
  items: ProjectGalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const item = items[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && hasPrev) {
        onNavigate(activeIndex - 1);
      }
      if (event.key === "ArrowRight" && hasNext) {
        onNavigate(activeIndex + 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, hasNext, hasPrev, onClose, onNavigate]);

  if (!item) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — project photo`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4 px-1">
          <p className="text-sm font-medium tracking-wide text-white/90">
            {item.title}
            <span className="ml-2 text-white/50">
              {activeIndex + 1} / {items.length}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-sm bg-neutral-900 shadow-2xl">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="(max-width: 768px) 100vw, 80vw"
            className="mx-auto h-auto max-h-[calc(90vh-4rem)] w-auto max-w-full"
            priority
          />
        </div>
      </motion.div>

      {hasPrev && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate(activeIndex - 1);
          }}
          className="absolute top-1/2 left-2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate(activeIndex + 1);
          }}
          className="absolute top-1/2 right-2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          aria-label="Next image"
        >
          <ChevronRight className="size-6" />
        </button>
      )}
    </motion.div>
  );
}

export function ProjectsGallery({ items }: ProjectsGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.08,
    margin: "0px 0px -80px 0px",
  });
  const revealVariants = useMemo(
    () => makeRevealVariants(shouldReduceMotion),
    [shouldReduceMotion],
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const onGridKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    },
    [openLightbox],
  );

  return (
    <>
      <div
        ref={containerRef}
        className="mx-auto max-w-7xl columns-1 gap-4 px-4 sm:columns-2 md:px-8 lg:columns-3 lg:gap-6 xl:columns-4"
      >
        {items.map((item, index) => (
          <motion.figure
            key={item.src}
            custom={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={revealVariants}
            className="mb-4 break-inside-avoid lg:mb-6"
          >
            <button
              type="button"
              onClick={() => openLightbox(index)}
              onKeyDown={(event) => onGridKeyDown(event, index)}
              className={cn(
                "group block w-full cursor-pointer overflow-hidden rounded-sm bg-neutral-200 text-left",
                "transition duration-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy",
              )}
              aria-label={`View ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                priority={index < PRIORITY_IMAGE_COUNT}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            items={items}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
