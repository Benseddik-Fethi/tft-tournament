package com.tft.tournament.service;

import com.tft.tournament.domain.enums.TournamentStatus;
import com.tft.tournament.domain.enums.TournamentType;
import com.tft.tournament.dto.request.CreateTournamentRequest;
import com.tft.tournament.dto.request.RegisterTournamentRequest;
import com.tft.tournament.dto.request.UpdateTournamentRequest;
import com.tft.tournament.dto.response.MatchResponse;
import com.tft.tournament.dto.response.ParticipantResponse;
import com.tft.tournament.dto.response.TournamentDetailResponse;
import com.tft.tournament.dto.response.TournamentListResponse;

import java.util.List;
import java.util.UUID;

/**
 * Service pour la gestion des tournois.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public interface TournamentService {

    /**
     * Récupère tous les tournois publics avec filtres optionnels.
     *
     * @param regionId identifiant de la région (optionnel)
     * @param status statut du tournoi (optionnel)
     * @param tournamentType type de tournoi (optionnel)
     * @param search recherche textuelle (optionnel)
     * @return la liste des tournois
     */
    List<TournamentListResponse> getAllPublicTournaments(
            UUID regionId,
            TournamentStatus status,
            TournamentType tournamentType,
            String search
    );

    /**
     * Récupère un tournoi par son slug.
     *
     * @param slug le slug du tournoi
     * @return le détail du tournoi
     */
    TournamentDetailResponse getTournamentBySlug(String slug);

    /**
     * Récupère les participants d'un tournoi.
     *
     * @param slug le slug du tournoi
     * @return la liste des participants
     */
    List<ParticipantResponse> getTournamentParticipants(String slug);

    /**
     * Récupère les matchs d'un tournoi.
     *
     * @param slug le slug du tournoi
     * @return la liste des matchs
     */
    List<MatchResponse> getTournamentMatches(String slug);

    /**
     * Crée un nouveau tournoi.
     *
     * @param request la requête de création
     * @param organizerId identifiant de l'organisateur
     * @return le tournoi créé
     */
    TournamentDetailResponse createTournament(CreateTournamentRequest request, UUID organizerId);

    /**
     * Met à jour un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @param request la requête de mise à jour
     * @param userId identifiant de l'utilisateur qui modifie
     * @return le tournoi mis à jour
     */
    TournamentDetailResponse updateTournament(UUID tournamentId, UpdateTournamentRequest request, UUID userId);

    /**
     * Supprime un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     */
    void deleteTournament(UUID tournamentId);

    /**
     * Inscrit un utilisateur à un tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @param userId identifiant de l'utilisateur
     * @param request la requête d'inscription
     * @return le participant créé
     */
    ParticipantResponse registerToTournament(UUID tournamentId, UUID userId, RegisterTournamentRequest request);

    /**
     * Effectue le check-in d'un utilisateur.
     *
     * @param tournamentId identifiant du tournoi
     * @param userId identifiant de l'utilisateur
     * @return le participant mis à jour
     */
    ParticipantResponse checkIn(UUID tournamentId, UUID userId);

    /**
     * Vérifie si l'utilisateur est l'organisateur ou admin du tournoi.
     *
     * @param tournamentId identifiant du tournoi
     * @param userId identifiant de l'utilisateur
     * @return true si l'utilisateur a les droits
     */
    boolean isOrganizerOrAdmin(UUID tournamentId, UUID userId);
}
