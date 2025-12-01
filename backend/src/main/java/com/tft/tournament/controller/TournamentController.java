package com.tft.tournament.controller;

import com.tft.tournament.domain.enums.TournamentStatus;
import com.tft.tournament.domain.enums.TournamentType;
import com.tft.tournament.dto.request.CreateTournamentRequest;
import com.tft.tournament.dto.request.RegisterTournamentRequest;
import com.tft.tournament.dto.request.UpdateTournamentRequest;
import com.tft.tournament.dto.response.*;
import com.tft.tournament.security.CustomUserDetails;
import com.tft.tournament.service.StandingService;
import com.tft.tournament.service.TournamentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Contrôleur REST pour les tournois.
 * <p>
 * Expose les endpoints publics et protégés pour la gestion des tournois.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentService tournamentService;
    private final StandingService standingService;

    // ==================== PUBLIC ENDPOINTS ====================

    /**
     * Récupère tous les tournois publics avec filtres optionnels.
     *
     * @param regionId identifiant de la région (optionnel)
     * @param status statut du tournoi (optionnel)
     * @param tournamentType type de tournoi (optionnel)
     * @param search recherche textuelle (optionnel)
     * @return la liste des tournois
     */
    @GetMapping("/api/v1/public/tournaments")
    public ResponseEntity<List<TournamentListResponse>> getAllTournaments(
            @RequestParam(required = false) UUID regionId,
            @RequestParam(required = false) TournamentStatus status,
            @RequestParam(required = false) TournamentType tournamentType,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(tournamentService.getAllPublicTournaments(regionId, status, tournamentType, search));
    }

    /**
     * Récupère un tournoi par son slug.
     *
     * @param slug le slug du tournoi
     * @return le détail du tournoi
     */
    @GetMapping("/api/v1/public/tournaments/{slug}")
    public ResponseEntity<TournamentDetailResponse> getTournamentBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(tournamentService.getTournamentBySlug(slug));
    }

    /**
     * Récupère le classement d'un tournoi.
     *
     * @param slug le slug du tournoi
     * @return la liste des classements
     */
    @GetMapping("/api/v1/public/tournaments/{slug}/standings")
    public ResponseEntity<List<StandingResponse>> getTournamentStandings(@PathVariable String slug) {
        return ResponseEntity.ok(standingService.getTournamentStandings(slug));
    }

    /**
     * Récupère les matchs d'un tournoi.
     *
     * @param slug le slug du tournoi
     * @return la liste des matchs
     */
    @GetMapping("/api/v1/public/tournaments/{slug}/matches")
    public ResponseEntity<List<MatchResponse>> getTournamentMatches(@PathVariable String slug) {
        return ResponseEntity.ok(tournamentService.getTournamentMatches(slug));
    }

    /**
     * Récupère les participants d'un tournoi.
     *
     * @param slug le slug du tournoi
     * @return la liste des participants
     */
    @GetMapping("/api/v1/public/tournaments/{slug}/participants")
    public ResponseEntity<List<ParticipantResponse>> getTournamentParticipants(@PathVariable String slug) {
        return ResponseEntity.ok(tournamentService.getTournamentParticipants(slug));
    }

    // ==================== AUTHENTICATED ENDPOINTS ====================

    /**
     * Crée un nouveau tournoi.
     *
     * @param request la requête de création
     * @param userDetails les détails de l'utilisateur authentifié
     * @return le tournoi créé
     */
    @PostMapping("/api/v1/tournaments")
    public ResponseEntity<TournamentDetailResponse> createTournament(
            @Valid @RequestBody CreateTournamentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        TournamentDetailResponse created = tournamentService.createTournament(request, userDetails.getUser().getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Met à jour un tournoi.
     *
     * @param id identifiant du tournoi
     * @param request la requête de mise à jour
     * @param userDetails les détails de l'utilisateur authentifié
     * @return le tournoi mis à jour
     */
    @PutMapping("/api/v1/tournaments/{id}")
    public ResponseEntity<TournamentDetailResponse> updateTournament(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTournamentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(tournamentService.updateTournament(id, request, userDetails.getUser().getId()));
    }

    /**
     * Supprime un tournoi (admin uniquement).
     *
     * @param id identifiant du tournoi
     * @return réponse vide
     */
    @DeleteMapping("/api/v1/tournaments/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTournament(@PathVariable UUID id) {
        tournamentService.deleteTournament(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Inscrit l'utilisateur à un tournoi.
     *
     * @param id identifiant du tournoi
     * @param request la requête d'inscription
     * @param userDetails les détails de l'utilisateur authentifié
     * @return le participant créé
     */
    @PostMapping("/api/v1/tournaments/{id}/register")
    public ResponseEntity<ParticipantResponse> registerToTournament(
            @PathVariable UUID id,
            @Valid @RequestBody(required = false) RegisterTournamentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        RegisterTournamentRequest registerRequest = request != null ? request : new RegisterTournamentRequest(null, null);
        ParticipantResponse participant = tournamentService.registerToTournament(id, userDetails.getUser().getId(), registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(participant);
    }

    /**
     * Effectue le check-in de l'utilisateur.
     *
     * @param id identifiant du tournoi
     * @param userDetails les détails de l'utilisateur authentifié
     * @return le participant mis à jour
     */
    @PostMapping("/api/v1/tournaments/{id}/check-in")
    public ResponseEntity<ParticipantResponse> checkIn(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(tournamentService.checkIn(id, userDetails.getUser().getId()));
    }
}
