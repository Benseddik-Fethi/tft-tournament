/**
 * Circuit types for the application
 */

import type { Region } from './region.types';
import type { TournamentSummary } from './tournament.types';

/**
 * Circuit type enum
 */
export type CircuitType = 'OFFICIAL' | 'PARTNERED' | 'COMMUNITY' | 'PRIVATE';

/**
 * Season status enum
 */
export type SeasonStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

/**
 * Stage type enum
 */
export type StageType = 'QUALIFIER' | 'FINALS' | 'PLAYOFFS' | 'GROUPS' | 'CUSTOM';

/**
 * Stage status enum
 */
export type StageStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

/**
 * User summary for display
 */
export interface UserSummary {
  id: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

/**
 * Stage response
 */
export interface Stage {
  id: string;
  name: string;
  slug: string;
  stageType: StageType;
  orderIndex: number;
  startDate?: string;
  endDate?: string;
  status: StageStatus;
  qualificationSpots?: number;
  tournaments: TournamentSummary[];
}

/**
 * Season response
 */
export interface Season {
  id: string;
  name: string;
  slug: string;
  startDate?: string;
  endDate?: string;
  status: SeasonStatus;
  orderIndex: number;
  description?: string;
  stages: Stage[];
}

/**
 * Circuit list response for lists
 */
export interface CircuitListItem {
  id: string;
  name: string;
  slug: string;
  region?: Region;
  year: number;
  circuitType: CircuitType;
  logoUrl?: string;
  bannerUrl?: string;
  prizePool?: string;
  isFeatured: boolean;
  activeSeasonName?: string;
}

/**
 * Circuit detail response
 */
export interface CircuitDetail {
  id: string;
  name: string;
  slug: string;
  region?: Region;
  year: number;
  circuitType: CircuitType;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  prizePool?: string;
  isFeatured: boolean;
  organizer?: UserSummary;
  seasons: Season[];
}

/**
 * Circuit filters
 */
export interface CircuitFilters {
  regionId?: string;
  year?: number;
  circuitType?: CircuitType;
}
