/**
 * Centralized export for all services
 */

import * as authServiceModule from './auth.service';
import * as userServiceModule from './user.service';
import * as regionServiceModule from './region.service';
import * as circuitServiceModule from './circuit.service';
import * as tournamentServiceModule from './tournament.service';
import * as matchServiceModule from './match.service';

export const authService = authServiceModule;
export const userService = userServiceModule;
export const regionService = regionServiceModule;
export const circuitService = circuitServiceModule;
export const tournamentService = tournamentServiceModule;
export const matchService = matchServiceModule;

// Export auth service functions for direct imports
export {
  login,
  logout,
  register,
  me,
  verifyEmail,
  resendVerification,
  forgotPassword,
  validateResetToken,
  resetPassword,
} from './auth.service';

// Export user service functions for direct imports
export { getProfile, updateProfile, updatePassword, updateLanguage } from './user.service';
