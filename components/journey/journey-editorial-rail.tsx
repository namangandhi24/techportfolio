"use client";

import { AnimatePresence, motion } from "framer-motion";
import { journeyStages, type JourneyStage } from "@/content/journey";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function JourneyEditorialRail({
  stage,
  stageIndex,
}: {
  stage: JourneyStage;
  stageIndex: number;
}) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const motionReady = hydrated && !reduced;

  return (
    <div className="flex flex-col justify-center lg:min-h-[380px]">
      <div className="mb-6 flex gap-1.5" aria-hidden>
        {journeyStages.map((_, i) => (
          <span
            key={journeyStages[i]?.id ?? i}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              i <= stageIndex ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={motionReady ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-accent/25 bg-accent-muted px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-accent uppercase">
              Chapter {stage.chapter}
            </span>
            <p className="text-sm font-medium tracking-wide text-muted">{stage.period}</p>
          </div>

          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
            {stage.title}
          </h3>

          {stage.subtitle ? (
            <p className="mt-2 text-sm font-medium text-foreground/80">{stage.subtitle}</p>
          ) : null}

          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{stage.descriptor}</p>

          <p className="mt-5 max-w-md rounded-xl border border-border/80 bg-card/60 px-4 py-3 text-sm leading-relaxed text-foreground/90">
            <span className="font-medium text-accent">Why it matters · </span>
            {stage.recruiterNote}
          </p>
        </motion.div>
      </AnimatePresence>

      <nav
        className="mt-10 hidden border-t border-border pt-6 lg:block"
        aria-label="Journey chapters"
      >
        <ol className="relative space-y-0">
          <span
            className="absolute top-2 bottom-2 left-[5px] w-px bg-border"
            aria-hidden
          />
          {journeyStages.map((s, i) => {
            const state =
              i < stageIndex ? "past" : i === stageIndex ? "active" : "upcoming";
            return (
              <li key={s.id} className="relative flex gap-3 pb-4 last:pb-0">
                <span
                  className={`relative z-[1] mt-1.5 size-2.5 shrink-0 rounded-full border-2 transition-colors duration-300 ${
                    state === "active"
                      ? "border-accent bg-accent shadow-[0_0_0_4px_var(--accent-muted)]"
                      : state === "past"
                        ? "border-accent/60 bg-accent/40"
                        : "border-border bg-background"
                  }`}
                  aria-hidden
                />
                <div className="min-w-0 pt-0.5">
                  <p
                    className={`text-xs font-medium transition-colors duration-300 ${
                      state === "active"
                        ? "text-foreground"
                        : state === "past"
                          ? "text-muted-foreground"
                          : "text-muted/45"
                    }`}
                  >
                    {s.arcLabel}
                    <span className="ml-1.5 font-normal text-muted-foreground/80">
                      {s.period}
                    </span>
                  </p>
                  {state === "active" ? (
                    <p className="mt-0.5 truncate text-[10px] text-muted">{s.title}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
