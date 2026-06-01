/** Brand assets in /public/logos/ — PNG preferred, ~18–24px display size */

export type RasterBrandLogoId =
  | "react"
  | "angular"
  | "typescript"
  | "nodejs"
  | "javascript"
  | "npm"
  | "mongodb"
  | "azure-devops"
  | "azure"
  | "linkedin"
  | "github"
  | "instagram";

/** Inline SVG only — no PNG in /public/logos/ */
export type SvgBrandLogoId = "python" | "java";

export type BrandLogoId = RasterBrandLogoId | SvgBrandLogoId;

export const brandLogoFiles: Record<RasterBrandLogoId, string> = {
  react: "react.png",
  angular: "angular.png",
  typescript: "typescript.png",
  nodejs: "nodejs.png",
  javascript: "javascript.png",
  npm: "npm.png",
  mongodb: "mongodb.png",
  "azure-devops": "azure-devops.png",
  azure: "azure.png",
  linkedin: "linkedin.png",
  github: "github.png",
  instagram: "instagram.png",
};

/** Maps stack / content labels to logo ids */
export const techNameToBrand: Partial<Record<string, BrandLogoId>> = {
  Angular: "angular",
  React: "react",
  TypeScript: "typescript",
  "Node.js": "nodejs",
  JavaScript: "javascript",
  npm: "npm",
  MongoDB: "mongodb",
  SQL: "mongodb",
  Python: "python",
  Java: "java",
  "Azure DevOps": "azure-devops",
  Azure: "azure",
  "CI/CD": "azure-devops",
};

export function brandUsesRasterLogo(id: BrandLogoId): id is RasterBrandLogoId {
  return id in brandLogoFiles;
}

export function brandLogoSrc(id: RasterBrandLogoId): string {
  return `/logos/${brandLogoFiles[id]}`;
}

export function brandForTech(name: string): BrandLogoId | undefined {
  return techNameToBrand[name];
}

export type SocialBrandId = "linkedin" | "github" | "instagram";
