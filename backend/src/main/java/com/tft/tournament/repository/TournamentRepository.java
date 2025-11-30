package com.tft.tournament.repository;

import com.tft.tournament.domain.Tournament;
import com.tft.tournament.domain.enums.TournamentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des tournois.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface TournamentRepository extends JpaRepository<Tournament, UUID> {

    /**
     * Recherche un tournoi par son slug.
     *
     * @param slug le slug du tournoi
     * @return le tournoi si trouvé
     */
    Optional<Tournament> findBySlug(String slug);

    /**
     * Recherche tous les tournois d'une étape.
     *
     * @param stageId l'identifiant de l'étape
     * @return la liste des tournois
     */
    List<Tournament> findByStageId(UUID stageId);

    /**
     * Recherche tous les tournois d'une région.
     *
     * @param regionId l'identifiant de la région
     * @return la liste des tournois
     */
    List<Tournament> findByRegionId(UUID regionId);

    /**
     * Recherche les tournois par statut.
     *
     * @param status le statut recherché
     * @return la liste des tournois
     */
    List<Tournament> findByStatus(TournamentStatus status);

    /**
     * Recherche les tournois publics et mis en avant.
     *
     * @return la liste des tournois
     */
    List<Tournament> findByIsPublicTrueAndIsFeaturedTrue();

    /**
     * Recherche les tournois organisés par un utilisateur.
     *
     * @param organizerId l'identifiant de l'organisateur
     * @return la liste des tournois
     */
    List<Tournament> findByOrganizerId(UUID organizerId);

    /**
     * Vérifie si un slug existe.
     *
     * @param slug le slug à vérifier
     * @return true si le slug existe
     */
    boolean existsBySlug(String slug);
}
