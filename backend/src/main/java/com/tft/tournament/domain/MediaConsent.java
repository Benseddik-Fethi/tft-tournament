package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.ConsentMethod;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Entité représentant le consentement d'un caster pour l'utilisation de ses médias.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "media_consents", indexes = {
        @Index(name = "idx_media_consent_caster", columnList = "caster_id"),
        @Index(name = "idx_media_consent_tournament", columnList = "tournament_id")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uk_media_consent_caster_tournament", columnNames = {"caster_id", "tournament_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaConsent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "caster_id", nullable = false)
    private User caster;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @Enumerated(EnumType.STRING)
    @Column(name = "consent_method", nullable = false, length = 30)
    private ConsentMethod consentMethod;

    @Column(name = "proof_url", length = 500)
    private String proofUrl;

    @Column(name = "consented_at", nullable = false)
    private Instant consentedAt;

    @Column(name = "expires_at")
    private Instant expiresAt;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
