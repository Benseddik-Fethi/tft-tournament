package com.tft.tournament.service;

import com.tft.tournament.dto.response.RegionResponse;

import java.util.List;

/**
 * Service pour la gestion des régions.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface RegionService {

    /**
     * Récupère toutes les régions actives.
     *
     * @return la liste des régions actives
     */
    List<RegionResponse> getAllActiveRegions();

    /**
     * Récupère une région par son code.
     *
     * @param code le code de la région
     * @return la région correspondante
     */
    RegionResponse getRegionByCode(String code);
}
