/**
 * Tournament types for the application
 */

import type { Region } from './region.types';
import type { UserSummary } from './circuit.types';

/**
 * Tournament type enum
 */
export type TournamentType = 'OFFICIAL' | 'COMMUNITY' | 'PRIVATE' | 'SHOWMATCH';

/**
 * Tournament status enum
 */
export type TournamentStatus = 
  | 'DRAFT' 
  | 'REGISTRATION_OPEN' 
  | 'REGISTRATION_CLOSED' 
  | 'CHECK_IN' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED';

/**
 * Phase type enum
 */
export type PhaseType = 'GROUPS' | 'SWISS' | 'BRACKET' | 'SINGLE_LOBBY' | 'CUSTOM';

/**
 * Phase status enum
 */
export type PhaseStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

/**
 * Tournament format type enum
 */
export type TournamentFormatType = 
  | 'SWISS' 
  | 'ROUND_ROBIN' 
  | 'DOUBLE_LOBBY_ROUND_ROBIN'
  | 'GSL_GROUPS'
  | 'POINT_BASED'
  | 'SINGLE_ELIMINATION'
  | 'DOUBLE_ELIMINATION'
  | 'CHECKMATE'
  | 'SET_CHECKMATE'
  | 'LAST_CHANCE'
  | 'CUTOFF'
  | 'LOBBY_KING'
  | 'GAUNTLET'
  | 'MARATHON'
  | 'CUSTOM';

/**
 * Tournament phase response
 */
export interface TournamentPhase {
  id: string;
  name: string;
  phaseType: PhaseType;
  formatType: TournamentFormatType;
  orderIndex: number;
  status: PhaseStatus;
  startDate?: string;
  endDate?: string;
  gamesPerRound?: number;
  totalRounds?: number;
  playersPerLobby: number;
  advancingCount?: number;
  eliminatedCount?: number;
}

/**
 * Tournament summary for lists
 */
export interface TournamentSummary {
  id: string;
  name: string;
  slug: string;
  tournamentType: TournamentType;
  status: TournamentStatus;
  startDate?: string;
  maxParticipants?: number;
  currentParticipants: number;
}

/**
 * Tournament list response for lists
 */
export interface TournamentListItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  tournamentType: TournamentType;
  status: TournamentStatus;
  registrationStart?: string;
  registrationEnd?: string;
  startDate?: string;
  endDate?: string;
  maxParticipants?: number;
  currentParticipants: number;
  isTeamBased: boolean;
  teamSize?: number;
  logoUrl?: string;
  bannerUrl?: string;
  prizePool?: string;
  region?: Region;
  organizer?: UserSummary;
}

/**
 * Tournament detail response
 */
export interface TournamentDetail {
  id: string;
  name: string;
  slug: string;
  description?: string;
  tournamentType: TournamentType;
  status: TournamentStatus;
  registrationStart?: string;
  registrationEnd?: string;
  checkInStart?: string;
  checkInEnd?: string;
  startDate?: string;
  endDate?: string;
  maxParticipants?: number;
  currentParticipants: number;
  minParticipants?: number;
  isTeamBased: boolean;
  teamSize?: number;
  logoUrl?: string;
  bannerUrl?: string;
  prizePool?: string;
  prizeDistribution?: string;
  customRules?: string;
  streamUrl?: string;
  discordUrl?: string;
  format?: string;
  rulesJson?: string;
  allowMedia?: boolean;
  region?: Region;
  organizer?: UserSummary;
  phases: TournamentPhase[];
}

/**
 * Tournament filters
 */
export interface TournamentFilters {
  regionId?: string;
  status?: TournamentStatus;
  tournamentType?: TournamentType;
  search?: string;
}

/**
 * Tournament rules
 */
export interface TournamentRules {
  scoring?: string;
  rounds?: number;
  playersPerMatch?: number;
}

/**
 * Create tournament request
 */
export interface CreateTournamentRequest {
  name: string;
  description?: string;
  tournamentType: TournamentType;
  registrationStart?: string;
  registrationEnd?: string;
  checkInStart?: string;
  checkInEnd?: string;
  startDate?: string;
  endDate?: string;
  maxParticipants?: number;
  minParticipants?: number;
  isTeamBased?: boolean;
  teamSize?: number;
  prizePool?: string;
  prizeDistribution?: string;
  customRules?: string;
  streamUrl?: string;
  discordUrl?: string;
  regionId?: string;
  stageId?: string;
  format?: string;
  rules?: TournamentRules;
  allowMedia?: boolean;
}

/**
 * Register tournament request
 */
export interface RegisterTournamentRequest {
  displayName?: string;
  riotId?: string;
}
