package com.tft.tournament.repository;

import com.tft.tournament.domain.Participant;
import com.tft.tournament.domain.enums.ParticipantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des participants.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface ParticipantRepository extends JpaRepository<Participant, UUID> {

    /**
     * Recherche tous les participants d'un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @return la liste des participants
     */
    List<Participant> findByTournamentId(UUID tournamentId);

    /**
     * Recherche un participant par tournoi et utilisateur.
     *
     * @param tournamentId l'identifiant du tournoi
     * @param userId       l'identifiant de l'utilisateur
     * @return le participant si trouvé
     */
    Optional<Participant> findByTournamentIdAndUserId(UUID tournamentId, UUID userId);

    /**
     * Recherche les participants par statut.
     *
     * @param tournamentId l'identifiant du tournoi
     * @param status       le statut recherché
     * @return la liste des participants
     */
    List<Participant> findByTournamentIdAndStatus(UUID tournamentId, ParticipantStatus status);

    /**
     * Recherche les participants d'une équipe.
     *
     * @param teamId l'identifiant de l'équipe
     * @return la liste des participants
     */
    List<Participant> findByTeamId(UUID teamId);

    /**
     * Vérifie si un utilisateur participe à un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @param userId       l'identifiant de l'utilisateur
     * @return true si l'utilisateur participe
     */
    boolean existsByTournamentIdAndUserId(UUID tournamentId, UUID userId);

    /**
     * Compte le nombre de participants d'un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @return le nombre de participants
     */
    long countByTournamentId(UUID tournamentId);
}
