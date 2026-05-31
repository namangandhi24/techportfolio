"use client";

import { useState } from "react";
import {
  brandForTech,
  brandLogoSrc,
  type BrandLogoId,
  type SocialBrandId,
} from "@/content/brand-logos";
import { EngineeringArtifactIcon } from "@/components/ui/engineering-artifact-icon";
import { cn } from "@/lib/utils";

type LogoImageProps = {
  brand: BrandLogoId;
  className?: string;
  onMissing?: () => void;
};

export function LogoImage({ brand, className, onMissing }: LogoImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    onMissing?.();
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brandLogoSrc(brand)}
      alt=""
      aria-hidden
      className={cn("shrink-0 object-contain", className ?? "h-[18px] w-[18px]")}
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
  const [failed, setFailed] = useState(false);
  const size = className ?? "h-[18px] w-[18px]";

  if (!brand || failed) {
    return <EngineeringArtifactIcon id={artifactId} className={size} />;
  }

  return (
    <LogoImage brand={brand} className={size} onMissing={() => setFailed(true)} />
  );
}

type TechLogoLabelProps = {
  name: string;
  logoClassName?: string;
  className?: string;
};

/** Tech name with brand logo when available; emoji/text-only fallback otherwise */
export function TechLogoLabel({ name, logoClassName, className }: TechLogoLabelProps) {
  const brand = brandForTech(name);

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {brand ? (
        <LogoImage brand={brand} className={logoClassName ?? "h-3.5 w-3.5"} />
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
