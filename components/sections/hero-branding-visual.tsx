"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { heroOrbitNodes, heroPortrait } from "@/content/hero-visual";
import type { HeroOrbitNode } from "@/content/hero-visual";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

const ZONE_ACCENT: Record<HeroOrbitNode["zone"], string> = {
  frontend: "var(--accent)",
  backend: "var(--accent-secondary)",
  engineering: "color-mix(in srgb, var(--foreground) 70%, var(--accent) 30%)",
  delivery: "color-mix(in srgb, var(--accent-secondary) 80%, var(--accent) 20%)",
};

function NodeGlyph({ zone }: { zone: HeroOrbitNode["zone"] }) {
  const stroke = ZONE_ACCENT[zone];
  if (zone === "frontend") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0">
        <circle cx="7" cy="7" r="2.5" fill={stroke} opacity="0.9" />
        <ellipse cx="7" cy="7" rx="6" ry="2.5" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" />
        <ellipse cx="7" cy="7" rx="6" ry="2.5" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" transform="rotate(60 7 7)" />
        <ellipse cx="7" cy="7" rx="6" ry="2.5" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" transform="rotate(-60 7 7)" />
      </svg>
    );
  }
  if (zone === "backend") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0">
        <path d="M3 4h8v6H3z" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.85" />
        <path d="M5 7h4M5 9h2.5" stroke={stroke} strokeWidth="1" opacity="0.55" />
      </svg>
    );
  }
  if (zone === "engineering") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0">
        <path d="M2 11L7 2l5 9H2z" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.75" />
        <circle cx="7" cy="7.5" r="1.2" fill={stroke} opacity="0.9" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0">
      <path d="M2 10h4l1.5-4L9 10h3" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.85" />
      <circle cx="7" cy="4" r="1.5" fill={stroke} opacity="0.5" />
    </svg>
  );
}

function OrbitNode({
  node,
  reduced,
  parallaxX,
  parallaxY,
}: {
  node: HeroOrbitNode;
  reduced: boolean;
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  const shiftX = useTransform(parallaxX, (v) => v * node.depth * 28);
  const shiftY = useTransform(parallaxY, (v) => v * node.depth * 28);

  return (
    <motion.div
      className="pointer-events-none absolute z-[2] -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        x: reduced ? 0 : shiftX,
        y: reduced ? 0 : shiftY,
      }}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.15 + node.floatOffset * 0.06 }}
      aria-hidden
    >
      <motion.div
        className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-2.5 py-1.5 shadow-sm backdrop-blur-md"
        initial={reduced ? false : { scale: 0.92 }}
        animate={
          reduced
            ? { scale: 1 }
            : { scale: 1, y: [0, -5, 0, 4, 0] }
        }
        transition={
          reduced
            ? { duration: 0.4 }
            : {
                scale: { duration: 0.45, delay: 0.15 + node.floatOffset * 0.06 },
                y: {
                  duration: 7 + node.floatOffset,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.floatOffset * 0.5,
                },
              }
        }
      >
        <NodeGlyph zone={node.zone} />
        <span className="whitespace-nowrap text-[10px] font-medium tracking-wide text-foreground sm:text-[11px]">
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

