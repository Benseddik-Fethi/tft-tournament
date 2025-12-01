package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.TournamentStatus;
import com.tft.tournament.domain.enums.TournamentType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * DTO de réponse pour la liste des tournois.
 *
 * @param id identifiant unique du tournoi
 * @param name nom du tournoi
 * @param slug slug pour l'URL
 * @param description description courte
 * @param tournamentType type de tournoi
 * @param status statut du tournoi
 * @param registrationStart date de début des inscriptions
 * @param registrationEnd date de fin des inscriptions
 * @param startDate date de début du tournoi
 * @param endDate date de fin du tournoi
 * @param maxParticipants nombre maximum de participants
 * @param currentParticipants nombre actuel de participants
 * @param isTeamBased tournoi en équipe
 * @param teamSize taille des équipes
 * @param logoUrl URL du logo
 * @param bannerUrl URL de la bannière
 * @param prizePool dotation
 * @param region région du tournoi
 * @param organizer organisateur du tournoi
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record TournamentListResponse(
        UUID id,
        String name,
        String slug,
        String description,
        TournamentType tournamentType,
        TournamentStatus status,
        Instant registrationStart,
        Instant registrationEnd,
        Instant startDate,
        Instant endDate,
        Integer maxParticipants,
        Integer currentParticipants,
        Boolean isTeamBased,
        Integer teamSize,
        String logoUrl,
        String bannerUrl,
        BigDecimal prizePool,
        RegionResponse region,
        UserSummaryResponse organizer
) {
}
