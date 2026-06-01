"use client";

import Link from "next/link";
import { heroPortrait } from "@/content/hero-visual";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { SocialLogo } from "@/components/ui/brand-logo";

export function IdeSidebarProfile() {
  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4">
      <div className="px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-muted">
        Profile
      </div>
      <div className="px-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroPortrait.src}
          alt={heroPortrait.alt}
          className="mb-3 aspect-square w-full max-w-[180px] rounded-lg object-cover"
        />
        <h2 className="font-semibold text-foreground">{site.name}</h2>
        <p className="font-mono text-[12px] text-[var(--ide-accent)]">{site.role}</p>
        <p className="mt-2 text-[12px] text-muted">{profile.about}</p>
        <p className="mt-2 text-[11px] text-muted">{site.availability}</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={site.resumeUrl}
            target="_blank"
            rel="noopener"
            className="rounded bg-[var(--ide-accent)] px-3 py-1.5 text-center font-mono text-[12px] text-white"
          >
            Download resume
          </Link>
          <Link
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] text-muted hover:text-foreground"
          >
            <SocialLogo brand="linkedin" label="LinkedIn" />
          </Link>
          <Link
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] text-muted hover:text-foreground"
          >
            <SocialLogo brand="github" label="GitHub" />
          </Link>
          <Link
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] text-muted hover:text-foreground"
          >
            <SocialLogo brand="instagram" label="Instagram" />
          </Link>
        </div>
      </div>
    </div>
  );
}
