package com.tft.tournament.service;

import com.tft.tournament.domain.enums.CircuitType;
import com.tft.tournament.dto.response.CircuitDetailResponse;
import com.tft.tournament.dto.response.CircuitListResponse;

import java.util.List;
import java.util.UUID;

/**
 * Service pour la gestion des circuits.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface CircuitService {

    /**
     * Récupère tous les circuits actifs avec filtres optionnels.
     *
     * @param regionId identifiant de la région (optionnel)
     * @param year année (optionnel)
     * @param circuitType type de circuit (optionnel)
     * @return la liste des circuits
     */
    List<CircuitListResponse> getAllCircuits(UUID regionId, Integer year, CircuitType circuitType);

    /**
     * Récupère un circuit par son slug.
     *
     * @param slug le slug du circuit
     * @return le détail du circuit
     */
    CircuitDetailResponse getCircuitBySlug(String slug);

    /**
     * Récupère les circuits organisés par un utilisateur.
     *
     * @param organizerId identifiant de l'organisateur
     * @return la liste des circuits
     */
    List<CircuitListResponse> getCircuitsByOrganizer(UUID organizerId);
}
