package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateDanhMucCayCanhDTO;
import com.example.chien_java_template.dto.UpdateDanhMucCayCanhDTO;
import com.example.chien_java_template.dto.DanhMucCayCanhDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.DanhMucCayCanhMapper;
import com.example.chien_java_template.model.DanhMucCayCanh;
import com.example.chien_java_template.repository.DanhMucCayCanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DanhMucCayCanhService {
    private final DanhMucCayCanhRepository danhMucCayCanhRepository;
    private final DanhMucCayCanhMapper danhMucCayCanhMapper;

    @Transactional
    public DanhMucCayCanhDTO createDanhMucCayCanh(CreateDanhMucCayCanhDTO createDanhMucCayCanhDTO) {
        DanhMucCayCanh danhMucCayCanh = danhMucCayCanhMapper.toEntityFromCreateDTO(createDanhMucCayCanhDTO);
        DanhMucCayCanh savedDanhMucCayCanh = danhMucCayCanhRepository.save(danhMucCayCanh);
        return danhMucCayCanhMapper.toDTO(savedDanhMucCayCanh);
    }

    public DanhMucCayCanhDTO getDanhMucCayCanhById(Integer id) {
        DanhMucCayCanh danhMucCayCanh = danhMucCayCanhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return danhMucCayCanhMapper.toDTO(danhMucCayCanh);
    }

    public Page<DanhMucCayCanhDTO> getAllDanhMucCayCanh(Pageable pageable) {
        return danhMucCayCanhRepository.findAll(pageable)
                .map(danhMucCayCanhMapper::toDTO);
    }

    @Transactional
    public DanhMucCayCanhDTO updateDanhMucCayCanh(Integer id, UpdateDanhMucCayCanhDTO updateDanhMucCayCanhDTO) {
        DanhMucCayCanh danhMucCayCanh = danhMucCayCanhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        danhMucCayCanhMapper.updateEntityFromDTO(updateDanhMucCayCanhDTO, danhMucCayCanh);
        DanhMucCayCanh updatedDanhMucCayCanh = danhMucCayCanhRepository.save(danhMucCayCanh);
        return danhMucCayCanhMapper.toDTO(updatedDanhMucCayCanh);
    }

    @Transactional
    public void deleteDanhMucCayCanh(Integer id) {
        if (!danhMucCayCanhRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        danhMucCayCanhRepository.deleteById(id);
    }
}

