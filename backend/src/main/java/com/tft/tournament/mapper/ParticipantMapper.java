package com.tft.tournament.mapper;

import com.tft.tournament.domain.Participant;
import com.tft.tournament.dto.response.ParticipantResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper pour la conversion entre l'entité Participant et ses DTOs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Mapper(config = MapperConfig.class, uses = {UserMapper.class})
public interface ParticipantMapper {

    /**
     * Convertit une entité Participant en ParticipantResponse.
     *
     * @param participant l'entité participant
     * @return le DTO de réponse
     */
    @Mapping(target = "user", source = "user")
    ParticipantResponse toResponse(Participant participant);

    /**
     * Convertit une liste de participants.
     *
     * @param participants la liste d'entités
     * @return la liste de DTOs
     */
    List<ParticipantResponse> toResponseList(List<Participant> participants);
}
