/**
 * TFT Tournament Hextech Logo Component
 */

import { cn } from "@/lib/utils";

interface TftLogoProps {
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show full text or just icon */
  showText?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function TftLogo({ size = "md", showText = true, className }: TftLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Hextech Icon */}
      <div
        className={cn(
          sizeClasses[size],
          "relative rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-[#C8AA6E] to-[#785A28]",
          "shadow-[0_0_15px_rgba(200,170,110,0.4)]"
        )}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        
        {/* TFT Crown/Trophy Symbol */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "relative z-10",
            size === "sm" ? "w-5 h-5" : size === "md" ? "w-6 h-6" : size === "lg" ? "w-7 h-7" : "w-9 h-9"
          )}
        >
          {/* Crown shape */}
          <path
            d="M12 2L15 8L21 9L16.5 13.5L18 20H6L7.5 13.5L3 9L9 8L12 2Z"
            fill="#0A1428"
            stroke="#0A1428"
            strokeWidth="1"
          />
          {/* Inner highlight */}
          <path
            d="M12 5L14 9L18 9.5L15 12.5L16 17H8L9 12.5L6 9.5L10 9L12 5Z"
            fill="#F0E6D2"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              textSizeClasses[size],
              "font-bold tracking-tight leading-none",
              "bg-gradient-to-r from-[#F0E6D2] via-[#C8AA6E] to-[#785A28]",
              "bg-clip-text text-transparent"
            )}
          >
            TFT
          </span>
          <span
            className={cn(
              size === "sm" ? "text-[10px]" : size === "md" ? "text-xs" : size === "lg" ? "text-sm" : "text-base",
              "font-medium text-[#A09B8C] tracking-widest uppercase"
            )}
          >
            Tournament
          </span>
        </div>
      )}
    </div>
  );
}

export default TftLogo;
