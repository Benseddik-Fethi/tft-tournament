/**
 * Tournament Card Component
 * Premium card with Hextech design, glassmorphism, and 3D effects
 */

import { Link } from "react-router-dom";
import { Calendar, Users, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TournamentStatusBadge } from "./TournamentStatusBadge";
import type { TournamentListItem } from "@/types/tournament.types";

interface TournamentCardProps {
  tournament: TournamentListItem;
  className?: string;
  featured?: boolean;
}

export function TournamentCard({ tournament, className, featured = false }: TournamentCardProps) {
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
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card
          variant="glass"
          className={cn(
            "h-full cursor-pointer group overflow-hidden",
            featured && "neon-border",
            className
          )}
        >
          {/* Banner with gradient overlay */}
          {tournament.bannerUrl ? (
            <div className="relative h-32 overflow-hidden rounded-t-xl">
              <motion.img
                src={tournament.bannerUrl}
                alt={tournament.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--glass-bg)] via-transparent to-transparent" />
              {/* Hextech corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C8AA6E]/20 to-transparent" />
            </div>
          ) : (
            <div className="h-32 bg-gradient-to-br from-[#1E3A5F] via-[var(--tft-bg-card)] to-[#0A1428] rounded-t-xl relative overflow-hidden">
              {/* Decorative hextech pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border border-[#C8AA6E] rotate-45" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border border-[#0AC8B9] rotate-12" />
              </div>
            </div>
          )}

          <CardHeader className="relative -mt-6 pb-2">
            <div className="flex items-start justify-between gap-2">
              {/* Logo with glow effect */}
              {tournament.logoUrl && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-lg glass-card overflow-hidden flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(200,170,110,0.3)] transition-shadow"
                >
                  <img
                    src={tournament.logoUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
              <TournamentStatusBadge status={tournament.status} size="sm" />
            </div>

            <h3 className="text-lg font-semibold text-[var(--tft-text-primary)] mt-2 line-clamp-2 group-hover:text-[#C8AA6E] transition-colors">
              {tournament.name}
            </h3>
          </CardHeader>

          <CardContent className="pt-0">
            {tournament.description && (
              <p className="text-sm text-[var(--tft-text-secondary)] line-clamp-2 mb-4">
                {tournament.description}
              </p>
            )}

            <div className="space-y-2">
              {/* Date with icon */}
              {tournament.startDate && (
                <motion.div 
                  className="flex items-center gap-2 text-sm text-[var(--tft-text-secondary)]"
                  whileHover={{ x: 4 }}
                >
                  <Calendar className="w-4 h-4 text-[#C8AA6E]" />
                  <span>{formatDate(tournament.startDate)}</span>
                </motion.div>
              )}

              {/* Participants with progress indicator */}
              <motion.div 
                className="flex items-center gap-2 text-sm text-[var(--tft-text-secondary)]"
                whileHover={{ x: 4 }}
              >
                <Users className="w-4 h-4 text-[#C8AA6E]" />
                <span>
                  {tournament.currentParticipants}
                  {tournament.maxParticipants && ` / ${tournament.maxParticipants}`}
                  {' '}{t('participants')}
                </span>
              </motion.div>

              {/* Prize Pool with golden styling */}
              {tournament.prizePool && (
                <motion.div 
                  className="flex items-center gap-2 text-sm text-[#C8AA6E] font-medium"
                  whileHover={{ x: 4 }}
                >
                  <Trophy className="w-4 h-4" />
                  <span>{tournament.prizePool}</span>
                </motion.div>
              )}
            </div>

            {/* Region Badge with glass styling */}
            {tournament.region && (
              <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                <span className="text-xs text-[var(--tft-text-secondary)] glass-card-subtle px-3 py-1.5 rounded-full inline-block">
                  {tournament.region.name}
                </span>
              </div>
            )}
          </CardContent>

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#C8AA6E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Card>
      </motion.div>
    </Link>
  );
}

export default TournamentCard;
