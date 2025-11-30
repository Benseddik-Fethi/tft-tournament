package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.ResultSource;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Entité représentant le résultat d'un participant dans une partie.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "game_results", indexes = {
        @Index(name = "idx_result_game", columnList = "game_id"),
        @Index(name = "idx_result_participant", columnList = "participant_id"),
        @Index(name = "idx_result_placement", columnList = "placement")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    @Column(nullable = false)
    private Integer placement;

    @Column(nullable = false)
    @Builder.Default
    private Integer points = 0;

    @Column(name = "final_health")
    private Integer finalHealth;

    @Column(name = "rounds_survived")
    private Integer roundsSurvived;

    @Column(name = "players_eliminated")
    private Integer playersEliminated;

    @Column(name = "total_damage_dealt")
    private Integer totalDamageDealt;

    @Column(columnDefinition = "TEXT")
    private String composition;

    @Column(columnDefinition = "TEXT")
    private String augments;

    @Column(name = "is_validated", nullable = false)
    @Builder.Default
    private Boolean isValidated = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "validated_by")
    private User validatedBy;

    @Column(name = "validated_at")
    private Instant validatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "result_source", length = 20)
    @Builder.Default
    private ResultSource resultSource = ResultSource.MANUAL;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
