package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.UpdateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.LichSuTiepThiDTO;
import com.example.chien_java_template.enums.ContentType;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.LichSuTiepThiMapper;
import com.example.chien_java_template.model.LichSuTiepThi;
import com.example.chien_java_template.repository.LichSuTiepThiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LichSuTiepThiService {
    private final LichSuTiepThiRepository lichSuTiepThiRepository;
    private final LichSuTiepThiMapper lichSuTiepThiMapper;

    @Transactional
    public LichSuTiepThiDTO createLichSuTiepThi(CreateLichSuTiepThiDTO createLichSuTiepThiDTO) {
        LichSuTiepThi lichSuTiepThi = lichSuTiepThiMapper.toEntityFromCreateDTO(createLichSuTiepThiDTO);
        LichSuTiepThi savedLichSuTiepThi = lichSuTiepThiRepository.save(lichSuTiepThi);
        return lichSuTiepThiMapper.toDTO(savedLichSuTiepThi);
    }

    public LichSuTiepThiDTO getLichSuTiepThiById(Integer id) {
        LichSuTiepThi lichSuTiepThi = lichSuTiepThiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return lichSuTiepThiMapper.toDTO(lichSuTiepThi);
    }

    public Page<LichSuTiepThiDTO> getAllLichSuTiepThi(Pageable pageable) {
        return lichSuTiepThiRepository.findAll(pageable)
                .map(lichSuTiepThiMapper::toDTO);
    }

    public Page<LichSuTiepThiDTO> getLichSuTiepThiByUser(Integer userId, Pageable pageable) {
        return lichSuTiepThiRepository.findByPlantsUserId(userId, pageable)
                .map(lichSuTiepThiMapper::toDTO);
    }

    public Page<LichSuTiepThiDTO> getLichSuTiepThiByStatus(Status status, Pageable pageable) {
        return lichSuTiepThiRepository.findByTrangThai(status, pageable)
                .map(lichSuTiepThiMapper::toDTO);
    }

    public Page<LichSuTiepThiDTO> getLichSuTiepThiByContentType(ContentType loaiNoiDung, Pageable pageable) {
        return lichSuTiepThiRepository.findByLoaiNoiDung(loaiNoiDung, pageable)
                .map(lichSuTiepThiMapper::toDTO);
    }

    @Transactional
    public LichSuTiepThiDTO updateLichSuTiepThi(Integer id, UpdateLichSuTiepThiDTO updateLichSuTiepThiDTO) {
        LichSuTiepThi lichSuTiepThi = lichSuTiepThiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        lichSuTiepThiMapper.updateEntityFromDTO(updateLichSuTiepThiDTO, lichSuTiepThi);
        LichSuTiepThi updatedLichSuTiepThi = lichSuTiepThiRepository.save(lichSuTiepThi);
        return lichSuTiepThiMapper.toDTO(updatedLichSuTiepThi);
    }

    @Transactional
    public void deleteLichSuTiepThi(Integer id) {
        if (!lichSuTiepThiRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        lichSuTiepThiRepository.deleteById(id);
    }
}

