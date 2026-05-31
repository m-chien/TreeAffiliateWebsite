package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateCayCanhDTO;
import com.example.chien_java_template.dto.UpdateCayCanhDTO;
import com.example.chien_java_template.dto.CayCanhDTO;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.CayCanhMapper;
import com.example.chien_java_template.model.CayCanh;
import com.example.chien_java_template.repository.CayCanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CayCanhService {
    private final CayCanhRepository cayCanhRepository;
    private final CayCanhMapper cayCanhMapper;
    

    @Transactional
    public CayCanhDTO createCayCanh(CreateCayCanhDTO createCayCanhDTO) {
        if (cayCanhRepository.findByTenCay(createCayCanhDTO.getTenCay()).isPresent()) {
            throw new AppException(ErrorCode.DUPLICATE_KEY);
        }
        CayCanh cayCanh = cayCanhMapper.toEntityFromCreateDTO(createCayCanhDTO);
        cayCanh.setTrangThai(Status.ACTIVE);
        cayCanh.setLuotXem(0);
        CayCanh savedCayCanh = cayCanhRepository.save(cayCanh);
        return cayCanhMapper.toDTO(savedCayCanh);
    }

    @Transactional(readOnly = true)
    public CayCanhDTO getCayCanhById(Integer id) {
        CayCanh cayCanh = cayCanhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return cayCanhMapper.toDTO(cayCanh);
    }

    @Transactional(readOnly = true)
    public Page<CayCanhDTO> getAllCayCanh(Pageable pageable) {
        return cayCanhRepository.findAll(pageable)
                .map(cayCanhMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<CayCanhDTO> searchCayCanhByName(String tenCay, Pageable pageable) {
        return cayCanhRepository.findByTenCayContainingIgnoreCase(tenCay, pageable)
                .map(cayCanhMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<CayCanhDTO> getCayCanhByStatus(Status status, Pageable pageable) {
        return cayCanhRepository.findByTrangThai(status, pageable)
                .map(cayCanhMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<CayCanhDTO> getMostViewedCayCanh(Pageable pageable) {
        return cayCanhRepository.findMostViewed(pageable)
                .map(cayCanhMapper::toDTO);
    }

    @Transactional
    public CayCanhDTO updateCayCanh(Integer id, UpdateCayCanhDTO updateCayCanhDTO) {
        CayCanh cayCanh = cayCanhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        cayCanhMapper.updateEntityFromDTO(updateCayCanhDTO, cayCanh);
        CayCanh updatedCayCanh = cayCanhRepository.save(cayCanh);
        return cayCanhMapper.toDTO(updatedCayCanh);
    }

    @Transactional
    public void deleteCayCanh(Integer id) {
        if (!cayCanhRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        cayCanhRepository.deleteById(id);
    }

    @Transactional
    public void incrementView(Integer id) {
        CayCanh cayCanh = cayCanhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        cayCanh.setLuotXem((cayCanh.getLuotXem() == null ? 0 : cayCanh.getLuotXem()) + 1);
        cayCanhRepository.save(cayCanh);
    }
}
