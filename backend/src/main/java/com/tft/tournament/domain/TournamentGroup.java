package com.tft.tournament.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Entité représentant un groupe au sein d'une phase de tournoi.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Entity
@Table(name = "tournament_groups", indexes = {
        @Index(name = "idx_group_phase", columnList = "phase_id"),
        @Index(name = "idx_group_order", columnList = "order_index")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TournamentGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phase_id", nullable = false)
    private TournamentPhase phase;

    @Column(name = "group_name", nullable = false, length = 50)
    private String groupName;

    @Column(name = "order_index", nullable = false)
    @Builder.Default
    private Integer orderIndex = 0;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<GroupParticipant> groupParticipants = new ArrayList<>();

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Match> matches = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
