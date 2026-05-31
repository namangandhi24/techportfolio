/** Matches fixed header `h-16` in components/layout/header.tsx */
export const SITE_HEADER_HEIGHT_PX = 64;

/** Breathing room between fixed nav and section eyebrow */
export const SECTION_SCROLL_GAP_PX = 16;

export function getSectionScrollOffset(): number {
  return SITE_HEADER_HEIGHT_PX + SECTION_SCROLL_GAP_PX;
}

/** GSAP ScrollTrigger `start` offset aligned with header + gap */
export const JOURNEY_PIN_START_OFFSET = `${getSectionScrollOffset() / 16}rem`;

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, behavior });
}

export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
) {
  if (!sectionId || sectionId === "hero") {
    scrollToTop(behavior);
    return;
  }

  const target = resolveScrollTarget(sectionId);
  if (!target) return;

  const offset = getSectionScrollOffset();
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

/** Scroll to the in-section header anchor, not the padded section box edge */
export function resolveScrollTarget(sectionId: string): HTMLElement | null {
  const section = document.getElementById(sectionId);
  if (!section) return null;
  return (
    section.querySelector<HTMLElement>("[data-scroll-anchor]") ?? section
  );
}

export function scrollToHash(
  hash: string,
  behavior: ScrollBehavior = "smooth",
) {
  if (!hash || hash === "#") {
    scrollToTop(behavior);
    return;
  }
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const id = raw.split("?")[0] ?? "";
  if (raw.includes("?")) {
    window.history.replaceState(null, "", `#${raw}`);
  }
  scrollToSection(id, behavior);
}
