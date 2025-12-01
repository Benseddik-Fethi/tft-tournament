/**
 * Region service for handling region-related API calls
 */

import { api } from '@/lib/api';
import type { Region } from '@/types/region.types';

const BASE_URL = '/public/regions';

/**
 * Gets all active regions
 * @returns List of active regions
 */
export const getAll = async (): Promise<Region[]> => {
  const { data } = await api.get<Region[]>(BASE_URL);
  return data;
};

/**
 * Gets a region by its code
 * @param code - The region code
 * @returns The region
 */
export const getByCode = async (code: string): Promise<Region> => {
  const { data } = await api.get<Region>(`${BASE_URL}/${code}`);
  return data;
};

export const regionService = {
  getAll,
  getByCode,
};
