"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { journeyStages } from "@/content/journey";
import { JourneyEditorialRail } from "@/components/journey/journey-editorial-rail";
import { JourneyGrowingStack } from "@/components/journey/journey-growing-stack";
import { cn } from "@/lib/utils";

export function JourneyCarousel() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(journeyStages.length - 1, next));
    setIndex(clamped);
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.children[clamped] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollLeft, offsetWidth } = el;
      const i = Math.round(scrollLeft / offsetWidth);
      if (i !== index && i >= 0 && i < journeyStages.length) {
        setIndex(i);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [index]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
        aria-label="Engineering journey chapters"
      >
        {journeyStages.map((stage, stageIndex) => (
          <article
            key={stage.id}
            className="flex min-h-[min(70vh,42rem)] w-full shrink-0 snap-center flex-col justify-center gap-8 px-0.5"
            aria-roledescription="slide"
            aria-label={`Chapter ${stage.chapter}: ${stage.title}`}
          >
            <JourneyEditorialRail stage={stage} stageIndex={stageIndex} />
            <JourneyGrowingStack
              stage={stage}
              stageIndex={stageIndex}
              stageProgress={1}
              compact
            />
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="engineering-pill h-9 w-9 px-0 disabled:opacity-40"
            aria-label="Previous chapter"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === journeyStages.length - 1}
            className="engineering-pill h-9 w-9 px-0 disabled:opacity-40"
            aria-label="Next chapter"
          >
            →
          </button>
        </div>

        <div className="flex gap-1.5" role="tablist" aria-label="Chapter">
          {journeyStages.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Chapter ${s.chapter}`}
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
