import { profileAbout } from "@/content/proof";

export const profile = {
  linkedinUrl: "https://www.linkedin.com/in/gandhinaman/",
  instagramUrl: "https://www.instagram.com/",
  location: "Jhansi, Uttar Pradesh, India",
  locationShort: "Prefers remote or hybrid · Open to relocate",
  timezone: "Asia/Kolkata",
  currentRole: "Application Development Analyst",
  currentCompany: "Accenture",
  about: profileAbout(),
  education: [
    {
      school: "GLA University",
      degree: "B.Tech, Electronics & Communications Engineering",
      period: "2017 — 2021",
      location: "Mathura, India",
    },
  ],
} as const;
