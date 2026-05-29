import { profile } from "@/content/profile";

export const site = {
  name: "Naman Gandhi",
  title: "Naman Gandhi — Full Stack Engineer",
  description:
    "Full Stack Engineer at Accenture with 4+ years building enterprise web applications. Angular, React, TypeScript, Node.js, REST APIs, and Azure DevOps.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://namangandhi.vercel.app/",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "namangandhi24@gmail.com",
  calendarUrl:
    process.env.NEXT_PUBLIC_CALENDAR_URL ?? "https://cal.com",
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? profile.linkedinUrl,
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "",
  resumeUrl: "/resume.pdf",
  location: `${profile.location} · ${profile.locationShort}`,
  role: "Full Stack Engineer",
  availability: "Open to senior frontend / full-stack roles · Q2 2026",
  socialProof: `${profile.currentRole} at ${profile.currentCompany} · ${profile.locationShort}`,
  headline:
    "Full Stack Engineer building scalable systems and exceptional user experiences.",
  subheadline: profile.about,
} as const;

export const techBadges = [
  "Angular",
  "React",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Azure DevOps",
] as const;

export const metrics = [
  { value: "4+", label: "Years at Accenture" },
  { value: "50+", label: "Production releases" },
  { value: "< 2s", label: "LCP target" },
  { value: "AA", label: "Accessibility standard" },
] as const;

export type NavItem = {
  label: string;
  href: string;
  sectionId: string;
};

export const navigation: NavItem[] = [
  { label: "Principles", href: "#principles", sectionId: "principles" },
  { label: "Journey", href: "#journey", sectionId: "journey" },
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Sandbox", href: "#sandbox", sectionId: "sandbox" },
  { label: "About", href: "#build", sectionId: "build" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Impact", href: "#impact", sectionId: "impact" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const sectionChapters: Record<string, string> = {
  principles: "01",
  journey: "02",
  "system-map": "03",
  work: "04",
  sandbox: "05",
  build: "06",
  experience: "07",
  impact: "08",
  contact: "09",
};
