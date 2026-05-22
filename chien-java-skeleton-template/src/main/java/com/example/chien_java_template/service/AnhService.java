package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateAnhDTO;
import com.example.chien_java_template.dto.UpdateAnhDTO;
import com.example.chien_java_template.dto.AnhDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.AnhMapper;
import com.example.chien_java_template.model.Anh;
import com.example.chien_java_template.repository.AnhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnhService {
    private final AnhRepository anhRepository;
    private final AnhMapper anhMapper;

    @Transactional
    public AnhDTO createAnh(CreateAnhDTO createAnhDTO) {
        Anh anh = anhMapper.toEntityFromCreateDTO(createAnhDTO);
        Anh savedAnh = anhRepository.save(anh);
        return anhMapper.toDTO(savedAnh);
    }

    public AnhDTO getAnhById(Integer id) {
        Anh anh = anhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return anhMapper.toDTO(anh);
    }

    public Page<AnhDTO> getAllAnh(Pageable pageable) {
        return anhRepository.findAll(pageable)
                .map(anhMapper::toDTO);
    }

    @Transactional
    public AnhDTO updateAnh(Integer id, UpdateAnhDTO updateAnhDTO) {
        Anh anh = anhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        anhMapper.updateEntityFromDTO(updateAnhDTO, anh);
        Anh updatedAnh = anhRepository.save(anh);
        return anhMapper.toDTO(updatedAnh);
    }

    @Transactional
    public void deleteAnh(Integer id) {
        if (!anhRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        anhRepository.deleteById(id);
    }
}

