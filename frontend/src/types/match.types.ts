/**
 * Match types for the application
 */

import type { UserSummary } from './circuit.types';

/**
 * Match status enum
 */
export type MatchStatus = 
  | 'SCHEDULED' 
  | 'CHECK_IN' 
  | 'LOBBY_OPEN' 
  | 'IN_GAME' 
  | 'BETWEEN_GAMES' 
  | 'COMPLETED' 
  | 'CANCELLED';

/**
 * Game status enum
 */
export type GameStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'VOID';

/**
 * Result source enum
 */
export type ResultSource = 'MANUAL' | 'API' | 'SCREENSHOT';

/**
 * Match participant response
 */
export interface MatchParticipant {
  participantId: string;
  displayName: string;
  riotId?: string;
  user?: UserSummary;
  matchPoints: number;
  matchPlacement?: number;
}

/**
 * Match response for lists
 */
export interface MatchListItem {
  id: string;
  name?: string;
  roundNumber?: number;
  lobbyNumber?: number;
  status: MatchStatus;
  scheduledTime?: string;
  actualStartTime?: string;
  endTime?: string;
  streamUrl?: string;
  gamesCount: number;
  participants: MatchParticipant[];
}

/**
 * Match detail response
 */
export interface MatchDetail {
  id: string;
  name?: string;
  roundNumber?: number;
  lobbyNumber?: number;
  status: MatchStatus;
  scheduledTime?: string;
  actualStartTime?: string;
  endTime?: string;
  lobbyCode?: string;
  streamUrl?: string;
  vodUrl?: string;
  notes?: string;
  participants: MatchParticipant[];
  games: GameListItem[];
}

/**
 * Game result response
 */
export interface GameResult {
  id: string;
  participantId: string;
  displayName: string;
  placement: number;
  points: number;
  finalHealth?: number;
  roundsSurvived?: number;
  playersEliminated?: number;
  totalDamageDealt?: number;
  composition?: string;
  augments?: string;
  isValidated: boolean;
  resultSource: ResultSource;
}

/**
 * Game response
 */
export interface GameListItem {
  id: string;
  gameNumber: number;
  status: GameStatus;
  startTime?: string;
  endTime?: string;
  durationSeconds?: number;
  riotMatchId?: string;
  gameSet?: string;
  gamePatch?: string;
  results: GameResult[];
}
