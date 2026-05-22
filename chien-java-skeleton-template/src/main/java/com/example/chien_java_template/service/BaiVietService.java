package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateBaiVietDTO;
import com.example.chien_java_template.dto.UpdateBaiVietDTO;
import com.example.chien_java_template.dto.BaiVietDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.BaiVietMapper;
import com.example.chien_java_template.model.BaiViet;
import com.example.chien_java_template.repository.BaiVietRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BaiVietService {
    private final BaiVietRepository baiVietRepository;
    private final BaiVietMapper baiVietMapper;

    @Transactional
    public BaiVietDTO createBaiViet(CreateBaiVietDTO createBaiVietDTO) {
        BaiViet baiViet = baiVietMapper.toEntityFromCreateDTO(createBaiVietDTO);
        baiViet.setLuotXem(0);
        BaiViet savedBaiViet = baiVietRepository.save(baiViet);
        return baiVietMapper.toDTO(savedBaiViet);
    }

    public BaiVietDTO getBaiVietById(Integer id) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return baiVietMapper.toDTO(baiViet);
    }

    public Page<BaiVietDTO> getAllBaiViet(Pageable pageable) {
        return baiVietRepository.findAll(pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> searchBaiVietByTitle(String tieuDe, Pageable pageable) {
        return baiVietRepository.findByTieuDeContainingIgnoreCase(tieuDe, pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getBaiVietByCategory(Integer categoryId, Pageable pageable) {
        return baiVietRepository.findByDanhMucNoiDungId(categoryId, pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getBaiVietByUser(Integer userId, Pageable pageable) {
        return baiVietRepository.findByPlantsUserId(userId, pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getMostViewedBaiViet(Pageable pageable) {
        return baiVietRepository.findMostViewed(pageable)
                .map(baiVietMapper::toDTO);
    }

    public Page<BaiVietDTO> getNewestBaiViet(Pageable pageable) {
        return baiVietRepository.findNewest(pageable)
                .map(baiVietMapper::toDTO);
    }

    @Transactional
    public BaiVietDTO updateBaiViet(Integer id, UpdateBaiVietDTO updateBaiVietDTO) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        baiVietMapper.updateEntityFromDTO(updateBaiVietDTO, baiViet);
        BaiViet updatedBaiViet = baiVietRepository.save(baiViet);
        return baiVietMapper.toDTO(updatedBaiViet);
    }

    @Transactional
    public void deleteBaiViet(Integer id) {
        if (!baiVietRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        baiVietRepository.deleteById(id);
    }

    @Transactional
    public void incrementView(Integer id) {
        BaiViet baiViet = baiVietRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        baiViet.setLuotXem((baiViet.getLuotXem() == null ? 0 : baiViet.getLuotXem()) + 1);
        baiVietRepository.save(baiViet);
    }
}

