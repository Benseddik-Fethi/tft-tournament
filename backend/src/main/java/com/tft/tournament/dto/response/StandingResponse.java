package com.tft.tournament.dto.response;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * DTO de réponse pour le classement d'un participant.
 *
 * @param rank rang du participant
 * @param participant informations du participant
 * @param totalPoints points totaux
 * @param gamesPlayed nombre de parties jouées
 * @param wins nombre de victoires (1ère place)
 * @param top4Count nombre de top 4
 * @param averagePlacement placement moyen
 * @param bestPlacement meilleur placement
 * @param worstPlacement pire placement
 * @param placementHistory historique des placements
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record StandingResponse(
        Integer rank,
        ParticipantResponse participant,
        Integer totalPoints,
        Integer gamesPlayed,
        Integer wins,
        Integer top4Count,
        BigDecimal averagePlacement,
        Integer bestPlacement,
        Integer worstPlacement,
        String placementHistory
) {
}
