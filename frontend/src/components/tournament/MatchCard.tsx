/**
 * Match Card Component
 * Card to display a match with participants and status
 */

import { useTranslation } from "react-i18next";
import { Clock, Video, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MatchListItem, MatchStatus } from "@/types/match.types";

interface MatchCardProps {
  match: MatchListItem;
  className?: string;
  onClick?: () => void;
}

const statusStyles: Record<MatchStatus, { bg: string; text: string }> = {
  SCHEDULED: { bg: "bg-[#1E3A5F]", text: "text-[#A09B8C]" },
  CHECK_IN: { bg: "bg-[#1A3A50]", text: "text-[#0AC8B9]" },
  LOBBY_OPEN: { bg: "bg-[#2D2A0F]", text: "text-[#C8AA6E]" },
  IN_GAME: { bg: "bg-[#0A3622]", text: "text-[#00C853]" },
  BETWEEN_GAMES: { bg: "bg-[#2D2A0F]", text: "text-[#C8AA6E]" },
  COMPLETED: { bg: "bg-[#3C3C41]", text: "text-[#F0E6D2]" },
  CANCELLED: { bg: "bg-[#3D2020]", text: "text-[#5B5A56]" },
};

export function MatchCard({ match, className, onClick }: MatchCardProps) {
  const { t } = useTranslation('common');
  const styles = statusStyles[match.status] || statusStyles.SCHEDULED;

  const formatTime = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      variant="tft-card"
      className={cn(
        "transition-all duration-300 hover:border-[rgba(200,170,110,0.4)] cursor-pointer",
        onClick && "hover:shadow-[0_0_15px_rgba(200,170,110,0.1)]",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#F0E6D2] text-base">
            {match.name || `${t('round')} ${match.roundNumber || 1}`}
            {match.lobbyNumber && (
              <span className="text-[#A09B8C] text-sm ml-2">
                {t('lobby')} {match.lobbyNumber}
              </span>
            )}
          </CardTitle>
          <span className={cn("px-2 py-0.5 rounded text-xs font-medium", styles.bg, styles.text)}>
            {t(`matchStatus.${match.status}`)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Time info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#A09B8C]">
          {match.scheduledTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#C8AA6E]" />
              <span>{formatDate(match.scheduledTime)} {formatTime(match.scheduledTime)}</span>
            </div>
          )}
          {match.streamUrl && (
            <a
              href={match.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#9D4DFF] hover:text-[#B668FF]"
              onClick={(e) => e.stopPropagation()}
            >
              <Video className="w-4 h-4" />
              <span>{t('watchLive')}</span>
            </a>
          )}
        </div>

        {/* Participants preview */}
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-[#C8AA6E]" />
          <span className="text-sm text-[#A09B8C]">
            {match.participants.length} {t('participants')}
          </span>
          <span className="text-sm text-[#5B5A56]">•</span>
          <span className="text-sm text-[#A09B8C]">
            {match.gamesCount} {t('games')}
          </span>
        </div>

        {/* Top participants */}
        {match.participants.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {match.participants.slice(0, 4).map((participant) => (
              <div
                key={participant.participantId}
                className="flex items-center gap-2 bg-[rgba(200,170,110,0.05)] px-2 py-1 rounded"
              >
                {participant.user?.avatar ? (
                  <img src={participant.user.avatar} alt="" className="w-5 h-5 rounded-full" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#1E3A5F] flex items-center justify-center text-[#F0E6D2] text-xs">
                    {(participant.displayName || '?')[0]}
                  </div>
                )}
                <span className="text-xs text-[#F0E6D2]">
                  {participant.displayName}
                </span>
                {participant.matchPoints > 0 && (
                  <span className="text-xs text-[#C8AA6E]">
                    {participant.matchPoints}pts
                  </span>
                )}
              </div>
            ))}
            {match.participants.length > 4 && (
              <span className="text-xs text-[#A09B8C] self-center">
                +{match.participants.length - 4}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MatchCard;
