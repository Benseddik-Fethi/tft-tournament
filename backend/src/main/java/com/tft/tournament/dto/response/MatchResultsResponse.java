package com.tft.tournament.dto.response;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse pour les résultats d'un match.
 *
 * @param matchId      identifiant du match
 * @param status       statut du match
 * @param placements   liste des placements
 * @param notes        notes sur le match
 * @param evidenceUrl  URL de la preuve
 * @param submittedAt  date de soumission
 * @param submittedBy  identifiant de l'utilisateur qui a soumis
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MatchResultsResponse(
        UUID matchId,
        String status,
        List<PlacementResponse> placements,
        String notes,
        String evidenceUrl,
        Instant submittedAt,
        UUID submittedBy
) {

    /**
     * Réponse de placement individuel.
     *
     * @param participantId identifiant du participant
     * @param displayName   nom d'affichage du participant
     * @param placement     placement dans le match
     * @param points        points attribués
     */
    public record PlacementResponse(
            UUID participantId,
            String displayName,
            Integer placement,
            Integer points
    ) {
    }
}
