package com.tft.tournament.repository;

import com.tft.tournament.domain.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des régions.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface RegionRepository extends JpaRepository<Region, UUID> {

    /**
     * Recherche une région par son code.
     *
     * @param code le code de la région
     * @return la région si elle existe
     */
    Optional<Region> findByCode(String code);

    /**
     * Vérifie si un code de région existe.
     *
     * @param code le code à vérifier
     * @return true si le code existe
     */
    boolean existsByCode(String code);
}
