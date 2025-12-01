package com.tft.tournament.mapper;

import com.tft.tournament.domain.Region;
import com.tft.tournament.dto.response.RegionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Mapper pour la conversion entre l'entité Region et ses DTOs.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Mapper(config = MapperConfig.class)
public interface RegionMapper {

    /**
     * Convertit une entité Region en RegionResponse.
     *
     * @param region l'entité région
     * @return le DTO de réponse
     */
    @Mapping(target = "servers", expression = "java(serversToList(region.getServers()))")
    RegionResponse toResponse(Region region);

    /**
     * Convertit une chaîne de serveurs en liste.
     *
     * @param servers la chaîne de serveurs (séparée par des virgules)
     * @return la liste de serveurs
     */
    default List<String> serversToList(String servers) {
        if (servers == null || servers.isBlank()) {
            return Collections.emptyList();
        }
        return Arrays.asList(servers.split(","));
    }
}
