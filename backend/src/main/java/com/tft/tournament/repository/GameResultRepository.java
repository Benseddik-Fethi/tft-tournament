package com.tft.tournament.repository;

import com.tft.tournament.domain.GameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des résultats de parties.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface GameResultRepository extends JpaRepository<GameResult, UUID> {

    /**
     * Recherche tous les résultats d'une partie.
     *
     * @param gameId l'identifiant de la partie
     * @return la liste des résultats
     */
    List<GameResult> findByGameIdOrderByPlacementAsc(UUID gameId);

    /**
     * Recherche le résultat d'un participant dans une partie.
     *
     * @param gameId        l'identifiant de la partie
     * @param participantId l'identifiant du participant
     * @return le résultat si trouvé
     */
    Optional<GameResult> findByGameIdAndParticipantId(UUID gameId, UUID participantId);

    /**
     * Recherche tous les résultats d'un participant.
     *
     * @param participantId l'identifiant du participant
     * @return la liste des résultats
     */
    List<GameResult> findByParticipantId(UUID participantId);

    /**
     * Recherche les résultats non validés.
     *
     * @param gameId l'identifiant de la partie
     * @return la liste des résultats non validés
     */
    List<GameResult> findByGameIdAndIsValidatedFalse(UUID gameId);
}
