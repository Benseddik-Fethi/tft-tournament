/**
 * Tournament Detail Page
 * Displays full tournament details with tabs
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Calendar, Users, Trophy, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TournamentStatusBadge, StandingsTable, MatchCard, ParticipantsList } from "@/components/tournament";
import { TftLogo } from "@/components/tft/TftLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { tournamentService } from "@/services/tournament.service";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/config";
import type { TournamentDetail } from "@/types/tournament.types";
import type { MatchListItem } from "@/types/match.types";
import type { Standing, Participant } from "@/types/standing.types";

export default function TournamentDetailPage() {
  const { t } = useTranslation('pages');
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();

  const [tournament, setTournament] = useState<TournamentDetail | null>(null);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [matches, setMatches] = useState<MatchListItem[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (slug) {
      loadTournament();
    }
  }, [slug]);

  useEffect(() => {
    if (slug && activeTab === 'standings') {
      loadStandings();
    }
    if (slug && activeTab === 'matches') {
      loadMatches();
    }
    if (slug && activeTab === 'participants') {
      loadParticipants();
    }
  }, [slug, activeTab]);

  const loadTournament = async () => {
    setIsLoading(true);
    try {
      const data = await tournamentService.getBySlug(slug!);
      setTournament(data);
    } catch (error) {
      console.error('Failed to load tournament:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStandings = async () => {
    try {
      const data = await tournamentService.getStandings(slug!);
      setStandings(data);
    } catch (error) {
      console.error('Failed to load standings:', error);
    }
  };

  const loadMatches = async () => {
    try {
      const data = await tournamentService.getMatches(slug!);
      setMatches(data);
    } catch (error) {
      console.error('Failed to load matches:', error);
    }
  };

  const loadParticipants = async () => {
    try {
      const data = await tournamentService.getParticipants(slug!);
      setParticipants(data);
    } catch (error) {
      console.error('Failed to load participants:', error);
    }
  };

  const handleRegister = async () => {
    if (!user || !tournament) return;
    
    setIsRegistering(true);
    try {
      await tournamentService.register(tournament.id);
      loadTournament(); // Reload to update participant count
      setActiveTab('participants');
    } catch (error) {
      console.error('Failed to register:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
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

  if (!tournament) {
    return (
      <div className="min-h-screen bg-[var(--tft-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-[var(--tft-text-muted)] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--tft-text-primary)] mb-2">
            {t('tournament.notFound')}
          </h2>
          <Link to="/tournaments">
            <Button variant="tft-outline">
              {t('tournament.backToList')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const canRegister = tournament.status === 'REGISTRATION_OPEN' && user;

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
              <Link to="/circuits" className="text-[var(--tft-text-secondary)] hover:text-[var(--tft-text-primary)] transition-colors">
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
        {tournament.bannerUrl ? (
          <img
            src={tournament.bannerUrl}
            alt={tournament.name}
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
            {tournament.logoUrl && (
              <div className="w-24 h-24 rounded-xl bg-[var(--tft-bg-card)] border-2 border-[rgba(200,170,110,0.3)] overflow-hidden flex-shrink-0">
                <img src={tournament.logoUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <TournamentStatusBadge status={tournament.status} />
                {tournament.region && (
                  <span className="text-sm text-[var(--tft-text-secondary)] bg-[rgba(200,170,110,0.1)] px-2 py-1 rounded">
                    {tournament.region.name}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--tft-text-primary)] mb-2">
                {tournament.name}
              </h1>
              {tournament.organizer && (
                <p className="text-[var(--tft-text-secondary)]">
                  {t('tournament.organizedBy')} {tournament.organizer.firstName} {tournament.organizer.lastName}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {canRegister && (
                <Button
                  variant="tft-primary"
                  size="lg"
                  onClick={handleRegister}
                  disabled={isRegistering}
                >
                  {isRegistering ? t('tournament.registering') : t('tournament.register')}
                </Button>
              )}
              {tournament.streamUrl && (
                <a href={tournament.streamUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="tft-outline" size="lg" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('tournament.watchLive')}
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-[var(--tft-bg-darker)] rounded-lg border border-[var(--tft-border)]">
            {tournament.startDate && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.startDate')}</p>
                  <p className="text-sm text-[var(--tft-text-primary)]">{formatDate(tournament.startDate)}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#C8AA6E]" />
              <div>
                <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.participants')}</p>
                <p className="text-sm text-[var(--tft-text-primary)]">
                  {tournament.currentParticipants}
                  {tournament.maxParticipants && ` / ${tournament.maxParticipants}`}
                </p>
              </div>
            </div>
            {tournament.prizePool && (
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.prizePool')}</p>
                  <p className="text-sm text-[#C8AA6E]">{tournament.prizePool}</p>
                </div>
              </div>
            )}
            {tournament.checkInStart && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.checkIn')}</p>
                  <p className="text-sm text-[var(--tft-text-primary)]">{formatTime(tournament.checkInStart)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-[var(--tft-bg-darker)] border border-[var(--tft-border)] p-1 rounded-lg">
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-[rgba(200,170,110,0.1)] data-[state=active]:text-[#C8AA6E]"
              >
                {t('tournament.tabs.info')}
              </TabsTrigger>
              <TabsTrigger
                value="participants"
                className="data-[state=active]:bg-[rgba(200,170,110,0.1)] data-[state=active]:text-[#C8AA6E]"
              >
                {t('tournament.tabs.participants')}
              </TabsTrigger>
              <TabsTrigger
                value="standings"
                className="data-[state=active]:bg-[rgba(200,170,110,0.1)] data-[state=active]:text-[#C8AA6E]"
              >
                {t('tournament.tabs.standings')}
              </TabsTrigger>
              <TabsTrigger
                value="matches"
                className="data-[state=active]:bg-[rgba(200,170,110,0.1)] data-[state=active]:text-[#C8AA6E]"
              >
                {t('tournament.tabs.matches')}
              </TabsTrigger>
            </TabsList>

            {/* Info Tab */}
            <TabsContent value="info" className="mt-6">
              <div className="space-y-6">
                {tournament.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--tft-text-primary)] mb-2">
                      {t('tournament.description')}
                    </h3>
                    <p className="text-[var(--tft-text-secondary)] whitespace-pre-line">{tournament.description}</p>
                  </div>
                )}

                {tournament.customRules && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--tft-text-primary)] mb-2">
                      {t('tournament.rules')}
                    </h3>
                    <p className="text-[var(--tft-text-secondary)] whitespace-pre-line">{tournament.customRules}</p>
                  </div>
                )}

                {tournament.prizeDistribution && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--tft-text-primary)] mb-2">
                      {t('tournament.prizeDistribution')}
                    </h3>
                    <p className="text-[var(--tft-text-secondary)] whitespace-pre-line">{tournament.prizeDistribution}</p>
                  </div>
                )}

                {tournament.discordUrl && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--tft-text-primary)] mb-2">
                      {t('tournament.discord')}
                    </h3>
                    <a
                      href={tournament.discordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5865F2] hover:underline flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('tournament.joinDiscord')}
                    </a>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="mt-6">
              <ParticipantsList participants={participants} />
            </TabsContent>

            {/* Standings Tab */}
            <TabsContent value="standings" className="mt-6">
              <StandingsTable standings={standings} />
            </TabsContent>

            {/* Matches Tab */}
            <TabsContent value="matches" className="mt-6">
              {matches.length === 0 ? (
                <div className="text-center py-8 text-[var(--tft-text-secondary)]">
                  {t('tournament.noMatches')}
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
