package com.tft.tournament.dto.response;

import com.tft.tournament.domain.Media;
import com.tft.tournament.domain.enums.MediaStatus;
import com.tft.tournament.domain.enums.MediaType;

import java.time.Instant;
import java.util.UUID;

/**
 * DTO de réponse pour un média.
 *
 * @param id           identifiant du média
 * @param caster       informations du caster
 * @param type         type de média
 * @param title        titre du média
 * @param description  description du média
 * @param embedUrl     URL d'intégration
 * @param thumbnailUrl URL de la vignette
 * @param matchId      identifiant du match associé
 * @param status       statut du média
 * @param createdAt    date de création
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MediaResponse(
        UUID id,
        CasterInfo caster,
        MediaType type,
        String title,
        String description,
        String embedUrl,
        String thumbnailUrl,
        UUID matchId,
        MediaStatus status,
        Instant createdAt
) {
    /**
     * Informations du caster.
     *
     * @param id          identifiant du caster
     * @param displayName nom d'affichage
     */
    public record CasterInfo(
            UUID id,
            String displayName
    ) {
    }

    /**
     * Crée une réponse à partir d'une entité Media.
     *
     * @param media l'entité média
     * @return la réponse
     */
    public static MediaResponse fromEntity(Media media) {
        CasterInfo casterInfo = null;
        if (media.getCaster() != null) {
            casterInfo = new CasterInfo(
                    media.getCaster().getId(),
                    media.getCaster().getFullName()
            );
        }

        return new MediaResponse(
                media.getId(),
                casterInfo,
                media.getType(),
                media.getTitle(),
                media.getDescription(),
                media.getEmbedUrl(),
                media.getThumbnailUrl(),
                media.getMatch() != null ? media.getMatch().getId() : null,
                media.getStatus(),
                media.getCreatedAt()
        );
    }
}
