package com.tft.tournament.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Entité représentant un participant au sein d'un groupe de tournoi.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "group_participants", indexes = {
        @Index(name = "idx_group_participant_group", columnList = "group_id"),
        @Index(name = "idx_group_participant_participant", columnList = "participant_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private TournamentGroup group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    @Column
    private Integer seed;

    @Column(name = "group_points", nullable = false)
    @Builder.Default
    private Integer groupPoints = 0;

    @Column(name = "group_games_played", nullable = false)
    @Builder.Default
    private Integer groupGamesPlayed = 0;

    @Column(name = "group_rank")
    private Integer groupRank;

    @Column(name = "is_advanced", nullable = false)
    @Builder.Default
    private Boolean isAdvanced = false;

    @Column(name = "is_eliminated", nullable = false)
    @Builder.Default
    private Boolean isEliminated = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
