package com.tft.tournament.domain.enums;

/**
 * Méthode de consentement pour l'utilisation des médias.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public enum ConsentMethod {
    /**
     * Consentement via OAuth Twitch.
     */
    OAUTH_TWITCH,

    /**
     * Consentement manuel (formulaire).
     */
    MANUAL,

    /**
     * Consentement par email.
     */
    EMAIL,

    /**
     * Consentement implicite (règlement du tournoi).
     */
    IMPLICIT
}
