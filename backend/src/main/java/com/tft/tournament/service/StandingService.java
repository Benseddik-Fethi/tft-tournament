package com.tft.tournament.service;

import com.tft.tournament.dto.response.StandingResponse;

import java.util.List;
import java.util.UUID;

/**
 * Service pour le calcul des classements.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface StandingService {

    /**
     * Récupère le classement d'un tournoi.
     *
     * @param tournamentSlug le slug du tournoi
     * @return la liste des classements
     */
    List<StandingResponse> getTournamentStandings(String tournamentSlug);

    /**
     * Récupère le classement d'une phase.
     *
     * @param phaseId identifiant de la phase
     * @return la liste des classements
     */
    List<StandingResponse> getPhaseStandings(UUID phaseId);

    /**
     * Recalcule les classements d'un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     */
    void recalculateStandings(UUID tournamentId);

    /**
     * Met à jour les statistiques d'un participant à partir de ses résultats de parties.
     * Cette méthode devrait être appelée après chaque soumission de résultat de partie.
     *
     * @param participantId identifiant du participant
     */
    void updateParticipantStats(UUID participantId);
}
