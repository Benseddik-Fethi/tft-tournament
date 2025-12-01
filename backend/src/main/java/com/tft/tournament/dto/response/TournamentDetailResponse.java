package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.TournamentStatus;
import com.tft.tournament.domain.enums.TournamentType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse détaillée pour un tournoi.
 *
 * @param id identifiant unique du tournoi
 * @param name nom du tournoi
 * @param slug slug pour l'URL
 * @param description description complète
 * @param tournamentType type de tournoi
 * @param status statut du tournoi
 * @param registrationStart date de début des inscriptions
 * @param registrationEnd date de fin des inscriptions
 * @param checkInStart date de début du check-in
 * @param checkInEnd date de fin du check-in
 * @param startDate date de début du tournoi
 * @param endDate date de fin du tournoi
 * @param maxParticipants nombre maximum de participants
 * @param currentParticipants nombre actuel de participants
 * @param minParticipants nombre minimum de participants
 * @param isTeamBased tournoi en équipe
 * @param teamSize taille des équipes
 * @param logoUrl URL du logo
 * @param bannerUrl URL de la bannière
 * @param prizePool dotation
 * @param prizeDistribution distribution des prix
 * @param customRules règles personnalisées
 * @param streamUrl URL du stream
 * @param discordUrl URL du Discord
 * @param region région du tournoi
 * @param organizer organisateur du tournoi
 * @param phases phases du tournoi
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record TournamentDetailResponse(
        UUID id,
        String name,
        String slug,
        String description,
        TournamentType tournamentType,
        TournamentStatus status,
        Instant registrationStart,
        Instant registrationEnd,
        Instant checkInStart,
        Instant checkInEnd,
        Instant startDate,
        Instant endDate,
        Integer maxParticipants,
        Integer currentParticipants,
        Integer minParticipants,
        Boolean isTeamBased,
        Integer teamSize,
        String logoUrl,
        String bannerUrl,
        BigDecimal prizePool,
        String prizeDistribution,
        String customRules,
        String streamUrl,
        String discordUrl,
        RegionResponse region,
        UserSummaryResponse organizer,
        List<TournamentPhaseResponse> phases
) {
}
