/**
 * Circuit Card Component
 * Card to display a circuit with Hextech styling
 */

import { Link } from "react-router-dom";
import { Trophy, Calendar, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CircuitListItem, CircuitType } from "@/types/circuit.types";

interface CircuitCardProps {
  circuit: CircuitListItem;
  className?: string;
}

const typeStyles: Record<CircuitType, { bg: string; text: string }> = {
  OFFICIAL: { bg: "bg-gradient-to-r from-[#C8AA6E] to-[#785A28]", text: "text-[#0A1428]" },
  PARTNERED: { bg: "bg-[#1A3A50]", text: "text-[#0AC8B9]" },
  COMMUNITY: { bg: "bg-[#1E3A5F]", text: "text-[#F0E6D2]" },
  PRIVATE: { bg: "bg-[#3C3C41]", text: "text-[#A09B8C]" },
};

export function CircuitCard({ circuit, className }: CircuitCardProps) {
  const { t } = useTranslation('common');
  const typeStyle = typeStyles[circuit.circuitType] || typeStyles.COMMUNITY;

  return (
    <Link to={`/circuits/${circuit.slug}`}>
      <Card
        variant="tft-card"
        className={cn(
          "h-full transition-all duration-300 hover:border-[rgba(200,170,110,0.4)] hover:shadow-[0_0_20px_rgba(200,170,110,0.15)] cursor-pointer group",
          circuit.isFeatured && "border-[#C8AA6E]",
          className
        )}
      >
        {/* Banner */}
        {circuit.bannerUrl ? (
          <div className="relative h-32 overflow-hidden rounded-t-xl">
            <img
              src={circuit.bannerUrl}
              alt={circuit.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] to-transparent" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-[#1E3A5F] to-[#0A1929] rounded-t-xl" />
        )}

        <CardHeader className="relative -mt-8 pb-2">
          <div className="flex items-end gap-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-xl bg-[#0A1929] border-2 border-[rgba(200,170,110,0.3)] overflow-hidden flex-shrink-0">
              {circuit.logoUrl ? (
                <img
                  src={circuit.logoUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#C8AA6E] to-[#785A28] flex items-center justify-center text-[#0A1428] font-bold text-2xl">
                  {circuit.name[0]}
                </div>
              )}
            </div>

            {/* Type Badge */}
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium", typeStyle.bg, typeStyle.text)}>
              {t(`circuitType.${circuit.circuitType}`)}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-[#F0E6D2] mt-3 line-clamp-2 group-hover:text-[#C8AA6E] transition-colors">
            {circuit.name}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2">
            {/* Year */}
            <div className="flex items-center gap-2 text-sm text-[#A09B8C]">
              <Calendar className="w-4 h-4 text-[#C8AA6E]" />
              <span>{circuit.year}</span>
            </div>

            {/* Region */}
            {circuit.region && (
              <div className="flex items-center gap-2 text-sm text-[#A09B8C]">
                <Globe className="w-4 h-4 text-[#C8AA6E]" />
                <span>{circuit.region.name}</span>
              </div>
            )}

            {/* Prize Pool */}
            {circuit.prizePool && (
              <div className="flex items-center gap-2 text-sm text-[#C8AA6E]">
                <Trophy className="w-4 h-4" />
                <span>{circuit.prizePool}</span>
              </div>
            )}

            {/* Active Season */}
            {circuit.activeSeasonName && (
              <div className="mt-4 pt-4 border-t border-[rgba(200,170,110,0.1)]">
                <span className="text-xs text-[#0AC8B9]">
                  {t('activeSeason')}: {circuit.activeSeasonName}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CircuitCard;
