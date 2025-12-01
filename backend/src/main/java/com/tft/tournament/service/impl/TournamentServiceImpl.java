package com.tft.tournament.service.impl;

import tools.jackson.databind.ObjectMapper;
import com.tft.tournament.domain.Participant;
import com.tft.tournament.domain.Region;
import com.tft.tournament.domain.Tournament;
import com.tft.tournament.domain.User;
import com.tft.tournament.domain.enums.ParticipantStatus;
import com.tft.tournament.domain.enums.TournamentStatus;
import com.tft.tournament.domain.enums.TournamentType;
import com.tft.tournament.dto.request.CreateTournamentRequest;
import com.tft.tournament.dto.request.RegisterTournamentRequest;
import com.tft.tournament.dto.request.UpdateTournamentRequest;
import com.tft.tournament.dto.response.MatchResponse;
import com.tft.tournament.dto.response.ParticipantResponse;
import com.tft.tournament.dto.response.TournamentDetailResponse;
import com.tft.tournament.dto.response.TournamentListResponse;
import com.tft.tournament.exception.BadRequestException;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.mapper.MatchMapper;
import com.tft.tournament.mapper.ParticipantMapper;
import com.tft.tournament.mapper.TournamentMapper;
import com.tft.tournament.repository.*;
import com.tft.tournament.service.TournamentService;
import com.tft.tournament.util.SlugGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

