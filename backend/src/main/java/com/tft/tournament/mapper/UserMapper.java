package com.tft.tournament.mapper;

import com.tft.tournament.domain.User;
import com.tft.tournament.dto.response.UserResponse;
import com.tft.tournament.dto.response.UserSummaryResponse;
import org.mapstruct.Mapper;

/**
 * Mapper pour la conversion entre l'entité User et ses DTOs.
 * <p>
 * Utilise MapStruct pour générer automatiquement les méthodes
 * de mapping à la compilation.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Mapper(config = MapperConfig.class)
public interface UserMapper {

    /**
     * Convertit une entité User en UserResponse.
     *
     * @param user l'entité utilisateur
     * @return le DTO de réponse
     */
    UserResponse toResponse(User user);

    /**
     * Convertit une entité User en UserSummaryResponse.
     *
     * @param user l'entité utilisateur
     * @return le DTO résumé
     */
    UserSummaryResponse toSummaryResponse(User user);
}