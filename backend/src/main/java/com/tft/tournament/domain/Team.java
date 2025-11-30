package com.tft.tournament.domain;

import com.tft.tournament.domain.enums.TeamStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Entité représentant une équipe dans un tournoi TFT.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "teams", indexes = {
        @Index(name = "idx_team_tournament", columnList = "tournament_id"),
        @Index(name = "idx_team_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 10)
    private String tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "captain_id")
    private User captain;

    @Column(name = "team_size", nullable = false)
    @Builder.Default
    private Integer teamSize = 1;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TeamStatus status = TeamStatus.PENDING;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Participant> members = new ArrayList<>();

    @Column(name = "total_points", nullable = false)
    @Builder.Default
    private Integer totalPoints = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
