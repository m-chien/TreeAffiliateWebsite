package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateLinkAffiliateDTO;
import com.example.chien_java_template.dto.UpdateLinkAffiliateDTO;
import com.example.chien_java_template.dto.LinkAffiliateDTO;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.LinkAffiliateMapper;
import com.example.chien_java_template.model.CayCanh;
import com.example.chien_java_template.model.LinkAffiliate;
import com.example.chien_java_template.repository.CayCanhRepository;
import com.example.chien_java_template.repository.LinkAffiliateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LinkAffiliateService {
    private final LinkAffiliateRepository linkAffiliateRepository;
    private final LinkAffiliateMapper linkAffiliateMapper;
    private final CayCanhRepository cayCanhRepository;

    @Transactional
    public LinkAffiliateDTO createLinkAffiliate(CreateLinkAffiliateDTO createLinkAffiliateDTO) {
        LinkAffiliate linkAffiliate = linkAffiliateMapper.toEntityFromCreateDTO(createLinkAffiliateDTO);

        // Tự tìm và gán CayCanh từ DB
        CayCanh cayCanh = cayCanhRepository.findById(createLinkAffiliateDTO.getCayCanhId())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID)); // Thay bằng ErrorCode phù hợp
        linkAffiliate.setCayCanh(cayCanh);

        linkAffiliate.setTrangThai(Status.ACTIVE);
        linkAffiliate.setLuotClick(0);
        LinkAffiliate savedLinkAffiliate = linkAffiliateRepository.save(linkAffiliate);
        return linkAffiliateMapper.toDTO(savedLinkAffiliate);
    }

    public LinkAffiliateDTO getLinkAffiliateById(Integer id) {
        LinkAffiliate linkAffiliate = linkAffiliateRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return linkAffiliateMapper.toDTO(linkAffiliate);
    }

    public Page<LinkAffiliateDTO> getAllLinkAffiliate(Pageable pageable) {
        return linkAffiliateRepository.findAll(pageable)
                .map(linkAffiliateMapper::toDTO);
    }

    public Page<LinkAffiliateDTO> getLinkAffiliateByCayCanh(Integer cayCanhId, Pageable pageable) {
        return linkAffiliateRepository.findByCayCanhId(cayCanhId, pageable)
                .map(linkAffiliateMapper::toDTO);
    }

    public Page<LinkAffiliateDTO> getLinkAffiliateByStatus(Status status, Pageable pageable) {
        return linkAffiliateRepository.findByTrangThai(status, pageable)
                .map(linkAffiliateMapper::toDTO);
    }

    public Page<LinkAffiliateDTO> getLinkAffiliateByVendor(String nhaCungCap, Pageable pageable) {
        return linkAffiliateRepository.findByNhaCungCap(nhaCungCap, pageable)
                .map(linkAffiliateMapper::toDTO);
    }

    public Page<LinkAffiliateDTO> getMostClickedLinkAffiliate(Pageable pageable) {
        return linkAffiliateRepository.findMostClicked(pageable)
                .map(linkAffiliateMapper::toDTO);
    }

    @Transactional
    public LinkAffiliateDTO updateLinkAffiliate(Integer id, UpdateLinkAffiliateDTO updateLinkAffiliateDTO) {
        LinkAffiliate linkAffiliate = linkAffiliateRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));

        linkAffiliateMapper.updateEntityFromDTO(updateLinkAffiliateDTO, linkAffiliate);

        // Cập nhật lại CayCanh nếu DTO có gửi lên cayCanhId mới
        if (updateLinkAffiliateDTO.getCayCanhId() != null) {
            CayCanh cayCanh = cayCanhRepository.findById(updateLinkAffiliateDTO.getCayCanhId())
                    .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
            linkAffiliate.setCayCanh(cayCanh);
        }

        LinkAffiliate updatedLinkAffiliate = linkAffiliateRepository.save(linkAffiliate);
        return linkAffiliateMapper.toDTO(updatedLinkAffiliate);
    }

    @Transactional
    public void deleteLinkAffiliate(Integer id) {
        if (!linkAffiliateRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        linkAffiliateRepository.deleteById(id);
    }

    @Transactional
    public void incrementClick(Integer id) {
        LinkAffiliate linkAffiliate = linkAffiliateRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        linkAffiliate.setLuotClick((linkAffiliate.getLuotClick() == null ? 0 : linkAffiliate.getLuotClick()) + 1);
        linkAffiliateRepository.save(linkAffiliate);
    }
}

