/**
 * Generic API types for error handling and responses
 */

/**
 * Standard API error structure (legacy)
 */
export interface ApiError {
  message: string;
  code?: string;
  status: number;
  timestamp?: string;
}

/**
 * API error field detail (spec compliant)
 */
export interface ApiErrorFieldDetail {
  field: string;
  message: string;
}

/**
 * API error inner object (spec compliant)
 */
export interface ApiErrorInner {
  code: string;
  message: string;
  details?: ApiErrorFieldDetail[];
  traceId: string;
}

/**
 * Standardized API error response (spec compliant)
 */
export interface ApiErrorResponse {
  error: ApiErrorInner;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
