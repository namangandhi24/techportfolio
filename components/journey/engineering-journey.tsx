"use client";

import { useEffect, useRef, useState } from "react";
import {
  journeyIntro,
  journeyStages,
  JOURNEY_STAGE_COUNT,
} from "@/content/journey";
import { Section } from "@/components/layout/section";
import { JourneyEditorialRail } from "@/components/journey/journey-editorial-rail";
import { JourneyCarousel } from "@/components/journey/journey-carousel";
import { JourneyGrowingStack } from "@/components/journey/journey-growing-stack";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { JOURNEY_PIN_START_OFFSET } from "@/lib/scroll";

const JOURNEY_SCROLL_CLASS = "journey-scrolling";

function setJourneyScrollChrome(active: boolean) {
  document.documentElement.classList.toggle(JOURNEY_SCROLL_CLASS, active);
}

export function EngineeringJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const hydrated = useHydrated();
  const [usePinnedScroll, setUsePinnedScroll] = useState(false);
  const reduced = useReducedMotion();
  const stage = journeyStages[activeIndex] ?? journeyStages[0]!;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setUsePinnedScroll(hydrated && mq.matches && !reduced);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [hydrated, reduced]);

  useEffect(() => {
    if (!usePinnedScroll) {
      setJourneyScrollChrome(false);
      return;
    }

    registerGsap();
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const ctx = gsap.context(() => {
      const scrollDistance = () =>
        window.innerHeight * Math.max(1, JOURNEY_STAGE_COUNT - 0.25);

      ScrollTrigger.create({
        trigger: track,
        start: `top top+=${JOURNEY_PIN_START_OFFSET}`,
        end: () => `+=${scrollDistance()}`,
        pin,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * JOURNEY_STAGE_COUNT;
          const index = Math.min(JOURNEY_STAGE_COUNT - 1, Math.floor(raw));
          setActiveIndex(index);
          setStageProgress(raw - index);
        },
        onEnter: () => setJourneyScrollChrome(true),
        onEnterBack: () => setJourneyScrollChrome(true),
        onLeave: () => setJourneyScrollChrome(false),
        onLeaveBack: () => setJourneyScrollChrome(false),
      });
    }, track);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      setJourneyScrollChrome(false);
      ctx.revert();
    };
  }, [usePinnedScroll]);

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
        delivery at Accenture.{" "}
        {usePinnedScroll ? (
          <span className="text-muted">Scroll to advance through each chapter.</span>
        ) : (
          <span className="text-muted">Swipe through chapters.</span>
        )}
      </p>

      <a
        href="#system-map"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        Skip journey →
      </a>

      {!hydrated || !usePinnedScroll ? (
        <JourneyCarousel />
      ) : (
        <div ref={trackRef} className="journey-scroll-track relative">
          <div
            ref={pinRef}
            className="journey-pin-panel relative flex min-h-[min(100svh,820px)] w-full items-center py-10 lg:py-12"
          >
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
            {s.title} ({s.period}): {s.descriptor} —{" "}
            {s.nodes.map((n) => n.label).join(" → ")}
          </li>
        ))}
      </ol>
    </Section>
  );
}
