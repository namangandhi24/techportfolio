export type Capability = {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  detail: string;
};

export const capabilities: Capability[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    tags: ["Angular", "React", "TypeScript", "Design Systems"],
    summary: "Complex UIs with maintainable component architecture.",
    detail:
      "I build responsive, accessible interfaces with strong state management, reusable primitives, and design-system thinking—shipping features without sacrificing long-term code health.",
  },
  {
    id: "architecture",
    title: "Application Architecture",
    tags: ["SPAs", "Routing", "Lazy Loading", "Error Boundaries"],
    summary: "Modular frontends structured for scale and team velocity.",
    detail:
      "From route-level code splitting to predictable data flow, I design applications that stay fast and understandable as features and teams grow.",
  },
  {
    id: "backend",
    title: "Backend & APIs",
    tags: ["Node.js", "Express", "REST"],
    summary: "Reliable APIs and integration patterns for enterprise products.",
    detail:
      "I implement RESTful services, validation, and integration layers that frontends can depend on—with clear contracts and production-ready error handling.",
  },
  {
    id: "platform",
    title: "Platform & Delivery",
    tags: ["Azure DevOps", "CI/CD", "Environments"],
    summary: "Repeatable releases and quality gates across environments.",
    detail:
      "Pipeline automation, environment strategies, and release discipline—so shipping is confident, traceable, and low-friction for the whole team.",
  },
  {
    id: "security",
    title: "Security & Identity",
    tags: ["Authentication", "Sessions", "Tokens"],
    summary: "Auth flows and identity patterns built for real-world products.",
    detail:
      "Session and token-based patterns, secure client-server boundaries, and authentication UX that balances security with usability—without exposing implementation details.",
  },
];
