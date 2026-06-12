import type { Metadata } from "next";

import { ProjectComingSoon } from "@/components/projects/project-coming-soon";

export const metadata: Metadata = {
  title: "Residential Projects | GP Contracting Group",
  description:
    "Custom homes, renovations, and residential builds across Greater Vancouver.",
};

export default function ResidentialProjectsPage() {
  return (
    <ProjectComingSoon
      title="Residential Projects"
      description="Custom homes, renovations, and residential builds across Greater Vancouver. Our project gallery is on the way."
    />
  );
}
