export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
};

export const certifications: Certification[] = [
  {
    id: "cert-primerli-insurance",
    title: "Insurance Industry Foundations",
    issuer: "Primerli",
    issued: "Jan 2026",
  },
  {
    id: "cert-primerli-banking",
    title: "Banking Industry Foundations",
    issuer: "Primerli",
    issued: "Jan 2025",
  },
  {
    id: "cert-tedx",
    title: "TEDxGLAU Curator Program",
    issuer: "TEDxGLAU",
    issued: "2020 — 2021",
  },
];
