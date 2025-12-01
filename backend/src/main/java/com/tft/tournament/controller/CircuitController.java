package com.tft.tournament.controller;

import com.tft.tournament.domain.enums.CircuitType;
import com.tft.tournament.dto.response.CircuitDetailResponse;
import com.tft.tournament.dto.response.CircuitListResponse;
import com.tft.tournament.security.CustomUserDetails;
import com.tft.tournament.service.CircuitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Contrôleur REST pour les circuits.
 * <p>
 * Expose les endpoints publics et protégés pour la gestion des circuits.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequiredArgsConstructor
public class CircuitController {

    private final CircuitService circuitService;

    // ==================== PUBLIC ENDPOINTS ====================

    /**
     * Récupère tous les circuits avec filtres optionnels.
     *
     * @param regionId identifiant de la région (optionnel)
     * @param year année (optionnel)
     * @param circuitType type de circuit (optionnel)
     * @return la liste des circuits
     */
    @GetMapping("/api/v1/public/circuits")
    public ResponseEntity<List<CircuitListResponse>> getAllCircuits(
            @RequestParam(required = false) UUID regionId,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) CircuitType circuitType
    ) {
        return ResponseEntity.ok(circuitService.getAllCircuits(regionId, year, circuitType));
    }

    /**
     * Récupère un circuit par son slug.
     *
     * @param slug le slug du circuit
     * @return le détail du circuit
     */
    @GetMapping("/api/v1/public/circuits/{slug}")
    public ResponseEntity<CircuitDetailResponse> getCircuitBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(circuitService.getCircuitBySlug(slug));
    }

    // ==================== AUTHENTICATED ENDPOINTS ====================

    /**
     * Récupère les circuits de l'utilisateur connecté.
     *
     * @param userDetails les détails de l'utilisateur authentifié
     * @return la liste des circuits de l'utilisateur
     */
    @GetMapping("/api/v1/circuits")
    public ResponseEntity<List<CircuitListResponse>> getMyCircuits(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(circuitService.getCircuitsByOrganizer(userDetails.getUser().getId()));
    }
}
