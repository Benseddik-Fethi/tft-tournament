package com.tft.tournament.service;

import com.tft.tournament.dto.request.MediaConsentRequest;
import com.tft.tournament.dto.request.MediaImportRequest;
import com.tft.tournament.dto.request.MediaStatusUpdateRequest;
import com.tft.tournament.dto.request.MediaUploadRequest;
import com.tft.tournament.dto.response.MediaResponse;

import java.util.List;
import java.util.UUID;

/**
 * Service pour la gestion des médias.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface MediaService {

    /**
     * Récupère tous les médias d'un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @return la liste des médias
     */
    List<MediaResponse> getTournamentMedia(UUID tournamentId);

    /**
     * Importe des médias depuis Twitch.
     *
     * @param tournamentId identifiant du tournoi
     * @param request      la requête d'import
     * @param userId       identifiant de l'utilisateur qui effectue l'import
     * @return la liste des médias importés
     */
    List<MediaResponse> importFromTwitch(UUID tournamentId, MediaImportRequest request, UUID userId);

    /**
     * Upload un nouveau média.
     *
     * @param tournamentId identifiant du tournoi
     * @param request      la requête d'upload
     * @param userId       identifiant de l'utilisateur qui effectue l'upload
     * @return le média créé
     */
    MediaResponse uploadMedia(UUID tournamentId, MediaUploadRequest request, UUID userId);

    /**
     * Met à jour le statut d'un média (approve/reject).
     *
     * @param mediaId identifiant du média
     * @param request la requête de mise à jour
     * @param userId  identifiant de l'utilisateur qui effectue la mise à jour
     * @return le média mis à jour
     */
    MediaResponse updateMediaStatus(UUID mediaId, MediaStatusUpdateRequest request, UUID userId);

    /**
     * Crée un consentement média.
     *
     * @param request la requête de consentement
     * @return confirmation du consentement
     */
    MediaConsentResponse createConsent(MediaConsentRequest request);

    /**
     * Récupère un média par son identifiant.
     *
     * @param mediaId identifiant du média
     * @return le média
     */
    MediaResponse getMediaById(UUID mediaId);

    /**
     * Réponse de consentement média.
     *
     * @param id           identifiant du consentement
     * @param casterId     identifiant du caster
     * @param tournamentId identifiant du tournoi
     * @param consentMethod méthode de consentement
     * @param isActive     si le consentement est actif
     */
    record MediaConsentResponse(
            UUID id,
            UUID casterId,
            UUID tournamentId,
            String consentMethod,
            Boolean isActive
    ) {
    }
}
