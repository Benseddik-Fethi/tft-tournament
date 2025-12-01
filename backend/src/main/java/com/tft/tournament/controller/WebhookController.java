package com.tft.tournament.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Contrôleur REST pour les webhooks externes.
 * <p>
 * Expose les endpoints pour recevoir les événements de services externes
 * comme Twitch EventSub.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestController
@RequiredArgsConstructor
@Slf4j
public class WebhookController {

    /**
     * Reçoit les événements Twitch EventSub.
     * <p>
     * Cet endpoint gère :
     * - La vérification de l'abonnement (challenge)
     * - Les notifications d'événements (stream.online, stream.offline, etc.)
     * </p>
     *
     * @param messageType       type de message Twitch (webhook_callback_verification, notification, revocation)
     * @param subscriptionType  type d'abonnement Twitch
     * @param messageId         identifiant unique du message
     * @param messageTimestamp  timestamp du message
     * @param messageSignature  signature HMAC pour validation
     * @param payload           corps de la requête
     * @return la réponse appropriée selon le type de message
     */
    @PostMapping("/api/v1/webhooks/twitch/eventsub")
    public ResponseEntity<Object> handleTwitchEventSub(
            @RequestHeader(value = "Twitch-Eventsub-Message-Type", required = false) String messageType,
            @RequestHeader(value = "Twitch-Eventsub-Subscription-Type", required = false) String subscriptionType,
            @RequestHeader(value = "Twitch-Eventsub-Message-Id", required = false) String messageId,
            @RequestHeader(value = "Twitch-Eventsub-Message-Timestamp", required = false) String messageTimestamp,
            @RequestHeader(value = "Twitch-Eventsub-Message-Signature", required = false) String messageSignature,
            @RequestBody Map<String, Object> payload
    ) {
        log.info("Received Twitch EventSub webhook - type: {}, subscription: {}", messageType, subscriptionType);

        // Handle verification challenge
        if ("webhook_callback_verification".equals(messageType)) {
            Object challenge = payload.get("challenge");
            if (challenge != null) {
                log.info("Responding to Twitch verification challenge");
                return ResponseEntity.ok(challenge.toString());
            }
        }

        // Handle notification
        if ("notification".equals(messageType)) {
            log.info("Processing Twitch notification for subscription type: {}", subscriptionType);
            // Process the notification based on subscription type
            processNotification(subscriptionType, payload);
        }

        // Handle revocation
        if ("revocation".equals(messageType)) {
            log.warn("Twitch subscription revoked for type: {}", subscriptionType);
        }

        return ResponseEntity.ok().build();
    }

    /**
     * Traite une notification Twitch.
     *
     * @param subscriptionType type d'abonnement
     * @param payload          données de l'événement
     */
    private void processNotification(String subscriptionType, Map<String, Object> payload) {
        // Note: Actual notification processing logic would go here
        // This would handle events like stream.online, stream.offline, etc.
        // and trigger appropriate actions like updating media records

        switch (subscriptionType) {
            case "stream.online" -> log.info("Stream went online: {}", payload);
            case "stream.offline" -> log.info("Stream went offline: {}", payload);
            case "channel.update" -> log.info("Channel updated: {}", payload);
            default -> log.debug("Unhandled subscription type: {}", subscriptionType);
        }
    }
}
