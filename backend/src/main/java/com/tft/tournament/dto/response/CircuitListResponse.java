package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.CircuitType;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * DTO de réponse pour la liste des circuits.
 *
 * @param id identifiant unique du circuit
 * @param name nom du circuit
 * @param slug slug pour l'URL
 * @param region région du circuit
 * @param year année du circuit
 * @param circuitType type de circuit
 * @param logoUrl URL du logo
 * @param bannerUrl URL de la bannière
 * @param prizePool dotation totale
 * @param isFeatured mis en avant
 * @param activeSeasonName nom de la saison active
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record CircuitListResponse(
        UUID id,
        String name,
        String slug,
        RegionResponse region,
        Integer year,
        CircuitType circuitType,
        String logoUrl,
        String bannerUrl,
        BigDecimal prizePool,
        Boolean isFeatured,
        String activeSeasonName
) {
}
