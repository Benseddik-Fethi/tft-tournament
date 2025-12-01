package com.tft.tournament.dto.response;

import com.tft.tournament.domain.AuditLog;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

/**
 * DTO de réponse pour un log d'audit.
 *
 * @param id        identifiant du log
 * @param userId    identifiant de l'utilisateur (si applicable)
 * @param action    type d'action
 * @param metadata  métadonnées supplémentaires
 * @param ipAddress adresse IP
 * @param userAgent user agent
 * @param createdAt date de création
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record AuditLogResponse(
        UUID id,
        UUID userId,
        String action,
        Map<String, Object> metadata,
        String ipAddress,
        String userAgent,
        Instant createdAt
) {
    /**
     * Crée une réponse à partir d'une entité AuditLog.
     *
     * @param auditLog l'entité
     * @return la réponse
     */
    public static AuditLogResponse fromEntity(AuditLog auditLog) {
        return new AuditLogResponse(
                auditLog.getId(),
                auditLog.getUser() != null ? auditLog.getUser().getId() : null,
                auditLog.getAction(),
                auditLog.getMetadata(),
                auditLog.getIpAddress(),
                auditLog.getUserAgent(),
                auditLog.getCreatedAt()
        );
    }
}
