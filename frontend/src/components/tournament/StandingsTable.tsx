/**
 * Standings Table Component
 * Displays tournament standings with placement badges
 * Supports light and dark theme
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
      <div className="text-center py-8 tft-text-secondary">
        {t('noStandings')}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium tft-text-secondary">
              {t('rank')}
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium tft-text-secondary">
              {t('player')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium tft-text-secondary">
              {t('points')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium tft-text-secondary">
              {t('gamesPlayed')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium tft-text-secondary">
              {t('wins')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium tft-text-secondary">
              {t('top4')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium tft-text-secondary">
              {t('avgPlacement')}
            </th>
            <th className="text-center py-3 px-4 text-sm font-medium tft-text-secondary hidden md:table-cell">
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
                  "border-b border-border hover:bg-muted/50 transition-colors",
                  isCurrentUser && "bg-primary/10 border-l-2 border-l-primary"
                )}
              >
                {/* Rank */}
                <td className="py-3 px-4">
                  {standing.rank <= 4 ? (
                    <PlacementBadge placement={standing.rank} size="sm" />
                  ) : (
                    <span className="tft-text-primary font-medium">{standing.rank}</span>
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
                      <div className="w-8 h-8 rounded-full tft-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {(standing.participant.displayName || standing.participant.user?.firstName || '?')[0]}
                      </div>
                    )}
                    <div>
                      <span className="tft-text-primary font-medium">
                        {standing.participant.displayName || 
                         `${standing.participant.user?.firstName || ''} ${standing.participant.user?.lastName || ''}`.trim() ||
                         t('unknown')}
                      </span>
                      {standing.participant.riotId && (
                        <span className="block text-xs tft-text-secondary">
                          {standing.participant.riotId}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Points */}
                <td className="py-3 px-4 text-center">
                  <span className="tft-text-gold font-bold">{standing.totalPoints}</span>
                </td>

                {/* Games Played */}
                <td className="py-3 px-4 text-center tft-text-primary">
                  {standing.gamesPlayed}
                </td>

                {/* Wins */}
                <td className="py-3 px-4 text-center tft-placement-1st">
                  {standing.wins}
                </td>

                {/* Top 4 */}
                <td className="py-3 px-4 text-center tft-placement-4th">
                  {standing.top4Count}
                </td>

                {/* Average Placement */}
                <td className="py-3 px-4 text-center tft-text-primary">
                  {standing.averagePlacement?.toFixed(2) || '-'}
                </td>

                {/* Best/Worst Placement */}
                <td className="py-3 px-4 text-center tft-text-primary hidden md:table-cell">
                  <span className="tft-placement-4th">{standing.bestPlacement || '-'}</span>
                  <span className="tft-text-muted mx-1">/</span>
                  <span className="text-destructive">{standing.worstPlacement || '-'}</span>
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
