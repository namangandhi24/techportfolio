export type Project = {
  id: string;
  slug: string;
  title: string;
  outcome: string;
  role: string;
  stack: string[];
  challenge: string;
  solution: string;
  architecture: string;
  technicalDecisions: string[];
  performanceResults: string[];
  businessImpact: string[];
  problem: string;
  approach: string;
  impact: string;
  status: "coming-soon" | "live" | "planned";
  featured?: boolean;
  href?: string;
  caseStudy?: {
    overview: string;
    metrics: { label: string; value: string }[];
    lessons: string[];
    timeline: string;
  };
};

export const projects: Project[] = [
  {
    id: "project-portfolio",
    slug: "portfolio",
    title: "This Portfolio",
    outcome:
      "Bespoke product-grade site with Lighthouse Performance ≥ 95 build target and recruiter-first storytelling.",
    role: "Design & Engineering",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
    challenge:
      "Generic templates fail to demonstrate senior frontend architecture, full-stack thinking, or measurable engineering values.",
    solution:
      "Custom design system, content-as-data architecture, interactive sandbox demos, and scroll-driven career narrative with strict a11y and motion budgets.",
    architecture:
      "Next.js App Router with RSC defaults; client islands for Journey, Sandbox, and console; SVG system map; lazy-loaded secondary demos.",
    technicalDecisions: [
      "TypeScript content modules for copy iteration without refactors",
      "Framer Motion + GSAP only where scroll storytelling requires it",
      "SVG journey stack and lazy-loaded sandbox demos—no decorative WebGL",
    ],
    performanceResults: [
      "Static generation for marketing routes (build target)",
      "Client JS isolated to interactive sections (build target)",
      "LCP < 2s, CLS < 0.05 documented targets",
    ],
    businessImpact: [
      "Demonstrates full-stack and frontend craft to recruiters in under 3 minutes",
      "Case study route proves documentation and system thinking",
    ],
    problem:
      "Generic portfolio templates fail to demonstrate senior frontend skill or measurable engineering values.",
    approach:
      "Custom design system, RSC-first architecture, client islands for interactives, content-as-data, and strict a11y/motion budgets.",
    impact: "Build target: Lighthouse Performance ≥ 95, LCP < 2s, CLS < 0.05.",
    status: "live",
    featured: true,
    href: "/work/portfolio",
    caseStudy: {
      overview:
        "A bespoke product-grade portfolio—not a theme—built to showcase enterprise frontend craft, full-stack credibility, and performance-first engineering.",
      metrics: [
        { label: "Rendering", value: "Static + RSC" },
        { label: "Motion", value: "Reduced-motion safe" },
        { label: "A11y", value: "WCAG 2.2 AA target" },
        { label: "Content", value: "TypeScript modules" },
      ],
      lessons: [
        "Prove skill through interaction design, not stock illustrations.",
        "Keep client JS small—hydrate only what recruiters touch.",
        "Centralize copy in /content for fast iteration without refactors.",
      ],
      timeline: "v2: Journey, Sandbox, System Map, evidence-driven case studies.",
    },
  },
  {
    id: "project-enterprise-platform",
    slug: "enterprise-account-platform",
    title: "Enterprise Account Platform",
    outcome:
      "Scalable multi-module web platform with shared UI, structured dashboards, and assistant-driven account workflows.",
    role: "Application Development Analyst",
    stack: ["Angular", "TypeScript", "REST"],
    challenge:
      "Multiple product areas needed consistent UX, maintainable state, and platform upgrades without slowing delivery.",
    solution:
      "Centralized reusable components, optimized dashboard modules, integrated assistant workflows, and a documentation POC for squad-wide reuse.",
    architecture:
      "Modular frontend aligned to a shared component library; account and operations areas composed from documented primitives.",
    technicalDecisions: [
      "Shared component library as the default path for new screens",
      "Structured state and rendering patterns for data-heavy dashboards",
      "Design-to-development workflow tightened to reduce UI drift",
    ],
    performanceResults: [
      "Optimized rendering paths on client dashboard modules",
      "Iterative performance and defect fixes across production releases",
    ],
    businessImpact: [
      "Faster, more consistent delivery across account and operations modules",
      "Improved component reuse and clearer UI standards for engineering squads",
    ],
    problem:
      "Account and operations teams needed a cohesive platform experience as modules and requirements grew.",
    approach:
      "Platform architecture participation, shared UI primitives, dashboard modules with disciplined state, and closer design-to-dev alignment.",
    impact:
      "Production platform delivery with reusable UI and standardized documentation practices.",
    status: "live",
    featured: false,
    caseStudy: {
      overview:
        "Enterprise delivery focused on platform scale, reusable UI, and account workflows—described without client-specific identifiers.",
      metrics: [
        { label: "Scope", value: "Multi-module platform" },
        { label: "UI", value: "Shared component library" },
        { label: "Workflows", value: "Assistant-driven account flows" },
        { label: "Delivery", value: "Cross-squad documentation POC" },
      ],
      lessons: [
        "Standardize primitives before screens multiply across modules.",
        "Treat design handoff as part of the release path, not a late polish step.",
      ],
      timeline: "Analyst role · ongoing platform and module delivery.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
