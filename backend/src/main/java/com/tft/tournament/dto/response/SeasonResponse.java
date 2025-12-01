package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.SeasonStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse pour une saison.
 *
 * @param id identifiant unique de la saison
 * @param name nom de la saison
 * @param slug slug pour l'URL
 * @param startDate date de début
 * @param endDate date de fin
 * @param status statut de la saison
 * @param orderIndex ordre d'affichage
 * @param description description de la saison
 * @param stages étapes de la saison
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record SeasonResponse(
        UUID id,
        String name,
        String slug,
        LocalDate startDate,
        LocalDate endDate,
        SeasonStatus status,
        Integer orderIndex,
        String description,
        List<StageResponse> stages
) {
}
