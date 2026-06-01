"use client";

import { heroPortrait } from "@/content/hero-visual";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";

export function MarkdownView() {
  return (
    <IdeEditorChrome lineCount={24}>
      <article className="prose prose-sm max-w-2xl dark:prose-invert">
        <div className="mb-6 flex items-center gap-4 not-prose">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroPortrait.src}
            alt={heroPortrait.alt}
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold">{site.name}</h1>
            <p className="text-sm font-medium text-[var(--ide-accent)]">
              {profile.currentRole} @ {profile.currentCompany}
            </p>
          </div>
        </div>
        <h2>About</h2>
        <p>{profile.about}</p>
        <h2>Location</h2>
        <p>{profile.location}</p>
        <p className="text-sm text-muted">{profile.locationShort}</p>
        <h2>Education</h2>
        {profile.education.map((edu) => (
          <div key={edu.school}>
            <p>
              <strong>{edu.degree}</strong>
            </p>
            <p className="text-muted">
              {edu.school} · {edu.period}
            </p>
          </div>
        ))}
      </article>
    </IdeEditorChrome>
  );
}
