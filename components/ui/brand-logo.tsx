"use client";

import { useState } from "react";
import {
  brandForTech,
  brandLogoSrc,
  brandUsesRasterLogo,
  type BrandLogoId,
  type SocialBrandId,
} from "@/content/brand-logos";
import { EngineeringArtifactIcon } from "@/components/ui/engineering-artifact-icon";
import { cn } from "@/lib/utils";

type LogoImageProps = {
  brand: BrandLogoId;
  className?: string;
  artifactId?: string;
  fallback?: React.ReactNode;
};

export function LogoImage({ brand, className, artifactId, fallback }: LogoImageProps) {
  const size = className ?? "h-[18px] w-[18px]";
  const [failed, setFailed] = useState(false);
  const usesRaster = brandUsesRasterLogo(brand);

  if (!usesRaster) {
    return <EngineeringArtifactIcon id={artifactId ?? brand} className={size} />;
  }

  if (failed) {
    return fallback ?? null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brandLogoSrc(brand)}
      alt=""
      aria-hidden
      className={cn("shrink-0 object-contain", size)}
      onError={() => setFailed(true)}
    />
  );
}

type BrandLogoProps = {
  brand?: BrandLogoId;
  /** Fallback generic artifact icon when brand is missing or file not found */
  artifactId: string;
  className?: string;
};

export function BrandLogo({ brand, artifactId, className }: BrandLogoProps) {
  const size = className ?? "h-[18px] w-[18px]";

  if (!brand) {
    return <EngineeringArtifactIcon id={artifactId} className={size} />;
  }

  return (
    <LogoImage
      brand={brand}
      className={size}
      artifactId={artifactId}
      fallback={<EngineeringArtifactIcon id={artifactId} className={size} />}
    />
  );
}

type TechLogoLabelProps = {
  name: string;
  logoClassName?: string;
  className?: string;
};

function artifactIdForTech(name: string, brand?: BrandLogoId): string {
  if (brand && !brandUsesRasterLogo(brand)) return brand;
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Tech name with brand logo when available; SVG/emoji fallback otherwise */
export function TechLogoLabel({ name, logoClassName, className }: TechLogoLabelProps) {
  const brand = brandForTech(name);
  const size = logoClassName ?? "h-3.5 w-3.5";
  const artifactId = artifactIdForTech(name, brand);

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {brand ? (
        <LogoImage
          brand={brand}
          className={size}
          artifactId={artifactId}
          fallback={<EngineeringArtifactIcon id={artifactId} className={size} />}
        />
      ) : null}
      {name}
    </span>
  );
}

type SocialLogoLinkProps = {
  brand: SocialBrandId;
  label: string;
  className?: string;
};

export function SocialLogo({ brand, label, className }: SocialLogoLinkProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <LogoImage brand={brand} className="h-4 w-4" />
      <span>{label}</span>
    </span>
  );
}
