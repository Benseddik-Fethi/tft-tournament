/**
 * Circuit service for handling circuit-related API calls
 */

import { api } from '@/lib/api';
import type { CircuitListItem, CircuitDetail, CircuitFilters } from '@/types/circuit.types';

const PUBLIC_BASE_URL = '/public/circuits';
const AUTH_BASE_URL = '/circuits';

/**
 * Gets all circuits with optional filters
 * @param filters - Optional filters
 * @returns List of circuits
 */
export const getAll = async (filters?: CircuitFilters): Promise<CircuitListItem[]> => {
  const { data } = await api.get<CircuitListItem[]>(PUBLIC_BASE_URL, { params: filters });
  return data;
};

/**
 * Gets a circuit by its slug
 * @param slug - The circuit slug
 * @returns The circuit detail
 */
export const getBySlug = async (slug: string): Promise<CircuitDetail> => {
  const { data } = await api.get<CircuitDetail>(`${PUBLIC_BASE_URL}/${slug}`);
  return data;
};

/**
 * Gets circuits for the authenticated user
 * @returns List of user's circuits
 */
export const getMyCircuits = async (): Promise<CircuitListItem[]> => {
  const { data } = await api.get<CircuitListItem[]>(AUTH_BASE_URL);
  return data;
};

export const circuitService = {
  getAll,
  getBySlug,
  getMyCircuits,
};
