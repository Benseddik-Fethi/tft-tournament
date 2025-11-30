package com.tft.tournament.repository;

import com.tft.tournament.domain.Team;
import com.tft.tournament.domain.enums.TeamStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des équipes.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {

    /**
     * Recherche toutes les équipes d'un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @return la liste des équipes
     */
    List<Team> findByTournamentId(UUID tournamentId);

    /**
     * Recherche les équipes par statut.
     *
     * @param tournamentId l'identifiant du tournoi
     * @param status       le statut recherché
     * @return la liste des équipes
     */
    List<Team> findByTournamentIdAndStatus(UUID tournamentId, TeamStatus status);

    /**
     * Recherche les équipes d'un capitaine.
     *
     * @param captainId l'identifiant du capitaine
     * @return la liste des équipes
     */
    List<Team> findByCaptainId(UUID captainId);
}
