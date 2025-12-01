/**
 * Match service for handling match-related API calls
 */

import { api } from '@/lib/api';
import type { MatchDetail, GameListItem } from '@/types/match.types';

const PUBLIC_BASE_URL = '/public/matches';

/**
 * Gets a match by its ID
 * @param id - The match ID
 * @returns The match detail
 */
export const getById = async (id: string): Promise<MatchDetail> => {
  const { data } = await api.get<MatchDetail>(`${PUBLIC_BASE_URL}/${id}`);
  return data;
};

/**
 * Gets games for a match
 * @param id - The match ID
 * @returns List of games
 */
export const getGames = async (id: string): Promise<GameListItem[]> => {
  const { data } = await api.get<GameListItem[]>(`${PUBLIC_BASE_URL}/${id}/games`);
  return data;
};

export const matchService = {
  getById,
  getGames,
};
