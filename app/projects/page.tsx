import type { Metadata } from "next";

import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { SitePageShell } from "@/components/site-page-shell";
import { recentProjectGallery } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Work | GP Contracting Group",
  description:
    "Recent projects across Greater Vancouver, Vancouver Island, and the Fraser Valley.",
};

export default function ProjectsPage() {
  return (
    <SitePageShell>
      <div className="bg-neutral-50 px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl tracking-tight text-neutral-900 md:text-5xl">
            Our Work
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg md:leading-8">
            Recent projects across Greater Vancouver, Vancouver Island, and the
            Fraser Valley.
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          <ProjectsGallery items={recentProjectGallery} />
        </div>
      </div>
    </SitePageShell>
  );
}
