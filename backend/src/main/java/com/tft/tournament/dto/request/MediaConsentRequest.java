package com.tft.tournament.dto.request;

import com.tft.tournament.domain.enums.ConsentMethod;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * DTO de requête pour créer un consentement média.
 *
 * @param casterId      identifiant du caster
 * @param tournamentId  identifiant du tournoi
 * @param consentMethod méthode de consentement
 * @param proofUrl      URL de la preuve
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MediaConsentRequest(
        @NotNull(message = "L'identifiant du caster est requis")
        UUID casterId,

        @NotNull(message = "L'identifiant du tournoi est requis")
        UUID tournamentId,

        @NotNull(message = "La méthode de consentement est requise")
        ConsentMethod consentMethod,

        @Size(max = 500, message = "L'URL de preuve ne peut pas dépasser 500 caractères")
        String proofUrl
) {
}
