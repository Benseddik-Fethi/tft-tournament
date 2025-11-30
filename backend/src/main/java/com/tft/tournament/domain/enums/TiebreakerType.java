package com.tft.tournament.domain.enums;

/**
 * Types de critères pour départager les égalités.
 */
public enum TiebreakerType {
    AVERAGE_PLACEMENT,
    TOTAL_WINS,
    TOP4_COUNT,
    HEAD_TO_HEAD,
    MOST_RECENT_RESULT,
    BEST_SINGLE_GAME,
    RANDOM
}
