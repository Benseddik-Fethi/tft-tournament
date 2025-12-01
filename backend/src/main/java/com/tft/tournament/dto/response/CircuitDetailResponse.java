package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.CircuitType;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse détaillée pour un circuit.
 *
 * @param id identifiant unique du circuit
 * @param name nom du circuit
 * @param slug slug pour l'URL
 * @param region région du circuit
 * @param year année du circuit
 * @param circuitType type de circuit
 * @param description description du circuit
 * @param logoUrl URL du logo
 * @param bannerUrl URL de la bannière
 * @param prizePool dotation totale
 * @param isFeatured mis en avant
 * @param organizer organisateur du circuit
 * @param seasons liste des saisons du circuit
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record CircuitDetailResponse(
        UUID id,
        String name,
        String slug,
        RegionResponse region,
        Integer year,
        CircuitType circuitType,
        String description,
        String logoUrl,
        String bannerUrl,
        BigDecimal prizePool,
        Boolean isFeatured,
        UserSummaryResponse organizer,
        List<SeasonResponse> seasons
) {
}
