package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.UpdateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.HuongDanChamSocDTO;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.HuongDanChamSocMapper;
import com.example.chien_java_template.model.CayCanh; // Nhớ import
import com.example.chien_java_template.model.HuongDanChamSoc;
import com.example.chien_java_template.repository.CayCanhRepository; // Nhớ import
import com.example.chien_java_template.repository.HuongDanChamSocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HuongDanChamSocService {
    private final HuongDanChamSocRepository huongDanChamSocRepository;
    private final HuongDanChamSocMapper huongDanChamSocMapper;

    // THÊM: Inject CayCanhRepository
    private final CayCanhRepository cayCanhRepository;

    @Transactional
    public HuongDanChamSocDTO createHuongDanChamSoc(CreateHuongDanChamSocDTO createHuongDanChamSocDTO) {
        // 1. Map các trường văn bản bình thường (anhSang, cheDoNuoc...)
        HuongDanChamSoc huongDanChamSoc = huongDanChamSocMapper.toEntityFromCreateDTO(createHuongDanChamSocDTO);

        // 2. TÌM VÀ GÁN CÂY CẢNH VÀO THỰC THỂ
        CayCanh cayCanh = cayCanhRepository.findById(createHuongDanChamSocDTO.getCayCanhId())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID)); // Nên có ErrorCode riêng như CAYCANH_NOT_FOUND
        huongDanChamSoc.setCayCanh(cayCanh);

        // 3. Lưu xuống Database
        HuongDanChamSoc savedHuongDanChamSoc = huongDanChamSocRepository.save(huongDanChamSoc);

        return huongDanChamSocMapper.toDTO(savedHuongDanChamSoc);
    }

    public HuongDanChamSocDTO getHuongDanChamSocById(Integer id) {
        HuongDanChamSoc huongDanChamSoc = huongDanChamSocRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return huongDanChamSocMapper.toDTO(huongDanChamSoc);
    }

    public Page<HuongDanChamSocDTO> getAllHuongDanChamSoc(Pageable pageable) {
        return huongDanChamSocRepository.findAll(pageable)
                .map(huongDanChamSocMapper::toDTO);
    }

    public HuongDanChamSocDTO getHuongDanChamSocByCayCanh(Integer cayCanhId) {
        HuongDanChamSoc huongDanChamSoc = huongDanChamSocRepository.findByCayCanhId(cayCanhId)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return huongDanChamSocMapper.toDTO(huongDanChamSoc);
    }

    @Transactional
    public HuongDanChamSocDTO updateHuongDanChamSoc(Integer id, UpdateHuongDanChamSocDTO updateHuongDanChamSocDTO) {
        HuongDanChamSoc huongDanChamSoc = huongDanChamSocRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));

        // Map các trường cập nhật vào entity
        huongDanChamSocMapper.updateEntityFromDTO(updateHuongDanChamSocDTO, huongDanChamSoc);

        // NẾU UPDATE CÓ CHO PHÉP ĐỔI ID CÂY CẢNH THÌ THÊM ĐOẠN NÀY:
        if (updateHuongDanChamSocDTO.getCayCanhId() != null) {
            CayCanh cayCanh = cayCanhRepository.findById(updateHuongDanChamSocDTO.getCayCanhId())
                    .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
            huongDanChamSoc.setCayCanh(cayCanh);
        }

        HuongDanChamSoc updatedHuongDanChamSoc = huongDanChamSocRepository.save(huongDanChamSoc);
        return huongDanChamSocMapper.toDTO(updatedHuongDanChamSoc);
    }

    @Transactional
    public void deleteHuongDanChamSoc(Integer id) {
        if (!huongDanChamSocRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        huongDanChamSocRepository.deleteById(id);
    }
}