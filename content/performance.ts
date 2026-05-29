export const performanceTargets = {
  headline: "Performance-first delivery",
  description:
    "Documented targets and architectural choices—not vanity metrics. Swap with real Lighthouse runs when ready.",
  metrics: [
    { label: "LCP target", value: "< 2.0s", detail: "Static shell + font subsetting" },
    { label: "CLS target", value: "< 0.05", detail: "Explicit dimensions, no layout shift" },
    { label: "INP target", value: "< 200ms", detail: "Client islands only where needed" },
    { label: "Initial JS", value: "< 120kb", detail: "gzip, excluding third-party embeds" },
  ],
  strategies: [
    "Static generation for marketing routes with RSC defaults",
    "next/font for zero-FOIT typography",
    "Lazy calendar embed on user intent",
    "prefers-reduced-motion honored globally",
    "Content-driven architecture—no runtime CMS in v1",
  ],
} as const;
