package com.tft.tournament.mapper;

import com.tft.tournament.domain.Tournament;
import com.tft.tournament.domain.TournamentPhase;
import com.tft.tournament.domain.User;
import com.tft.tournament.dto.response.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper pour la conversion entre l'entité Tournament et ses DTOs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Mapper(config = MapperConfig.class, uses = {RegionMapper.class, ParticipantMapper.class})
public interface TournamentMapper {

    /**
     * Convertit une entité Tournament en TournamentListResponse.
     *
     * @param tournament l'entité tournoi
     * @return le DTO de réponse pour liste
     */
    @Mapping(target = "region", source = "region")
    @Mapping(target = "organizer", source = "organizer")
    TournamentListResponse toListResponse(Tournament tournament);

    /**
     * Convertit une entité Tournament en TournamentDetailResponse.
     *
     * @param tournament l'entité tournoi
     * @return le DTO de réponse détaillée
     */
    @Mapping(target = "region", source = "region")
    @Mapping(target = "organizer", source = "organizer")
    @Mapping(target = "phases", source = "phases")
    TournamentDetailResponse toDetailResponse(Tournament tournament);

    /**
     * Convertit une entité TournamentPhase en TournamentPhaseResponse.
     *
     * @param phase l'entité phase
     * @return le DTO de réponse
     */
    TournamentPhaseResponse toPhaseResponse(TournamentPhase phase);

    /**
     * Convertit une liste de phases.
     *
     * @param phases la liste d'entités
     * @return la liste de DTOs
     */
    List<TournamentPhaseResponse> toPhaseResponseList(List<TournamentPhase> phases);

    /**
     * Convertit une liste de tournois en liste de DTOs.
     *
     * @param tournaments la liste d'entités
     * @return la liste de DTOs
     */
    List<TournamentListResponse> toListResponseList(List<Tournament> tournaments);

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
