import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ServiceImage } from "@/lib/services-content";

export type SectionPhotoBackdropProps = {
  image: ServiceImage;
  /**
   * Human-readable scene description for swap comments / future aria.
   * Decorative backgrounds use empty alt; keep the description in the
   * calling site's code comment so placeholders are easy to find.
   */
  priority?: boolean;
  className?: string;
  /**
   * `left` weights the scrim toward the text column (default).
   * `full` keeps a heavier overall wash for shorter copy blocks.
   */
  scrim?: "left" | "full";
};

/**
 * Full-bleed photographic section background with a dark gradient scrim so
 * light typography stays AA-readable. Decorative (alt=""); pair with a
 * `// PLACEHOLDER:` comment at the call site naming the file to swap.
 */
export function SectionPhotoBackdrop({
  image,
  priority = false,
  className,
  scrim = "left",
}: SectionPhotoBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <Image
        src={image.src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center"
      />
      {scrim === "left" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/92 via-brand-dark/72 to-brand-dark/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-brand-dark/55" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-brand-dark/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/55 to-brand-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/40" />
        </>
      )}
    </div>
  );
}
