package com.tft.tournament.repository;

import com.tft.tournament.domain.Game;
import com.tft.tournament.domain.enums.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des parties.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {

    /**
     * Recherche toutes les parties d'un match.
     *
     * @param matchId l'identifiant du match
     * @return la liste des parties
     */
    List<Game> findByMatchIdOrderByGameNumberAsc(UUID matchId);

    /**
     * Recherche une partie par son numéro dans un match.
     *
     * @param matchId    l'identifiant du match
     * @param gameNumber le numéro de la partie
     * @return la partie si trouvée
     */
    Optional<Game> findByMatchIdAndGameNumber(UUID matchId, Integer gameNumber);

    /**
     * Recherche les parties par statut.
     *
     * @param matchId l'identifiant du match
     * @param status  le statut recherché
     * @return la liste des parties
     */
    List<Game> findByMatchIdAndStatus(UUID matchId, GameStatus status);

    /**
     * Recherche une partie par son identifiant Riot.
     *
     * @param riotMatchId l'identifiant Riot
     * @return la partie si trouvée
     */
    Optional<Game> findByRiotMatchId(String riotMatchId);
}
