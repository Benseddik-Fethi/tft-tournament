package com.tft.tournament.service.impl;

import com.tft.tournament.dto.response.RegionResponse;
import com.tft.tournament.exception.ResourceNotFoundException;
import com.tft.tournament.mapper.RegionMapper;
import com.tft.tournament.repository.RegionRepository;
import com.tft.tournament.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implémentation du service de gestion des régions.
 *
 * @author Fethi Benseddik
 * @version 1.0
 * @since 2025
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RegionServiceImpl implements RegionService {

    private final RegionRepository regionRepository;
    private final RegionMapper regionMapper;

    @Override
    public List<RegionResponse> getAllActiveRegions() {
        return regionRepository.findAll().stream()
                .filter(region -> Boolean.TRUE.equals(region.getIsActive()))
                .map(regionMapper::toResponse)
                .toList();
    }

    @Override
    public RegionResponse getRegionByCode(String code) {
        return regionRepository.findByCode(code)
                .map(regionMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Région non trouvée avec le code: " + code));
    }
}
