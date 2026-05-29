# Naman Gandhi — Portfolio v2

Memorable, interaction-first portfolio: Engineering Journey, System Map, focused Sandbox, and recruiter-first section order.

## Features

- **Selected Achievements** — credibility strip after hero
- **Engineering Principles** — 3 compact value cards
- **Engineering Journey** — GSAP scroll (desktop 3D via R3F, 2D timeline on mobile/reduced-motion)
- **Interactive System Map** — SVG full-stack hover map
- **Featured Work** — expandable case studies with challenge/solution/architecture/evidence
- **Engineering Sandbox** — Architecture Explorer (default), API Flow, Performance Lab
- **What I Build** — personal brand narrative
- **Engineering Impact** — evidence blocks
- **Developer Console** — `⌘K` grouped commands, sandbox demos, stats
- **Dark / light** theme, scroll spy, section rail

## Stack

- Next.js 16, React 19, TypeScript, Tailwind v4
- Framer Motion, GSAP ScrollTrigger
- React Three Fiber + Drei (Journey 3D only, lazy)
- Shiki, cmdk, next-themes

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Content (`/content`)

| File | Purpose |
|------|---------|
| `achievements.ts` | Hero strip |
| `principles.ts` | Engineering principles |
| `journey.ts` | Career eras |
| `system-map.ts` | Stack map layers |
| `sandbox.ts` | Sandbox demos |
| `what-i-build.ts` | About blocks |
| `impact.ts` | Impact evidence + console stats |
| `projects.ts` | Case study fields |
| `console-commands.ts` | Developer console registry |

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
