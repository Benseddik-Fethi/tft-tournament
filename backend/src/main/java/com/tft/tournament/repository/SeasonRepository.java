package com.tft.tournament.repository;

import com.tft.tournament.domain.Season;
import com.tft.tournament.domain.enums.SeasonStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des saisons.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface SeasonRepository extends JpaRepository<Season, UUID> {

    /**
     * Recherche une saison par son slug.
     *
     * @param slug le slug de la saison
     * @return la saison si trouvée
     */
    Optional<Season> findBySlug(String slug);

    /**
     * Recherche toutes les saisons d'un circuit.
     *
     * @param circuitId l'identifiant du circuit
     * @return la liste des saisons
     */
    List<Season> findByCircuitIdOrderByOrderIndexAsc(UUID circuitId);

    /**
     * Recherche les saisons par statut.
     *
     * @param status le statut recherché
     * @return la liste des saisons
     */
    List<Season> findByStatus(SeasonStatus status);

    /**
     * Vérifie si un slug existe.
     *
     * @param slug le slug à vérifier
     * @return true si le slug existe
     */
    boolean existsBySlug(String slug);
}
