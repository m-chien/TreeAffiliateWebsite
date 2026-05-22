package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateKhuyenMaiDTO;
import com.example.chien_java_template.dto.UpdateKhuyenMaiDTO;
import com.example.chien_java_template.dto.KhuyenMaiDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.KhuyenMaiMapper;
import com.example.chien_java_template.model.KhuyenMai;
import com.example.chien_java_template.repository.KhuyenMaiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KhuyenMaiService {
    private final KhuyenMaiRepository khuyenMaiRepository;
    private final KhuyenMaiMapper khuyenMaiMapper;

    @Transactional
    public KhuyenMaiDTO createKhuyenMai(CreateKhuyenMaiDTO createKhuyenMaiDTO) {
        KhuyenMai khuyenMai = khuyenMaiMapper.toEntityFromCreateDTO(createKhuyenMaiDTO);
        KhuyenMai savedKhuyenMai = khuyenMaiRepository.save(khuyenMai);
        return khuyenMaiMapper.toDTO(savedKhuyenMai);
    }

    public KhuyenMaiDTO getKhuyenMaiById(Integer id) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return khuyenMaiMapper.toDTO(khuyenMai);
    }

    public Page<KhuyenMaiDTO> getAllKhuyenMai(Pageable pageable) {
        return khuyenMaiRepository.findAll(pageable)
                .map(khuyenMaiMapper::toDTO);
    }

    @Transactional
    public KhuyenMaiDTO updateKhuyenMai(Integer id, UpdateKhuyenMaiDTO updateKhuyenMaiDTO) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        khuyenMaiMapper.updateEntityFromDTO(updateKhuyenMaiDTO, khuyenMai);
        KhuyenMai updatedKhuyenMai = khuyenMaiRepository.save(khuyenMai);
        return khuyenMaiMapper.toDTO(updatedKhuyenMai);
    }

    @Transactional
    public void deleteKhuyenMai(Integer id) {
        if (!khuyenMaiRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        khuyenMaiRepository.deleteById(id);
    }
}

