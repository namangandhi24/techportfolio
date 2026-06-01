"use client";

import { motion } from "framer-motion";
import { SystemFlowIcon } from "@/components/ui/system-flow-icons";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

export type FlowStep = {
  id: string;
  label: string;
  shortLabel?: string;
};

type SystemFlowRailProps = {
  steps: FlowStep[];
  activeIndex: number;
  onStepChange: (index: number) => void;
  children?: React.ReactNode;
};

function stepLabel(step: FlowStep, compact: boolean) {
  return compact && step.shortLabel ? step.shortLabel : step.label;
}

export function SystemFlowRail({
  steps,
  activeIndex,
  onStepChange,
  children,
}: SystemFlowRailProps) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const motionReady = hydrated && !reduced;
  const count = steps.length;
  const lastIndex = count - 1;
  const progress = lastIndex > 0 ? (activeIndex / lastIndex) * 100 : 0;
  const isComplete = activeIndex >= lastIndex;

  const tabClass = (index: number) =>
    cn(
      "engineering-pill min-h-[2.75rem] shrink-0 snap-start sm:min-h-9",
      "md:min-w-0 md:shrink",
      index === activeIndex
        ? "border-accent/50 bg-accent text-accent-foreground shadow-[0_0_20px_-8px_var(--glow-strong)]"
        : index < activeIndex
          ? "border-accent/25 bg-card text-foreground"
          : "border-border bg-background text-muted hover:border-accent/30",
    );

  return (
    <div>
      {/* Mobile / tablet: horizontal scroll */}
      <div
        className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 snap-x snap-mandatory md:hidden"
        role="tablist"
        aria-label="System flow stages"
      >
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            onMouseEnter={() => onStepChange(index)}
            onFocus={() => onStepChange(index)}
            onClick={() => onStepChange(index)}
            className={cn(tabClass(index), "w-[4.75rem] max-w-[5.25rem] cursor-pointer")}
          >
            <span className="line-clamp-2 w-full">{stepLabel(step, true)}</span>
          </button>
        ))}
      </div>

      {/* Desktop: equal grid */}
      <div
        className="hidden gap-2 md:grid"
        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        role="tablist"
        aria-label="System flow stages"
      >
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            onMouseEnter={() => onStepChange(index)}
            onFocus={() => onStepChange(index)}
            onClick={() => onStepChange(index)}
            className={cn(tabClass(index), "cursor-pointer")}
          >
            <span className="truncate">{step.label}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-8 px-0" aria-hidden>
        <div
          className="absolute top-5 h-0.5 rounded-full bg-border"
          style={{
            left: `${100 / count / 2}%`,
            right: `${100 / count / 2}%`,
          }}
        />

        <motion.div
          className="absolute top-5 h-0.5 origin-left rounded-full bg-accent"
          style={{ left: `${100 / count / 2}%` }}
          initial={false}
          animate={{
            width: `calc((100% - ${100 / count}%) * ${progress / 100})`,
          }}
          transition={
            reduced ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 32 }
          }
        />

        {isComplete ? (
          <motion.div
            className="absolute top-5 -translate-y-1/2"
            style={{
              left: `calc(${100 / count / 2}% + (100% - ${100 / count}%) * ${progress / 100} - 2px)`,
            }}
            initial={motionReady ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg width="10" height="12" viewBox="0 0 10 12" className="text-accent">
              <path d="M0 0 L10 6 L0 12 Z" fill="currentColor" />
            </svg>
          </motion.div>
        ) : null}

        <div
          className="relative grid gap-2"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {steps.map((step, index) => {
            const reached = index <= activeIndex;
            const current = index === activeIndex;
            return (
              <div key={step.id} className="flex justify-center">
                <div
                  className={cn(
                    "relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300",
                    current
                      ? "border-accent bg-accent text-accent-foreground shadow-[0_0_16px_-4px_var(--glow-strong)]"
                      : reached
                        ? "border-accent/40 bg-card text-accent"
                        : "border-border bg-background text-muted",
                  )}
                >
                  <SystemFlowIcon id={step.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}
