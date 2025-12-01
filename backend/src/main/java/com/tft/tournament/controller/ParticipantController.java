package com.tft.tournament.controller;

import com.tft.tournament.security.CustomUserDetails;
import com.tft.tournament.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Contrôleur REST pour les participants.
 * <p>
 * Expose les endpoints pour la gestion des participants.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    /**
     * Supprime un participant d'un tournoi.
     *
     * @param id          identifiant du participant
     * @param userDetails les détails de l'utilisateur authentifié
     * @return réponse vide
     */
    @DeleteMapping("/api/v1/participants/{id}")
    public ResponseEntity<Void> deleteParticipant(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        participantService.deleteParticipant(id, userDetails.getUser().getId());
        return ResponseEntity.noContent().build();
    }
}
