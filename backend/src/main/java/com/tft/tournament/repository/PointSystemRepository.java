package com.tft.tournament.repository;

import com.tft.tournament.domain.PointSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des systèmes de points.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface PointSystemRepository extends JpaRepository<PointSystem, UUID> {

    /**
     * Recherche le système de points par défaut.
     *
     * @return le système de points par défaut
     */
    Optional<PointSystem> findByIsDefaultTrue();

    /**
     * Recherche tous les systèmes de points système.
     *
     * @return la liste des systèmes de points système
     */
    List<PointSystem> findByIsSystemTrue();

    /**
     * Recherche les systèmes de points créés par un utilisateur.
     *
     * @param userId l'identifiant de l'utilisateur
     * @return la liste des systèmes de points
     */
    List<PointSystem> findByCreatedById(UUID userId);
}
