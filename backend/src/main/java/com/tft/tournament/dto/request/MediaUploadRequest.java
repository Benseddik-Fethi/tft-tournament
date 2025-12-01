package com.tft.tournament.dto.request;

import com.tft.tournament.domain.enums.MediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * DTO de requête pour créer/uploader un média.
 *
 * @param title       titre du média
 * @param description description du média
 * @param type        type de média
 * @param sourceUrl   URL source (pour les liens externes)
 * @param matchId     identifiant du match associé (optionnel)
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MediaUploadRequest(
        @NotBlank(message = "Le titre est requis")
        @Size(max = 200, message = "Le titre ne peut pas dépasser 200 caractères")
        String title,

        @Size(max = 2000, message = "La description ne peut pas dépasser 2000 caractères")
        String description,

        @NotNull(message = "Le type de média est requis")
        MediaType type,

        @Size(max = 500, message = "L'URL source ne peut pas dépasser 500 caractères")
        String sourceUrl,

        UUID matchId
) {
}
