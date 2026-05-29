# Portfolio v2 — Audit

## Homepage order (recruiter-first)

1. Hero (copy left · photo-centric branding visual right)
2. Engineering Principles (3 cards)
4. Engineering Journey (editorial rail + growing SVG stack, natural sticky scroll)
5. Interactive System Map (SVG)
6. Featured Work (expandable case studies)
7. Engineering Sandbox (Architecture Explorer default)
8. What I Build
9. Experience (Accenture)
10. Engineering Impact
11. Testimonials
12. Contact

## Removed

- Hero profile / premium info card
- Selected Achievements strip (duplicated metrics)
- Certifications section
- GitHub strip
- Capability Matrix
- Technical Depth / Architecture Pipeline on homepage
- Performance Panel (folded into Sandbox + Impact)
- CraftDemo

## Performance notes

- Journey: no WebGL; sticky panel inside tall scroll track (no ScrollTrigger pin)
- Sandbox: API Flow + Performance Lab lazy-loaded
- System Map: SVG + Framer only (no WebGL)

## Lighthouse QA checklist

- [ ] Mobile: Journey 2D only, no WebGL
- [ ] Desktop: Journey 3D optional, LCP on hero
- [ ] Reduced motion: no GSAP pin scrub on journey (2D timeline still visible)
- [ ] Sandbox completable in under 2 minutes
- [ ] A11y: skip journey link, sr-only era list when 3D active

Run locally: `npm run build` then preview with Lighthouse.

## Evidence-driven copy

Project and impact blocks use specific outcomes. Replace build targets with real Accenture metrics when available.
