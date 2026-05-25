package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateDanhGiaDTO;
import com.example.chien_java_template.dto.UpdateDanhGiaDTO;
import com.example.chien_java_template.dto.DanhGiaDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.DanhGiaMapper;
import com.example.chien_java_template.model.DanhGia;
import com.example.chien_java_template.repository.DanhGiaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DanhGiaService {
    private final DanhGiaRepository danhGiaRepository;
    private final DanhGiaMapper danhGiaMapper;

    @Transactional
    public DanhGiaDTO createDanhGia(CreateDanhGiaDTO createDanhGiaDTO) {
        if (createDanhGiaDTO.getDiem() < 1 || createDanhGiaDTO.getDiem() > 5) {
            throw new AppException(ErrorCode.INVALID_INPUT);
        }
        DanhGia danhGia = danhGiaMapper.toEntityFromCreateDTO(createDanhGiaDTO);
        DanhGia savedDanhGia = danhGiaRepository.save(danhGia);
        return danhGiaMapper.toDTO(savedDanhGia);
    }

    public DanhGiaDTO getDanhGiaById(Integer id) {
        DanhGia danhGia = danhGiaRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return danhGiaMapper.toDTO(danhGia);
    }

    public Page<DanhGiaDTO> getAllDanhGia(Pageable pageable) {
        return danhGiaRepository.findAll(pageable)
                .map(danhGiaMapper::toDTO);
    }

    public Page<DanhGiaDTO> getDanhGiaByCayCanh(Integer cayCanhId, Pageable pageable) {
        return danhGiaRepository.findByCayCanh_Id(cayCanhId, pageable)
                .map(danhGiaMapper::toDTO);
    }

    public Page<DanhGiaDTO> getDanhGiaByUser(Integer userId, Pageable pageable) {
        return danhGiaRepository.findByPlantsUser_Id(userId, pageable)
                .map(danhGiaMapper::toDTO);
    }

    public Double getAverageDiemByCayCanh(Integer cayCanhId) {
        return danhGiaRepository.findAverageDiemByCayCanhId(cayCanhId);
    }

    @Transactional
    public DanhGiaDTO updateDanhGia(Integer id, UpdateDanhGiaDTO updateDanhGiaDTO) {
        DanhGia danhGia = danhGiaRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        if (updateDanhGiaDTO.getDiem() != null && (updateDanhGiaDTO.getDiem() < 1 || updateDanhGiaDTO.getDiem() > 5)) {
            throw new AppException(ErrorCode.INVALID_INPUT);
        }
        danhGiaMapper.updateEntityFromDTO(updateDanhGiaDTO, danhGia);
        DanhGia updatedDanhGia = danhGiaRepository.save(danhGia);
        return danhGiaMapper.toDTO(updatedDanhGia);
    }

    @Transactional
    public void deleteDanhGia(Integer id) {
        if (!danhGiaRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        danhGiaRepository.deleteById(id);
    }
}

