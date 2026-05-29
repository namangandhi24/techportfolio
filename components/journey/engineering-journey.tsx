"use client";

import { useEffect, useRef, useState } from "react";
import {
  journeyIntro,
  journeyStages,
  JOURNEY_STAGE_COUNT,
  JOURNEY_STAGE_SCROLL_VH,
} from "@/content/journey";
import { Section } from "@/components/layout/section";
import { JourneyEditorialRail } from "@/components/journey/journey-editorial-rail";
import { JourneyGrowingStack } from "@/components/journey/journey-growing-stack";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function EngineeringJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const reduced = useReducedMotion();

  const stage = journeyStages[activeIndex] ?? journeyStages[0]!;

  useEffect(() => {
    if (reduced) {
      return;
    }
    registerGsap();
    const el = trackRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const raw = p * JOURNEY_STAGE_COUNT;
          const index = Math.min(JOURNEY_STAGE_COUNT - 1, Math.floor(raw));
          setActiveIndex(index);
          setStageProgress(raw - index);
        },
      });
    }, trackRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <Section
      id="journey"
      label="Career"
      title="Engineering journey"
      description={journeyIntro}
      className="journey-section !pb-8 overflow-x-hidden"
    >
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        <span className="font-medium text-foreground">2017–2021</span> — engineering
        school.{" "}
        <span className="font-medium text-foreground">From 2021</span> — professional
        delivery at Accenture. Scroll to see how scope expanded.
      </p>

      <a
        href="#system-map"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        Skip journey →
      </a>

      {reduced ? (
        <div className="space-y-16">
          {journeyStages.map((s, index) => (
            <div
              key={s.id}
              className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center"
            >
              <JourneyEditorialRail stage={s} stageIndex={index} />
              <JourneyGrowingStack stage={s} stageIndex={index} stageProgress={1} />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          className="journey-scroll-track relative"
          style={{
            height: `${JOURNEY_STAGE_COUNT * JOURNEY_STAGE_SCROLL_VH}vh`,
          }}
        >
          <div className="sticky top-20 z-[1] flex min-h-[min(74vh,680px)] items-center py-8 lg:top-24">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:items-center">
              <JourneyEditorialRail stage={stage} stageIndex={activeIndex} />
              <JourneyGrowingStack
                stage={stage}
                stageIndex={activeIndex}
                stageProgress={stageProgress}
              />
            </div>
          </div>
        </div>
      )}

      <ol className="sr-only mt-8">
        {journeyStages.map((s) => (
          <li key={s.id}>
            {s.title} ({s.period}): {s.descriptor} — {s.nodes.map((n) => n.label).join(" → ")}
          </li>
        ))}
      </ol>
    </Section>
  );
}
