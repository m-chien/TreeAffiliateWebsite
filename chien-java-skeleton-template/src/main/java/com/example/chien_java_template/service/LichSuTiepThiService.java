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
import org.springframework.scheduling.annotation.Async;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LichSuTiepThiService {
    private final LichSuTiepThiRepository lichSuTiepThiRepository;
    private final LichSuTiepThiMapper lichSuTiepThiMapper;
    private final com.example.chien_java_template.repository.PlantsUserRepository plantsUserRepository;
    private final com.example.chien_java_template.repository.CayCanhRepository cayCanhRepository;
    private final com.example.chien_java_template.repository.BaiVietRepository baiVietRepository;
    private final org.springframework.mail.javamail.JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username}")
    private String senderEmail;

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

    @Async
    @Transactional
    public void sendMarketingCampaign(com.example.chien_java_template.dto.SendCampaignDTO campaign) {
        com.example.chien_java_template.model.CayCanh cayCanh = campaign.getPlantId() != null
                ? cayCanhRepository.findById(campaign.getPlantId()).orElse(null)
                : null;

        com.example.chien_java_template.model.BaiViet baiViet = campaign.getArticleId() != null
                ? baiVietRepository.findById(campaign.getArticleId()).orElse(null)
                : null;

        ContentType contentType = ContentType.OTHER;
        try {
            if (campaign.getContentType() != null) {
                contentType = ContentType.valueOf(campaign.getContentType().toUpperCase());
            }
        } catch (IllegalArgumentException e) {
            // default to OTHER
        }

        if (campaign.getRecipientIds() == null || campaign.getRecipientIds().isEmpty()) {
            return;
        }

        for (Integer recipientId : campaign.getRecipientIds()) {
            com.example.chien_java_template.model.PlantsUser user = plantsUserRepository.findById(recipientId).orElse(null);
            if (user == null || user.getEmail() == null) {
                continue;
            }

            // 1. Send the email via Gmail SMTP
            try {
                org.springframework.mail.SimpleMailMessage message = new org.springframework.mail.SimpleMailMessage();
                message.setTo(user.getEmail());
                message.setSubject(campaign.getSubject());
                message.setText(campaign.getContent());
                message.setFrom(senderEmail);
                mailSender.send(message);
            } catch (Exception e) {
                System.err.println("Lỗi khi gửi email tiếp thị tới " + user.getEmail() + ": " + e.getMessage());
            }

            // 2. Log in database
            LichSuTiepThi log = LichSuTiepThi.builder()
                    .plantsUser(user)
                    .cayCanh(cayCanh)
                    .baiViet(baiViet)
                    .loaiNoiDung(contentType)
                    .trangThai(Status.ACTIVE)
                    .build();

            lichSuTiepThiRepository.save(log);
        }
    }
}

