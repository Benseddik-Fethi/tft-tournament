package com.tft.tournament.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

/**
 * DTO de requête pour importer des médias depuis Twitch.
 *
 * @param twitchChannelId identifiant de la chaîne Twitch
 * @param since           date de début de la période
 * @param until           date de fin de la période
 * @param autoApprove     approuver automatiquement les médias importés
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MediaImportRequest(
        @NotBlank(message = "L'identifiant de la chaîne Twitch est requis")
        @Size(max = 50, message = "L'identifiant ne peut pas dépasser 50 caractères")
        String twitchChannelId,

        @NotNull(message = "La date de début est requise")
        Instant since,

        @NotNull(message = "La date de fin est requise")
        Instant until,

        Boolean autoApprove
) {
}
