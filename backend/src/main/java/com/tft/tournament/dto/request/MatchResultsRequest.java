package com.tft.tournament.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

/**
 * DTO de requête pour soumettre les résultats d'un match selon la spécification API.
 *
 * @param placements liste des placements des participants
 * @param notes      notes optionnelles sur le match
 * @param evidenceUrl URL de la preuve (screenshot, VOD, etc.)
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MatchResultsRequest(
        @NotNull(message = "La liste des placements est requise")
        List<PlacementResult> placements,

        @Size(max = 2000, message = "Les notes ne peuvent pas dépasser 2000 caractères")
        String notes,

        @Size(max = 500, message = "L'URL de preuve ne peut pas dépasser 500 caractères")
        String evidenceUrl
) {

    /**
     * Résultat de placement individuel d'un participant.
     *
     * @param participantId identifiant du participant
     * @param placement     placement dans le match
     * @param points        points attribués
     */
    public record PlacementResult(
            @NotNull(message = "L'identifiant du participant est requis")
            UUID participantId,

            @NotNull(message = "Le placement est requis")
            @Min(value = 1, message = "Le placement minimum est 1")
            @Max(value = 8, message = "Le placement maximum est 8")
            Integer placement,

            Integer points
    ) {
    }
}
