/**
 * Circuits List Page
 * Displays circuits with filtering by region
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircuitCard } from "@/components/circuit";
import { TftLogo } from "@/components/tft/TftLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { circuitService } from "@/services/circuit.service";
import { regionService } from "@/services/region.service";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/config";
import type { CircuitListItem, CircuitFilters } from "@/types/circuit.types";
import type { Region } from "@/types/region.types";

export default function CircuitsPage() {
  const { t } = useTranslation('pages');
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [circuits, setCircuits] = useState<CircuitListItem[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>(searchParams.get('region') || '');

  useEffect(() => {
    loadRegions();
  }, []);

  useEffect(() => {
    loadCircuits();
  }, [selectedRegion]);

  const loadRegions = async () => {
    try {
      const data = await regionService.getAll();
      setRegions(data);
    } catch (error) {
      console.error('Failed to load regions:', error);
    }
  };

  const loadCircuits = async () => {
    setIsLoading(true);
    try {
      const filters: CircuitFilters = {};
      if (selectedRegion) filters.regionId = selectedRegion;

      const data = await circuitService.getAll(filters);
      setCircuits(data);
    } catch (error) {
      console.error('Failed to load circuits:', error);
    } finally {
      setIsLoading(false);
    }
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
              <Link
                to="/tournaments"
                className="text-[var(--tft-text-secondary)] hover:text-[var(--tft-text-primary)] transition-colors"
              >
                {t('nav.tournaments')}
              </Link>
              <Link
                to="/circuits"
                className="text-[#C8AA6E] font-medium"
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
              <Layers className="w-8 h-8 text-[#C8AA6E]" />
              <h1 className="text-3xl font-bold text-[var(--tft-text-primary)]">
                {t('circuits.title')}
              </h1>
            </div>
            <p className="text-[var(--tft-text-secondary)]">
              {t('circuits.subtitle')}
            </p>
          </div>

          {/* Region Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => handleRegionChange('')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedRegion === ''
                  ? 'bg-[#C8AA6E] text-[#0A1428]'
                  : 'bg-[rgba(200,170,110,0.1)] text-[var(--tft-text-primary)] hover:bg-[rgba(200,170,110,0.2)]'
              }`}
            >
              <Globe className="w-4 h-4 inline-block mr-2" />
              {t('circuits.allRegions')}
            </button>
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionChange(region.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedRegion === region.id
                    ? 'bg-[#C8AA6E] text-[#0A1428]'
                    : 'bg-[rgba(200,170,110,0.1)] text-[var(--tft-text-primary)] hover:bg-[rgba(200,170,110,0.2)]'
                }`}
              >
                {region.code}
              </button>
            ))}
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-2 border-[#C8AA6E] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-[var(--tft-text-secondary)]">{t('loading')}</p>
            </div>
          ) : circuits.length === 0 ? (
            <div className="text-center py-16">
              <Layers className="w-16 h-16 text-[var(--tft-text-muted)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--tft-text-primary)] mb-2">
                {t('circuits.noResults')}
              </h3>
              <p className="text-[var(--tft-text-secondary)]">
                {t('circuits.noResultsHint')}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--tft-text-secondary)] mb-4">
                {t('circuits.resultsCount', { count: circuits.length })}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {circuits.map((circuit) => (
                  <CircuitCard key={circuit.id} circuit={circuit} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
