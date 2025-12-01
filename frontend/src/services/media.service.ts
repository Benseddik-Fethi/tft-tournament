/**
 * Media service for handling media-related API calls
 */

import { api } from '@/lib/api';
import type {
  Media,
  MediaImportRequest,
  MediaUploadRequest,
  MediaStatusUpdateRequest,
  MediaConsentRequest,
  MediaConsentResponse,
} from '@/types/media.types';

const PUBLIC_BASE_URL = '/public';
const AUTH_BASE_URL = '';

/**
 * Gets all media for a tournament
 * @param tournamentId - The tournament ID
 * @returns List of media
 */
export const getTournamentMedia = async (tournamentId: string): Promise<Media[]> => {
  const { data } = await api.get<Media[]>(`${PUBLIC_BASE_URL}/tournaments/${tournamentId}/media`);
  return data;
};

/**
 * Gets a media by its ID
 * @param id - The media ID
 * @returns The media
 */
export const getById = async (id: string): Promise<Media> => {
  const { data } = await api.get<Media>(`${PUBLIC_BASE_URL}/media/${id}`);
  return data;
};

/**
 * Imports media from Twitch
 * @param tournamentId - The tournament ID
 * @param request - The import request
 * @returns List of imported media
 */
export const importFromTwitch = async (
  tournamentId: string,
  request: MediaImportRequest
): Promise<Media[]> => {
  const { data } = await api.post<Media[]>(
    `${AUTH_BASE_URL}/tournaments/${tournamentId}/media/import`,
    request
  );
  return data;
};

/**
 * Uploads a new media
 * @param tournamentId - The tournament ID
 * @param request - The upload request
 * @returns The created media
 */
export const upload = async (
  tournamentId: string,
  request: MediaUploadRequest
): Promise<Media> => {
  const { data } = await api.post<Media>(
    `${AUTH_BASE_URL}/tournaments/${tournamentId}/media/upload`,
    request
  );
  return data;
};

/**
 * Updates the status of a media (approve/reject)
 * @param mediaId - The media ID
 * @param request - The status update request
 * @returns The updated media
 */
export const updateStatus = async (
  mediaId: string,
  request: MediaStatusUpdateRequest
): Promise<Media> => {
  const { data } = await api.put<Media>(`${AUTH_BASE_URL}/media/${mediaId}/status`, request);
  return data;
};

/**
 * Creates a media consent
 * @param request - The consent request
 * @returns The consent response
 */
export const createConsent = async (request: MediaConsentRequest): Promise<MediaConsentResponse> => {
  const { data } = await api.post<MediaConsentResponse>(`${AUTH_BASE_URL}/media/consent`, request);
  return data;
};

export const mediaService = {
  getTournamentMedia,
  getById,
  importFromTwitch,
  upload,
  updateStatus,
  createConsent,
};
