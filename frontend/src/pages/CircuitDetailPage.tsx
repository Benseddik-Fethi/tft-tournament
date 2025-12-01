/**
 * Circuit Detail Page
 * Displays full circuit details with seasons and stages
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Calendar, Trophy, Globe, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TftLogo } from "@/components/tft/TftLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TournamentStatusBadge } from "@/components/tournament";
import { circuitService } from "@/services/circuit.service";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/config";
import type { CircuitDetail, SeasonStatus } from "@/types/circuit.types";

const seasonStatusStyles: Record<SeasonStatus, { bg: string; text: string }> = {
  UPCOMING: { bg: "bg-[#1E3A5F]", text: "text-[#A09B8C]" },
  ACTIVE: { bg: "bg-[#0A3622]", text: "text-[#00C853]" },
  COMPLETED: { bg: "bg-[#3C3C41]", text: "text-[#F0E6D2]" },
  CANCELLED: { bg: "bg-[#3D2020]", text: "text-[#5B5A56]" },
};

export default function CircuitDetailPage() {
  const { t } = useTranslation('pages');
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();

  const [circuit, setCircuit] = useState<CircuitDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSeasons, setExpandedSeasons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (slug) {
      loadCircuit();
    }
  }, [slug]);

  const loadCircuit = async () => {
    setIsLoading(true);
    try {
      const data = await circuitService.getBySlug(slug!);
      setCircuit(data);
      // Expand active season by default
      const activeSeason = data.seasons.find((s) => s.status === 'ACTIVE');
      if (activeSeason) {
        setExpandedSeasons(new Set([activeSeason.id]));
      }
    } catch (error) {
      console.error('Failed to load circuit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSeason = (seasonId: string) => {
    setExpandedSeasons((prev) => {
      const next = new Set(prev);
      if (next.has(seasonId)) {
        next.delete(seasonId);
      } else {
        next.add(seasonId);
      }
      return next;
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--tft-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#C8AA6E] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-[var(--tft-text-secondary)]">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="min-h-screen bg-[var(--tft-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-[var(--tft-text-muted)] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--tft-text-primary)] mb-2">
            {t('circuit.notFound')}
          </h2>
          <Link to="/circuits">
            <Button variant="tft-outline">
              {t('circuit.backToList')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--tft-bg-dark)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--tft-border)] bg-[var(--tft-bg-dark)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to={ROUTES.HOME}>
              <TftLogo size="sm" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/tournaments" className="text-[var(--tft-text-secondary)] hover:text-[var(--tft-text-primary)] transition-colors">
                {t('nav.tournaments')}
              </Link>
              <Link to="/circuits" className="text-[#C8AA6E] font-medium">
                {t('nav.circuits')}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {user ? (
              <Link to={ROUTES.DASHBOARD}>
                <Button variant="tft-primary" size="sm">
                  {t('nav.dashboard')}
                </Button>
              </Link>
            ) : (
              <Link to={ROUTES.LOGIN}>
                <Button variant="tft-primary" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Banner */}
      <div className="relative h-64 md:h-80 mt-16">
        {circuit.bannerUrl ? (
          <img
            src={circuit.bannerUrl}
            alt={circuit.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1E3A5F] to-[var(--tft-bg-card)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--tft-bg-dark)] via-[var(--tft-bg-dark)]/50 to-transparent" />
      </div>

      {/* Main Content */}
      <main className="-mt-32 relative z-10 px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Logo */}
            <div className="w-24 h-24 rounded-xl bg-[var(--tft-bg-card)] border-2 border-[rgba(200,170,110,0.3)] overflow-hidden flex-shrink-0">
              {circuit.logoUrl ? (
                <img src={circuit.logoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#C8AA6E] to-[#785A28] flex items-center justify-center text-[#0A1428] font-bold text-3xl">
                  {circuit.name[0]}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-[#C8AA6E] to-[#785A28] text-[#0A1428]">
                  {t(`circuitType.${circuit.circuitType}`)}
                </span>
                <span className="text-sm text-[var(--tft-text-secondary)]">{circuit.year}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--tft-text-primary)] mb-2">
                {circuit.name}
              </h1>
              {circuit.organizer && (
                <p className="text-[var(--tft-text-secondary)]">
                  {t('circuit.organizedBy')} {circuit.organizer.firstName} {circuit.organizer.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 p-4 bg-[var(--tft-bg-darker)] rounded-lg border border-[var(--tft-border)]">
            {circuit.region && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('circuit.region')}</p>
                  <p className="text-sm text-[var(--tft-text-primary)]">{circuit.region.name}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#C8AA6E]" />
              <div>
                <p className="text-xs text-[var(--tft-text-secondary)]">{t('circuit.seasons')}</p>
                <p className="text-sm text-[var(--tft-text-primary)]">{circuit.seasons.length}</p>
              </div>
            </div>
            {circuit.prizePool && (
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('circuit.prizePool')}</p>
                  <p className="text-sm text-[#C8AA6E]">{circuit.prizePool}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {circuit.description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[var(--tft-text-primary)] mb-3">{t('circuit.about')}</h2>
              <p className="text-[var(--tft-text-secondary)] whitespace-pre-line">{circuit.description}</p>
            </div>
          )}

          {/* Seasons */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--tft-text-primary)] mb-4">{t('circuit.seasonsTitle')}</h2>
            <div className="space-y-4">
              {circuit.seasons.map((season) => {
                const isExpanded = expandedSeasons.has(season.id);
                const statusStyle = seasonStatusStyles[season.status] || seasonStatusStyles.UPCOMING;

                return (
                  <div
                    key={season.id}
                    className="bg-[var(--tft-bg-darker)] rounded-lg border border-[var(--tft-border)] overflow-hidden"
                  >
                    {/* Season Header */}
                    <button
                      onClick={() => toggleSeason(season.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-[rgba(200,170,110,0.05)] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <ChevronRight
                          className={`w-5 h-5 text-[#C8AA6E] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                        <div className="text-left">
                          <h3 className="font-semibold text-[var(--tft-text-primary)]">{season.name}</h3>
                          {season.startDate && season.endDate && (
                            <p className="text-sm text-[var(--tft-text-secondary)]">
                              {formatDate(season.startDate)} - {formatDate(season.endDate)}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                        {t(`seasonStatus.${season.status}`)}
                      </span>
                    </button>

                    {/* Season Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-[var(--tft-border)]">
                        {season.description && (
                          <p className="text-sm text-[var(--tft-text-secondary)] mt-4 mb-4">{season.description}</p>
                        )}

                        {season.stages.length > 0 ? (
                          <div className="space-y-3 mt-4">
                            {season.stages.map((stage) => (
                              <div
                                key={stage.id}
                                className="bg-[var(--tft-bg-card)] rounded-lg p-4"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium text-[var(--tft-text-primary)]">{stage.name}</h4>
                                  <span className="text-xs text-[var(--tft-text-secondary)] bg-[rgba(200,170,110,0.1)] px-2 py-1 rounded">
                                    {t(`stageType.${stage.stageType}`)}
                                  </span>
                                </div>

                                {stage.tournaments.length > 0 && (
                                  <div className="space-y-2">
                                    {stage.tournaments.map((tournament) => (
                                      <Link
                                        key={tournament.id}
                                        to={`/tournaments/${tournament.slug}`}
                                        className="flex items-center justify-between p-2 rounded hover:bg-[rgba(200,170,110,0.05)] transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className="text-[var(--tft-text-primary)]">{tournament.name}</span>
                                          <TournamentStatusBadge status={tournament.status} size="sm" />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[var(--tft-text-secondary)]">
                                          <Users className="w-4 h-4" />
                                          <span>
                                            {tournament.currentParticipants}
                                            {tournament.maxParticipants && `/${tournament.maxParticipants}`}
                                          </span>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                )}

                                {stage.tournaments.length === 0 && (
                                  <p className="text-sm text-[var(--tft-text-muted)]">{t('circuit.noTournaments')}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-[var(--tft-text-muted)] mt-4">{t('circuit.noStages')}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
