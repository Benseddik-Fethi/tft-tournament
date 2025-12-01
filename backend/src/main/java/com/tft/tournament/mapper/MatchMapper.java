package com.tft.tournament.mapper;

import com.tft.tournament.domain.*;
import com.tft.tournament.dto.response.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper pour la conversion entre l'entité Match et ses DTOs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Mapper(config = MapperConfig.class, uses = {ParticipantMapper.class})
public interface MatchMapper {

    /**
     * Convertit une entité Match en MatchResponse.
     *
     * @param match l'entité match
     * @return le DTO de réponse
     */
    @Mapping(target = "gamesCount", expression = "java(match.getGames() != null ? match.getGames().size() : 0)")
    @Mapping(target = "participants", source = "matchParticipants")
    MatchResponse toResponse(Match match);

    /**
     * Convertit une entité Match en MatchDetailResponse.
     *
     * @param match l'entité match
     * @return le DTO de réponse détaillée
     */
    @Mapping(target = "participants", source = "matchParticipants")
    @Mapping(target = "games", source = "games")
    MatchDetailResponse toDetailResponse(Match match);

    /**
     * Convertit une entité MatchParticipant en MatchParticipantResponse.
     *
     * @param matchParticipant l'entité participant au match
     * @return le DTO de réponse
     */
    @Mapping(target = "participantId", source = "participant.id")
    @Mapping(target = "displayName", source = "participant.displayName")
    @Mapping(target = "riotId", source = "participant.riotId")
    @Mapping(target = "user", source = "participant.user")
    @Mapping(target = "matchPoints", source = "matchPoints")
    @Mapping(target = "matchPlacement", source = "lobbySlot")
    MatchParticipantResponse toMatchParticipantResponse(MatchParticipant matchParticipant);

    /**
     * Convertit une entité Game en GameResponse.
     *
     * @param game l'entité partie
     * @return le DTO de réponse
     */
    @Mapping(target = "results", source = "results")
    GameResponse toGameResponse(Game game);

    /**
     * Convertit une entité GameResult en GameResultResponse.
     *
     * @param gameResult l'entité résultat
     * @return le DTO de réponse
     */
    @Mapping(target = "participantId", source = "participant.id")
    @Mapping(target = "displayName", source = "participant.displayName")
    GameResultResponse toGameResultResponse(GameResult gameResult);

    /**
     * Convertit une liste de matchs.
     *
     * @param matches la liste d'entités
     * @return la liste de DTOs
     */
    List<MatchResponse> toResponseList(List<Match> matches);

    /**
     * Convertit une liste de parties.
     *
     * @param games la liste d'entités
     * @return la liste de DTOs
     */
    List<GameResponse> toGameResponseList(List<Game> games);

    /**
     * Convertit un User en UserSummaryResponse.
     *
     * @param user l'entité utilisateur
     * @return le DTO résumé
     */
    default UserSummaryResponse toUserSummaryResponse(User user) {
        if (user == null) {
            return null;
        }
        return new UserSummaryResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getAvatar()
        );
    }
}
