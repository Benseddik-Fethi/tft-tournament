package com.tft.tournament;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Tests d'intégration pour le contexte applicatif Spring Boot.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@SpringBootTest
@ActiveProfiles("test")
class BackendApplicationTests {

    /**
     * Vérifie que le contexte Spring se charge correctement.
     */
    @Test
    void contextLoads() {
    }
}
