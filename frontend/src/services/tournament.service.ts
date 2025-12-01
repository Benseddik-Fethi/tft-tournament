/**
 * Tournament service for handling tournament-related API calls
 */

import { api } from '@/lib/api';
import type { 
  TournamentListItem, 
  TournamentDetail, 
  TournamentFilters,
  CreateTournamentRequest,
  RegisterTournamentRequest,
} from '@/types/tournament.types';
import type { MatchListItem } from '@/types/match.types';
import type { Standing, Participant } from '@/types/standing.types';

const PUBLIC_BASE_URL = '/public/tournaments';
const AUTH_BASE_URL = '/tournaments';

/**
 * Gets all public tournaments with optional filters
 * @param filters - Optional filters
 * @returns List of tournaments
 */
export const getAll = async (filters?: TournamentFilters): Promise<TournamentListItem[]> => {
  const { data } = await api.get<TournamentListItem[]>(PUBLIC_BASE_URL, { params: filters });
  return data;
};

/**
 * Gets a tournament by its slug
 * @param slug - The tournament slug
 * @returns The tournament detail
 */
export const getBySlug = async (slug: string): Promise<TournamentDetail> => {
  const { data } = await api.get<TournamentDetail>(`${PUBLIC_BASE_URL}/${slug}`);
  return data;
};

/**
 * Gets tournament standings
 * @param slug - The tournament slug
 * @returns List of standings
 */
export const getStandings = async (slug: string): Promise<Standing[]> => {
  const { data } = await api.get<Standing[]>(`${PUBLIC_BASE_URL}/${slug}/standings`);
  return data;
};

/**
 * Gets tournament matches
 * @param slug - The tournament slug
 * @returns List of matches
 */
export const getMatches = async (slug: string): Promise<MatchListItem[]> => {
  const { data } = await api.get<MatchListItem[]>(`${PUBLIC_BASE_URL}/${slug}/matches`);
  return data;
};

/**
 * Gets tournament participants
 * @param slug - The tournament slug
 * @returns List of participants
 */
export const getParticipants = async (slug: string): Promise<Participant[]> => {
  const { data } = await api.get<Participant[]>(`${PUBLIC_BASE_URL}/${slug}/participants`);
  return data;
};

/**
 * Creates a new tournament
 * @param request - The create tournament request
 * @returns The created tournament
 */
export const create = async (request: CreateTournamentRequest): Promise<TournamentDetail> => {
  const { data } = await api.post<TournamentDetail>(AUTH_BASE_URL, request);
  return data;
};

/**
 * Registers to a tournament
 * @param tournamentId - The tournament ID
 * @param request - Optional registration request
 * @returns The participant
 */
export const register = async (tournamentId: string, request?: RegisterTournamentRequest): Promise<Participant> => {
  const { data } = await api.post<Participant>(`${AUTH_BASE_URL}/${tournamentId}/register`, request || {});
  return data;
};

/**
 * Performs check-in for a tournament
 * @param tournamentId - The tournament ID
 * @returns The updated participant
 */
export const checkIn = async (tournamentId: string): Promise<Participant> => {
  const { data } = await api.post<Participant>(`${AUTH_BASE_URL}/${tournamentId}/check-in`);
  return data;
};

export const tournamentService = {
  getAll,
  getBySlug,
  getStandings,
  getMatches,
  getParticipants,
  create,
  register,
  checkIn,
};
