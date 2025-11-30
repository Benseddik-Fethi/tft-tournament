/**
 * Role Badge Component for TFT Tournament
 * Displays user roles with appropriate styling
 */

import { cn } from "@/lib/utils";
import { Crown, Mic, Shield, User } from "lucide-react";

export type TftRole = "ADMIN" | "ORGANIZER" | "PLAYER" | "CASTER";

interface RoleBadgeProps {
  /** Role to display */
  role: TftRole;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show icon */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const roleStyles: Record<TftRole, { 
  bg: string; 
  text: string; 
  border: string;
  icon: typeof Crown;
  label: string;
}> = {
  ADMIN: {
    bg: "bg-gradient-to-r from-[#9D4DFF] to-[#7C3AED]",
    text: "text-white",
    border: "border-[#9D4DFF]",
    icon: Crown,
    label: "Admin",
  },
  ORGANIZER: {
    bg: "bg-gradient-to-r from-[#C8AA6E] to-[#785A28]",
    text: "text-[#0A1428]",
    border: "border-[#C8AA6E]",
    icon: Shield,
    label: "Organizer",
  },
  PLAYER: {
    bg: "bg-gradient-to-r from-[#0AC8B9] to-[#099E92]",
    text: "text-[#0A1428]",
    border: "border-[#0AC8B9]",
    icon: User,
    label: "Player",
  },
  CASTER: {
    bg: "bg-gradient-to-r from-[#FF6B6B] to-[#EE5A5A]",
    text: "text-white",
    border: "border-[#FF6B6B]",
    icon: Mic,
    label: "Caster",
  },
};

const sizeClasses = {
  sm: "h-5 px-1.5 text-[10px] gap-1",
  md: "h-6 px-2 text-xs gap-1.5",
  lg: "h-8 px-3 text-sm gap-2",
};

const iconSizeClasses = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

export function RoleBadge({
  role,
  size = "md",
  showIcon = true,
  className,
}: RoleBadgeProps) {
  const styles = roleStyles[role];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wide",
        sizeClasses[size],
        styles.bg,
        styles.text,
        className
      )}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      <span>{styles.label}</span>
    </div>
  );
}

export default RoleBadge;
