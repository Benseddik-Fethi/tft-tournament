package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.MatchStatus;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse pour un match.
 *
 * @param id identifiant unique du match
 * @param name nom du match
 * @param roundNumber numéro du round
 * @param lobbyNumber numéro du lobby
 * @param status statut du match
 * @param scheduledTime heure prévue
 * @param actualStartTime heure de début réelle
 * @param endTime heure de fin
 * @param streamUrl URL du stream
 * @param gamesCount nombre de parties
 * @param participants liste des participants
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MatchResponse(
        UUID id,
        String name,
        Integer roundNumber,
        Integer lobbyNumber,
        MatchStatus status,
        Instant scheduledTime,
        Instant actualStartTime,
        Instant endTime,
        String streamUrl,
        Integer gamesCount,
        List<MatchParticipantResponse> participants
) {
}