/**
 * Implémentation du service de gestion des tournois.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class TournamentServiceImpl implements TournamentService {

    private final TournamentRepository tournamentRepository;
    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final ParticipantRepository participantRepository;
    private final MatchRepository matchRepository;
    private final TournamentMapper tournamentMapper;
    private final ParticipantMapper participantMapper;
    private final MatchMapper matchMapper;
    private final ObjectMapper objectMapper;

    @Override
    public List<TournamentListResponse> getAllPublicTournaments(
            UUID regionId,
            TournamentStatus status,
            TournamentType tournamentType,
            String search
    ) {
        Stream<Tournament> tournaments = tournamentRepository.findAll().stream()
                .filter(tournament -> Boolean.TRUE.equals(tournament.getIsPublic()));

        if (regionId != null) {
            tournaments = tournaments.filter(tournament -> 
                    tournament.getRegion() != null && regionId.equals(tournament.getRegion().getId()));
        }

        if (status != null) {
            tournaments = tournaments.filter(tournament -> status.equals(tournament.getStatus()));
        }

        if (tournamentType != null) {
            tournaments = tournaments.filter(tournament -> tournamentType.equals(tournament.getTournamentType()));
        }

        if (search != null && !search.isBlank()) {
            String lowerSearch = search.toLowerCase();
            tournaments = tournaments.filter(tournament -> 
                    tournament.getName().toLowerCase().contains(lowerSearch) ||
                    (tournament.getDescription() != null && 
                     tournament.getDescription().toLowerCase().contains(lowerSearch)));
        }

        return tournaments.map(tournamentMapper::toListResponse).toList();
    }

    @Override
    public TournamentDetailResponse getTournamentBySlug(String slug) {
        return tournamentRepository.findBySlug(slug)
                .filter(tournament -> Boolean.TRUE.equals(tournament.getIsPublic()))
                .map(tournamentMapper::toDetailResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé avec le slug: " + slug));
    }

    @Override
    public List<ParticipantResponse> getTournamentParticipants(String slug) {
        Tournament tournament = tournamentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé avec le slug: " + slug));
        
        return participantRepository.findByTournamentId(tournament.getId()).stream()
                .map(participantMapper::toResponse)
                .toList();
    }

    @Override
    public List<MatchResponse> getTournamentMatches(String slug) {
        Tournament tournament = tournamentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé avec le slug: " + slug));
        
        return matchRepository.findAll().stream()
                .filter(m -> m.getPhase() != null && 
                        tournament.getId().equals(m.getPhase().getTournament().getId()))
                .map(matchMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public TournamentDetailResponse createTournament(CreateTournamentRequest request, UUID organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        String baseSlug = SlugGenerator.generateSlug(request.name());
        String slug = baseSlug;
        
        // Check if slug already exists and find a unique one
        int counter = 1;
        while (tournamentRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }

        // Convert rules to JSON if provided using ObjectMapper for safe serialization
        String rulesJson = null;
        if (request.rules() != null) {
            try {
                Map<String, Object> rulesMap = new HashMap<>();
                rulesMap.put("scoring", request.rules().scoring());
                rulesMap.put("rounds", request.rules().rounds());
                rulesMap.put("players_per_match", request.rules().playersPerMatch());
                rulesJson = objectMapper.writeValueAsString(rulesMap);
            } catch (Exception e) {
                log.error("Failed to serialize tournament rules to JSON", e);
            }
        }

        Tournament tournament = Tournament.builder()
                .name(request.name())
                .slug(slug)
                .description(request.description())
                .tournamentType(request.tournamentType())
                .status(TournamentStatus.DRAFT)
                .registrationStart(request.registrationStart())
                .registrationEnd(request.registrationEnd())
                .checkInStart(request.checkInStart())
                .checkInEnd(request.checkInEnd())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .maxParticipants(request.maxParticipants())
                .minParticipants(request.minParticipants())
                .isTeamBased(request.isTeamBased() != null ? request.isTeamBased() : false)
                .teamSize(request.teamSize())
                .prizePool(request.prizePool())
                .prizeDistribution(request.prizeDistribution())
                .customRules(request.customRules())
                .streamUrl(request.streamUrl())
                .discordUrl(request.discordUrl())
                .format(request.format())
                .rulesJson(rulesJson)
                .allowMedia(request.allowMedia() != null ? request.allowMedia() : true)
                .organizer(organizer)
                .isPublic(true)
                .isFeatured(false)
                .build();

        if (request.regionId() != null) {
            Region region = regionRepository.findById(request.regionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Région non trouvée"));
            tournament.setRegion(region);
        }

        Tournament saved = tournamentRepository.save(tournament);
        return tournamentMapper.toDetailResponse(saved);
    }

    @Override
    @Transactional
    public TournamentDetailResponse updateTournament(UUID tournamentId, UpdateTournamentRequest request, UUID userId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        if (!isOrganizerOrAdmin(tournamentId, userId)) {
            throw new BadRequestException("Vous n'avez pas les droits pour modifier ce tournoi");
        }

        if (request.name() != null) {
            tournament.setName(request.name());
        }
        if (request.description() != null) {
            tournament.setDescription(request.description());
        }
        if (request.tournamentType() != null) {
            tournament.setTournamentType(request.tournamentType());
        }
        if (request.status() != null) {
            tournament.setStatus(request.status());
        }
        if (request.registrationStart() != null) {
            tournament.setRegistrationStart(request.registrationStart());
        }
        if (request.registrationEnd() != null) {
            tournament.setRegistrationEnd(request.registrationEnd());
        }
        if (request.checkInStart() != null) {
            tournament.setCheckInStart(request.checkInStart());
        }
        if (request.checkInEnd() != null) {
            tournament.setCheckInEnd(request.checkInEnd());
        }
        if (request.startDate() != null) {
            tournament.setStartDate(request.startDate());
        }
        if (request.endDate() != null) {
            tournament.setEndDate(request.endDate());
        }
        if (request.maxParticipants() != null) {
            tournament.setMaxParticipants(request.maxParticipants());
        }
        if (request.minParticipants() != null) {
            tournament.setMinParticipants(request.minParticipants());
        }
        if (request.isTeamBased() != null) {
            tournament.setIsTeamBased(request.isTeamBased());
        }
        if (request.teamSize() != null) {
            tournament.setTeamSize(request.teamSize());
        }
        if (request.logoUrl() != null) {
            tournament.setLogoUrl(request.logoUrl());
        }
        if (request.bannerUrl() != null) {
            tournament.setBannerUrl(request.bannerUrl());
        }
        if (request.prizePool() != null) {
            tournament.setPrizePool(request.prizePool());
        }
        if (request.prizeDistribution() != null) {
            tournament.setPrizeDistribution(request.prizeDistribution());
        }
        if (request.customRules() != null) {
            tournament.setCustomRules(request.customRules());
        }
        if (request.streamUrl() != null) {
            tournament.setStreamUrl(request.streamUrl());
        }
        if (request.discordUrl() != null) {
            tournament.setDiscordUrl(request.discordUrl());
        }
        if (request.regionId() != null) {
            Region region = regionRepository.findById(request.regionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Région non trouvée"));
            tournament.setRegion(region);
        }
        if (request.isPublic() != null) {
            tournament.setIsPublic(request.isPublic());
        }
        if (request.isFeatured() != null) {
            tournament.setIsFeatured(request.isFeatured());
        }

        Tournament saved = tournamentRepository.save(tournament);
        return tournamentMapper.toDetailResponse(saved);
    }

    @Override
    @Transactional
    public void deleteTournament(UUID tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));
        tournamentRepository.delete(tournament);
    }

    @Override
    @Transactional
    public ParticipantResponse registerToTournament(UUID tournamentId, UUID userId, RegisterTournamentRequest request) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        if (tournament.getStatus() != TournamentStatus.REGISTRATION_OPEN) {
            throw new BadRequestException("Les inscriptions ne sont pas ouvertes pour ce tournoi");
        }

        if (tournament.getMaxParticipants() != null && 
            tournament.getCurrentParticipants() >= tournament.getMaxParticipants()) {
            throw new BadRequestException("Le tournoi est complet");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        // Check if already registered
        boolean alreadyRegistered = participantRepository.existsByTournamentIdAndUserId(
                tournament.getId(), userId);
        
        if (alreadyRegistered) {
            throw new BadRequestException("Vous êtes déjà inscrit à ce tournoi");
        }

        Participant participant = Participant.builder()
                .tournament(tournament)
                .user(user)
                .displayName(request.displayName() != null ? request.displayName() : user.getFullName())
                .riotId(request.riotId())
                .status(ParticipantStatus.REGISTERED)
                .registeredAt(Instant.now())
                .build();

        Participant saved = participantRepository.save(participant);
        
        // Update participant count
        tournament.setCurrentParticipants(tournament.getCurrentParticipants() + 1);
        tournamentRepository.save(tournament);

        return participantMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public ParticipantResponse checkIn(UUID tournamentId, UUID userId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        if (tournament.getStatus() != TournamentStatus.CHECK_IN) {
            throw new BadRequestException("Le check-in n'est pas ouvert pour ce tournoi");
        }

        Participant participant = participantRepository.findByTournamentIdAndUserId(
                tournament.getId(), userId)
                .orElseThrow(() -> new BadRequestException("Vous n'êtes pas inscrit à ce tournoi"));

        if (participant.getStatus() == ParticipantStatus.CHECKED_IN) {
            throw new BadRequestException("Vous avez déjà fait le check-in");
        }

        participant.setStatus(ParticipantStatus.CHECKED_IN);
        participant.setCheckedInAt(Instant.now());

        Participant saved = participantRepository.save(participant);
        return participantMapper.toResponse(saved);
    }

    @Override
    public boolean isOrganizerOrAdmin(UUID tournamentId, UUID userId) {
        Tournament tournament = tournamentRepository.findById(tournamentId).orElse(null);
        if (tournament == null) {
            return false;
        }

        // Check if organizer
        if (tournament.getOrganizer() != null && userId.equals(tournament.getOrganizer().getId())) {
            return true;
        }

        // Check if in admins list
        return tournament.getAdmins().stream()
                .anyMatch(admin -> userId.equals(admin.getId()));
    }
}
