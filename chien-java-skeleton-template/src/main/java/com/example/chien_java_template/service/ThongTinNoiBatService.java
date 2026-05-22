package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateThongTinNoiBatDTO;
import com.example.chien_java_template.dto.UpdateThongTinNoiBatDTO;
import com.example.chien_java_template.dto.ThongTinNoiBatDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.ThongTinNoiBatMapper;
import com.example.chien_java_template.model.ThongTinNoiBat;
import com.example.chien_java_template.repository.ThongTinNoiBatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThongTinNoiBatService {
    private final ThongTinNoiBatRepository thongTinNoiBatRepository;
    private final ThongTinNoiBatMapper thongTinNoiBatMapper;

    @Transactional
    public ThongTinNoiBatDTO createThongTinNoiBat(CreateThongTinNoiBatDTO createThongTinNoiBatDTO) {
        ThongTinNoiBat thongTinNoiBat = thongTinNoiBatMapper.toEntityFromCreateDTO(createThongTinNoiBatDTO);
        ThongTinNoiBat savedThongTinNoiBat = thongTinNoiBatRepository.save(thongTinNoiBat);
        return thongTinNoiBatMapper.toDTO(savedThongTinNoiBat);
    }

    public ThongTinNoiBatDTO getThongTinNoiBatById(Integer id) {
        ThongTinNoiBat thongTinNoiBat = thongTinNoiBatRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return thongTinNoiBatMapper.toDTO(thongTinNoiBat);
    }

    public Page<ThongTinNoiBatDTO> getAllThongTinNoiBat(Pageable pageable) {
        return thongTinNoiBatRepository.findAll(pageable)
                .map(thongTinNoiBatMapper::toDTO);
    }

    public Page<ThongTinNoiBatDTO> getThongTinNoiBatByCayCanh(Integer cayCanhId, Pageable pageable) {
        return thongTinNoiBatRepository.findByCayCanhId(cayCanhId, pageable)
                .map(thongTinNoiBatMapper::toDTO);
    }

    @Transactional
    public ThongTinNoiBatDTO updateThongTinNoiBat(Integer id, UpdateThongTinNoiBatDTO updateThongTinNoiBatDTO) {
        ThongTinNoiBat thongTinNoiBat = thongTinNoiBatRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        thongTinNoiBatMapper.updateEntityFromDTO(updateThongTinNoiBatDTO, thongTinNoiBat);
        ThongTinNoiBat updatedThongTinNoiBat = thongTinNoiBatRepository.save(thongTinNoiBat);
        return thongTinNoiBatMapper.toDTO(updatedThongTinNoiBat);
    }

    @Transactional
    public void deleteThongTinNoiBat(Integer id) {
        if (!thongTinNoiBatRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        thongTinNoiBatRepository.deleteById(id);
    }
}

