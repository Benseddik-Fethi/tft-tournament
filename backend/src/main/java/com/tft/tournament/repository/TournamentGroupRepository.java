package com.tft.tournament.repository;

import com.tft.tournament.domain.TournamentGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des groupes de tournoi.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface TournamentGroupRepository extends JpaRepository<TournamentGroup, UUID> {

    /**
     * Recherche tous les groupes d'une phase.
     *
     * @param phaseId l'identifiant de la phase
     * @return la liste des groupes
     */
    List<TournamentGroup> findByPhaseIdOrderByOrderIndexAsc(UUID phaseId);
}
