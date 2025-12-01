package com.tft.tournament.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

/**
 * Utilitaire pour la génération de slugs URL-friendly.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
public final class SlugGenerator {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
    private static final Pattern MULTIDASH = Pattern.compile("-{2,}");

    private SlugGenerator() {
        // Utility class
    }

    /**
     * Génère un slug URL-friendly à partir d'un texte.
     *
     * @param text le texte à convertir
     * @return le slug généré
     */
    public static String generateSlug(String text) {
        if (text == null || text.isBlank()) {
            return "";
        }

        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
        String noWhitespace = WHITESPACE.matcher(normalized).replaceAll("-");
        String noNonLatin = NONLATIN.matcher(noWhitespace).replaceAll("");
        String noMultiDash = MULTIDASH.matcher(noNonLatin).replaceAll("-");
        
        return noMultiDash.toLowerCase(Locale.ENGLISH)
                .replaceAll("^-|-$", ""); // Remove leading/trailing dashes
    }
}
