package com.tft.tournament.service.impl;

import com.tft.tournament.domain.Game;
import com.tft.tournament.domain.GameResult;
import com.tft.tournament.domain.Match;
import com.tft.tournament.domain.MatchParticipant;
import com.tft.tournament.domain.Participant;
import com.tft.tournament.domain.enums.GameStatus;
import com.tft.tournament.domain.enums.MatchStatus;
import com.tft.tournament.domain.enums.ResultSource;
import com.tft.tournament.dto.request.MatchResultsRequest;
import com.tft.tournament.dto.request.SubmitResultsRequest;
import com.tft.tournament.dto.response.GameResponse;
import com.tft.tournament.dto.response.MatchDetailResponse;
import com.tft.tournament.dto.response.MatchResultsResponse;
import com.tft.tournament.exception.BadRequestException;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.mapper.MatchMapper;
import com.tft.tournament.repository.GameRepository;
import com.tft.tournament.repository.GameResultRepository;
import com.tft.tournament.repository.MatchRepository;
import com.tft.tournament.repository.MatchParticipantRepository;
import com.tft.tournament.repository.ParticipantRepository;
import com.tft.tournament.service.MatchService;
import com.tft.tournament.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Implémentation du service de gestion des matchs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;
    private final GameRepository gameRepository;
    private final GameResultRepository gameResultRepository;
    private final ParticipantRepository participantRepository;
    private final MatchParticipantRepository matchParticipantRepository;
    private final TournamentService tournamentService;
    private final MatchMapper matchMapper;

    @Override
    public MatchDetailResponse getMatchById(UUID matchId) {
        return matchRepository.findById(matchId)
                .map(matchMapper::toDetailResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Match non trouvé avec l'id: " + matchId));
    }

    @Override
    public List<GameResponse> getMatchGames(UUID matchId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match non trouvé avec l'id: " + matchId));
        
        return match.getGames().stream()
                .map(matchMapper::toGameResponse)
                .toList();
    }

    @Override
    @Transactional
    public GameResponse submitResults(UUID matchId, Integer gameNumber, SubmitResultsRequest request, UUID userId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match non trouvé avec l'id: " + matchId));

        if (!canSubmitResults(matchId, userId)) {
            throw new BadRequestException("Vous n'avez pas les droits pour soumettre des résultats pour ce match");
        }

        // Find or create game
        Game game = match.getGames().stream()
                .filter(g -> gameNumber.equals(g.getGameNumber()))
                .findFirst()
                .orElseGet(() -> {
                    Game newGame = Game.builder()
                            .match(match)
                            .gameNumber(gameNumber)
                            .status(GameStatus.PENDING)
                            .build();
                    return gameRepository.save(newGame);
                });

        // Clear existing results if any
        game.getResults().clear();

        // Create results from request
        for (SubmitResultsRequest.ParticipantResult result : request.results()) {
            Participant participant = participantRepository.findById(result.participantId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Participant non trouvé avec l'id: " + result.participantId()));

            GameResult gameResult = GameResult.builder()
                    .game(game)
                    .participant(participant)
                    .placement(result.placement())
                    .points(calculatePoints(result.placement()))
                    .finalHealth(result.finalHealth())
                    .roundsSurvived(result.roundsSurvived())
                    .playersEliminated(result.playersEliminated())
                    .totalDamageDealt(result.totalDamageDealt())
                    .composition(result.composition())
                    .augments(result.augments())
                    .resultSource(ResultSource.MANUAL)
                    .build();

            game.getResults().add(gameResult);
        }

        game.setStatus(GameStatus.COMPLETED);
        game.setEndTime(Instant.now());

        Game saved = gameRepository.save(game);
        return matchMapper.toGameResponse(saved);
    }

    @Override
    public boolean canSubmitResults(UUID matchId, UUID userId) {
        Match match = matchRepository.findById(matchId).orElse(null);
        if (match == null || match.getPhase() == null || match.getPhase().getTournament() == null) {
            return false;
        }

        UUID tournamentId = match.getPhase().getTournament().getId();
        return tournamentService.isOrganizerOrAdmin(tournamentId, userId);
    }

    /**
     * Calcule les points pour un placement donné (système par défaut).
     *
     * @param placement le placement
     * @return les points correspondants
     */
    private Integer calculatePoints(Integer placement) {
        return switch (placement) {
            case 1 -> 8;
            case 2 -> 7;
            case 3 -> 6;
            case 4 -> 5;
            case 5 -> 4;
            case 6 -> 3;
            case 7 -> 2;
            case 8 -> 1;
            default -> 0;
        };
    }

    @Override
    @Transactional
    public MatchResultsResponse submitMatchResults(UUID matchId, MatchResultsRequest request, UUID userId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match non trouvé avec l'id: " + matchId));

        if (!canSubmitResults(matchId, userId)) {
            throw new BadRequestException("Vous n'avez pas les droits pour soumettre des résultats pour ce match");
        }

        // Update match notes and evidence URL
        if (request.notes() != null) {
            match.setNotes(request.notes());
        }
        if (request.evidenceUrl() != null) {
            match.setEvidenceUrl(request.evidenceUrl());
        }

        // Build placements response
        List<MatchResultsResponse.PlacementResponse> placementResponses = new ArrayList<>();
        
        for (MatchResultsRequest.PlacementResult placement : request.placements()) {
            Participant participant = participantRepository.findById(placement.participantId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Participant non trouvé avec l'id: " + placement.participantId()));

            // Calculate points if not provided
            Integer points = placement.points() != null ? placement.points() : calculatePoints(placement.placement());

            // Update or create MatchParticipant
            MatchParticipant matchParticipant = match.getMatchParticipants().stream()
                    .filter(mp -> mp.getParticipant() != null && 
                            placement.participantId().equals(mp.getParticipant().getId()))
                    .findFirst()
                    .orElseGet(() -> {
                        MatchParticipant mp = MatchParticipant.builder()
                                .match(match)
                                .participant(participant)
                                .build();
                        match.getMatchParticipants().add(mp);
                        return mp;
                    });

            matchParticipant.setMatchPlacement(placement.placement());
            matchParticipant.setMatchPoints(points);

            placementResponses.add(new MatchResultsResponse.PlacementResponse(
                    participant.getId(),
                    participant.getDisplayName() != null ? participant.getDisplayName() : 
                            (participant.getUser() != null ? participant.getUser().getFullName() : "Unknown"),
                    placement.placement(),
                    points
            ));
        }

        // Update match status to completed
        match.setStatus(MatchStatus.COMPLETED);
        match.setEndTime(Instant.now());

        Match saved = matchRepository.save(match);

        return new MatchResultsResponse(
                saved.getId(),
                saved.getStatus().name(),
                placementResponses,
                saved.getNotes(),
                saved.getEvidenceUrl(),
                Instant.now(),
                userId
        );
    }
}
