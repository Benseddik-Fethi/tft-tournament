/**
 * Tournament Card Component
 * Card styled with Hextech theme to display a tournament in a list
 */

import { Link } from "react-router-dom";
import { Calendar, Users, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TournamentStatusBadge } from "./TournamentStatusBadge";
import type { TournamentListItem } from "@/types/tournament.types";

interface TournamentCardProps {
  tournament: TournamentListItem;
  className?: string;
}

export function TournamentCard({ tournament, className }: TournamentCardProps) {
  const { t } = useTranslation('common');

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link to={`/tournaments/${tournament.slug}`}>
      <Card
        variant="tft-card"
        className={cn(
          "h-full transition-all duration-300 hover:border-[rgba(200,170,110,0.4)] hover:shadow-[0_0_20px_rgba(200,170,110,0.15)] cursor-pointer group",
          className
        )}
      >
        {/* Banner */}
        {tournament.bannerUrl ? (
          <div className="relative h-32 overflow-hidden rounded-t-xl">
            <img
              src={tournament.bannerUrl}
              alt={tournament.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] to-transparent" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-[#1E3A5F] to-[#0A1929] rounded-t-xl" />
        )}

        <CardHeader className="relative -mt-6 pb-2">
          <div className="flex items-start justify-between gap-2">
            {/* Logo */}
            {tournament.logoUrl && (
              <div className="w-14 h-14 rounded-lg bg-[#0A1929] border border-[rgba(200,170,110,0.3)] overflow-hidden flex-shrink-0">
                <img
                  src={tournament.logoUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <TournamentStatusBadge status={tournament.status} size="sm" />
          </div>

          <h3 className="text-lg font-semibold text-[#F0E6D2] mt-2 line-clamp-2 group-hover:text-[#C8AA6E] transition-colors">
            {tournament.name}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          {tournament.description && (
            <p className="text-sm text-[#A09B8C] line-clamp-2 mb-4">
              {tournament.description}
            </p>
          )}

          <div className="space-y-2">
            {/* Date */}
            {tournament.startDate && (
              <div className="flex items-center gap-2 text-sm text-[#A09B8C]">
                <Calendar className="w-4 h-4 text-[#C8AA6E]" />
                <span>{formatDate(tournament.startDate)}</span>
              </div>
            )}

            {/* Participants */}
            <div className="flex items-center gap-2 text-sm text-[#A09B8C]">
              <Users className="w-4 h-4 text-[#C8AA6E]" />
              <span>
                {tournament.currentParticipants}
                {tournament.maxParticipants && ` / ${tournament.maxParticipants}`}
                {' '}{t('participants')}
              </span>
            </div>

            {/* Prize Pool */}
            {tournament.prizePool && (
              <div className="flex items-center gap-2 text-sm text-[#C8AA6E]">
                <Trophy className="w-4 h-4" />
                <span>{tournament.prizePool}</span>
              </div>
            )}
          </div>

          {/* Region Badge */}
          {tournament.region && (
            <div className="mt-4 pt-4 border-t border-[rgba(200,170,110,0.1)]">
              <span className="text-xs text-[#A09B8C] bg-[rgba(200,170,110,0.1)] px-2 py-1 rounded">
                {tournament.region.name}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default TournamentCard;
