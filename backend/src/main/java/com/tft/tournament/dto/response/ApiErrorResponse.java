package com.tft.tournament.dto.response;

import java.util.List;

/**
 * Réponse d'erreur standardisée selon la spécification API.
 * <p>
 * Format :
 * <pre>
 * {
 *   "error": {
 *     "code": "VALIDATION_ERROR",
 *     "message": "Invalid fields",
 *     "details": [{"field": "rules.scoring", "message": "missing"}],
 *     "trace_id": "abcd-1234"
 *   }
 * }
 * </pre>
 * </p>
 *
 * @param error l'objet erreur contenant les détails
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public record ApiErrorResponse(
        ApiError error
) {

    /**
     * Détails de l'erreur.
     *
     * @param code    code d'erreur (ex: VALIDATION_ERROR, NOT_FOUND)
     * @param message message d'erreur
     * @param details détails additionnels (champs en erreur)
     * @param traceId identifiant de trace pour le debugging
     */
    public record ApiError(
            String code,
            String message,
            List<FieldDetail> details,
            String traceId
    ) {
        public ApiError(String code, String message, String traceId) {
            this(code, message, null, traceId);
        }
    }

    /**
     * Détail d'un champ en erreur.
     *
     * @param field   nom du champ
     * @param message message d'erreur pour ce champ
     */
    public record FieldDetail(
            String field,
            String message
    ) {
    }

    /**
     * Crée une réponse d'erreur simple.
     *
     * @param code    code d'erreur
     * @param message message d'erreur
     * @param traceId identifiant de trace
     * @return la réponse d'erreur
     */
    public static ApiErrorResponse of(String code, String message, String traceId) {
        return new ApiErrorResponse(new ApiError(code, message, traceId));
    }

    /**
     * Crée une réponse d'erreur avec détails.
     *
     * @param code    code d'erreur
     * @param message message d'erreur
     * @param details liste des champs en erreur
     * @param traceId identifiant de trace
     * @return la réponse d'erreur
     */
    public static ApiErrorResponse of(String code, String message, List<FieldDetail> details, String traceId) {
        return new ApiErrorResponse(new ApiError(code, message, details, traceId));
    }
}
