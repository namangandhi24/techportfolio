"use client";

import { Suspense } from "react";
import { PortfolioRoot } from "@/components/portfolio/portfolio-root";
import { site } from "@/content/site";
import { heroMetrics } from "@/content/proof";

function PortfolioLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-[var(--background)] text-sm text-muted">
      Loading…
    </div>
  );
}

function HomeSeoFallback() {
  return (
    <div className="sr-only">
      <h1>
        {site.name} — {site.role}
      </h1>
      <p>{site.description}</p>
      <p>
        Portfolio mode: scroll through projects and experience. Workspace mode: explore career
        as an interactive developer workspace.
      </p>
      <ul>
        {heroMetrics.map((m) => (
          <li key={m.label}>
            {m.value} {m.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HomeSeoFallback />
      <Suspense fallback={<PortfolioLoader />}>
        <PortfolioRoot />
      </Suspense>
    </>
  );
}
