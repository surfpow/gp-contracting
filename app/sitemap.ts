import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/service-schema";
import { getAllServiceRoutes } from "@/lib/services-content";

/**
 * Project + home routes that exist outside the services tree. Service routes
 * are sourced from `getAllServiceRoutes()` so the sitemap stays in sync as the
 * pillar-and-spoke structure changes.
 */
const projectRoutes = [
  "/",
  "/about",
  "/projects/residential",
  "/projects/commercial",
  "/projects/tenant-improvements",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries = [...projectRoutes, ...getAllServiceRoutes()];

  return entries.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.7,
  }));
}
