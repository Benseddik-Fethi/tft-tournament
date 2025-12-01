package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.PhaseStatus;
import com.tft.tournament.domain.enums.PhaseType;
import com.tft.tournament.domain.enums.TournamentFormatType;

import java.time.Instant;
import java.util.UUID;

/**
 * DTO de réponse pour une phase de tournoi.
 *
 * @param id identifiant unique de la phase
 * @param name nom de la phase
 * @param phaseType type de phase
 * @param formatType format de la phase
 * @param orderIndex ordre d'affichage
 * @param status statut de la phase
 * @param startDate date de début
 * @param endDate date de fin
 * @param gamesPerRound nombre de parties par round
 * @param totalRounds nombre total de rounds
 * @param playersPerLobby nombre de joueurs par lobby
 * @param advancingCount nombre de joueurs qui avancent
 * @param eliminatedCount nombre de joueurs éliminés
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record TournamentPhaseResponse(
        UUID id,
        String name,
        PhaseType phaseType,
        TournamentFormatType formatType,
        Integer orderIndex,
        PhaseStatus status,
        Instant startDate,
        Instant endDate,
        Integer gamesPerRound,
        Integer totalRounds,
        Integer playersPerLobby,
        Integer advancingCount,
        Integer eliminatedCount
) {
}
