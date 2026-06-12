import type { Metadata } from "next";

import { ProjectComingSoon } from "@/components/projects/project-coming-soon";

export const metadata: Metadata = {
  title: "Tenant Improvement Projects | GP Contracting Group",
  description:
    "Restaurant, fitness, and retail tenant improvement build-outs across Greater Vancouver.",
};

export default function TenantImprovementsProjectsPage() {
  return (
    <ProjectComingSoon
      title="Tenant Improvement Projects"
      description="Restaurant, fitness, and retail build-outs ready for business. Our tenant improvement gallery is on the way."
    />
  );
}
