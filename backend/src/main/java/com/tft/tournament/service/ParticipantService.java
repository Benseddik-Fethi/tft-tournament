package com.tft.tournament.service;

import java.util.UUID;

/**
 * Service pour la gestion des participants.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface ParticipantService {

    /**
     * Supprime un participant d'un tournoi.
     * L'utilisateur doit être l'organisateur du tournoi, un admin du tournoi,
     * ou le participant lui-même.
     *
     * @param participantId identifiant du participant
     * @param userId        identifiant de l'utilisateur qui effectue la suppression
     */
    void deleteParticipant(UUID participantId, UUID userId);
}
