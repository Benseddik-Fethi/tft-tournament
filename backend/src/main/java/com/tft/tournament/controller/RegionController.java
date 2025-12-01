package com.tft.tournament.controller;

import com.tft.tournament.dto.response.RegionResponse;
import com.tft.tournament.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Contrôleur REST pour les régions.
 * <p>
 * Expose les endpoints publics pour récupérer les informations sur les régions.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequestMapping("/api/v1/public/regions")
@RequiredArgsConstructor
public class RegionController {

    private final RegionService regionService;

    /**
     * Récupère toutes les régions actives.
     *
     * @return la liste des régions actives
     */
    @GetMapping
    public ResponseEntity<List<RegionResponse>> getAllRegions() {
        return ResponseEntity.ok(regionService.getAllActiveRegions());
    }

    /**
     * Récupère une région par son code.
     *
     * @param code le code de la région
     * @return la région correspondante
     */
    @GetMapping("/{code}")
    public ResponseEntity<RegionResponse> getRegionByCode(@PathVariable String code) {
        return ResponseEntity.ok(regionService.getRegionByCode(code));
    }
}
