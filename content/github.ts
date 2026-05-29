export type PinnedRepo = {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
};

export const pinnedReposFallback: PinnedRepo[] = [
  {
    name: "naman-gandhi-portfolio",
    description: "Premium portfolio built with Next.js, TypeScript, and Framer Motion.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com",
  },
  {
    name: "design-system-playground",
    description: "Planned: token editor and component gallery (post-launch build).",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com",
  },
  {
    name: "realtime-dashboard",
    description: "Planned: WebSockets, virtualized tables, optimistic UI patterns.",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com",
  },
];
