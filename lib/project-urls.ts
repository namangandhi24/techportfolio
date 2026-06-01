/** Workspace deep-link back to a project preview tab */
export function projectWorkspaceUrl(slug: string): string {
  return `/?file=${encodeURIComponent(`projects/${slug}.tsx`)}&view=explorer`;
}

export function projectCaseStudyUrl(slug: string): string {
  return `/work/${slug}`;
}
