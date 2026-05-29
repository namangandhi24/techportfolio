import { sectionChapters } from "@/content/site";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  label?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  id,
  label,
  title,
  description,
  children,
  className,
}: SectionProps) {
  const chapter = sectionChapters[id];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("section-padding scroll-mt-24", className)}
    >
      <div className="container-wide">
        <header
          className={cn(
            "relative mb-16 md:mb-20",
            chapter ? "section-header-editorial" : "max-w-2xl",
          )}
        >
          {chapter ? (
            <>
              <span
                aria-hidden
                className="chapter-number section-header-chapter select-none"
              >
                {chapter}
              </span>
              <div className="section-header-content">
                {label ? (
                  <p className="section-header-eyebrow">{label}</p>
                ) : null}
                <h2 id={`${id}-title`} className="type-display-lg">
                  {title}
                </h2>
                {description ? (
                  <p className="type-body-lg mt-5 max-w-xl">{description}</p>
                ) : null}
              </div>
            </>
          ) : (
            <>
              {label ? (
                <p className="type-eyebrow mb-4">{label}</p>
              ) : null}
              <h2 id={`${id}-title`} className="type-display-lg">
                {title}
              </h2>
              {description ? (
                <p className="type-body-lg mt-5 max-w-xl">{description}</p>
              ) : null}
            </>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
