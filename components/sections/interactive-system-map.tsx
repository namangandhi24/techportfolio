"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemMapLayers } from "@/content/system-map";
import { Section } from "@/components/layout/section";
import { SectionReveal } from "@/components/motion/section-reveal";
import { SystemFlowRail } from "@/components/ui/system-flow-rail";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

const flowSteps = systemMapLayers.map((l) => ({
  id: l.id,
  label: l.label,
}));

export function InteractiveSystemMap() {
  const [activeIndex, setActiveIndex] = useState(1);
  const reduced = useReducedMotion();
  const active = systemMapLayers[activeIndex];

  return (
    <Section
      id="system-map"
      label="Full stack"
      title="How systems connect"
      description="Follow the request path—each stage reveals the technologies that power the layer."
    >
      <SectionReveal>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <SystemFlowRail
            steps={flowSteps}
            activeIndex={activeIndex}
            onStepChange={setActiveIndex}
          >
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -4 }}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <h3 className="text-lg font-semibold text-foreground">{active.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {active.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {active.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-accent/30 bg-accent-muted px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </SystemFlowRail>
        </div>
      </SectionReveal>
    </Section>
  );
}
