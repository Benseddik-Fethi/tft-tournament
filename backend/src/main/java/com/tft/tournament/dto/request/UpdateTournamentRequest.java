package com.tft.tournament.dto.request;

import com.tft.tournament.domain.enums.TournamentStatus;
import com.tft.tournament.domain.enums.TournamentType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * DTO de requête pour mettre à jour un tournoi.
 *
 * @param name nom du tournoi
 * @param description description du tournoi
 * @param tournamentType type de tournoi
 * @param status statut du tournoi
 * @param registrationStart date de début des inscriptions
 * @param registrationEnd date de fin des inscriptions
 * @param checkInStart date de début du check-in
 * @param checkInEnd date de fin du check-in
 * @param startDate date de début du tournoi
 * @param endDate date de fin du tournoi
 * @param maxParticipants nombre maximum de participants
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
 * @param regionId identifiant de la région
 * @param isPublic tournoi public
 * @param isFeatured tournoi mis en avant
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record UpdateTournamentRequest(
        @Size(max = 200, message = "Le nom ne peut pas dépasser 200 caractères")
        String name,

        @Size(max = 5000, message = "La description ne peut pas dépasser 5000 caractères")
        String description,

        TournamentType tournamentType,

        TournamentStatus status,

        Instant registrationStart,

        Instant registrationEnd,

        Instant checkInStart,

        Instant checkInEnd,

        Instant startDate,

        Instant endDate,

        @Min(value = 2, message = "Le nombre minimum de participants est 2")
        @Max(value = 1000, message = "Le nombre maximum de participants est 1000")
        Integer maxParticipants,

        @Min(value = 2, message = "Le nombre minimum de participants est 2")
        Integer minParticipants,

        Boolean isTeamBased,

        @Min(value = 1, message = "La taille d'équipe minimum est 1")
        @Max(value = 8, message = "La taille d'équipe maximum est 8")
        Integer teamSize,

        @Size(max = 500, message = "L'URL du logo ne peut pas dépasser 500 caractères")
        String logoUrl,

        @Size(max = 500, message = "L'URL de la bannière ne peut pas dépasser 500 caractères")
        String bannerUrl,

        @DecimalMin(value = "0", message = "La dotation ne peut pas être négative")
        BigDecimal prizePool,

        String prizeDistribution,

        String customRules,

        @Size(max = 500, message = "L'URL du stream ne peut pas dépasser 500 caractères")
        String streamUrl,

        @Size(max = 500, message = "L'URL Discord ne peut pas dépasser 500 caractères")
        String discordUrl,

        UUID regionId,

        Boolean isPublic,

        Boolean isFeatured
) {
}
