package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.MediaStatus;
import com.tft.tournament.domain.enums.MediaType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Entité représentant un média (VOD, upload) associé à un tournoi.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "media", indexes = {
        @Index(name = "idx_media_tournament", columnList = "tournament_id"),
        @Index(name = "idx_media_caster", columnList = "caster_id"),
        @Index(name = "idx_media_match", columnList = "match_id"),
        @Index(name = "idx_media_status", columnList = "status"),
        @Index(name = "idx_media_type", columnList = "type")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "caster_id")
    private User caster;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id")
    private Match match;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MediaType type;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "embed_url", length = 500)
    private String embedUrl;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "source_url", length = 500)
    private String sourceUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MediaStatus status = MediaStatus.PENDING;

    @Column(name = "moderator_comment", columnDefinition = "TEXT")
    private String moderatorComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "moderated_by")
    private User moderatedBy;

    @Column(name = "moderated_at")
    private Instant moderatedAt;

    @Column(name = "twitch_video_id", length = 100)
    private String twitchVideoId;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
