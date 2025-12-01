package com.tft.tournament.repository;

import com.tft.tournament.domain.Media;
import com.tft.tournament.domain.enums.MediaStatus;
import com.tft.tournament.domain.enums.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des médias.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface MediaRepository extends JpaRepository<Media, UUID> {

    /**
     * Recherche tous les médias d'un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @return la liste des médias
     */
    List<Media> findByTournamentId(UUID tournamentId);

    /**
     * Recherche les médias par tournoi et statut.
     *
     * @param tournamentId l'identifiant du tournoi
     * @param status       le statut recherché
     * @return la liste des médias
     */
    List<Media> findByTournamentIdAndStatus(UUID tournamentId, MediaStatus status);

    /**
     * Recherche les médias par tournoi et type.
     *
     * @param tournamentId l'identifiant du tournoi
     * @param type         le type recherché
     * @return la liste des médias
     */
    List<Media> findByTournamentIdAndType(UUID tournamentId, MediaType type);

    /**
     * Recherche les médias d'un caster.
     *
     * @param casterId l'identifiant du caster
     * @return la liste des médias
     */
    List<Media> findByCasterId(UUID casterId);

    /**
     * Recherche les médias d'un match.
     *
     * @param matchId l'identifiant du match
     * @return la liste des médias
     */
    List<Media> findByMatchId(UUID matchId);
}
