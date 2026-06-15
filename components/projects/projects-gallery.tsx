import Image from "next/image";

import type { ProjectGalleryItem } from "@/lib/projects";

export type ProjectsGalleryProps = {
  items: ProjectGalleryItem[];
};

export function ProjectsGallery({ items }: ProjectsGalleryProps) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 md:px-8">
      {items.map((item) => (
        <figure
          key={item.src}
          className="group relative aspect-[4/3] overflow-hidden bg-neutral-200"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={
              item.objectPosition
                ? { objectPosition: item.objectPosition }
                : undefined
            }
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-4">
            <p className="text-sm font-medium tracking-wide text-white">
              {item.title}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
