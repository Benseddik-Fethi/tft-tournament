package com.tft.tournament.exception;

import com.tft.tournament.dto.response.ApiErrorResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Gestionnaire global des exceptions de l'application.
 * <p>
 * Intercepte toutes les exceptions et retourne des réponses JSON
 * uniformes avec les codes HTTP appropriés.
 * </p>
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * Génère un identifiant de trace unique.
     *
     * @return l'identifiant de trace
     */
    private String generateTraceId() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    // ==================== API SPEC COMPLIANT HANDLERS ====================

    /**
     * Gère les exceptions ResourceNotFoundException (404) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceNotFoundExceptionSpec(
            ResourceNotFoundException ex
    ) {
        String traceId = generateTraceId();
        log.debug("Resource not found [trace_id={}]: {}", traceId, ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiErrorResponse.of("NOT_FOUND", ex.getMessage(), traceId));
    }

    /**
     * Gère les exceptions BadRequestException (400) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiErrorResponse> handleBadRequestExceptionSpec(
            BadRequestException ex
    ) {
        String traceId = generateTraceId();
        log.debug("Bad request [trace_id={}]: {}", traceId, ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiErrorResponse.of("BAD_REQUEST", ex.getMessage(), traceId));
    }

    /**
     * Gère les exceptions AuthenticationException (401) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthenticationExceptionSpec(
            AuthenticationException ex
    ) {
        String traceId = generateTraceId();
        log.debug("Authentication error [trace_id={}]: {}", traceId, ex.getMessage());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiErrorResponse.of("UNAUTHORIZED", ex.getMessage(), traceId));
    }

    /**
     * Gère les exceptions AccountLockedException (423) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(AccountLockedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccountLockedExceptionSpec(
            AccountLockedException ex
    ) {
        String traceId = generateTraceId();
        log.warn("Account locked [trace_id={}]: {}", traceId, ex.getMessage());

        List<ApiErrorResponse.FieldDetail> details = new ArrayList<>();
        details.add(new ApiErrorResponse.FieldDetail("lockedUntil", ex.getLockedUntil().toString()));

        return ResponseEntity.status(HttpStatus.LOCKED)
                .body(ApiErrorResponse.of("ACCOUNT_LOCKED", ex.getMessage(), details, traceId));
    }

    /**
     * Gère les exceptions AccessDeniedException (403) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccessDeniedExceptionSpec(
            AccessDeniedException ex
    ) {
        String traceId = generateTraceId();
        log.debug("Access denied [trace_id={}]: {}", traceId, ex.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiErrorResponse.of("FORBIDDEN", "Vous n'avez pas les permissions nécessaires", traceId));
    }

    /**
     * Gère les erreurs de validation des arguments (400) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationExceptionSpec(
            MethodArgumentNotValidException ex
    ) {
        String traceId = generateTraceId();
        log.debug("Validation error [trace_id={}]: {}", traceId, ex.getMessage());

        List<ApiErrorResponse.FieldDetail> details = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            details.add(new ApiErrorResponse.FieldDetail(fieldName, errorMessage));
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiErrorResponse.of("VALIDATION_ERROR", "Erreur de validation des données", details, traceId));
    }

    /**
     * Gère les violations de contraintes (400) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleConstraintViolationExceptionSpec(
            ConstraintViolationException ex
    ) {
        String traceId = generateTraceId();
        log.debug("Constraint violation [trace_id={}]: {}", traceId, ex.getMessage());

        List<ApiErrorResponse.FieldDetail> details = new ArrayList<>();
        ex.getConstraintViolations().forEach(violation -> {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            details.add(new ApiErrorResponse.FieldDetail(fieldName, errorMessage));
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiErrorResponse.of("VALIDATION_ERROR", "Erreur de validation des contraintes", details, traceId));
    }

    /**
     * Gère toutes les autres exceptions (500) avec format API spec.
     *
     * @param ex l'exception
     * @return la réponse d'erreur
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGlobalExceptionSpec(
            Exception ex
    ) {
        String traceId = generateTraceId();
        log.error("Erreur serveur inattendue [trace_id={}]", traceId, ex);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiErrorResponse.of("INTERNAL_ERROR", "Une erreur inattendue s'est produite", traceId));
    }

    // ==================== LEGACY ERROR RESPONSE ====================

    /**
     * Structure standard d'une réponse d'erreur (legacy).
     *
     * @param status    le code HTTP
     * @param error     le type d'erreur
     * @param message   le message d'erreur
     * @param path      le chemin de la requête
     * @param timestamp l'horodatage de l'erreur
     * @param details   les détails additionnels
     */
    public record ErrorResponse(
            int status,
            String error,
            String message,
            String path,
            Instant timestamp,
            Map<String, Object> details
    ) {
        public ErrorResponse(int status, String error, String message, String path) {
            this(status, error, message, path, Instant.now(), null);
        }

        public ErrorResponse(int status, String error, String message, String path, Map<String, Object> details) {
            this(status, error, message, path, Instant.now(), details);
        }
    }
}