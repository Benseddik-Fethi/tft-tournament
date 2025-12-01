/**
 * Tournaments List Page
 * Displays a grid of tournaments with filters
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, Trophy, ChevronDown } from "lucide-react";
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
    <div className="min-h-screen bg-[#0A1428]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(200,170,110,0.1)] bg-[#0A1428]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to={ROUTES.HOME}>
              <TftLogo size="sm" />
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
                className="text-[#A09B8C] hover:text-[#F0E6D2] transition-colors"
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
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-[#C8AA6E]" />
              <h1 className="text-3xl font-bold text-[#F0E6D2]">
                {t('tournaments.title')}
              </h1>
            </div>
            <p className="text-[#A09B8C]">
              {t('tournaments.subtitle')}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5B5A56]" />
                <Input
                  type="text"
                  placeholder={t('tournaments.searchPlaceholder')}
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-[#0A1929] border-[rgba(200,170,110,0.2)] text-[#F0E6D2] placeholder:text-[#5B5A56]"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="tft-outline"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                {t('tournaments.filters')}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="flex flex-wrap gap-4 p-4 bg-[#091428] rounded-lg border border-[rgba(200,170,110,0.1)]">
                {/* Region Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-[#A09B8C] mb-2">
                    {t('tournaments.filterRegion')}
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => handleRegionChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A1929] border border-[rgba(200,170,110,0.2)] rounded text-[#F0E6D2]"
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
                  <label className="block text-sm text-[#A09B8C] mb-2">
                    {t('tournaments.filterStatus')}
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value as TournamentStatus | '')}
                    className="w-full px-3 py-2 bg-[#0A1929] border border-[rgba(200,170,110,0.2)] rounded text-[#F0E6D2]"
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
            )}
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-2 border-[#C8AA6E] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-[#A09B8C]">{t('loading')}</p>
            </div>
          ) : tournaments.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="w-16 h-16 text-[#5B5A56] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#F0E6D2] mb-2">
                {t('tournaments.noResults')}
              </h3>
              <p className="text-[#A09B8C]">
                {t('tournaments.noResultsHint')}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#A09B8C] mb-4">
                {t('tournaments.resultsCount', { count: tournaments.length })}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
