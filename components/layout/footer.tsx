"use client";

import { profile } from "@/content/profile";
import { footerFlair } from "@/content/flair";
import { site } from "@/content/site";
import { SocialLogo } from "@/components/ui/brand-logo";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useEffect, useState } from "react";

function formatISTTime(): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: profile.timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export function Footer() {
  const year = new Date().getFullYear();
  const [time, setTime] = useState(formatISTTime);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatISTTime()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-border py-10">
      <div className="container-wide flex flex-col gap-8">
        <div className="rounded-xl border border-dashed border-border/80 bg-card/40 px-5 py-4 text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">{footerFlair.tagline}</p>
          <p className="mt-1 text-sm text-muted">{footerFlair.subline}</p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-medium text-foreground">{site.name}</p>
            <p className="mt-1 text-sm text-muted">{site.location}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {site.availability} · {time} IST
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
            >
              <SocialLogo brand="linkedin" label="LinkedIn" />
            </a>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
            >
              <SocialLogo brand="github" label="GitHub" />
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
            >
              <SocialLogo brand="instagram" label="Instagram" />
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="link-hover inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-sm text-muted"
            >
              <span aria-hidden>{footerFlair.backToTop}</span>
              Back to top
            </button>
            <span aria-hidden className="text-border">
              ·
            </span>
            <span>
              © {year} {site.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
