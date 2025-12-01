package com.tft.tournament.controller;

import com.tft.tournament.dto.request.MatchResultsRequest;
import com.tft.tournament.dto.request.SubmitResultsRequest;
import com.tft.tournament.dto.response.GameResponse;
import com.tft.tournament.dto.response.MatchDetailResponse;
import com.tft.tournament.dto.response.MatchResultsResponse;
import com.tft.tournament.security.CustomUserDetails;
import com.tft.tournament.service.MatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Contrôleur REST pour les matchs.
 * <p>
 * Expose les endpoints publics et protégés pour la gestion des matchs.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    // ==================== PUBLIC ENDPOINTS ====================

    /**
     * Récupère un match par son identifiant.
     *
     * @param id identifiant du match
     * @return le détail du match
     */
    @GetMapping("/api/v1/public/matches/{id}")
    public ResponseEntity<MatchDetailResponse> getMatchById(@PathVariable UUID id) {
        return ResponseEntity.ok(matchService.getMatchById(id));
    }

    /**
     * Récupère les parties d'un match.
     *
     * @param id identifiant du match
     * @return la liste des parties
     */
    @GetMapping("/api/v1/public/matches/{id}/games")
    public ResponseEntity<List<GameResponse>> getMatchGames(@PathVariable UUID id) {
        return ResponseEntity.ok(matchService.getMatchGames(id));
    }

    // ==================== PROTECTED ENDPOINTS ====================

    /**
     * Soumet les résultats d'une partie.
     *
     * @param id identifiant du match
     * @param gameNumber numéro de la partie
     * @param request la requête avec les résultats
     * @param userDetails les détails de l'utilisateur authentifié
     * @return la partie mise à jour
     */
    @PutMapping("/api/v1/matches/{id}/games/{gameNumber}/results")
    public ResponseEntity<GameResponse> submitResults(
            @PathVariable UUID id,
            @PathVariable Integer gameNumber,
            @Valid @RequestBody SubmitResultsRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(matchService.submitResults(id, gameNumber, request, userDetails.getUser().getId()));
    }

    /**
     * Soumet les résultats d'un match selon le format de la spécification API.
     *
     * @param id identifiant du match
     * @param request la requête avec les placements et notes
     * @param userDetails les détails de l'utilisateur authentifié
     * @return les résultats soumis
     */
    @PostMapping("/api/v1/matches/{id}/results")
    public ResponseEntity<MatchResultsResponse> submitMatchResults(
            @PathVariable UUID id,
            @Valid @RequestBody MatchResultsRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(matchService.submitMatchResults(id, request, userDetails.getUser().getId()));
    }
}
