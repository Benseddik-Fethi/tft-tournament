/**
 * Participant service for handling participant-related API calls
 */

import { api } from '@/lib/api';

const BASE_URL = '/participants';

/**
 * Deletes a participant from a tournament
 * @param participantId - The participant ID
 * @returns void
 */
export const deleteParticipant = async (participantId: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${participantId}`);
};

export const participantService = {
  deleteParticipant,
};
