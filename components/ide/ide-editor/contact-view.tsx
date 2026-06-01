"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { SocialLogo } from "@/components/ui/brand-logo";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";

export function ContactView() {
  return (
    <IdeEditorChrome lineCount={16}>
      <div className="max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Contact</h1>
        <p className="text-muted">{site.availability}</p>
        <dl className="space-y-3 font-mono text-[13px]">
          <div>
            <dt className="text-[11px] uppercase text-muted">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="text-[var(--ide-accent)] hover:underline">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase text-muted">Location</dt>
            <dd>{site.location}</dd>
          </div>
        </dl>
        <div className="flex flex-col gap-2 pt-2">
          <Link
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ide-accent)] hover:underline"
          >
            <SocialLogo brand="linkedin" label="LinkedIn" />
          </Link>
          <Link
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ide-accent)] hover:underline"
          >
            <SocialLogo brand="github" label="GitHub" />
          </Link>
        </div>
      </div>
    </IdeEditorChrome>
  );
}

export function PdfView() {
  return (
    <IdeEditorChrome lineCount={8}>
      <div className="max-w-md space-y-4">
        <h1 className="text-xl font-semibold">resume.pdf</h1>
        <p className="text-muted">Download the latest resume PDF.</p>
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener"
          className="inline-block rounded bg-[var(--ide-accent)] px-4 py-2 font-mono text-[12px] text-white"
        >
          Open resume.pdf
        </Link>
      </div>
    </IdeEditorChrome>
  );
}
