"use client";

import { useEffect, useState } from "react";
import { getSectionScrollOffset } from "@/lib/scroll";

const HERO_ID = "hero";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? HERO_ID);

  useEffect(() => {
    const ids = sectionIds.includes(HERO_ID)
      ? sectionIds
      : [HERO_ID, ...sectionIds];

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const headerOffset = getSectionScrollOffset();
    const heroEl = document.getElementById(HERO_ID);

    const pickActive = () => {
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        if (heroBottom > headerOffset + 24) {
          setActiveId(HERO_ID);
          return;
        }
      }

      const anchor = window.scrollY + headerOffset + 1;
      let current = ids[0] ?? HERO_ID;

      for (const el of elements) {
        if (el.offsetTop <= anchor) {
          current = el.id;
        }
      }

      setActiveId(current);
    };

    const observer = new IntersectionObserver(
      () => pickActive(),
      {
        rootMargin: `-${headerOffset}px 0px -50% 0px`,
        threshold: [0, 0.12, 0.3, 0.5, 0.7, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, [sectionIds]);

  return activeId;
}
