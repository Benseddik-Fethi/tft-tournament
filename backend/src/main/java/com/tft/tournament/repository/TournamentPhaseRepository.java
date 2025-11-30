package com.tft.tournament.repository;

import com.tft.tournament.domain.TournamentPhase;
import com.tft.tournament.domain.enums.PhaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des phases de tournoi.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface TournamentPhaseRepository extends JpaRepository<TournamentPhase, UUID> {

    /**
     * Recherche toutes les phases d'un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @return la liste des phases
     */
    List<TournamentPhase> findByTournamentIdOrderByOrderIndexAsc(UUID tournamentId);

    /**
     * Recherche les phases par statut.
     *
     * @param status le statut recherché
     * @return la liste des phases
     */
    List<TournamentPhase> findByStatus(PhaseStatus status);

    /**
     * Recherche les phases actives d'un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @return la liste des phases actives
     */
    List<TournamentPhase> findByTournamentIdAndStatus(UUID tournamentId, PhaseStatus status);
}
