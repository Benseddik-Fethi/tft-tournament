package com.tft.tournament.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

/**
 * DTO de requête pour soumettre les résultats d'une partie.
 *
 * @param results liste des résultats des participants
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record SubmitResultsRequest(
        @NotNull(message = "La liste des résultats est requise")
        List<ParticipantResult> results
) {

    /**
     * Résultat individuel d'un participant.
     *
     * @param participantId identifiant du participant
     * @param placement placement dans la partie
     * @param finalHealth vie restante
     * @param roundsSurvived nombre de rounds survécus
     * @param playersEliminated nombre de joueurs éliminés
     * @param totalDamageDealt dégâts totaux infligés
     * @param composition composition finale (JSON)
     * @param augments augments choisis (JSON)
     */
    public record ParticipantResult(
            @NotNull(message = "L'identifiant du participant est requis")
            UUID participantId,

            @NotNull(message = "Le placement est requis")
            @Min(value = 1, message = "Le placement minimum est 1")
            @Max(value = 8, message = "Le placement maximum est 8")
            Integer placement,

            Integer finalHealth,

            Integer roundsSurvived,

            Integer playersEliminated,

            Integer totalDamageDealt,

            String composition,

            String augments
    ) {
    }
}
