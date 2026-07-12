"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { usePageTransition } from "@/components/transition-provider";

type HoveredSide = "left" | "right" | null;

const LEFT_VIDEO_URL =
  "https://vfqcqhylftsunnhxqysq.supabase.co/storage/v1/object/public/puzzle-bucket/anmore-entry.MOV";
const RIGHT_VIDEO_URL =
  "https://vfqcqhylftsunnhxqysq.supabase.co/storage/v1/object/public/puzzle-bucket/td-entry.MOV";

export function DecisionSection() {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState<HoveredSide>(null);
  const { startTransition } = usePageTransition();

  const playVideo = useCallback(
    (ref: React.RefObject<HTMLVideoElement | null>) => {
      if (ref.current && ref.current.paused) {
        ref.current.play().catch(() => {});
      }
    },
    [],
  );

  const pauseVideo = useCallback(
    (ref: React.RefObject<HTMLVideoElement | null>) => {
      if (ref.current && !ref.current.paused) {
        ref.current.pause();
      }
    },
    [],
  );

  useEffect(() => {
    if (hovered === "left") {
      playVideo(leftVideoRef);
      pauseVideo(rightVideoRef);
    } else if (hovered === "right") {
      pauseVideo(leftVideoRef);
      playVideo(rightVideoRef);
    } else {
      playVideo(leftVideoRef);
      playVideo(rightVideoRef);
    }
  }, [hovered, playVideo, pauseVideo]);

  const getOpacity = (side: "left" | "right"): string => {
    if (hovered === null) return "opacity-70";
    if (hovered === side) return "opacity-100";
    return "opacity-[0.35]";
  };

  const getWidth = (side: "left" | "right"): string => {
    if (hovered === null) return "w-1/2";
    if (hovered === side) return "w-[65%]";
    return "w-[35%]";
  };

  return (
    <section
      className="relative flex h-[100vh] w-full min-h-screen overflow-hidden"
      onMouseLeave={() => setHovered(null)}
    >
      {/* LEFT — RESIDENTIAL */}
      <a
        href="/services/residential"
        className={`
          relative h-full min-w-0 cursor-pointer overflow-hidden group
          transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${getWidth("left")}
          ${getOpacity("left")}
        `}
        onMouseEnter={() => setHovered("left")}
        onClick={(e) => {
          e.preventDefault();
          startTransition("/services/residential");
        }}
      >
        <video
          ref={leftVideoRef}
          src={LEFT_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_55%,transparent_100%)]" />
        <div className="relative z-10 flex h-full min-w-0 flex-col items-center justify-center px-3 text-center text-white sm:px-5 md:px-8">
          <h2
            className="max-w-full px-1 font-serif text-2xl font-bold leading-tight sm:text-3xl md:px-0 md:text-5xl lg:text-6xl"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)",
            }}
          >
            Custom Luxury Homes
          </h2>
          <span className="mt-4 max-w-xs px-2 font-sans text-xs font-light leading-relaxed text-white/80 opacity-0 transition-opacity duration-700 ease-in-out group-hover:text-white group-hover:opacity-100 sm:max-w-sm sm:text-sm md:max-w-md">
            Explore residential services
          </span>
        </div>
      </a>

      {/* RIGHT — COMMERCIAL */}
      <a
        href="/services/tenant-improvements"
        className={`
          relative h-full min-w-0 cursor-pointer overflow-hidden group
          transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${getWidth("right")}
          ${getOpacity("right")}
        `}
        onMouseEnter={() => setHovered("right")}
        onClick={(e) => {
          e.preventDefault();
          startTransition("/services/tenant-improvements");
        }}
      >
        <video
          ref={rightVideoRef}
          src={RIGHT_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_55%,transparent_100%)]" />
        <div className="relative z-10 flex h-full min-w-0 flex-col items-center justify-center px-3 text-center text-white sm:px-5 md:px-8">
          <h2
            className="max-w-full px-1 font-serif text-2xl font-bold leading-tight sm:text-3xl md:px-0 md:text-5xl lg:text-6xl"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)",
            }}
          >
            Commercial Tenant Improvements
          </h2>
          <span className="mt-4 max-w-xs px-2 font-sans text-xs font-light leading-relaxed text-white/80 opacity-0 transition-opacity duration-700 ease-in-out group-hover:text-white group-hover:opacity-100 sm:max-w-sm sm:text-sm md:max-w-md">
            Explore commercial tenant improvement services
          </span>
        </div>
      </a>
    </section>
  );
}
