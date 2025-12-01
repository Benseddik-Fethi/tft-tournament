/**
 * Tournament Status Badge Component
 * Displays the status of a tournament with appropriate colors
 */

import { cn } from "@/lib/utils";
import type { TournamentStatus } from "@/types/tournament.types";
import { useTranslation } from "react-i18next";

interface TournamentStatusBadgeProps {
  status: TournamentStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusStyles: Record<TournamentStatus, { bg: string; text: string; border: string }> = {
  DRAFT: {
    bg: "bg-[#3C3C41]",
    text: "text-[#A09B8C]",
    border: "border-[#5B5A56]",
  },
  REGISTRATION_OPEN: {
    bg: "bg-[#0A3622]",
    text: "text-[#00C853]",
    border: "border-[#00C853]",
  },
  REGISTRATION_CLOSED: {
    bg: "bg-[#3D2020]",
    text: "text-[#FF6B6B]",
    border: "border-[#FF6B6B]",
  },
  CHECK_IN: {
    bg: "bg-[#1A3A50]",
    text: "text-[#0AC8B9]",
    border: "border-[#0AC8B9]",
  },
  IN_PROGRESS: {
    bg: "bg-[#2D2A0F]",
    text: "text-[#C8AA6E]",
    border: "border-[#C8AA6E]",
  },
  COMPLETED: {
    bg: "bg-[#1E3A5F]",
    text: "text-[#F0E6D2]",
    border: "border-[#1E3A5F]",
  },
  CANCELLED: {
    bg: "bg-[#3D2020]",
    text: "text-[#5B5A56]",
    border: "border-[#5B5A56]",
  },
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function TournamentStatusBadge({
  status,
  size = "md",
  className,
}: TournamentStatusBadgeProps) {
  const { t } = useTranslation('common');
  const styles = statusStyles[status] || statusStyles.DRAFT;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium border",
        sizeClasses[size],
        styles.bg,
        styles.text,
        styles.border,
        className
      )}
    >
      {t(`tournamentStatus.${status}`)}
    </span>
  );
}

export default TournamentStatusBadge;
