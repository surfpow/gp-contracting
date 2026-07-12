"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashTarget() {
  const { hash } = window.location;
  if (!hash || hash.length < 2) return false;

  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/**
 * Ensures in-page hash targets (e.g. /about#warranty) land correctly after
 * Next.js client navigations and late layout (images, map, motion).
 */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      scrollToHashTarget();
    };

    run();
    const t1 = window.setTimeout(run, 100);
    const t2 = window.setTimeout(run, 450);
    const t3 = window.setTimeout(run, 900);

    const onHashChange = () => {
      run();
      window.setTimeout(run, 100);
      window.setTimeout(run, 400);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return null;
}
