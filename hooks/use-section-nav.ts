"use client";

import { useEffect } from "react";
import { scrollToHash } from "@/lib/scroll";

/** Smooth in-page navigation with correct header offset (replaces native hash jump). */
export function useSectionNav() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const sectionId = href === "#" ? "hero" : href.slice(1).split("?")[0] ?? "";
      if (href.startsWith("#") && href.length > 1 && sectionId !== "hero" && !document.getElementById(sectionId)) {
        return;
      }

      event.preventDefault();
      scrollToHash(href, event.metaKey || event.ctrlKey ? "auto" : "smooth");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
