package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.MatchStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Entité représentant un match de tournoi TFT.
 * Un match peut contenir plusieurs parties (games).
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "matches", indexes = {
        @Index(name = "idx_match_phase", columnList = "phase_id"),
        @Index(name = "idx_match_group", columnList = "group_id"),
        @Index(name = "idx_match_status", columnList = "status"),
        @Index(name = "idx_match_scheduled_time", columnList = "scheduled_time")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phase_id", nullable = false)
    private TournamentPhase phase;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private TournamentGroup group;

    @Column(length = 100)
    private String name;

    @Column(name = "round_number")
    private Integer roundNumber;

    @Column(name = "lobby_number")
    private Integer lobbyNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MatchStatus status = MatchStatus.SCHEDULED;

    @Column(name = "scheduled_time")
    private Instant scheduledTime;

    @Column(name = "actual_start_time")
    private Instant actualStartTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "lobby_code", length = 50)
    private String lobbyCode;

    @Column(name = "lobby_password", length = 50)
    private String lobbyPassword;

    @Column(name = "stream_url", length = 500)
    private String streamUrl;

    @Column(name = "vod_url", length = 500)
    private String vodUrl;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Game> games = new ArrayList<>();

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MatchParticipant> matchParticipants = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
