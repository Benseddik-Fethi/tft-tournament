package com.tft.tournament.service;

import com.tft.tournament.dto.response.AuditLogResponse;

import java.util.List;
import java.util.UUID;

/**
 * Service pour les fonctionnalités d'administration.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface AdminService {

    /**
     * Récupère les logs d'audit d'un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @param userId       identifiant de l'utilisateur qui effectue la requête
     * @return la liste des logs d'audit
     */
    List<AuditLogResponse> getTournamentAuditLogs(UUID tournamentId, UUID userId);

    /**
     * Régénère les appairements d'un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @param userId       identifiant de l'utilisateur qui effectue l'action
     * @return message de confirmation
     */
    RegeneratePairingsResponse regeneratePairings(UUID tournamentId, UUID userId);

    /**
     * Réponse pour la régénération des appairements.
     *
     * @param success        si l'opération a réussi
     * @param message        message de confirmation
     * @param matchesCreated nombre de matchs créés
     */
    record RegeneratePairingsResponse(
            boolean success,
            String message,
            int matchesCreated
    ) {
    }
}
