package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateDanhMucNoiDungDTO;
import com.example.chien_java_template.dto.UpdateDanhMucNoiDungDTO;
import com.example.chien_java_template.dto.DanhMucNoiDungDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.DanhMucNoiDungMapper;
import com.example.chien_java_template.model.DanhMucNoiDung;
import com.example.chien_java_template.repository.DanhMucNoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DanhMucNoiDungService {
    private final DanhMucNoiDungRepository danhMucNoiDungRepository;
    private final DanhMucNoiDungMapper danhMucNoiDungMapper;

    @Transactional
    public DanhMucNoiDungDTO createDanhMucNoiDung(CreateDanhMucNoiDungDTO createDanhMucNoiDungDTO) {
        DanhMucNoiDung danhMucNoiDung = danhMucNoiDungMapper.toEntityFromCreateDTO(createDanhMucNoiDungDTO);
        DanhMucNoiDung savedDanhMucNoiDung = danhMucNoiDungRepository.save(danhMucNoiDung);
        return danhMucNoiDungMapper.toDTO(savedDanhMucNoiDung);
    }

    public DanhMucNoiDungDTO getDanhMucNoiDungById(Integer id) {
        DanhMucNoiDung danhMucNoiDung = danhMucNoiDungRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return danhMucNoiDungMapper.toDTO(danhMucNoiDung);
    }

    public Page<DanhMucNoiDungDTO> getAllDanhMucNoiDung(Pageable pageable) {
        return danhMucNoiDungRepository.findAll(pageable)
                .map(danhMucNoiDungMapper::toDTO);
    }

    @Transactional
    public DanhMucNoiDungDTO updateDanhMucNoiDung(Integer id, UpdateDanhMucNoiDungDTO updateDanhMucNoiDungDTO) {
        DanhMucNoiDung danhMucNoiDung = danhMucNoiDungRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        danhMucNoiDungMapper.updateEntityFromDTO(updateDanhMucNoiDungDTO, danhMucNoiDung);
        DanhMucNoiDung updatedDanhMucNoiDung = danhMucNoiDungRepository.save(danhMucNoiDung);
        return danhMucNoiDungMapper.toDTO(updatedDanhMucNoiDung);
    }

    @Transactional
    public void deleteDanhMucNoiDung(Integer id) {
        if (!danhMucNoiDungRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        danhMucNoiDungRepository.deleteById(id);
    }

    public List<DanhMucNoiDungDTO> getAllCategoriesWithCount() {
        return danhMucNoiDungRepository.findAllWithArticleCount();
    }
}

