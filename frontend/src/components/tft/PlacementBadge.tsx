/**
 * Placement Badge Component for TFT Tournament
 * Displays placement rankings with appropriate colors
 */

import { cn } from "@/lib/utils";

interface PlacementBadgeProps {
  /** Placement number (1-8) */
  placement: number;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show ordinal suffix (1st, 2nd, etc.) */
  showOrdinal?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const placementStyles: Record<number, { bg: string; text: string; border: string; glow: string }> = {
  1: {
    bg: "bg-gradient-to-r from-[#FFD700] to-[#B8860B]",
    text: "text-[#0A1428]",
    border: "border-[#FFD700]",
    glow: "shadow-[0_0_10px_rgba(255,215,0,0.5)]",
  },
  2: {
    bg: "bg-gradient-to-r from-[#C0C0C0] to-[#808080]",
    text: "text-[#0A1428]",
    border: "border-[#C0C0C0]",
    glow: "shadow-[0_0_10px_rgba(192,192,192,0.5)]",
  },
  3: {
    bg: "bg-gradient-to-r from-[#CD7F32] to-[#8B4513]",
    text: "text-white",
    border: "border-[#CD7F32]",
    glow: "shadow-[0_0_10px_rgba(205,127,50,0.5)]",
  },
  4: {
    bg: "bg-gradient-to-r from-[#00C853] to-[#00A040]",
    text: "text-[#0A1428]",
    border: "border-[#00C853]",
    glow: "shadow-[0_0_10px_rgba(0,200,83,0.5)]",
  },
  5: {
    bg: "bg-[#1E3A5F]",
    text: "text-[#F0E6D2]",
    border: "border-[#1E3A5F]",
    glow: "",
  },
  6: {
    bg: "bg-[#1E3A5F]",
    text: "text-[#F0E6D2]",
    border: "border-[#1E3A5F]",
    glow: "",
  },
  7: {
    bg: "bg-[#3D2020]",
    text: "text-[#F0E6D2]",
    border: "border-[#5C3030]",
    glow: "",
  },
  8: {
    bg: "bg-[#3D2020]",
    text: "text-[#F0E6D2]",
    border: "border-[#5C3030]",
    glow: "",
  },
};

const sizeClasses = {
  sm: "h-6 min-w-6 px-1.5 text-xs",
  md: "h-8 min-w-8 px-2 text-sm",
  lg: "h-10 min-w-10 px-3 text-base",
};

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export function PlacementBadge({
  placement,
  size = "md",
  showOrdinal = true,
  className,
}: PlacementBadgeProps) {
  const clampedPlacement = Math.max(1, Math.min(8, placement));
  const styles = placementStyles[clampedPlacement] || placementStyles[8];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-bold",
        sizeClasses[size],
        styles.bg,
        styles.text,
        styles.glow,
        "border",
        styles.border,
        className
      )}
    >
      {placement}
      {showOrdinal && (
        <span className="text-[0.65em] ml-0.5 opacity-80">
          {getOrdinalSuffix(placement)}
        </span>
      )}
    </div>
  );
}

export default PlacementBadge;
