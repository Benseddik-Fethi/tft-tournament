/**
 * Media types for the application
 */

/**
 * Media type enum
 */
export type MediaType = 'TWITCH_VOD' | 'TWITCH_CLIP' | 'UPLOAD' | 'YOUTUBE' | 'SCREENSHOT' | 'OTHER';

/**
 * Media status enum
 */
export type MediaStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

/**
 * Consent method enum
 */
export type ConsentMethod = 'OAUTH_TWITCH' | 'MANUAL' | 'EMAIL' | 'IMPLICIT';

/**
 * Caster information
 */
export interface CasterInfo {
  id: string;
  displayName: string;
}

/**
 * Media response
 */
export interface Media {
  id: string;
  caster?: CasterInfo;
  type: MediaType;
  title: string;
  description?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  matchId?: string;
  status: MediaStatus;
  createdAt: string;
}

/**
 * Media import request
 */
export interface MediaImportRequest {
  twitchChannelId: string;
  since: string;
  until: string;
  autoApprove?: boolean;
}

/**
 * Media upload request
 */
export interface MediaUploadRequest {
  title: string;
  description?: string;
  type: MediaType;
  sourceUrl?: string;
  matchId?: string;
}

/**
 * Media status update request
 */
export interface MediaStatusUpdateRequest {
  status: MediaStatus;
  moderatorId?: string;
  comment?: string;
}

/**
 * Media consent request
 */
export interface MediaConsentRequest {
  casterId: string;
  tournamentId: string;
  consentMethod: ConsentMethod;
  proofUrl?: string;
}

/**
 * Media consent response
 */
export interface MediaConsentResponse {
  id: string;
  casterId: string;
  tournamentId: string;
  consentMethod: string;
  isActive: boolean;
}
