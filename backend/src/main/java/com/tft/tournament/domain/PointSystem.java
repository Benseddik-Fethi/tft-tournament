package com.tft.tournament.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

/**
 * Entité représentant un système de points pour les tournois TFT.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "point_systems", indexes = {
        @Index(name = "idx_point_system_is_default", columnList = "is_default")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PointSystem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "points_1st", nullable = false)
    @Builder.Default
    private Integer points1st = 8;

    @Column(name = "points_2nd", nullable = false)
    @Builder.Default
    private Integer points2nd = 7;

    @Column(name = "points_3rd", nullable = false)
    @Builder.Default
    private Integer points3rd = 6;

    @Column(name = "points_4th", nullable = false)
    @Builder.Default
    private Integer points4th = 5;

    @Column(name = "points_5th", nullable = false)
    @Builder.Default
    private Integer points5th = 4;

    @Column(name = "points_6th", nullable = false)
    @Builder.Default
    private Integer points6th = 3;

    @Column(name = "points_7th", nullable = false)
    @Builder.Default
    private Integer points7th = 2;

    @Column(name = "points_8th", nullable = false)
    @Builder.Default
    private Integer points8th = 1;

    @Column(name = "is_default", nullable = false)
    @Builder.Default
    private Boolean isDefault = false;

    @Column(name = "is_system", nullable = false)
    @Builder.Default
    private Boolean isSystem = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    /**
     * Calcule les points pour un placement donné.
     *
     * @param placement le placement (1-8)
     * @return les points correspondants
     */
    public int getPointsForPlacement(int placement) {
        return switch (placement) {
            case 1 -> points1st;
            case 2 -> points2nd;
            case 3 -> points3rd;
            case 4 -> points4th;
            case 5 -> points5th;
            case 6 -> points6th;
            case 7 -> points7th;
            case 8 -> points8th;
            default -> 0;
        };
    }
}
