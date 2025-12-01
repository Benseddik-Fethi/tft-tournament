package com.tft.tournament.mapper;

import com.tft.tournament.domain.Circuit;
import com.tft.tournament.domain.Season;
import com.tft.tournament.domain.Stage;
import com.tft.tournament.domain.Tournament;
import com.tft.tournament.domain.enums.SeasonStatus;
import com.tft.tournament.dto.response.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper pour la conversion entre l'entité Circuit et ses DTOs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Mapper(config = MapperConfig.class, uses = {RegionMapper.class, UserMapper.class})
public interface CircuitMapper {

    /**
     * Convertit une entité Circuit en CircuitListResponse.
     *
     * @param circuit l'entité circuit
     * @return le DTO de réponse pour liste
     */
    @Mapping(target = "region", source = "region")
    @Mapping(target = "activeSeasonName", expression = "java(getActiveSeasonName(circuit))")
    CircuitListResponse toListResponse(Circuit circuit);

    /**
     * Convertit une entité Circuit en CircuitDetailResponse.
     *
     * @param circuit l'entité circuit
     * @return le DTO de réponse détaillée
     */
    @Mapping(target = "region", source = "region")
    @Mapping(target = "organizer", source = "organizer")
    @Mapping(target = "seasons", source = "seasons")
    CircuitDetailResponse toDetailResponse(Circuit circuit);

    /**
     * Convertit une entité Season en SeasonResponse.
     *
     * @param season l'entité saison
     * @return le DTO de réponse
     */
    @Mapping(target = "stages", source = "stages")
    SeasonResponse toSeasonResponse(Season season);

    /**
     * Convertit une entité Stage en StageResponse.
     *
     * @param stage l'entité étape
     * @return le DTO de réponse
     */
    @Mapping(target = "tournaments", source = "tournaments")
    StageResponse toStageResponse(Stage stage);

    /**
     * Convertit une entité Tournament en TournamentSummaryResponse.
     *
     * @param tournament l'entité tournoi
     * @return le DTO résumé
     */
    TournamentSummaryResponse toTournamentSummaryResponse(Tournament tournament);

    /**
     * Convertit une liste de saisons.
     */
    List<SeasonResponse> toSeasonResponseList(List<Season> seasons);

    /**
     * Convertit une liste d'étapes.
     */
    List<StageResponse> toStageResponseList(List<Stage> stages);

    /**
     * Convertit une liste de tournois.
     */
    List<TournamentSummaryResponse> toTournamentSummaryResponseList(List<Tournament> tournaments);

    /**
     * Retourne le nom de la saison active du circuit.
     *
     * @param circuit l'entité circuit
     * @return le nom de la saison active ou null
     */
    default String getActiveSeasonName(Circuit circuit) {
        if (circuit.getSeasons() == null) {
            return null;
        }
        return circuit.getSeasons().stream()
                .filter(season -> season.getStatus() == SeasonStatus.ACTIVE)
                .findFirst()
                .map(Season::getName)
                .orElse(null);
    }
}
