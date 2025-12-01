/**
 * Region types for the application
 */

/**
 * Region entity representing a geographic region
 */
export interface Region {
  id: string;
  code: string;
  name: string;
  timezone: string;
  servers: string[];
  logoUrl?: string;
}
