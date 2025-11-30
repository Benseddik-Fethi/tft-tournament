package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.PhaseStatus;
import com.tft.tournament.domain.enums.PhaseType;
import com.tft.tournament.domain.enums.TournamentFormatType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Entité représentant une phase d'un tournoi TFT.
 * Chaque tournoi peut avoir plusieurs phases (groupes, Swiss, playoffs, etc.).
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "tournament_phases", indexes = {
        @Index(name = "idx_phase_tournament", columnList = "tournament_id"),
        @Index(name = "idx_phase_status", columnList = "status"),
        @Index(name = "idx_phase_order", columnList = "order_index")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TournamentPhase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @Column(nullable = false, length = 200)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "phase_type", nullable = false, length = 20)
    private PhaseType phaseType;

    @Enumerated(EnumType.STRING)
    @Column(name = "format_type", nullable = false, length = 30)
    private TournamentFormatType formatType;

    @Column(name = "order_index", nullable = false)
    @Builder.Default
    private Integer orderIndex = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private PhaseStatus status = PhaseStatus.UPCOMING;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "games_per_round")
    private Integer gamesPerRound;

    @Column(name = "total_rounds")
    private Integer totalRounds;

    @Column(name = "players_per_lobby")
    @Builder.Default
    private Integer playersPerLobby = 8;

    @Column(name = "advancing_count")
    private Integer advancingCount;

    @Column(name = "eliminated_count")
    private Integer eliminatedCount;

    @Column(name = "number_of_groups")
    private Integer numberOfGroups;

    @Column(name = "players_per_group")
    private Integer playersPerGroup;

    @Column(name = "advancing_per_group")
    private Integer advancingPerGroup;

    @Column(columnDefinition = "TEXT")
    private String tiebreakers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "point_system_id")
    private PointSystem pointSystem;

    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TournamentGroup> groups = new ArrayList<>();

    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Match> matches = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
