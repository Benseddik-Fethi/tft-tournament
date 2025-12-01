package com.tft.tournament.dto.request;

import com.tft.tournament.domain.enums.MediaStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * DTO de requête pour mettre à jour le statut d'un média.
 *
 * @param status      nouveau statut
 * @param moderatorId identifiant du modérateur
 * @param comment     commentaire optionnel
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MediaStatusUpdateRequest(
        @NotNull(message = "Le statut est requis")
        MediaStatus status,

        UUID moderatorId,

        @Size(max = 1000, message = "Le commentaire ne peut pas dépasser 1000 caractères")
        String comment
) {
}
