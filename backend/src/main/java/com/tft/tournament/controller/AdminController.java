package com.tft.tournament.controller;

import com.tft.tournament.dto.response.AuditLogResponse;
import com.tft.tournament.security.CustomUserDetails;
import com.tft.tournament.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Contrôleur REST pour les fonctionnalités d'administration.
 * <p>
 * Expose les endpoints pour les fonctionnalités admin comme les logs d'audit
 * et la régénération des appairements.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /**
     * Récupère les logs d'audit d'un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @param userDetails  les détails de l'utilisateur authentifié
     * @return la liste des logs d'audit
     */
    @GetMapping("/api/v1/tournaments/{tournamentId}/audit")
    public ResponseEntity<List<AuditLogResponse>> getTournamentAuditLogs(
            @PathVariable UUID tournamentId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(adminService.getTournamentAuditLogs(
                tournamentId, userDetails.getUser().getId()));
    }

    /**
     * Régénère les appairements d'un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @param userDetails  les détails de l'utilisateur authentifié
     * @return message de confirmation
     */
    @PostMapping("/api/v1/admin/tournaments/{tournamentId}/regenerate-pairings")
    @PreAuthorize("hasRole('ADMIN') or @tournamentService.isOrganizerOrAdmin(#tournamentId, authentication.principal.user.id)")
    public ResponseEntity<AdminService.RegeneratePairingsResponse> regeneratePairings(
            @PathVariable UUID tournamentId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(adminService.regeneratePairings(
                tournamentId, userDetails.getUser().getId()));
    }
}
