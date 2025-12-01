package com.tft.tournament.domain.enums;

/**
 * Statut d'un média.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public enum MediaStatus {
    /**
     * En attente de modération.
     */
    PENDING,

    /**
     * Approuvé par un modérateur.
     */
    APPROVED,

    /**
     * Rejeté par un modérateur.
     */
    REJECTED
}
