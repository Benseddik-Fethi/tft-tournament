/**
 * Participants List Component
 * List of participants with avatar, name, and status
 */

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { Participant, ParticipantStatus } from "@/types/standing.types";

interface ParticipantsListProps {
  participants: Participant[];
  className?: string;
}

const statusStyles: Record<ParticipantStatus, { bg: string; text: string }> = {
  REGISTERED: { bg: "bg-[#1E3A5F]", text: "text-[#A09B8C]" },
  CONFIRMED: { bg: "bg-[#0A3622]", text: "text-[#00C853]" },
  CHECKED_IN: { bg: "bg-[#1A3A50]", text: "text-[#0AC8B9]" },
  PLAYING: { bg: "bg-[#2D2A0F]", text: "text-[#C8AA6E]" },
  ELIMINATED: { bg: "bg-[#3D2020]", text: "text-[#FF6B6B]" },
  DISQUALIFIED: { bg: "bg-[#3D2020]", text: "text-[#5B5A56]" },
  WINNER: { bg: "bg-gradient-to-r from-[#FFD700] to-[#B8860B]", text: "text-[#0A1428]" },
};

export function ParticipantsList({ participants, className }: ParticipantsListProps) {
  const { t } = useTranslation('common');

  if (participants.length === 0) {
    return (
      <div className="text-center py-8 text-[#A09B8C]">
        {t('noParticipants')}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {participants.map((participant) => {
        const styles = statusStyles[participant.status] || statusStyles.REGISTERED;

        return (
          <div
            key={participant.id}
            className="flex items-center justify-between p-3 bg-[rgba(200,170,110,0.05)] rounded-lg hover:bg-[rgba(200,170,110,0.08)] transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Seed */}
              {participant.seed && (
                <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-[#A09B8C] bg-[#1E3A5F] rounded">
                  #{participant.seed}
                </span>
              )}

              {/* Avatar */}
              {participant.user?.avatar ? (
                <img
                  src={participant.user.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8AA6E] to-[#785A28] flex items-center justify-center text-[#0A1428] font-bold">
                  {(participant.displayName || participant.user?.firstName || '?')[0]}
                </div>
              )}

              {/* Name */}
              <div>
                <span className="text-[#F0E6D2] font-medium">
                  {participant.displayName ||
                   `${participant.user?.firstName || ''} ${participant.user?.lastName || ''}`.trim() ||
                   t('unknown')}
                </span>
                {participant.riotId && (
                  <span className="block text-xs text-[#A09B8C]">
                    {participant.riotId}
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <span className={cn("px-2 py-1 rounded text-xs font-medium", styles.bg, styles.text)}>
              {t(`participantStatus.${participant.status}`)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ParticipantsList;
