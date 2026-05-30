package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreatePlantsUserDTO;
import com.example.chien_java_template.dto.UpdatePlantsUserDTO;
import com.example.chien_java_template.dto.PlantsUserDTO;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.enums.UserRole;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.PlantsUserMapper;
import com.example.chien_java_template.model.PlantsUser;
import com.example.chien_java_template.repository.PlantsUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlantsUserService {
    private final PlantsUserRepository plantsUserRepository;
    private final PlantsUserMapper plantsUserMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public PlantsUserDTO createPlantsUser(CreatePlantsUserDTO createPlantsUserDTO) {
        if (plantsUserRepository.existsByEmail(createPlantsUserDTO.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_DUPLICATE);
        }
        PlantsUser plantsUser = plantsUserMapper.toEntityFromCreateDTO(createPlantsUserDTO);
        plantsUser.setMatKhau(passwordEncoder.encode(createPlantsUserDTO.getMatKhau()));
        plantsUser.setTrangThai(Status.ACTIVE);
        plantsUser.setVaiTro(UserRole.User);
        PlantsUser savedPlantsUser = plantsUserRepository.save(plantsUser);
        return plantsUserMapper.toDTO(savedPlantsUser);
    }

    public PlantsUserDTO getPlantsUserById(Integer id) {
        PlantsUser plantsUser = plantsUserRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return plantsUserMapper.toDTO(plantsUser);
    }

    @Transactional(readOnly = true)
    public Page<PlantsUserDTO> getAllPlantsUser(Pageable pageable) {
        return plantsUserRepository.findAll(pageable)
                .map(plantsUserMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public PlantsUserDTO getPlantsUserByEmail(String email) {
        PlantsUser plantsUser = plantsUserRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return plantsUserMapper.toDTO(plantsUser);
    }

    @Transactional(readOnly = true)
    public Page<PlantsUserDTO> getPlantsUserByStatus(Status status, Pageable pageable) {
        return plantsUserRepository.findByTrangThai(status, pageable)
                .map(plantsUserMapper::toDTO);
    }

    @Transactional
    public PlantsUserDTO updatePlantsUser(Integer id, UpdatePlantsUserDTO updatePlantsUserDTO) {
        PlantsUser plantsUser = plantsUserRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        plantsUserMapper.updateEntityFromDTO(updatePlantsUserDTO, plantsUser);
        PlantsUser updatedPlantsUser = plantsUserRepository.save(plantsUser);
        return plantsUserMapper.toDTO(updatedPlantsUser);
    }

    @Transactional
    public void deletePlantsUser(Integer id) {
        if (!plantsUserRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        plantsUserRepository.deleteById(id);
    }

    @Transactional
    public void updateLastLogin(Integer id) {
        PlantsUser plantsUser = plantsUserRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        plantsUser.setLanDangNhapCuoi(LocalDateTime.now());
        plantsUserRepository.save(plantsUser);
    }

    @Transactional(readOnly = true)
    public List<PlantsUserDTO> getUsersForPlantMarketing(Integer plantId) {
        return plantsUserRepository.findUsersForPlantMarketing(plantId).stream()
                .map(plantsUserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PlantsUserDTO> getUsersForCategoryMarketing(String categoryName) {
        return plantsUserRepository.findUsersForCategoryMarketing(categoryName).stream()
                .map(plantsUserMapper::toDTO)
                .collect(Collectors.toList());
    }
}
