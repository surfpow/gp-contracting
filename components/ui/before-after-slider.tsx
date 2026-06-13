"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ServiceBeforeAfterImage } from "@/lib/services-content";

type BeforeAfterSliderProps = {
  images: ServiceBeforeAfterImage;
};

const LABEL_FADE_RANGE = 12;

function labelOpacity(position: number, side: "before" | "after") {
  if (side === "before") {
    return position <= 0 ? 0 : Math.min(1, position / LABEL_FADE_RANGE);
  }

  return position >= 100 ? 0 : Math.min(1, (100 - position) / LABEL_FADE_RANGE);
}

export function BeforeAfterSlider({ images }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [position, setPosition] = useState(50);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDraggingRef.current) return;
      updatePosition(event.clientX);
    },
    [updatePosition],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isDraggingRef.current) return;
      event.preventDefault();
      updatePosition(event.touches[0]?.clientX ?? 0);
    },
    [updatePosition],
  );

  const stopDragging = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const startDragging = useCallback(
    (clientX: number) => {
      isDraggingRef.current = true;
      updatePosition(clientX);
    },
    [updatePosition],
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [handleMouseMove, handleTouchMove, stopDragging]);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    startDragging(event.clientX);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    startDragging(event.touches[0]?.clientX ?? 0);
  };

  const beforeLabelOpacity = labelOpacity(position, "before");
  const afterLabelOpacity = labelOpacity(position, "after");

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full select-none overflow-hidden"
    >
      <Image
        src={images.after.src}
        alt={images.after.alt}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover"
        draggable={false}
        priority
      />

      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <Image
          src={images.before.src}
          alt={images.before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
          draggable={false}
          priority
        />
      </div>

      <span
        className="pointer-events-none absolute top-4 left-4 z-20 rounded-sm bg-black/55 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase transition-opacity duration-200"
        style={{ opacity: beforeLabelOpacity }}
        aria-hidden={beforeLabelOpacity === 0}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute top-4 right-4 z-20 rounded-sm bg-black/55 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase transition-opacity duration-200"
        style={{ opacity: afterLabelOpacity }}
        aria-hidden={afterLabelOpacity === 0}
      >
        After
      </span>

      <div
        className="absolute inset-y-0 z-30 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      />

      <button
        type="button"
        className="absolute top-1/2 z-40 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center gap-0.5 rounded-full border-2 border-white bg-brand-navy text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 active:scale-95"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        aria-label="Drag to compare before and after images"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        role="slider"
      >
        <span aria-hidden="true">‹</span>
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
