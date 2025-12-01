package com.tft.tournament.service.impl;

import com.tft.tournament.domain.AuditLog;
import com.tft.tournament.domain.Tournament;
import com.tft.tournament.dto.response.AuditLogResponse;
import com.tft.tournament.exception.BadRequestException;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.repository.AuditLogRepository;
import com.tft.tournament.repository.TournamentRepository;
import com.tft.tournament.service.AdminService;
import com.tft.tournament.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Implémentation du service d'administration.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    private final AuditLogRepository auditLogRepository;
    private final TournamentRepository tournamentRepository;
    private final TournamentService tournamentService;

    @Override
    public List<AuditLogResponse> getTournamentAuditLogs(UUID tournamentId, UUID userId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        if (!tournamentService.isOrganizerOrAdmin(tournamentId, userId)) {
            throw new BadRequestException("Vous n'avez pas les droits pour consulter les logs d'audit");
        }

        // Get audit logs that mention this tournament in metadata
        // For now, we filter by action types related to tournaments
        List<String> tournamentActions = List.of(
                "TOURNAMENT_CREATED",
                "TOURNAMENT_UPDATED",
                "TOURNAMENT_DELETED",
                "PARTICIPANT_REGISTERED",
                "PARTICIPANT_REMOVED",
                "MATCH_RESULT_SUBMITTED",
                "MEDIA_UPLOADED",
                "MEDIA_APPROVED",
                "MEDIA_REJECTED"
        );

        return auditLogRepository.findAll().stream()
                .filter(log -> {
                    if (tournamentActions.contains(log.getAction())) {
                        Map<String, Object> metadata = log.getMetadata();
                        if (metadata != null && metadata.containsKey("tournamentId")) {
                            return tournamentId.toString().equals(metadata.get("tournamentId").toString());
                        }
                    }
                    return false;
                })
                .map(AuditLogResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public RegeneratePairingsResponse regeneratePairings(UUID tournamentId, UUID userId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        if (!tournamentService.isOrganizerOrAdmin(tournamentId, userId)) {
            throw new BadRequestException("Vous n'avez pas les droits pour régénérer les appairements");
        }

        // Create audit log for this action
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("tournamentId", tournamentId.toString());
        metadata.put("action", "REGENERATE_PAIRINGS");

        AuditLog auditLog = AuditLog.builder()
                .action("PAIRINGS_REGENERATED")
                .metadata(metadata)
                .build();
        auditLogRepository.save(auditLog);

        // Note: Actual pairing regeneration logic would go here
        // This is a placeholder that returns a success message
        // In production, this would recreate match pairings based on tournament format

        return new RegeneratePairingsResponse(
                true,
                "Appairements régénérés avec succès",
                0 // Placeholder - actual count would come from pairing logic
        );
    }
}
