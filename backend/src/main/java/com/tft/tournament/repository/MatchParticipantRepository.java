package com.tft.tournament.repository;

import com.tft.tournament.domain.MatchParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des participants de match.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface MatchParticipantRepository extends JpaRepository<MatchParticipant, UUID> {

    /**
     * Recherche tous les participants d'un match.
     *
     * @param matchId l'identifiant du match
     * @return la liste des participants de match
     */
    List<MatchParticipant> findByMatchIdOrderByLobbySlotAsc(UUID matchId);

    /**
     * Recherche un participant dans un match.
     *
     * @param matchId       l'identifiant du match
     * @param participantId l'identifiant du participant
     * @return le participant de match si trouvé
     */
    Optional<MatchParticipant> findByMatchIdAndParticipantId(UUID matchId, UUID participantId);

    /**
     * Recherche tous les matchs d'un participant.
     *
     * @param participantId l'identifiant du participant
     * @return la liste des participations aux matchs
     */
    List<MatchParticipant> findByParticipantId(UUID participantId);
}
