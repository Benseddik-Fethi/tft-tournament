package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.GameStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Entité représentant une partie individuelle au sein d'un match.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "games", indexes = {
        @Index(name = "idx_game_match", columnList = "match_id"),
        @Index(name = "idx_game_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;

    @Column(name = "game_number", nullable = false)
    private Integer gameNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private GameStatus status = GameStatus.PENDING;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(name = "riot_match_id", length = 100)
    private String riotMatchId;

    @Column(name = "game_set", length = 20)
    private String gameSet;

    @Column(name = "game_patch", length = 20)
    private String gamePatch;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<GameResult> results = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
