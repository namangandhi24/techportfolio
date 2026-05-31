import { profile } from "@/content/profile";
import {
  heroMetrics,
  profileAbout,
  siteDescription,
  techBadges,
} from "@/content/proof";

export const site = {
  name: "Naman Gandhi",
  title: "Naman Gandhi — Full Stack Engineer",
  description: siteDescription(),
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://namangandhi.vercel.app/",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "namangandhi24@gmail.com",
  calendarUrl:
    process.env.NEXT_PUBLIC_CALENDAR_URL ?? "https://cal.com",
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? profile.linkedinUrl,
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? profile.instagramUrl,
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "",
  resumeUrl: "/resume.pdf",
  location: `${profile.location} · ${profile.locationShort}`,
  role: "Full Stack Engineer",
  availability: "Open to senior frontend / full-stack roles · Q2 2026",
  socialProof: `${profile.currentRole} at ${profile.currentCompany} · ${profile.locationShort}`,
  headline:
    "Building products users love and systems teams can scale.",
  subheadline: profileAbout(),
} as const;

export { heroMetrics as metrics, techBadges };

export type NavItem = {
  label: string;
  href: string;
  sectionId: string;
};

export const navigation: NavItem[] = [
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Impact", href: "#impact", sectionId: "impact" },
  { label: "About", href: "#build", sectionId: "build" },
  { label: "Stack", href: "#system-map", sectionId: "system-map" },
  { label: "Sandbox", href: "#sandbox", sectionId: "sandbox" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const sectionChapters: Record<string, string> = {
  work: "01",
  experience: "02",
  impact: "03",
  testimonials: "04",
  build: "05",
  principles: "06",
  "system-map": "07",
  sandbox: "08",
  contact: "09",
};
