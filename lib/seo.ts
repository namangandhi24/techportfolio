import type { Metadata } from "next";
import { site } from "@/content/site";

export function createMetadata(): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    keywords: [
      "Full Stack Engineer",
      "Frontend Engineer",
      "React",
      "Angular",
      "TypeScript",
      "Node.js",
      "Enterprise Web Applications",
    ],
    authors: [{ name: site.name }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      title: site.title,
      description: site.description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: site.url,
    },
  };
}

export function createJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        url: site.url,
        email: site.email,
        sameAs: [site.githubUrl, site.linkedinUrl],
        knowsAbout: [
          "Angular",
          "React",
          "TypeScript",
          "Node.js",
          "REST APIs",
          "CI/CD",
        ],
      },
      {
        "@type": "WebSite",
        name: site.title,
        url: site.url,
        description: site.description,
      },
    ],
  };
}
