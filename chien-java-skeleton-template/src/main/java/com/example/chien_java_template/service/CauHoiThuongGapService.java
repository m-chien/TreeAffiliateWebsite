package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateCauHoiThuongGapDTO;
import com.example.chien_java_template.dto.UpdateCauHoiThuongGapDTO;
import com.example.chien_java_template.dto.CauHoiThuongGapDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.CauHoiThuongGapMapper;
import com.example.chien_java_template.model.CauHoiThuongGap;
import com.example.chien_java_template.repository.CauHoiThuongGapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CauHoiThuongGapService {
    private final CauHoiThuongGapRepository cauHoiThuongGapRepository;
    private final CauHoiThuongGapMapper cauHoiThuongGapMapper;

    @Transactional
    public CauHoiThuongGapDTO createCauHoiThuongGap(CreateCauHoiThuongGapDTO createCauHoiThuongGapDTO) {
        CauHoiThuongGap cauHoiThuongGap = cauHoiThuongGapMapper.toEntityFromCreateDTO(createCauHoiThuongGapDTO);
        CauHoiThuongGap savedCauHoiThuongGap = cauHoiThuongGapRepository.save(cauHoiThuongGap);
        return cauHoiThuongGapMapper.toDTO(savedCauHoiThuongGap);
    }

    public CauHoiThuongGapDTO getCauHoiThuongGapById(Integer id) {
        CauHoiThuongGap cauHoiThuongGap = cauHoiThuongGapRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return cauHoiThuongGapMapper.toDTO(cauHoiThuongGap);
    }

    public Page<CauHoiThuongGapDTO> getAllCauHoiThuongGap(Pageable pageable) {
        return cauHoiThuongGapRepository.findAll(pageable)
                .map(cauHoiThuongGapMapper::toDTO);
    }

    public Page<CauHoiThuongGapDTO> getCauHoiThuongGapByCayCanh(Integer cayCanhId, Pageable pageable) {
        return cauHoiThuongGapRepository.findByCayCanhId(cayCanhId, pageable)
                .map(cauHoiThuongGapMapper::toDTO);
    }

    @Transactional
    public CauHoiThuongGapDTO updateCauHoiThuongGap(Integer id, UpdateCauHoiThuongGapDTO updateCauHoiThuongGapDTO) {
        CauHoiThuongGap cauHoiThuongGap = cauHoiThuongGapRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        cauHoiThuongGapMapper.updateEntityFromDTO(updateCauHoiThuongGapDTO, cauHoiThuongGap);
        CauHoiThuongGap updatedCauHoiThuongGap = cauHoiThuongGapRepository.save(cauHoiThuongGap);
        return cauHoiThuongGapMapper.toDTO(updatedCauHoiThuongGap);
    }

    @Transactional
    public void deleteCauHoiThuongGap(Integer id) {
        if (!cauHoiThuongGapRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        cauHoiThuongGapRepository.deleteById(id);
    }
}

