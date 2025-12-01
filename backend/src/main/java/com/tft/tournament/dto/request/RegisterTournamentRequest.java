package com.tft.tournament.dto.request;

import jakarta.validation.constraints.Size;

/**
 * DTO de requête pour s'inscrire à un tournoi.
 *
 * @param displayName nom d'affichage optionnel
 * @param riotId identifiant Riot du joueur
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record RegisterTournamentRequest(
        @Size(max = 100, message = "Le nom d'affichage ne peut pas dépasser 100 caractères")
        String displayName,

        @Size(max = 100, message = "L'identifiant Riot ne peut pas dépasser 100 caractères")
        String riotId
) {
}
