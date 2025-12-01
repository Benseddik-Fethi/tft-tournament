package com.tft.tournament.service.impl;

import com.tft.tournament.domain.GameResult;
import com.tft.tournament.domain.Participant;
import com.tft.tournament.domain.Tournament;
import com.tft.tournament.domain.TournamentPhase;
import com.tft.tournament.domain.enums.TiebreakerType;
import com.tft.tournament.dto.response.ParticipantResponse;
import com.tft.tournament.dto.response.StandingResponse;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.mapper.ParticipantMapper;
import com.tft.tournament.repository.GameResultRepository;
import com.tft.tournament.repository.ParticipantRepository;
import com.tft.tournament.repository.TournamentPhaseRepository;
import com.tft.tournament.repository.TournamentRepository;
import com.tft.tournament.service.StandingService;
import com.tft.tournament.util.TiebreakerComparator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

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
    private final TournamentPhaseRepository tournamentPhaseRepository;
    private final GameResultRepository gameResultRepository;
    private final ParticipantMapper participantMapper;

    @Override
    public List<StandingResponse> getTournamentStandings(String tournamentSlug) {
        Tournament tournament = tournamentRepository.findBySlug(tournamentSlug)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé avec le slug: " + tournamentSlug));

        List<Participant> participants = participantRepository.findByTournamentId(tournament.getId());
        
        return calculateAndRankStandings(participants, new TiebreakerComparator());
    }

    @Override
    public List<StandingResponse> getPhaseStandings(UUID phaseId) {
        TournamentPhase phase = tournamentPhaseRepository.findById(phaseId)
                .orElseThrow(() -> new ResourceNotFoundException("Phase non trouvée avec l'ID: " + phaseId));

        List<Participant> participants = participantRepository.findByTournamentId(phase.getTournament().getId());
        
        List<TiebreakerType> phaseTiebreakers = parseTiebreakers(phase.getTiebreakers());
        
        return calculateAndRankStandings(participants, new TiebreakerComparator(phaseTiebreakers));
    }

    /**
     * Calcule et classe les standings pour une liste de participants.
     *
     * @param participants la liste des participants
     * @param comparator le comparateur de tiebreaker à utiliser
     * @return la liste des standings triés et classés
     */
    private List<StandingResponse> calculateAndRankStandings(List<Participant> participants, TiebreakerComparator comparator) {
        // Trier les participants selon le comparateur
        List<Participant> sortedParticipants = participants.stream()
                .sorted((p1, p2) -> {
                    // Comparaison principale par points totaux (décroissant)
                    int pointsCompare = Integer.compare(
                            p2.getTotalPoints() != null ? p2.getTotalPoints() : 0,
                            p1.getTotalPoints() != null ? p1.getTotalPoints() : 0
                    );
                    if (pointsCompare != 0) return pointsCompare;
                    
                    // Comparaison par placement moyen (croissant - plus bas = meilleur)
                    BigDecimal avg1 = p1.getAveragePlacement();
                    BigDecimal avg2 = p2.getAveragePlacement();
                    if (avg1 == null && avg2 == null) return 0;
                    if (avg1 == null) return 1;
                    if (avg2 == null) return -1;
                    int avgCompare = avg1.compareTo(avg2);
                    if (avgCompare != 0) return avgCompare;
                    
                    // Comparaison par victoires (décroissant)
                    int winsCompare = Integer.compare(
                            p2.getWins() != null ? p2.getWins() : 0,
                            p1.getWins() != null ? p1.getWins() : 0
                    );
                    if (winsCompare != 0) return winsCompare;
                    
                    // Comparaison par top 4 (décroissant)
                    return Integer.compare(
                            p2.getTop4Count() != null ? p2.getTop4Count() : 0,
                            p1.getTop4Count() != null ? p1.getTop4Count() : 0
                    );
                })
                .toList();
        
        // Créer les réponses avec les rangs assignés
        List<StandingResponse> standings = new ArrayList<>();
        for (int i = 0; i < sortedParticipants.size(); i++) {
            standings.add(createStandingResponse(i + 1, sortedParticipants.get(i)));
        }
        
        return standings;
    }

    @Override
    @Transactional
    public void recalculateStandings(UUID tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        List<Participant> participants = participantRepository.findByTournamentId(tournament.getId());

        // Recalculer les statistiques pour chaque participant
        for (Participant participant : participants) {
            updateParticipantStatsInternal(participant);
            participantRepository.save(participant);
        }
    }

    @Override
    @Transactional
    public void updateParticipantStats(UUID participantId) {
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new ResourceNotFoundException("Participant non trouvé avec l'ID: " + participantId));

        updateParticipantStatsInternal(participant);
        participantRepository.save(participant);
    }

    /**
     * Met à jour les statistiques internes d'un participant à partir de ses résultats de parties.
     *
     * @param participant le participant à mettre à jour
     */
    private void updateParticipantStatsInternal(Participant participant) {
        List<GameResult> results = gameResultRepository.findByParticipantId(participant.getId());

        if (results.isEmpty()) {
            // Réinitialiser les stats si aucun résultat
            participant.setTotalPoints(0);
            participant.setGamesPlayed(0);
            participant.setWins(0);
            participant.setTop4Count(0);
            participant.setAveragePlacement(null);
            participant.setBestPlacement(null);
            participant.setWorstPlacement(null);
            participant.setPlacementHistory("");
            return;
        }

        // Calculer les statistiques
        int totalPoints = results.stream()
                .mapToInt(GameResult::getPoints)
                .sum();

        int gamesPlayed = results.size();

        int wins = (int) results.stream()
                .filter(r -> r.getPlacement() != null && r.getPlacement() == 1)
                .count();

        int top4Count = (int) results.stream()
                .filter(r -> r.getPlacement() != null && r.getPlacement() <= 4)
                .count();

        double avgPlacement = results.stream()
                .filter(r -> r.getPlacement() != null)
                .mapToInt(GameResult::getPlacement)
                .average()
                .orElse(0.0);

        Integer bestPlacement = results.stream()
                .filter(r -> r.getPlacement() != null)
                .mapToInt(GameResult::getPlacement)
                .min()
                .orElse(0);

        Integer worstPlacement = results.stream()
                .filter(r -> r.getPlacement() != null)
                .mapToInt(GameResult::getPlacement)
                .max()
                .orElse(0);

        // Créer l'historique des placements (format JSON array)
        String placementHistory = results.stream()
                .filter(r -> r.getPlacement() != null)
                .sorted(Comparator.comparing(GameResult::getCreatedAt))
                .map(r -> String.valueOf(r.getPlacement()))
                .collect(Collectors.joining(",", "[", "]"));

        // Mettre à jour le participant
        participant.setTotalPoints(totalPoints);
        participant.setGamesPlayed(gamesPlayed);
        participant.setWins(wins);
        participant.setTop4Count(top4Count);
        participant.setAveragePlacement(BigDecimal.valueOf(avgPlacement).setScale(2, RoundingMode.HALF_UP));
        participant.setBestPlacement(bestPlacement > 0 ? bestPlacement : null);
        participant.setWorstPlacement(worstPlacement > 0 ? worstPlacement : null);
        participant.setPlacementHistory(placementHistory);
    }

    /**
     * Parse les tiebreakers depuis une chaîne JSON.
     *
     * @param tiebreakerConfig la configuration JSON des tiebreakers
     * @return la liste des tiebreakers
     */
    private List<TiebreakerType> parseTiebreakers(String tiebreakerConfig) {
        if (tiebreakerConfig == null || tiebreakerConfig.isBlank()) {
            return TiebreakerComparator.getDefaultTiebreakers();
        }

        try {
            // Format attendu: ["AVERAGE_PLACEMENT","TOTAL_WINS"] ou AVERAGE_PLACEMENT,TOTAL_WINS
            String cleaned = tiebreakerConfig.replaceAll("[\\[\\]\"\\s]", "");
            if (cleaned.isEmpty()) {
                return TiebreakerComparator.getDefaultTiebreakers();
            }

            return Arrays.stream(cleaned.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(s -> {
                        try {
                            return TiebreakerType.valueOf(s);
                        } catch (IllegalArgumentException e) {
                            return null;
                        }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return TiebreakerComparator.getDefaultTiebreakers();
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
