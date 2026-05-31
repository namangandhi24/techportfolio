# Content guide — Portfolio v2

## Replace with your real data

| File | What to edit |
|------|----------------|
| `content/profile.ts` | Location, about |
| `content/site.ts` | Headline, availability, email (env) |
| `content/proof.ts` | Hero metrics, stack, tenure (single source of truth) |
| `content/principles.ts` | Three principle cards |
| `content/journey.ts` | Career era copy and tech |
| `content/projects.ts` | Challenge, metrics, architecture (use real % when possible) |
| `content/impact.ts` | Evidence blocks with measurable outcomes |
| `content/what-i-build.ts` | Personal brand paragraphs |

## Evidence style

Prefer: "Reduced initial bundle size by 32%"  
Avoid: "Improved performance"

Label portfolio-only numbers as build targets in `projects.ts`.

## Environment

See `.env.example` for `NEXT_PUBLIC_EMAIL`, LinkedIn, GitHub, calendar.

Add `public/resume.pdf` for resume CTA.
