import { site } from "@/content/site";
import { profile } from "@/content/profile";
import { Section } from "@/components/layout/section";
import { SectionReveal } from "@/components/motion/section-reveal";
import { LinkButton } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

export function ContactBento() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's build something exceptional together"
      description="Open to full-time roles, contract work, and technical conversations."
    >
      <SectionReveal>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
          <div className="border-b border-border bg-background px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-sm font-medium text-muted">Primary contact</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-3xl"
            >
              {site.email}
            </a>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Share role details, project scope, or a short introduction—I typically reply
              within one business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={`mailto:${site.email}`} variant="primary" size="lg">
                Send email
              </LinkButton>
              <CopyButton text={site.email} label="Copy address" />
              <LinkButton href={site.resumeUrl} variant="secondary" size="lg" target="_blank">
                Download resume
              </LinkButton>
            </div>
          </div>

          <div className="grid divide-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <ContactChannel
              title="LinkedIn"
              description="Professional background and recommendations."
              href={site.linkedinUrl}
              action="View profile"
            />
            <ContactChannel
              title="GitHub"
              description="Code samples, contributions, and pinned work."
              href={site.githubUrl}
              action="View repositories"
            />
            <div className="flex flex-col justify-between px-6 py-6 sm:px-8">
              <div>
                <p className="text-sm font-semibold text-foreground">Location</p>
                <p className="mt-2 text-sm text-muted">{profile.location}</p>
                <p className="mt-1 text-xs text-muted-foreground">{profile.locationShort}</p>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                {site.availability}
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>
    </Section>
  );
}

function ContactChannel({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between px-6 py-6 transition-colors duration-200 hover:bg-background sm:px-8"
    >
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-transform duration-200 group-hover:translate-x-0.5">
        {action}
        <span aria-hidden>→</span>
      </span>
    </a>
  );
}
