package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.GameStatus;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse pour une partie.
 *
 * @param id identifiant unique de la partie
 * @param gameNumber numéro de la partie
 * @param status statut de la partie
 * @param startTime heure de début
 * @param endTime heure de fin
 * @param durationSeconds durée en secondes
 * @param riotMatchId identifiant Riot du match
 * @param gameSet set de jeu (version)
 * @param gamePatch patch de jeu
 * @param results résultats de la partie
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record GameResponse(
        UUID id,
        Integer gameNumber,
        GameStatus status,
        Instant startTime,
        Instant endTime,
        Integer durationSeconds,
        String riotMatchId,
        String gameSet,
        String gamePatch,
        List<GameResultResponse> results
) {
}
