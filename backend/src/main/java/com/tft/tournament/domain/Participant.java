package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.ParticipantStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * Entité représentant un participant à un tournoi TFT.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "participants", indexes = {
        @Index(name = "idx_participant_tournament", columnList = "tournament_id"),
        @Index(name = "idx_participant_user", columnList = "user_id"),
        @Index(name = "idx_participant_team", columnList = "team_id"),
        @Index(name = "idx_participant_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "display_name", length = 100)
    private String displayName;

    @Column(name = "riot_id", length = 100)
    private String riotId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ParticipantStatus status = ParticipantStatus.REGISTERED;

    @Column
    private Integer seed;

    @Column(name = "total_points", nullable = false)
    @Builder.Default
    private Integer totalPoints = 0;

    @Column(name = "games_played", nullable = false)
    @Builder.Default
    private Integer gamesPlayed = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer wins = 0;

    @Column(name = "top4_count", nullable = false)
    @Builder.Default
    private Integer top4Count = 0;

    @Column(name = "average_placement", precision = 4, scale = 2)
    private BigDecimal averagePlacement;

    @Column(name = "best_placement")
    private Integer bestPlacement;

    @Column(name = "worst_placement")
    private Integer worstPlacement;

    @Column(name = "placement_history", columnDefinition = "TEXT")
    private String placementHistory;

    @Column(name = "registered_at")
    private Instant registeredAt;

    @Column(name = "checked_in_at")
    private Instant checkedInAt;

    @Column(name = "eliminated_at")
    private Instant eliminatedAt;

    @Column(name = "final_rank")
    private Integer finalRank;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
