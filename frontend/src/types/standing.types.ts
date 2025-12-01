/**
 * Standing types for the application
 */

import type { UserSummary } from './circuit.types';

/**
 * Participant status enum
 */
export type ParticipantStatus = 
  | 'REGISTERED' 
  | 'CONFIRMED' 
  | 'CHECKED_IN' 
  | 'PLAYING' 
  | 'ELIMINATED' 
  | 'DISQUALIFIED' 
  | 'WINNER';

/**
 * Participant response
 */
export interface Participant {
  id: string;
  user?: UserSummary;
  displayName?: string;
  riotId?: string;
  status: ParticipantStatus;
  seed?: number;
  totalPoints: number;
  gamesPlayed: number;
  wins: number;
  top4Count: number;
  averagePlacement?: number;
  bestPlacement?: number;
  worstPlacement?: number;
  registeredAt?: string;
  checkedInAt?: string;
  finalRank?: number;
}

/**
 * Standing response
 */
export interface Standing {
  rank: number;
  participant: Participant;
  totalPoints: number;
  gamesPlayed: number;
  wins: number;
  top4Count: number;
  averagePlacement?: number;
  bestPlacement?: number;
  worstPlacement?: number;
  placementHistory?: string;
}
