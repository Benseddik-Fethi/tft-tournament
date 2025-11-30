package com.tft.tournament.repository;

import com.tft.tournament.domain.GroupParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des participants de groupe.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface GroupParticipantRepository extends JpaRepository<GroupParticipant, UUID> {

    /**
     * Recherche tous les participants d'un groupe.
     *
     * @param groupId l'identifiant du groupe
     * @return la liste des participants de groupe
     */
    List<GroupParticipant> findByGroupIdOrderByGroupRankAsc(UUID groupId);

    /**
     * Recherche un participant dans un groupe.
     *
     * @param groupId       l'identifiant du groupe
     * @param participantId l'identifiant du participant
     * @return le participant de groupe si trouvé
     */
    Optional<GroupParticipant> findByGroupIdAndParticipantId(UUID groupId, UUID participantId);

    /**
     * Recherche les participants qualifiés d'un groupe.
     *
     * @param groupId l'identifiant du groupe
     * @return la liste des participants qualifiés
     */
    List<GroupParticipant> findByGroupIdAndIsAdvancedTrue(UUID groupId);
}
