package com.tft.tournament.service.impl;

import com.tft.tournament.domain.Media;
import com.tft.tournament.domain.MediaConsent;
import com.tft.tournament.domain.Tournament;
import com.tft.tournament.domain.User;
import com.tft.tournament.domain.enums.MediaStatus;
import com.tft.tournament.dto.request.MediaConsentRequest;
import com.tft.tournament.dto.request.MediaImportRequest;
import com.tft.tournament.dto.request.MediaStatusUpdateRequest;
import com.tft.tournament.dto.request.MediaUploadRequest;
import com.tft.tournament.dto.response.MediaResponse;
import com.tft.tournament.exception.BadRequestException;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.repository.MatchRepository;
import com.tft.tournament.repository.MediaConsentRepository;
import com.tft.tournament.repository.MediaRepository;
import com.tft.tournament.repository.TournamentRepository;
import com.tft.tournament.repository.UserRepository;
import com.tft.tournament.service.MediaService;
import com.tft.tournament.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Implémentation du service de gestion des médias.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MediaServiceImpl implements MediaService {

    private final MediaRepository mediaRepository;
    private final MediaConsentRepository mediaConsentRepository;
    private final TournamentRepository tournamentRepository;
    private final UserRepository userRepository;
    private final MatchRepository matchRepository;
    private final TournamentService tournamentService;

    @Override
    public List<MediaResponse> getTournamentMedia(UUID tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        return mediaRepository.findByTournamentId(tournamentId).stream()
                .map(MediaResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public List<MediaResponse> importFromTwitch(UUID tournamentId, MediaImportRequest request, UUID userId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        if (!tournamentService.isOrganizerOrAdmin(tournamentId, userId)) {
            throw new BadRequestException("Vous n'avez pas les droits pour importer des médias");
        }

        // Note: Actual Twitch API integration would go here
        // For now, we return an empty list as a placeholder
        // In production, this would call Twitch API to fetch VODs
        List<MediaResponse> importedMedia = new ArrayList<>();

        return importedMedia;
    }

    @Override
    @Transactional
    public MediaResponse uploadMedia(UUID tournamentId, MediaUploadRequest request, UUID userId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        if (!Boolean.TRUE.equals(tournament.getAllowMedia())) {
            throw new BadRequestException("Les médias ne sont pas autorisés pour ce tournoi");
        }

        Media media = Media.builder()
                .tournament(tournament)
                .caster(user)
                .type(request.type())
                .title(request.title())
                .description(request.description())
                .sourceUrl(request.sourceUrl())
                .status(MediaStatus.PENDING)
                .build();

        if (request.matchId() != null) {
            media.setMatch(matchRepository.findById(request.matchId())
                    .orElseThrow(() -> new ResourceNotFoundException("Match non trouvé")));
        }

        Media saved = mediaRepository.save(media);
        return MediaResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public MediaResponse updateMediaStatus(UUID mediaId, MediaStatusUpdateRequest request, UUID userId) {
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Média non trouvé"));

        if (!tournamentService.isOrganizerOrAdmin(media.getTournament().getId(), userId)) {
            throw new BadRequestException("Vous n'avez pas les droits pour modérer ce média");
        }

        User moderator = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        media.setStatus(request.status());
        media.setModeratorComment(request.comment());
        media.setModeratedBy(moderator);
        media.setModeratedAt(Instant.now());

        Media saved = mediaRepository.save(media);
        return MediaResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public MediaConsentResponse createConsent(MediaConsentRequest request) {
        User caster = userRepository.findById(request.casterId())
                .orElseThrow(() -> new ResourceNotFoundException("Caster non trouvé"));

        Tournament tournament = tournamentRepository.findById(request.tournamentId())
                .orElseThrow(() -> new ResourceNotFoundException("Tournoi non trouvé"));

        // Check if consent already exists
        if (mediaConsentRepository.existsByCasterIdAndTournamentId(request.casterId(), request.tournamentId())) {
            throw new BadRequestException("Un consentement existe déjà pour ce caster et ce tournoi");
        }

        MediaConsent consent = MediaConsent.builder()
                .caster(caster)
                .tournament(tournament)
                .consentMethod(request.consentMethod())
                .proofUrl(request.proofUrl())
                .consentedAt(Instant.now())
                .isActive(true)
                .build();

        MediaConsent saved = mediaConsentRepository.save(consent);

        return new MediaConsentResponse(
                saved.getId(),
                saved.getCaster().getId(),
                saved.getTournament().getId(),
                saved.getConsentMethod().name(),
                saved.getIsActive()
        );
    }

    @Override
    public MediaResponse getMediaById(UUID mediaId) {
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Média non trouvé"));
        return MediaResponse.fromEntity(media);
    }
}
