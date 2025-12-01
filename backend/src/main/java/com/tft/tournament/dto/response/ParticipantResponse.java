package com.tft.tournament.dto.response;

import com.tft.tournament.domain.enums.ParticipantStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * DTO de réponse pour un participant.
 *
 * @param id identifiant unique du participant
 * @param user informations de l'utilisateur
 * @param displayName nom d'affichage
 * @param riotId identifiant Riot
 * @param status statut du participant
 * @param seed seed du participant
 * @param totalPoints points totaux
 * @param gamesPlayed nombre de parties jouées
 * @param wins nombre de victoires
 * @param top4Count nombre de top 4
 * @param averagePlacement placement moyen
 * @param bestPlacement meilleur placement
 * @param worstPlacement pire placement
 * @param registeredAt date d'inscription
 * @param checkedInAt date de check-in
 * @param finalRank classement final
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record ParticipantResponse(
        UUID id,
        UserSummaryResponse user,
        String displayName,
        String riotId,
        ParticipantStatus status,
        Integer seed,
        Integer totalPoints,
        Integer gamesPlayed,
        Integer wins,
        Integer top4Count,
        BigDecimal averagePlacement,
        Integer bestPlacement,
        Integer worstPlacement,
        Instant registeredAt,
        Instant checkedInAt,
        Integer finalRank
) {
}
