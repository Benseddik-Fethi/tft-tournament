package com.tft.tournament.repository;

import com.tft.tournament.domain.MediaConsent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository pour l'accès aux données des consentements médias.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Repository
public interface MediaConsentRepository extends JpaRepository<MediaConsent, UUID> {

    /**
     * Recherche un consentement par caster et tournoi.
     *
     * @param casterId     l'identifiant du caster
     * @param tournamentId l'identifiant du tournoi
     * @return le consentement si trouvé
     */
    Optional<MediaConsent> findByCasterIdAndTournamentId(UUID casterId, UUID tournamentId);

    /**
     * Recherche les consentements d'un caster.
     *
     * @param casterId l'identifiant du caster
     * @return la liste des consentements
     */
    List<MediaConsent> findByCasterId(UUID casterId);

    /**
     * Recherche les consentements d'un tournoi.
     *
     * @param tournamentId l'identifiant du tournoi
     * @return la liste des consentements
     */
    List<MediaConsent> findByTournamentId(UUID tournamentId);

    /**
     * Vérifie si un consentement existe pour un caster et un tournoi.
     *
     * @param casterId     l'identifiant du caster
     * @param tournamentId l'identifiant du tournoi
     * @return true si un consentement existe
     */
    boolean existsByCasterIdAndTournamentId(UUID casterId, UUID tournamentId);
}
