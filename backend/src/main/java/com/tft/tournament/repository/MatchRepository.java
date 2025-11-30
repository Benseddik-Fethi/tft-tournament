package com.tft.tournament.repository;

import com.tft.tournament.domain.Match;
import com.tft.tournament.domain.enums.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des matchs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface MatchRepository extends JpaRepository<Match, UUID> {

    /**
     * Recherche tous les matchs d'une phase.
     *
     * @param phaseId l'identifiant de la phase
     * @return la liste des matchs
     */
    List<Match> findByPhaseIdOrderByRoundNumberAscLobbyNumberAsc(UUID phaseId);

    /**
     * Recherche tous les matchs d'un groupe.
     *
     * @param groupId l'identifiant du groupe
     * @return la liste des matchs
     */
    List<Match> findByGroupId(UUID groupId);

    /**
     * Recherche les matchs par statut.
     *
     * @param phaseId l'identifiant de la phase
     * @param status  le statut recherché
     * @return la liste des matchs
     */
    List<Match> findByPhaseIdAndStatus(UUID phaseId, MatchStatus status);

    /**
     * Recherche les matchs d'un round.
     *
     * @param phaseId     l'identifiant de la phase
     * @param roundNumber le numéro du round
     * @return la liste des matchs
     */
    List<Match> findByPhaseIdAndRoundNumber(UUID phaseId, Integer roundNumber);
}
