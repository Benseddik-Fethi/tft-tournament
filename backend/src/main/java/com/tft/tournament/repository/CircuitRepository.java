package com.tft.tournament.repository;

import com.tft.tournament.domain.Circuit;
import com.tft.tournament.domain.enums.CircuitType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des circuits.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface CircuitRepository extends JpaRepository<Circuit, UUID> {

    /**
     * Recherche un circuit par son slug.
     *
     * @param slug le slug du circuit
     * @return le circuit si trouvé
     */
    Optional<Circuit> findBySlug(String slug);

    /**
     * Recherche tous les circuits d'une région.
     *
     * @param regionId l'identifiant de la région
     * @return la liste des circuits
     */
    List<Circuit> findByRegionId(UUID regionId);

    /**
     * Recherche tous les circuits d'une année.
     *
     * @param year l'année
     * @return la liste des circuits
     */
    List<Circuit> findByYear(Integer year);

    /**
     * Recherche tous les circuits par type.
     *
     * @param circuitType le type de circuit
     * @return la liste des circuits
     */
    List<Circuit> findByCircuitType(CircuitType circuitType);

    /**
     * Recherche tous les circuits actifs et mis en avant.
     *
     * @return la liste des circuits
     */
    List<Circuit> findByIsActiveTrueAndIsFeaturedTrue();

    /**
     * Vérifie si un slug existe.
     *
     * @param slug le slug à vérifier
     * @return true si le slug existe
     */
    boolean existsBySlug(String slug);
}
