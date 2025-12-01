package com.tft.tournament.util;

import com.tft.tournament.domain.enums.TiebreakerType;
import com.tft.tournament.dto.response.StandingResponse;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * Comparateur pour départager les égalités dans le classement des tournois.
 * Applique les règles de tiebreaker configurées dans l'ordre spécifié.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public class TiebreakerComparator implements Comparator<StandingResponse> {

    private final List<TiebreakerType> tiebreakers;

    /**
     * Crée un comparateur avec une liste de tiebreakers personnalisée.
     *
     * @param tiebreakers liste ordonnée des critères de départage
     */
    public TiebreakerComparator(List<TiebreakerType> tiebreakers) {
        this.tiebreakers = tiebreakers != null && !tiebreakers.isEmpty()
                ? tiebreakers
                : getDefaultTiebreakers();
    }

    /**
     * Crée un comparateur avec les tiebreakers par défaut TFT.
     */
    public TiebreakerComparator() {
        this.tiebreakers = getDefaultTiebreakers();
    }

    /**
     * Retourne la liste des tiebreakers par défaut selon les règles TFT.
     * Ordre: Points > Placement moyen > Victoires > Top 4 > Meilleur jeu
     *
     * @return liste des tiebreakers par défaut
     */
    public static List<TiebreakerType> getDefaultTiebreakers() {
        return Arrays.asList(
                TiebreakerType.AVERAGE_PLACEMENT,
                TiebreakerType.TOTAL_WINS,
                TiebreakerType.TOP4_COUNT,
                TiebreakerType.BEST_SINGLE_GAME,
                TiebreakerType.MOST_RECENT_RESULT
        );
    }

    @Override
    public int compare(StandingResponse a, StandingResponse b) {
        // Comparaison principale par points totaux (décroissant)
        int pointsCompare = compareNullable(b.totalPoints(), a.totalPoints());
        if (pointsCompare != 0) {
            return pointsCompare;
        }

        // Appliquer les tiebreakers dans l'ordre
        for (TiebreakerType tiebreaker : tiebreakers) {
            int result = applyTiebreaker(tiebreaker, a, b);
            if (result != 0) {
                return result;
            }
        }

        return 0; // Égalité parfaite
    }

    /**
     * Applique un critère de départage spécifique.
     *
     * @param tiebreaker le type de tiebreaker à appliquer
     * @param a premier standing
     * @param b second standing
     * @return résultat de la comparaison (-1, 0, 1)
     */
    private int applyTiebreaker(TiebreakerType tiebreaker, StandingResponse a, StandingResponse b) {
        return switch (tiebreaker) {
            case AVERAGE_PLACEMENT -> compareBigDecimal(a.averagePlacement(), b.averagePlacement());
            case TOTAL_WINS -> compareNullable(b.wins(), a.wins());
            case TOP4_COUNT -> compareNullable(b.top4Count(), a.top4Count());
            case BEST_SINGLE_GAME -> compareNullable(a.bestPlacement(), b.bestPlacement());
            case MOST_RECENT_RESULT -> compareMostRecent(a, b);
            case HEAD_TO_HEAD -> 0; // Non implémenté pour l'instant - nécessite des données supplémentaires
            case RANDOM -> 0; // Les égalités parfaites ne sont pas départagées aléatoirement ici
        };
    }

    /**
     * Compare les résultats les plus récents.
     * Le joueur avec le meilleur placement récent est classé plus haut.
     *
     * @param a premier standing
     * @param b second standing
     * @return résultat de la comparaison
     */
    private int compareMostRecent(StandingResponse a, StandingResponse b) {
        String historyA = a.placementHistory();
        String historyB = b.placementHistory();

        if (historyA == null || historyA.isBlank()) {
            return historyB == null || historyB.isBlank() ? 0 : 1;
        }
        if (historyB == null || historyB.isBlank()) {
            return -1;
        }

        // L'historique est stocké comme une chaîne JSON ou CSV de placements
        // Format attendu: "1,2,3,4" ou "[1,2,3,4]"
        try {
            int[] placementsA = parsePlacementHistory(historyA);
            int[] placementsB = parsePlacementHistory(historyB);

            if (placementsA.length == 0) {
                return placementsB.length == 0 ? 0 : 1;
            }
            if (placementsB.length == 0) {
                return -1;
            }

            // Comparer le placement le plus récent (dernier élément)
            int lastA = placementsA[placementsA.length - 1];
            int lastB = placementsB[placementsB.length - 1];

            return Integer.compare(lastA, lastB);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    /**
     * Parse l'historique des placements depuis une chaîne.
     *
     * @param history chaîne d'historique (format CSV ou JSON)
     * @return tableau des placements
     */
    private int[] parsePlacementHistory(String history) {
        String cleaned = history.replaceAll("[\\[\\]\\s]", "");
        if (cleaned.isEmpty()) {
            return new int[0];
        }
        return Arrays.stream(cleaned.split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
    }

    /**
     * Compare deux Integer pouvant être null.
     *
     * @param a première valeur
     * @param b seconde valeur
     * @return résultat de la comparaison
     */
    private int compareNullable(Integer a, Integer b) {
        if (a == null && b == null) return 0;
        if (a == null) return 1;
        if (b == null) return -1;
        return a.compareTo(b);
    }

    /**
     * Compare deux BigDecimal pour le placement moyen (plus bas = meilleur).
     *
     * @param a première valeur
     * @param b seconde valeur
     * @return résultat de la comparaison
     */
    private int compareBigDecimal(BigDecimal a, BigDecimal b) {
        if (a == null && b == null) return 0;
        if (a == null) return 1;
        if (b == null) return -1;
        return a.compareTo(b);
    }
}
