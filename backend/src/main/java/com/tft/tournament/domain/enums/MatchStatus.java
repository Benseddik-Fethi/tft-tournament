package com.tft.tournament.domain.enums;

/**
 * Statuts possibles pour un match.
 */
public enum MatchStatus {
    SCHEDULED,
    CHECK_IN,
    LOBBY_OPEN,
    IN_GAME,
    BETWEEN_GAMES,
    COMPLETED,
    CANCELLED
}
