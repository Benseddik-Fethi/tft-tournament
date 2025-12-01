package com.tft.tournament.service;

import com.tft.tournament.dto.request.MatchResultsRequest;
import com.tft.tournament.dto.request.SubmitResultsRequest;
import com.tft.tournament.dto.response.GameResponse;
import com.tft.tournament.dto.response.MatchDetailResponse;
import com.tft.tournament.dto.response.MatchResultsResponse;

import java.util.List;
import java.util.UUID;

/**
 * Service pour la gestion des matchs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface MatchService {

    /**
     * Récupère un match par son identifiant.
     *
     * @param matchId identifiant du match
     * @return le détail du match
     */
    MatchDetailResponse getMatchById(UUID matchId);

    /**
     * Récupère les parties d'un match.
     *
     * @param matchId identifiant du match
     * @return la liste des parties
     */
    List<GameResponse> getMatchGames(UUID matchId);

    /**
     * Soumet les résultats d'une partie.
     *
     * @param matchId identifiant du match
     * @param gameNumber numéro de la partie
     * @param request la requête avec les résultats
     * @param userId identifiant de l'utilisateur qui soumet
     * @return la partie mise à jour
     */
    GameResponse submitResults(UUID matchId, Integer gameNumber, SubmitResultsRequest request, UUID userId);

    /**
     * Vérifie si l'utilisateur peut soumettre des résultats pour ce match.
     *
     * @param matchId identifiant du match
     * @param userId identifiant de l'utilisateur
     * @return true si l'utilisateur a les droits
     */
    boolean canSubmitResults(UUID matchId, UUID userId);

    /**
     * Soumet les résultats d'un match selon le format de la spécification API.
     *
     * @param matchId identifiant du match
     * @param request la requête avec les résultats
     * @param userId identifiant de l'utilisateur qui soumet
     * @return les résultats soumis
     */
    MatchResultsResponse submitMatchResults(UUID matchId, MatchResultsRequest request, UUID userId);
}
