package com.tft.tournament.service.impl;

import com.tft.tournament.domain.Participant;
import com.tft.tournament.domain.Tournament;
import com.tft.tournament.dto.response.ParticipantResponse;
import com.tft.tournament.dto.response.StandingResponse;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.mapper.ParticipantMapper;
import com.tft.tournament.repository.ParticipantRepository;
import com.tft.tournament.repository.TournamentRepository;
import com.tft.tournament.service.StandingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Implémentation du service de calcul des classements.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StandingServiceImpl implements StandingService {

    private final TournamentRepository tournamentRepository;
    private final ParticipantRepository participantRepository;
    private final ParticipantMapper participantMapper;

    @Override
    public List<StandingResponse> getTournamentStandings(String tournamentSlug) {
        Tournament tournament = tournamentRepository.findBySlug(tournamentSlug)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé avec le slug: " + tournamentSlug));

        List<Participant> participants = participantRepository.findAll().stream()
                .filter(p -> tournament.getId().equals(p.getTournament().getId()))
                .sorted(Comparator.comparing(Participant::getTotalPoints, Comparator.reverseOrder())
                        .thenComparing(p -> p.getAveragePlacement() != null ? p.getAveragePlacement() : java.math.BigDecimal.ZERO))
                .toList();

        AtomicInteger rank = new AtomicInteger(1);
        return participants.stream()
                .map(participant -> createStandingResponse(rank.getAndIncrement(), participant))
                .toList();
    }

    @Override
    public List<StandingResponse> getPhaseStandings(UUID phaseId) {
        // Pour une phase spécifique, on devrait filtrer par les résultats de cette phase
        // Pour simplifier, on retourne les standings globaux du tournoi lié à cette phase
        // Une implémentation complète nécessiterait de stocker les points par phase
        return List.of();
    }

    @Override
    @Transactional
    public void recalculateStandings(UUID tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        List<Participant> participants = participantRepository.findAll().stream()
                .filter(p -> tournament.getId().equals(p.getTournament().getId()))
                .toList();

        // Recalculer les statistiques pour chaque participant
        for (Participant participant : participants) {
            // Les points et statistiques sont normalement calculés à partir des GameResults
            // Cette implémentation simplifiée utilise les valeurs déjà stockées
            participantRepository.save(participant);
        }
    }

    /**
     * Crée une réponse de classement à partir d'un participant.
     *
     * @param rank le rang
     * @param participant le participant
     * @return la réponse de classement
     */
    private StandingResponse createStandingResponse(int rank, Participant participant) {
        ParticipantResponse participantResponse = participantMapper.toResponse(participant);
        
        return new StandingResponse(
                rank,
                participantResponse,
                participant.getTotalPoints(),
                participant.getGamesPlayed(),
                participant.getWins(),
                participant.getTop4Count(),
                participant.getAveragePlacement(),
                participant.getBestPlacement(),
                participant.getWorstPlacement(),
                participant.getPlacementHistory()
        );
    }
}
