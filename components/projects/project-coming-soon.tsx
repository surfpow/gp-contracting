import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SitePageShell } from "@/components/site-page-shell";

type ProjectComingSoonProps = {
  title: string;
  description: string;
};

export function ProjectComingSoon({ title, description }: ProjectComingSoonProps) {
  return (
    <SitePageShell>
      <div className="flex flex-1 flex-col items-center justify-center bg-brand-dark px-4 py-24 text-center md:py-32">
        <p className="text-sm font-medium tracking-widest text-brand-navy-light uppercase">
          Projects
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-neutral-50 md:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg font-medium text-neutral-300">Coming Soon</p>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-500">
          {description}
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-neutral-300 transition-colors hover:text-brand-navy-light"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>
    </SitePageShell>
  );
}
