package com.tft.tournament.controller;

import com.tft.tournament.dto.request.MediaConsentRequest;
import com.tft.tournament.dto.request.MediaImportRequest;
import com.tft.tournament.dto.request.MediaStatusUpdateRequest;
import com.tft.tournament.dto.request.MediaUploadRequest;
import com.tft.tournament.dto.response.MediaResponse;
import com.tft.tournament.security.CustomUserDetails;
import com.tft.tournament.service.MediaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Contrôleur REST pour les médias.
 * <p>
 * Expose les endpoints pour la gestion des médias (VOD, uploads, etc.).
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    // ==================== PUBLIC ENDPOINTS ====================

    /**
     * Récupère tous les médias d'un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @return la liste des médias
     */
    @GetMapping("/api/v1/public/tournaments/{tournamentId}/media")
    public ResponseEntity<List<MediaResponse>> getTournamentMedia(@PathVariable UUID tournamentId) {
        return ResponseEntity.ok(mediaService.getTournamentMedia(tournamentId));
    }

    /**
     * Récupère un média par son identifiant.
     *
     * @param id identifiant du média
     * @return le média
     */
    @GetMapping("/api/v1/public/media/{id}")
    public ResponseEntity<MediaResponse> getMediaById(@PathVariable UUID id) {
        return ResponseEntity.ok(mediaService.getMediaById(id));
    }

    // ==================== AUTHENTICATED ENDPOINTS ====================

    /**
     * Importe des médias depuis Twitch.
     *
     * @param tournamentId identifiant du tournoi
     * @param request      la requête d'import
     * @param userDetails  les détails de l'utilisateur authentifié
     * @return la liste des médias importés
     */
    @PostMapping("/api/v1/tournaments/{tournamentId}/media/import")
    public ResponseEntity<List<MediaResponse>> importFromTwitch(
            @PathVariable UUID tournamentId,
            @Valid @RequestBody MediaImportRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        List<MediaResponse> imported = mediaService.importFromTwitch(
                tournamentId, request, userDetails.getUser().getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(imported);
    }

    /**
     * Upload un nouveau média.
     *
     * @param tournamentId identifiant du tournoi
     * @param request      la requête d'upload
     * @param userDetails  les détails de l'utilisateur authentifié
     * @return le média créé
     */
    @PostMapping("/api/v1/tournaments/{tournamentId}/media/upload")
    public ResponseEntity<MediaResponse> uploadMedia(
            @PathVariable UUID tournamentId,
            @Valid @RequestBody MediaUploadRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        MediaResponse created = mediaService.uploadMedia(
                tournamentId, request, userDetails.getUser().getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Met à jour le statut d'un média (approve/reject).
     *
     * @param id          identifiant du média
     * @param request     la requête de mise à jour
     * @param userDetails les détails de l'utilisateur authentifié
     * @return le média mis à jour
     */
    @PutMapping("/api/v1/media/{id}/status")
    public ResponseEntity<MediaResponse> updateMediaStatus(
            @PathVariable UUID id,
            @Valid @RequestBody MediaStatusUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(mediaService.updateMediaStatus(
                id, request, userDetails.getUser().getId()));
    }

    /**
     * Crée un consentement média.
     *
     * @param request la requête de consentement
     * @return confirmation du consentement
     */
    @PostMapping("/api/v1/media/consent")
    public ResponseEntity<MediaService.MediaConsentResponse> createConsent(
            @Valid @RequestBody MediaConsentRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(mediaService.createConsent(request));
    }
}
