/**
 * Tournaments List Page
 * Premium page with glassmorphism cards and filters
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, Trophy, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TournamentCard } from "@/components/tournament";
import { TftLogo } from "@/components/tft/TftLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { tournamentService } from "@/services/tournament.service";
import { regionService } from "@/services/region.service";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/config";
import type { TournamentListItem, TournamentStatus, TournamentFilters } from "@/types/tournament.types";
import type { Region } from "@/types/region.types";

export default function TournamentsListPage() {
  const { t } = useTranslation('pages');
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [tournaments, setTournaments] = useState<TournamentListItem[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedRegion, setSelectedRegion] = useState<string>(searchParams.get('region') || '');
  const [selectedStatus, setSelectedStatus] = useState<TournamentStatus | ''>(
    (searchParams.get('status') as TournamentStatus) || ''
  );
  const [showFilters, setShowFilters] = useState(false);

  const statuses: TournamentStatus[] = [
    'REGISTRATION_OPEN',
    'REGISTRATION_CLOSED',
    'CHECK_IN',
    'IN_PROGRESS',
    'COMPLETED',
  ];

  useEffect(() => {
    loadRegions();
  }, []);

  useEffect(() => {
    loadTournaments();
  }, [selectedRegion, selectedStatus, search]);

  const loadRegions = async () => {
    try {
      const data = await regionService.getAll();
      setRegions(data);
    } catch (error) {
      console.error('Failed to load regions:', error);
    }
  };

  const loadTournaments = async () => {
    setIsLoading(true);
    try {
      const filters: TournamentFilters = {};
      if (selectedRegion) filters.regionId = selectedRegion;
      if (selectedStatus) filters.status = selectedStatus;
      if (search) filters.search = search;

      const data = await tournamentService.getAll(filters);
      setTournaments(data);
    } catch (error) {
      console.error('Failed to load tournaments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    const params = new URLSearchParams(searchParams);
    if (regionId) {
      params.set('region', regionId);
    } else {
      params.delete('region');
    }
    setSearchParams(params);
  };

  const handleStatusChange = (status: TournamentStatus | '') => {
    setSelectedStatus(status);
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    setSearchParams(params);
  };

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
              <Link
                to="/tournaments"
                className="text-[#C8AA6E] font-medium"
              >
                {t('nav.tournaments')}
              </Link>
              <Link
                to="/circuits"
                className="text-[var(--tft-text-secondary)] hover:text-[#C8AA6E] transition-colors font-medium"
              >
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
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="tft-ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="tft-primary" size="sm">
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6 relative">
        {/* Background gradient */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C8AA6E]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#0AC8B9]/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="p-2 rounded-lg bg-gradient-to-br from-[#C8AA6E] to-[#785A28]"
              >
                <Trophy className="w-6 h-6 text-[#0A1428]" />
              </motion.div>
              <h1 className="text-3xl font-bold text-[var(--tft-text-primary)]">
                {t('tournaments.title')}
              </h1>
            </div>
            <p className="text-[var(--tft-text-secondary)]">
              {t('tournaments.subtitle')}
            </p>
          </motion.div>

          {/* Search and Filters with Glass styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search with glass input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--tft-text-muted)]" />
                <Input
                  type="text"
                  placeholder={t('tournaments.searchPlaceholder')}
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 h-11 glass-card border-[var(--glass-border)] text-[var(--tft-text-primary)] placeholder:text-[var(--tft-text-muted)] focus:border-[#C8AA6E] focus:shadow-[0_0_16px_rgba(200,170,110,0.2)]"
                />
              </div>

              {/* Filter Toggle */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="tft-ghost"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:w-auto h-11"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t('tournaments.filters')}
                  <motion.div
                    animate={{ rotate: showFilters ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>

            {/* Filters Panel with Glass effect */}
            <motion.div
              initial={false}
              animate={{ 
                height: showFilters ? 'auto' : 0,
                opacity: showFilters ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-4 p-4 glass-card rounded-xl">
                {/* Region Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-[var(--tft-text-secondary)] mb-2 font-medium">
                    {t('tournaments.filterRegion')}
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => handleRegionChange(e.target.value)}
                    className="w-full px-3 py-2 glass-card border border-[var(--glass-border)] rounded-lg text-[var(--tft-text-primary)] focus:border-[#C8AA6E] focus:outline-none transition-colors"
                  >
                    <option value="">{t('tournaments.allRegions')}</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-[var(--tft-text-secondary)] mb-2 font-medium">
                    {t('tournaments.filterStatus')}
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value as TournamentStatus | '')}
                    className="w-full px-3 py-2 glass-card border border-[var(--glass-border)] rounded-lg text-[var(--tft-text-primary)] focus:border-[#C8AA6E] focus:outline-none transition-colors"
                  >
                    <option value="">{t('tournaments.allStatuses')}</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {t(`tournamentStatus.${status}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-16">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-8 h-8 border-2 border-[#C8AA6E] border-t-transparent rounded-full"
              />
              <p className="mt-4 text-[var(--tft-text-secondary)]">{t('loading')}</p>
            </div>
          ) : tournaments.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-16 h-16 text-[var(--tft-text-muted)] mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[var(--tft-text-primary)] mb-2">
                {t('tournaments.noResults')}
              </h3>
              <p className="text-[var(--tft-text-secondary)]">
                {t('tournaments.noResultsHint')}
              </p>
            </motion.div>
          ) : (
            <>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[var(--tft-text-secondary)] mb-4"
              >
                {t('tournaments.resultsCount', { count: tournaments.length })}
              </motion.p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament, index) => (
                  <motion.div
                    key={tournament.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <TournamentCard tournament={tournament} featured={index === 0} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
