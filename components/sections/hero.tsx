"use client";

import { motion } from "framer-motion";
import { metrics, site, techBadges } from "@/content/site";
import { TechLogoLabel } from "@/components/ui/brand-logo";
import { HeroBrandingVisual } from "@/components/sections/hero-branding-visual";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommandPaletteHint } from "@/components/ui/command-palette";
import { MetricValue } from "@/components/ui/metric-value";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function Hero() {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const animate = hydrated && !reduced;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate box-border flex min-h-svh scroll-mt-0 flex-col justify-center overflow-hidden pt-16 pb-14 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0 grid-pattern hero-gradient" />

      <div className="container-wide relative z-[1] grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <motion.div
            key={animate ? "hero-in" : "hero-static"}
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge>{site.role}</Badge>
              <Badge className="border-accent-secondary/30 bg-accent-secondary-muted text-foreground">
                {site.availability}
              </Badge>
            </div>
            <h1
              id="hero-title"
              className="font-display text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
            >
              {site.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {site.subheadline}
            </p>
            {/* <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
              {techBadges.map((tech, i) => (
                <motion.li
                  key={tech}
                  className="engineering-pill engineering-pill--mono"
                  initial={animate ? { opacity: 0, y: 6 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: animate ? 0.2 + i * 0.04 : 0 }}
                >
                  <TechLogoLabel name={tech} logoClassName="h-3.5 w-3.5" />
                </motion.li>
              ))}
            </ul> */}

            <div className="mt-10 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <LinkButton href="#work" variant="primary" size="lg" className="w-full sm:w-auto">
                View projects
              </LinkButton>
              <LinkButton
                href={site.resumeUrl}
                variant="secondary"
                size="lg"
                target="_blank"
                className="w-full sm:w-auto"
              >
                Download resume
              </LinkButton>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={animate ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: animate ? 0.35 + i * 0.06 : 0,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <dt className="text-[10px] font-medium tracking-widest text-muted uppercase">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                    <MetricValue value={m.value} />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.div
          className="relative flex items-center justify-center lg:justify-end"
          key={animate ? "hero-visual-in" : "hero-visual-static"}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 26, delay: animate ? 0.12 : 0 }}
        >
          <HeroBrandingVisual />
        </motion.div>
      </div>
    </section>
  );
}
