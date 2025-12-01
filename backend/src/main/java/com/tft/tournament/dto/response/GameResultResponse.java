package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.ResultSource;

import java.util.UUID;

/**
 * DTO de réponse pour le résultat d'un participant dans une partie.
 *
 * @param id identifiant unique du résultat
 * @param participantId identifiant du participant
 * @param displayName nom d'affichage du participant
 * @param placement placement dans la partie
 * @param points points gagnés
 * @param finalHealth vie restante
 * @param roundsSurvived nombre de rounds survécus
 * @param playersEliminated nombre de joueurs éliminés
 * @param totalDamageDealt dégâts totaux infligés
 * @param composition composition finale
 * @param augments augments choisis
 * @param isValidated résultat validé
 * @param resultSource source du résultat
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record GameResultResponse(
        UUID id,
        UUID participantId,
        String displayName,
        Integer placement,
        Integer points,
        Integer finalHealth,
        Integer roundsSurvived,
        Integer playersEliminated,
        Integer totalDamageDealt,
        String composition,
        String augments,
        Boolean isValidated,
        ResultSource resultSource
) {
}
