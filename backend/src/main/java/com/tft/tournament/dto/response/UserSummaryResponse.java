package com.tft.tournament.dto.response;

import java.util.UUID;

/**
 * DTO résumé d'un utilisateur pour les listes.
 *
 * @param id identifiant unique de l'utilisateur
 * @param firstName prénom de l'utilisateur
 * @param lastName nom de famille de l'utilisateur
 * @param avatar URL de l'avatar
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record UserSummaryResponse(
        UUID id,
        String firstName,
        String lastName,
        String avatar
) {
}
