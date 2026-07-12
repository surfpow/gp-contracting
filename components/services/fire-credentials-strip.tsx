"use client";

import Link from "next/link";

import { CredentialsStrip } from "@/components/services/credentials-strip";

export type FireCredentialsStripProps = {
  items: string[];
  overviewHref: string;
  overviewLinkLabel: string;
};

export function FireCredentialsStrip({
  items,
  overviewHref,
  overviewLinkLabel,
}: FireCredentialsStripProps) {
  return (
    <CredentialsStrip
      items={items}
      footer={
        <p>
          Part of our{" "}
          <Link
            href={overviewHref}
            className="font-medium text-brand-navy underline-offset-4 transition-colors duration-[var(--duration-press)] [transition-timing-function:var(--ease-out)] hover:text-brand-dark hover:underline"
          >
            {overviewLinkLabel}
          </Link>{" "}
          practice.
        </p>
      }
    />
  );
}
