package com.tft.tournament.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Entité représentant un participant dans un match spécifique.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "match_participants", indexes = {
        @Index(name = "idx_match_participant_match", columnList = "match_id"),
        @Index(name = "idx_match_participant_participant", columnList = "participant_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    @Column(name = "lobby_slot")
    private Integer lobbySlot;

    @Column(name = "is_checked_in", nullable = false)
    @Builder.Default
    private Boolean isCheckedIn = false;

    @Column(name = "checked_in_at")
    private Instant checkedInAt;

    @Column(name = "match_points", nullable = false)
    @Builder.Default
    private Integer matchPoints = 0;

    @Column(name = "match_placement")
    private Integer matchPlacement;

    @Column(name = "match_games_played", nullable = false)
    @Builder.Default
    private Integer matchGamesPlayed = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
