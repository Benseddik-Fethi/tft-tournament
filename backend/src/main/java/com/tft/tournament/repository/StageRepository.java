package com.tft.tournament.repository;

import com.tft.tournament.domain.Stage;
import com.tft.tournament.domain.enums.StageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des étapes.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface StageRepository extends JpaRepository<Stage, UUID> {

    /**
     * Recherche une étape par son slug.
     *
     * @param slug le slug de l'étape
     * @return l'étape si trouvée
     */
    Optional<Stage> findBySlug(String slug);

    /**
     * Recherche toutes les étapes d'une saison.
     *
     * @param seasonId l'identifiant de la saison
     * @return la liste des étapes
     */
    List<Stage> findBySeasonIdOrderByOrderIndexAsc(UUID seasonId);

    /**
     * Recherche les étapes par statut.
     *
     * @param status le statut recherché
     * @return la liste des étapes
     */
    List<Stage> findByStatus(StageStatus status);

    /**
     * Vérifie si un slug existe.
     *
     * @param slug le slug à vérifier
     * @return true si le slug existe
     */
    boolean existsBySlug(String slug);
}
