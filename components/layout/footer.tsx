"use client";

import { profile } from "@/content/profile";
import { site } from "@/content/site";
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

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatISTTime()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-border py-10">
      <div className="container-wide flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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
            LinkedIn
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover"
          >
            Resume
          </a>
          <a href="#" className="link-hover">
            Back to top
          </a>
          <span aria-hidden className="text-border">
            ·
          </span>
          <span>
            © {year} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
