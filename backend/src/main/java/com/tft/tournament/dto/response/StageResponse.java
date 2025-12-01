package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.StageStatus;
import com.tft.tournament.domain.enums.StageType;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse pour une étape.
 *
 * @param id identifiant unique de l'étape
 * @param name nom de l'étape
 * @param slug slug pour l'URL
 * @param stageType type d'étape
 * @param orderIndex ordre d'affichage
 * @param startDate date de début
 * @param endDate date de fin
 * @param status statut de l'étape
 * @param qualificationSpots nombre de places qualificatives
 * @param tournaments liste des tournois de l'étape
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record StageResponse(
        UUID id,
        String name,
        String slug,
        StageType stageType,
        Integer orderIndex,
        LocalDate startDate,
        LocalDate endDate,
        StageStatus status,
        Integer qualificationSpots,
        List<TournamentSummaryResponse> tournaments
) {
}
