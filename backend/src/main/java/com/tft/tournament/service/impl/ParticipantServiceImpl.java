package com.tft.tournament.service.impl;

import com.tft.tournament.domain.Participant;
import com.tft.tournament.domain.Tournament;
import com.tft.tournament.exception.BadRequestException;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.repository.ParticipantRepository;
import com.tft.tournament.repository.TournamentRepository;
import com.tft.tournament.service.ParticipantService;
import com.tft.tournament.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Implémentation du service de gestion des participants.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ParticipantServiceImpl implements ParticipantService {

    private final ParticipantRepository participantRepository;
    private final TournamentRepository tournamentRepository;
    private final TournamentService tournamentService;

    @Override
    @Transactional
    public void deleteParticipant(UUID participantId, UUID userId) {
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new ResourceNotFoundException("Participant non trouvé"));

        Tournament tournament = participant.getTournament();

        // Check permissions: user must be the participant, organizer, or admin
        boolean isParticipantSelf = participant.getUser() != null && 
                userId.equals(participant.getUser().getId());
        boolean isOrganizerOrAdmin = tournamentService.isOrganizerOrAdmin(tournament.getId(), userId);

        if (!isParticipantSelf && !isOrganizerOrAdmin) {
            throw new BadRequestException("Vous n'avez pas les droits pour supprimer ce participant");
        }

        // Update participant count
        if (tournament.getCurrentParticipants() > 0) {
            tournament.setCurrentParticipants(tournament.getCurrentParticipants() - 1);
            tournamentRepository.save(tournament);
        }

        participantRepository.delete(participant);
    }
}
