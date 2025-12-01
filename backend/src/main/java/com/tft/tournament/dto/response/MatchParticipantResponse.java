package com.tft.tournament.dto.response;

import java.util.UUID;

/**
 * DTO de réponse pour un participant à un match.
 *
 * @param participantId identifiant du participant
 * @param displayName nom d'affichage
 * @param riotId identifiant Riot
 * @param user informations de l'utilisateur
 * @param matchPoints points gagnés dans ce match
 * @param matchPlacement placement dans ce match
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record MatchParticipantResponse(
        UUID participantId,
        String displayName,
        String riotId,
        UserSummaryResponse user,
        Integer matchPoints,
        Integer matchPlacement
) {
}
