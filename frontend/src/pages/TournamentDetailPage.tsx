/**
 * Tournament Detail Page
 * Premium page with glassmorphism tabs and Hextech design
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Calendar, Users, Trophy, ExternalLink, Clock } from "lucide-react";
import { motion } from "motion/react";
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
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block w-8 h-8 border-2 border-[#C8AA6E] border-t-transparent rounded-full"
          />
          <p className="mt-4 text-[var(--tft-text-secondary)]">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-[var(--tft-bg-dark)] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-16 h-16 text-[var(--tft-text-muted)] mx-auto mb-4" />
          </motion.div>
          <h2 className="text-xl font-semibold text-[var(--tft-text-primary)] mb-2">
            {t('tournament.notFound')}
          </h2>
          <Link to="/tournaments">
            <Button variant="tft-ghost">
              {t('tournament.backToList')}
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const canRegister = tournament.status === 'REGISTRATION_OPEN' && user;

  return (
    <div className="min-h-screen bg-[var(--tft-bg-dark)]">
      {/* Navigation with Glass effect */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to={ROUTES.HOME}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <TftLogo size="sm" />
              </motion.div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/tournaments" className="text-[var(--tft-text-secondary)] hover:text-[#C8AA6E] transition-colors font-medium">
                {t('nav.tournaments')}
              </Link>
              <Link to="/circuits" className="text-[var(--tft-text-secondary)] hover:text-[#C8AA6E] transition-colors font-medium">
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

      {/* Banner with parallax-like effect */}
      <div className="relative h-64 md:h-80 mt-16 overflow-hidden">
        {tournament.bannerUrl ? (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
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
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="tft-primary"
                    size="lg"
                    onClick={handleRegister}
                    disabled={isRegistering}
                  >
                    {isRegistering ? t('tournament.registering') : t('tournament.register')}
                  </Button>
                </motion.div>
              )}
              {tournament.streamUrl && (
                <a href={tournament.streamUrl} target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="tft-ghost" size="lg" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('tournament.watchLive')}
                    </Button>
                  </motion.div>
                </a>
              )}
            </div>
          </div>

          {/* Quick Info with Glass card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 glass-card rounded-xl"
          >
            {tournament.startDate && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-2"
              >
                <Calendar className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.startDate')}</p>
                  <p className="text-sm text-[var(--tft-text-primary)]">{formatDate(tournament.startDate)}</p>
                </div>
              </motion.div>
            )}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 p-2"
            >
              <Users className="w-5 h-5 text-[#C8AA6E]" />
              <div>
                <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.participants')}</p>
                <p className="text-sm text-[var(--tft-text-primary)]">
                  {tournament.currentParticipants}
                  {tournament.maxParticipants && ` / ${tournament.maxParticipants}`}
                </p>
              </div>
            </motion.div>
            {tournament.prizePool && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-2"
              >
                <Trophy className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.prizePool')}</p>
                  <p className="text-sm text-[#C8AA6E] font-medium">{tournament.prizePool}</p>
                </div>
              </motion.div>
            )}
            {tournament.checkInStart && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-2"
              >
                <Clock className="w-5 h-5 text-[#C8AA6E]" />
                <div>
                  <p className="text-xs text-[var(--tft-text-secondary)]">{t('tournament.checkIn')}</p>
                  <p className="text-sm text-[var(--tft-text-primary)]">{formatTime(tournament.checkInStart)}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Tabs with Glass styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start glass-card p-1.5 rounded-xl mb-6">
                <TabsTrigger
                  value="info"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(200,170,110,0.2)] data-[state=active]:to-transparent data-[state=active]:text-[#C8AA6E] data-[state=active]:shadow-[0_0_10px_rgba(200,170,110,0.2)] rounded-lg transition-all"
                >
                  {t('tournament.tabs.info')}
                </TabsTrigger>
                <TabsTrigger
                  value="participants"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(200,170,110,0.2)] data-[state=active]:to-transparent data-[state=active]:text-[#C8AA6E] data-[state=active]:shadow-[0_0_10px_rgba(200,170,110,0.2)] rounded-lg transition-all"
                >
                  {t('tournament.tabs.participants')}
                </TabsTrigger>
                <TabsTrigger
                  value="standings"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(200,170,110,0.2)] data-[state=active]:to-transparent data-[state=active]:text-[#C8AA6E] data-[state=active]:shadow-[0_0_10px_rgba(200,170,110,0.2)] rounded-lg transition-all"
                >
                  {t('tournament.tabs.standings')}
                </TabsTrigger>
                <TabsTrigger
                  value="matches"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(200,170,110,0.2)] data-[state=active]:to-transparent data-[state=active]:text-[#C8AA6E] data-[state=active]:shadow-[0_0_10px_rgba(200,170,110,0.2)] rounded-lg transition-all"
                >
                  {t('tournament.tabs.matches')}
                </TabsTrigger>
              </TabsList>

              {/* Info Tab */}
              <TabsContent value="info" className="mt-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 glass-card p-6 rounded-xl"
                >
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
                      <motion.a
                        whileHover={{ x: 4 }}
                        href={tournament.discordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5865F2] hover:underline flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t('tournament.joinDiscord')}
                      </motion.a>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              {/* Participants Tab */}
              <TabsContent value="participants" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ParticipantsList participants={participants} />
                </motion.div>
              </TabsContent>

              {/* Standings Tab */}
              <TabsContent value="standings" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <StandingsTable standings={standings} />
                </motion.div>
              </TabsContent>

              {/* Matches Tab */}
              <TabsContent value="matches" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {matches.length === 0 ? (
                    <div className="text-center py-8 text-[var(--tft-text-secondary)] glass-card rounded-xl">
                      {t('tournament.noMatches')}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {matches.map((match, index) => (
                        <motion.div
                          key={match.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <MatchCard match={match} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
