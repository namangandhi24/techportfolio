"use client";

import { useState } from "react";
import { systemDesignLayers } from "@/content/system-design";
import { SystemFlowRail } from "@/components/ui/system-flow-rail";

const flowSteps = systemDesignLayers.map((l) => ({
  id: l.id,
  label: l.shortLabel,
}));

export function ApiFlowSimulator() {
  const [step, setStep] = useState(0);
  const layer = systemDesignLayers[step];

  return (
    <div>
      <SystemFlowRail
        steps={flowSteps}
        activeIndex={step}
        onStepChange={setStep}
      >
        {layer ? (
          <div>
            <h3 className="text-lg font-semibold text-foreground">{layer.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {layer.responsibility}
            </p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setStep((s) => (s + 1) % systemDesignLayers.length)}
          className="mt-6 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent/30 hover:bg-background"
        >
          Next step
        </button>
      </SystemFlowRail>
    </div>
  );
}
