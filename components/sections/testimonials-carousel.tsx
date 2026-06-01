"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/content/testimonials";
import { GlowCard } from "@/components/ui/glow-card";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

export function TestimonialsCarousel() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    const len = testimonials.length;
    setIndex(((next % len) + len) % len);
  }, []);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reduced || paused || !visible) return;
    const id = window.setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, visible, index, goTo]);

  const current = testimonials[index]!;

  return (
    <div
      ref={rootRef}
      className="relative min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative mx-auto min-h-[12rem] w-full min-w-0 max-w-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowCard className="w-full min-w-0 p-6 sm:p-8">
              <blockquote>
                <p className="text-sm leading-relaxed text-foreground sm:text-base">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="mt-4 border-t border-border pt-4">
                  <cite className="not-italic">
                    <span className="text-sm font-medium text-foreground">
                      {current.author}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {current.role} · {current.company}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </GlowCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="engineering-pill h-9 w-9 cursor-pointer px-0"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="engineering-pill h-9 w-9 cursor-pointer px-0"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        <div className="flex gap-1.5" role="tablist" aria-label="Testimonial">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${t.author}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-accent" : "w-2 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
