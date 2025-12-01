package com.tft.tournament.dto.response;

import java.util.List;
import java.util.UUID;

/**
 * DTO de réponse pour une région.
 *
 * @param id identifiant unique de la région
 * @param code code de la région (ex: EUW, NA)
 * @param name nom complet de la région
 * @param timezone fuseau horaire de la région
 * @param servers liste des serveurs de la région
 * @param logoUrl URL du logo de la région
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record RegionResponse(
        UUID id,
        String code,
        String name,
        String timezone,
        List<String> servers,
        String logoUrl
) {
}
