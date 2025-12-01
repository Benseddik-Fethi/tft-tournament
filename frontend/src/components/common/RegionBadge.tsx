/**
 * Region Badge Component
 * Badge with region flag/icon
 */

import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import type { Region } from "@/types/region.types";

interface RegionBadgeProps {
  region: Region;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function RegionBadge({
  region,
  size = "md",
  showName = true,
  className,
}: RegionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        "bg-[rgba(200,170,110,0.1)] text-[#F0E6D2] border border-[rgba(200,170,110,0.2)]",
        sizeClasses[size],
        className
      )}
    >
      {region.logoUrl ? (
        <img
          src={region.logoUrl}
          alt={region.code}
          className={cn("rounded-full", iconSizes[size])}
        />
      ) : (
        <Globe className={cn("text-[#C8AA6E]", iconSizes[size])} />
      )}
      {showName ? region.name : region.code}
    </span>
  );
}

export default RegionBadge;
