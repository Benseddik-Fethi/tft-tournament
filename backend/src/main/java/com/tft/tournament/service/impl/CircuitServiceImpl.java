package com.tft.tournament.service.impl;

import com.tft.tournament.domain.Circuit;
import com.tft.tournament.domain.enums.CircuitType;
import com.tft.tournament.dto.response.CircuitDetailResponse;
import com.tft.tournament.dto.response.CircuitListResponse;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.mapper.CircuitMapper;
import com.tft.tournament.repository.CircuitRepository;
import com.tft.tournament.service.CircuitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

/**
 * Implémentation du service de gestion des circuits.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CircuitServiceImpl implements CircuitService {

    private final CircuitRepository circuitRepository;
    private final CircuitMapper circuitMapper;

    @Override
    public List<CircuitListResponse> getAllCircuits(UUID regionId, Integer year, CircuitType circuitType) {
        Stream<Circuit> circuits = circuitRepository.findAll().stream()
                .filter(circuit -> Boolean.TRUE.equals(circuit.getIsActive()));

        if (regionId != null) {
            circuits = circuits.filter(circuit -> 
                    circuit.getRegion() != null && regionId.equals(circuit.getRegion().getId()));
        }

        if (year != null) {
            circuits = circuits.filter(circuit -> year.equals(circuit.getYear()));
        }

        if (circuitType != null) {
            circuits = circuits.filter(circuit -> circuitType.equals(circuit.getCircuitType()));
        }

        return circuits.map(circuitMapper::toListResponse).toList();
    }

    @Override
    public CircuitDetailResponse getCircuitBySlug(String slug) {
        return circuitRepository.findBySlug(slug)
                .filter(circuit -> Boolean.TRUE.equals(circuit.getIsActive()))
                .map(circuitMapper::toDetailResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Circuit non trouvé avec le slug: " + slug));
    }

    @Override
    public List<CircuitListResponse> getCircuitsByOrganizer(UUID organizerId) {
        return circuitRepository.findAll().stream()
                .filter(circuit -> circuit.getOrganizer() != null && 
                        organizerId.equals(circuit.getOrganizer().getId()))
                .map(circuitMapper::toListResponse)
                .toList();
    }
}
