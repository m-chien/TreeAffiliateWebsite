package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateAffiliateOrderDTO;
import com.example.chien_java_template.dto.UpdateAffiliateOrderDTO;
import com.example.chien_java_template.dto.AffiliateOrderDTO;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.AffiliateOrderMapper;
import com.example.chien_java_template.model.AffiliateOrder;
import com.example.chien_java_template.repository.AffiliateOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AffiliateOrderService {
    private final AffiliateOrderRepository affiliateOrderRepository;
    private final AffiliateOrderMapper affiliateOrderMapper;

    @Transactional
    public AffiliateOrderDTO createAffiliateOrder(CreateAffiliateOrderDTO createAffiliateOrderDTO) {
        AffiliateOrder affiliateOrder = affiliateOrderMapper.toEntityFromCreateDTO(createAffiliateOrderDTO);
        affiliateOrder.setTrangThai(Status.Pending);
        affiliateOrder.setNgayDat(LocalDateTime.now());
        AffiliateOrder savedAffiliateOrder = affiliateOrderRepository.save(affiliateOrder);
        return affiliateOrderMapper.toDTO(savedAffiliateOrder);
    }

    public AffiliateOrderDTO getAffiliateOrderById(Integer id) {
        AffiliateOrder affiliateOrder = affiliateOrderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return affiliateOrderMapper.toDTO(affiliateOrder);
    }

    public Page<AffiliateOrderDTO> getAllAffiliateOrder(Pageable pageable) {
        return affiliateOrderRepository.findAll(pageable)
                .map(affiliateOrderMapper::toDTO);
    }

    public Page<AffiliateOrderDTO> getAffiliateOrderByLinkAffiliate(Integer linkAffiliateId, Pageable pageable) {
        return affiliateOrderRepository.findByLinkAffiliateId(linkAffiliateId, pageable)
                .map(affiliateOrderMapper::toDTO);
    }

    public Page<AffiliateOrderDTO> getAffiliateOrderByStatus(Status status, Pageable pageable) {
        return affiliateOrderRepository.findByTrangThai(status, pageable)
                .map(affiliateOrderMapper::toDTO);
    }

    @Transactional
    public AffiliateOrderDTO updateAffiliateOrder(Integer id, UpdateAffiliateOrderDTO updateAffiliateOrderDTO) {
        AffiliateOrder affiliateOrder = affiliateOrderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        affiliateOrderMapper.updateEntityFromDTO(updateAffiliateOrderDTO, affiliateOrder);
        AffiliateOrder updatedAffiliateOrder = affiliateOrderRepository.save(affiliateOrder);
        return affiliateOrderMapper.toDTO(updatedAffiliateOrder);
    }

    @Transactional
    public void deleteAffiliateOrder(Integer id) {
        if (!affiliateOrderRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        affiliateOrderRepository.deleteById(id);
    }
}

