/**
 * Standings Table Component
 * Displays tournament standings with placement badges
 */

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { PlacementBadge } from "@/components/tft/PlacementBadge";
import type { Standing } from "@/types/standing.types";

interface StandingsTableProps {
  standings: Standing[];
  className?: string;
  currentUserId?: string;
}

export function StandingsTable({ standings, className, currentUserId }: StandingsTableProps) {
  const { t } = useTranslation('common');

  if (standings.length === 0) {
    return (
      <div className="text-center py-8 text-[#A09B8C]">
        {t('noStandings')}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[rgba(200,170,110,0.2)]">
            <th className="text-left py-3 px-4 text-sm font-medium text-[#A09B8C]">
              {t('rank')}
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-[#A09B8C]">
              {t('player')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-[#A09B8C]">
              {t('points')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-[#A09B8C]">
              {t('gamesPlayed')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-[#A09B8C]">
              {t('wins')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-[#A09B8C]">
              {t('top4')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-[#A09B8C]">
              {t('avgPlacement')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium text-[#A09B8C] hidden md:table-cell">
              {t('bestWorst')}
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => {
            const isCurrentUser = currentUserId && standing.participant.user?.id === currentUserId;
            
            return (
              <tr
                key={standing.participant.id}
                className={cn(
                  "border-b border-[rgba(200,170,110,0.1)] hover:bg-[rgba(200,170,110,0.05)] transition-colors",
                  isCurrentUser && "bg-[rgba(200,170,110,0.1)] border-l-2 border-l-[#C8AA6E]"
                )}
              >
                {/* Rank */}
                <td className="py-3 px-4">
                  {standing.rank <= 4 ? (
                    <PlacementBadge placement={standing.rank} size="sm" />
                  ) : (
                    <span className="text-[#F0E6D2] font-medium">{standing.rank}</span>
                  )}
                </td>

                {/* Player */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {standing.participant.user?.avatar ? (
                      <img
                        src={standing.participant.user.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8AA6E] to-[#785A28] flex items-center justify-center text-[#0A1428] font-bold text-sm">
                        {(standing.participant.displayName || standing.participant.user?.firstName || '?')[0]}
                      </div>
                    )}
                    <div>
                      <span className="text-[#F0E6D2] font-medium">
                        {standing.participant.displayName || 
                         `${standing.participant.user?.firstName || ''} ${standing.participant.user?.lastName || ''}`.trim() ||
                         t('unknown')}
                      </span>
                      {standing.participant.riotId && (
                        <span className="block text-xs text-[#A09B8C]">
                          {standing.participant.riotId}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Points */}
                <td className="py-3 px-4 text-center">
                  <span className="text-[#C8AA6E] font-bold">{standing.totalPoints}</span>
                </td>

                {/* Games Played */}
                <td className="py-3 px-4 text-center text-[#F0E6D2]">
                  {standing.gamesPlayed}
                </td>

                {/* Wins */}
                <td className="py-3 px-4 text-center text-[#FFD700]">
                  {standing.wins}
                </td>

                {/* Top 4 */}
                <td className="py-3 px-4 text-center text-[#00C853]">
                  {standing.top4Count}
                </td>

                {/* Average Placement */}
                <td className="py-3 px-4 text-center text-[#F0E6D2]">
                  {standing.averagePlacement?.toFixed(2) || '-'}
                </td>

                {/* Best/Worst Placement */}
                <td className="py-3 px-4 text-center text-[#F0E6D2] hidden md:table-cell">
                  <span className="text-[#00C853]">{standing.bestPlacement || '-'}</span>
                  <span className="text-[#A09B8C] mx-1">/</span>
                  <span className="text-[#FF5252]">{standing.worstPlacement || '-'}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsTable;
