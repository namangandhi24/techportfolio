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
  liveUrl?: string;
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
      "Next.js App Router with RSC defaults; client islands for Sandbox and console; SVG system map; lazy-loaded secondary demos.",
    technicalDecisions: [
      "TypeScript content modules for copy iteration without refactors",
      "Framer Motion + GSAP only where scroll storytelling requires it",
      "Lazy-loaded sandbox demos and system map—no decorative WebGL",
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
      timeline: "v2: Sandbox, System Map, evidence-driven case studies.",
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
  {
    id: "project-india-experience",
    slug: "india-experience",
    title: "Made in India",
    outcome:
      "Full-stack cultural archive — interactive state map, bilingual stories, community audio, and a moderated contributor pipeline deployed on Vercel.",
    role: "Founder & Full Stack Engineer",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle ORM",
      "Framer Motion",
    ],
    challenge:
      "Regional stories and oral histories disappear without a place to discover them by geography, contribute new voices, or listen alongside editorial quality controls.",
    solution:
      "Built a map-first explore experience, rich story reader with Hindi metadata, authenticated contribute flow, tiered moderation (admin → super admin), and a dual-mode audio hub for live radio streams and community uploads.",
    architecture:
      "Next.js App Router with Postgres via Drizzle; iron-session auth; REST story APIs with editorial seed fallback when no database is configured; client islands for map, audio player (HLS), and scroll-driven homepage sections.",
    technicalDecisions: [
      "Drizzle schema with story status enum and role-gated moderation instead of ad-hoc JSON files in production",
      "Public story reads degrade to editorial seed catalog locally — auth and submissions require Postgres",
      "BEM + Tailwind for maintainable component CSS across map, audio hub, and account surfaces",
      "HLS.js for city radio streams; separate community audio division with upload + review queue",
    ],
    performanceResults: [
      "Static and server-rendered marketing routes with client hydration only on map, audio, and auth",
      "Story API pagination and visibility filters to keep explore/map payloads lean",
      "SVG-based India map and generated story covers to avoid heavy image bundles on first paint",
    ],
    businessImpact: [
      "Live product showcasing end-to-end product thinking — content, auth, moderation, and media",
      "Demonstrates full-stack ownership from schema design through Vercel deployment",
      "Preserves and surfaces regional narratives with a path for community contribution",
    ],
    problem:
      "India's regional stories and voices lack a unified, place-based archive that is easy to explore and open to new contributors.",
    approach:
      "Map-led discovery, editorial seed content plus Postgres-backed submissions, role-based moderation, and radio/community audio in one cohesive Next.js application.",
    impact:
      "Production deployment at india-experience.vercel.app with stories, explore map, audio hub, and account/moderation flows.",
    status: "live",
    featured: false,
    href: "/work/india-experience",
    liveUrl: "https://india-experience.vercel.app",
    caseStudy: {
      overview:
        "Made in India is a personal full-stack product — a living archive of Indian stories. Visitors explore by state on an interactive map, read featured and regional narratives (including Hindi metadata), listen to radio and community audio, and signed-in users can submit stories through a moderated pipeline.",
      metrics: [
        { label: "Platform", value: "Map + stories + audio" },
        { label: "Backend", value: "Postgres + Drizzle" },
        { label: "Auth", value: "iron-session + roles" },
        { label: "Deploy", value: "Vercel · live" },
      ],
      lessons: [
        "Seed editorial content early so the map and homepage feel alive before the first contributor signup.",
        "Model moderation states explicitly in the database — ad-hoc status strings do not scale past one admin.",
        "Split audio into radio (streams) and community (uploads) so playback and review flows stay independent.",
      ],
      timeline: "Solo build · Next.js 16 · React 19 · shipped to production.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
