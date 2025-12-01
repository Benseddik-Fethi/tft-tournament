/**
 * Admin service for handling admin-related API calls
 */

import { api } from '@/lib/api';
import type { AuditLog, RegeneratePairingsResponse } from '@/types/admin.types';

/**
 * Gets audit logs for a tournament
 * @param tournamentId - The tournament ID
 * @returns List of audit logs
 */
export const getTournamentAuditLogs = async (tournamentId: string): Promise<AuditLog[]> => {
  const { data } = await api.get<AuditLog[]>(`/tournaments/${tournamentId}/audit`);
  return data;
};

/**
 * Regenerates pairings for a tournament
 * @param tournamentId - The tournament ID
 * @returns The regenerate pairings response
 */
export const regeneratePairings = async (
  tournamentId: string
): Promise<RegeneratePairingsResponse> => {
  const { data } = await api.post<RegeneratePairingsResponse>(
    `/admin/tournaments/${tournamentId}/regenerate-pairings`
  );
  return data;
};

export const adminService = {
  getTournamentAuditLogs,
  regeneratePairings,
};
