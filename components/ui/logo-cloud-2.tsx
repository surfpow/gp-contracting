"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  imgClassName?: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  /** When provided, renders these logos instead of the default partner grid. */
  logos?: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  if (logos && logos.length > 0) {
    return (
      <div
        className={cn(
          "relative grid border-x",
          logos.length === 1
            ? "grid-cols-1"
            : logos.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-2 md:grid-cols-4",
          className,
        )}
        {...props}
      >
        <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />
        {logos.map((logo, index) => {
          const isLast = index === logos.length - 1;
          return (
            <LogoCard
              key={logo.src + logo.alt}
              className={cn(
                "group",
                !isLast && logos.length === 2 && "border-b sm:border-b-0 sm:border-r",
                logos.length > 2 && index % 2 === 0 && "border-r",
                logos.length > 2 && !isLast && "border-b md:border-b-0",
                index % 2 === 0 && "bg-secondary/40 dark:bg-secondary/30",
              )}
              logo={logo}
              allowPlaceholder
            />
          );
        })}
        <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-4",
        className,
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      <LogoCard
        className="relative border-r border-b bg-secondary dark:bg-secondary/30"
        logo={{
          src: "/logo-marbleslab.png",
          alt: "Marble Slab Creamery Logo",
          imgClassName:
            "h-4 w-auto origin-center scale-[1.85] md:h-5 md:scale-[1.85]",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b md:border-r"
        logo={{
          src: "/logo-dominos.png",
          alt: "Domino's Pizza Logo",
          imgClassName:
            "h-4 w-auto origin-center scale-[1.5] md:h-5 md:scale-[1.5]",
        }}
      />

      <LogoCard
        className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
        logo={{
          src: "/logo-td.png",
          alt: "TD Canada Trust Logo",
          imgClassName: "h-4 w-auto origin-center scale-[2] md:h-5 md:scale-[2]",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={{
          src: "/logo-evas.png",
          alt: "Eva's Original Logo",
          imgClassName:
            "h-4 w-auto origin-center scale-[3.5] md:h-5 md:scale-[3.5]",
        }}
      />

      <LogoCard
        className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={{
          src: "/logo-barburrito.png",
          alt: "BarBurrito Logo",
          imgClassName:
            "h-4 w-auto origin-center scale-[1.5] md:h-5 md:scale-[1.5]",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
        logo={{
          src: "/logo-crazyzhang.png",
          alt: "Crazy Zhang Fusion Tea & BBQ Logo",
          imgClassName:
            "h-4 w-auto origin-center scale-[4.25] md:h-5 md:scale-[4.25]",
        }}
      />

      <LogoCard
        className="border-r"
        logo={{
          src: "/logo-uppal.png",
          alt: "Uppal Building Supplies Logo",
          imgClassName:
            "h-5 w-auto origin-center scale-[1.35] md:h-6 md:scale-[1.35]",
        }}
      />

      <LogoCard
        className="bg-secondary dark:bg-secondary/30"
        logo={{
          src: "/logo-countrylumber.png",
          alt: "Country Lumber Logo",
          imgClassName:
            "h-6 w-auto origin-center scale-[1.65] md:h-7 md:scale-[1.65]",
        }}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
  allowPlaceholder?: boolean;
};

function LogoCard({
  logo,
  className,
  children,
  allowPlaceholder = false,
  ...props
}: LogoCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className,
      )}
      {...props}
    >
      {allowPlaceholder && failed ? (
        <div
          className="flex h-14 w-full max-w-[200px] items-center justify-center rounded-sm border border-dashed border-neutral-300 bg-neutral-100 px-3 text-center text-xs font-medium tracking-wide text-neutral-500 uppercase md:h-16"
          role="img"
          aria-label={`${logo.alt} logo pending`}
        >
          {logo.alt}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- partner marks use fixed heights and grayscale hover; next/image adds little here
        <img
          alt={logo.alt}
          className={cn(
            "pointer-events-none select-none",
            logo.imgClassName ?? "h-4 md:h-5 dark:brightness-0 dark:invert",
          )}
          height={logo.height || "auto"}
          src={logo.src}
          width={logo.width || "auto"}
          onError={allowPlaceholder ? () => setFailed(true) : undefined}
        />
      )}
      {children}
    </div>
  );
}
