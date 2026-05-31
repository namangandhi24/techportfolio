"use client";

import { motion, type Variants } from "framer-motion";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function SectionReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: SectionRevealProps) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const Static = as;

  if (!hydrated || reduced) {
    return <Static className={className}>{children}</Static>;
  }

  const Component = motion[as];

  return (
    <Component
      className={cn(className)}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: 0.55, ease, delay }}
      variants={variants}
    >
      {children}
    </Component>
  );
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();

  if (!hydrated || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();

  if (!hydrated || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
