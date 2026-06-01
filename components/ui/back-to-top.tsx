"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: reduced ? "auto" : "smooth",
        });
      }}
      className={cn(
        "fixed bottom-6 left-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted shadow-lg transition-all duration-200 hover:border-accent/40 hover:text-foreground hover:shadow-[0_0_24px_-8px_var(--glow-strong)]",
      )}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