function ConnectionLines({ reduced }: { reduced: boolean }) {
  const cx = 50;
  const cy = 50;
  const paths = heroOrbitNodes.map((node) => {
    const dx = cx - node.x;
    const dy = cy - node.y;
    const c1x = node.x + dx * 0.35;
    const c1y = node.y + dy * 0.1;
    const c2x = cx - dx * 0.15;
    const c2y = cy - dy * 0.35;
    return `M ${node.x} ${node.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${cx} ${cy}`;
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="hero-hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="22" fill="url(#hero-hub-glow)" />
      {!reduced ? (
        <>
          <ellipse
            cx={cx}
            cy={cy}
            rx="38"
            ry="38"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.08"
            strokeWidth="0.4"
            strokeDasharray="2 3"
          />
          <ellipse
            cx={cx}
            cy={cy}
            rx="46"
            ry="46"
            fill="none"
            stroke="var(--accent-secondary)"
            strokeOpacity="0.06"
            strokeWidth="0.35"
          />
        </>
      ) : null}
      {paths.map((d, i) => (
        <path
          key={heroOrbitNodes[i]?.id ?? i}
          d={d}
          fill="none"
          stroke="var(--border)"
          strokeWidth="0.35"
          strokeOpacity="0.65"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {paths.map((d, i) => (
        <motion.path
          key={`pulse-${heroOrbitNodes[i]?.id ?? i}`}
          d={d}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeOpacity={reduced ? 0.15 : 0.35}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1 1"
          initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 0.15 : 0 }}
          animate={{ pathLength: 1, opacity: reduced ? 0.15 : 0.35 }}
          transition={{
            pathLength: { duration: 1.2, delay: 0.2 + i * 0.04, ease: "easeOut" },
            opacity: { duration: 0.6, delay: 0.2 + i * 0.04 },
          }}
        />
      ))}
    </svg>
  );
}

export function HeroBrandingVisual() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [portraitFailed, setPortraitFailed] = useState(false);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springConfig = { stiffness: 120, damping: 22, mass: 0.4 };

  const parallaxX = useSpring(useTransform(pointerX, [0, 1], [-1, 1]), springConfig);
  const parallaxY = useSpring(useTransform(pointerY, [0, 1], [-1, 1]), springConfig);

  const portraitX = useTransform(parallaxX, (v) => v * 10);
  const portraitY = useTransform(parallaxY, (v) => v * 10);
  const ringScale = useTransform(parallaxX, (v) => 1 + Math.abs(v) * 0.015);

  const glowX = useTransform(pointerX, (v) => `${v * 100}%`);
  const glowY = useTransform(pointerY, (v) => `${v * 100}%`);
  const glowBackground = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, var(--hero-glow), transparent 65%)`;

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width);
      pointerY.set((e.clientY - rect.top) / rect.height);
    },
    [reduced, pointerX, pointerY],
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  return (
    <div
      ref={containerRef}
      className="hero-branding-canvas relative mx-auto aspect-square w-full max-w-[min(100%,28rem)] select-none lg:max-w-none"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-60"
        style={{ background: glowBackground }}
      />

      <ConnectionLines reduced={reduced} />

      {heroOrbitNodes.map((node) => (
        <OrbitNode
          key={node.id}
          node={node}
          reduced={reduced}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
        />
      ))}

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: reduced ? 0 : portraitX,
          y: reduced ? 0 : portraitY,
          scale: reduced ? 1 : ringScale,
        }}
      >
        <div className="relative">
          <div
            className={cn(
              "absolute -inset-3 rounded-full opacity-80 blur-2xl",
              "bg-gradient-to-br from-accent/25 via-accent-secondary/15 to-transparent",
            )}
          />
          <div className="relative rounded-full p-[3px] ring-1 ring-border/80 ring-offset-2 ring-offset-background shadow-[var(--shadow-elevated)]">
            <div className="relative h-[min(52vw,14rem)] w-[min(52vw,14rem)] overflow-hidden rounded-full sm:h-56 sm:w-56 lg:h-64 lg:w-64">
              {!portraitFailed ? (
                <Image
                  src={heroPortrait.src}
                  alt={heroPortrait.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 56vw, 256px"
                  className="object-cover object-center"
                  onError={() => setPortraitFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent-muted via-card to-accent-secondary-muted">
                  <span className="text-4xl font-semibold tracking-tight text-foreground/80 sm:text-5xl">
                    NG
                  </span>
                  <span className="mt-2 px-4 text-center text-[10px] text-muted">
                    Add portrait at public/portrait.jpg
                  </span>
                </div>
              )}
            </div>
          </div>
          <motion.div
            className="pointer-events-none absolute -inset-5 rounded-full border border-accent/20"
            animate={reduced ? undefined : { opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
