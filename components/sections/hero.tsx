"use client";

import { motion } from "framer-motion";
import { metrics, site, techBadges } from "@/content/site";
import { HeroBrandingVisual } from "@/components/sections/hero-branding-visual";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommandPaletteHint } from "@/components/ui/command-palette";
import { MetricValue } from "@/components/ui/metric-value";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] scroll-mt-0 overflow-hidden pt-24 pb-16 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 grid-pattern hero-gradient" />

      <div className="container-wide relative z-[1] grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-12">
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
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
              className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
            >
              {site.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {site.subheadline}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{site.socialProof}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core technologies">
              {techBadges.map((tech, i) => (
                <motion.li
                  key={tech}
                  className="tech-badge-glow"
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                >
                  {tech}
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <LinkButton href="#work" variant="primary" size="lg">
                View projects
              </LinkButton>
              <LinkButton href={site.resumeUrl} variant="secondary" size="lg" target="_blank">
                Download resume
              </LinkButton>
              <LinkButton href="#contact" variant="ghost" size="lg">
                Contact me
              </LinkButton>
              <CommandPaletteHint />
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06, type: "spring", stiffness: 300, damping: 30 }}
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
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.12 }}
        >
          <HeroBrandingVisual />
        </motion.div>
      </div>
    </section>
  );
}
