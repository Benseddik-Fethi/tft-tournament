/**
 * Format Badge Component
 * Badge for tournament format types
 */

import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import type { TournamentFormatType } from "@/types/tournament.types";

interface FormatBadgeProps {
  format: TournamentFormatType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const formatColors: Partial<Record<TournamentFormatType, string>> = {
  SWISS: "bg-[#0A3622] text-[#00C853] border-[#00C853]",
  ROUND_ROBIN: "bg-[#1A3A50] text-[#0AC8B9] border-[#0AC8B9]",
  SINGLE_ELIMINATION: "bg-[#3D2020] text-[#FF6B6B] border-[#FF6B6B]",
  DOUBLE_ELIMINATION: "bg-[#3D2020] text-[#FF6B6B] border-[#FF6B6B]",
  POINT_BASED: "bg-[#2D2A0F] text-[#C8AA6E] border-[#C8AA6E]",
  CHECKMATE: "bg-[#2D1A50] text-[#9D4DFF] border-[#9D4DFF]",
};

export function FormatBadge({
  format,
  size = "md",
  className,
}: FormatBadgeProps) {
  const { t } = useTranslation('common');
  const colorClass = formatColors[format] || "bg-[#1E3A5F] text-[#F0E6D2] border-[#1E3A5F]";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium border",
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {t(`formatType.${format}`)}
    </span>
  );
}

export default FormatBadge;
