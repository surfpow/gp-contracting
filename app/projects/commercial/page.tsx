import type { Metadata } from "next";

import { ProjectComingSoon } from "@/components/projects/project-coming-soon";

export const metadata: Metadata = {
  title: "Commercial Projects | GP Contracting Group",
  description:
    "Offices, retail, and industrial commercial construction across Greater Vancouver.",
};

export default function CommercialProjectsPage() {
  return (
    <ProjectComingSoon
      title="Commercial Projects"
      description="Offices, retail, and industrial spaces delivered on schedule. Our commercial portfolio is coming soon."
    />
  );
}
