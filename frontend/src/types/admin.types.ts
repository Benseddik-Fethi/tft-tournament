/**
 * Admin types for the application
 */

/**
 * Audit log response
 */
export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

/**
 * Regenerate pairings response
 */
export interface RegeneratePairingsResponse {
  success: boolean;
  message: string;
  matchesCreated: number;
}
