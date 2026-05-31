/** Brand assets in /public/logos/ — PNG preferred, ~18–24px display size */

export type BrandLogoId =
  | "react"
  | "angular"
  | "typescript"
  | "nodejs"
  | "javascript"
  | "npm"
  | "mongodb"
  | "python"
  | "java"
  | "azure-devops"
  | "azure"
  | "linkedin"
  | "github"
  | "instagram";

export const brandLogoFiles: Record<BrandLogoId, string> = {
  react: "react.png",
  angular: "angular.png",
  typescript: "typescript.png",
  nodejs: "nodejs.png",
  javascript: "javascript.png",
  npm: "npm.png",
  mongodb: "mongodb.png",
  python: "python.png",
  java: "java.png",
  "azure-devops": "azure-devops.png",
  azure: "azure.png",
  linkedin: "linkedin.png",
  github: "github.png",
  instagram: "instagram.png",
};

/** Maps stack / content labels to logo files */
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

export function brandLogoSrc(id: BrandLogoId): string {
  return `/logos/${brandLogoFiles[id]}`;
}

export function brandForTech(name: string): BrandLogoId | undefined {
  return techNameToBrand[name];
}

export type SocialBrandId = "linkedin" | "github" | "instagram";
