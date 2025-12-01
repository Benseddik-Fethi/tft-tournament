package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.TournamentStatus;
import com.tft.tournament.domain.enums.TournamentType;

import java.time.Instant;
import java.util.UUID;

/**
 * DTO résumé d'un tournoi pour les listes.
 *
 * @param id identifiant unique du tournoi
 * @param name nom du tournoi
 * @param slug slug pour l'URL
 * @param tournamentType type de tournoi
 * @param status statut du tournoi
 * @param startDate date de début
 * @param maxParticipants nombre maximum de participants
 * @param currentParticipants nombre actuel de participants
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record TournamentSummaryResponse(
        UUID id,
        String name,
        String slug,
        TournamentType tournamentType,
        TournamentStatus status,
        Instant startDate,
        Integer maxParticipants,
        Integer currentParticipants
) {
}
