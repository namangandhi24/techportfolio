"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { heroPortrait } from "@/content/hero-visual";
import { StaticArtifactRing } from "@/components/hero/static-artifact-ring";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

const HeroPhysicsScene = dynamic(
  () =>
    import("@/components/hero/hero-physics-scene").then((m) => m.HeroPhysicsScene),
  { ssr: false },
);

function usePhysicsEligible() {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setEligible(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return eligible;
}

export function HeroBrandingVisual() {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const physicsEligible = usePhysicsEligible();
  const usePhysics = hydrated && !reduced && physicsEligible;
  const motionEnabled = hydrated && !reduced;
  const portraitMotion = motionEnabled && !usePhysics;

  const containerRef = useRef<HTMLDivElement>(null);
  const [portraitFailed, setPortraitFailed] = useState(false);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springConfig = { stiffness: 120, damping: 22, mass: 0.4 };

  const parallaxX = useSpring(useTransform(pointerX, [0, 1], [-1, 1]), springConfig);
  const parallaxY = useSpring(useTransform(pointerY, [0, 1], [-1, 1]), springConfig);

  const portraitX = useTransform(parallaxX, (v) => v * 10);
  const portraitY = useTransform(parallaxY, (v) => v * 10);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!motionEnabled) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width);
      pointerY.set((e.clientY - rect.top) / rect.height);
    },
    [motionEnabled, pointerX, pointerY],
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  const portraitContent = portraitFailed ? (
    <p className="text-center text-sm text-muted">Portrait unavailable</p>
  ) : (
    /* eslint-disable-next-line @next/next/no-img-element -- bypasses optimizer cache when portrait file is swapped */
    <img
      src={heroPortrait.src}
      alt={heroPortrait.alt}
      width={640}
      height={640}
      decoding="async"
      fetchPriority="high"
      className="hero-portrait h-auto max-h-[min(72vh,34rem)] w-auto max-w-[min(100%,20rem)] object-contain sm:max-w-[22rem] lg:max-w-[24rem]"
      onError={() => setPortraitFailed(true)}
    />
  );

  return (
    <div
      ref={containerRef}
      className="hero-visual relative mx-auto flex min-h-[min(52vw,22rem)] w-full max-w-[min(100%,24rem)] items-center justify-center select-none sm:min-h-[28rem] lg:max-w-none lg:min-h-[min(72vh,36rem)]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden
    >
      {portraitMotion ? (
        <motion.div
          className="relative z-[1] flex items-center justify-center"
          style={{ x: portraitX, y: portraitY }}
        >
          {portraitContent}
        </motion.div>
      ) : (
        <div className="relative z-[1] flex items-center justify-center">{portraitContent}</div>
      )}

      {usePhysics ? (
        <HeroPhysicsScene containerRef={containerRef} />
      ) : (
        <StaticArtifactRing />
      )}
    </div>
  );
}
