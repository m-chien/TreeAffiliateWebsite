package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreatePlantsUserDTO;
import com.example.chien_java_template.dto.UpdatePlantsUserDTO;
import com.example.chien_java_template.dto.PlantsUserDTO;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.PlantsUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/plants-user")
@RequiredArgsConstructor
public class PlantsUserController {
    private final PlantsUserService plantsUserService;

    @PostMapping
    public ResponseEntity<ApiResponse<PlantsUserDTO>> createPlantsUser(@RequestBody CreatePlantsUserDTO createPlantsUserDTO) {
        PlantsUserDTO plantsUserDTO = plantsUserService.createPlantsUser(createPlantsUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<PlantsUserDTO>builder()
                        .code(201)
                        .message("Tạo người dùng thành công")
                        .result(plantsUserDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlantsUserDTO>> getPlantsUserById(@PathVariable Integer id) {
        PlantsUserDTO plantsUserDTO = plantsUserService.getPlantsUserById(id);
        return ResponseEntity.ok(ApiResponse.<PlantsUserDTO>builder()
                .code(200)
                .message("Lấy người dùng thành công")
                .result(plantsUserDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PlantsUserDTO>>> getAllPlantsUser(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<PlantsUserDTO> plantsUserDTOPage = plantsUserService.getAllPlantsUser(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<PlantsUserDTO>>builder()
                .code(200)
                .message("Lấy danh sách người dùng thành công")
                .result(plantsUserDTOPage)
                .build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<PlantsUserDTO>> getPlantsUserByEmail(@PathVariable String email) {
        PlantsUserDTO plantsUserDTO = plantsUserService.getPlantsUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.<PlantsUserDTO>builder()
                .code(200)
                .message("Lấy người dùng theo email thành công")
                .result(plantsUserDTO)
                .build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<Page<PlantsUserDTO>>> getPlantsUserByStatus(
            @PathVariable Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<PlantsUserDTO> plantsUserDTOPage = plantsUserService.getPlantsUserByStatus(status, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<PlantsUserDTO>>builder()
                .code(200)
                .message("Lấy người dùng theo trạng thái thành công")
                .result(plantsUserDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PlantsUserDTO>> updatePlantsUser(
            @PathVariable Integer id,
            @RequestBody UpdatePlantsUserDTO updatePlantsUserDTO) {
        PlantsUserDTO plantsUserDTO = plantsUserService.updatePlantsUser(id, updatePlantsUserDTO);
        return ResponseEntity.ok(ApiResponse.<PlantsUserDTO>builder()
                .code(200)
                .message("Cập nhật người dùng thành công")
                .result(plantsUserDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePlantsUser(@PathVariable Integer id) {
        plantsUserService.deletePlantsUser(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa người dùng thành công")
                .build());
    }

    @PutMapping("/{id}/update-last-login")
    public ResponseEntity<ApiResponse<Void>> updateLastLogin(@PathVariable Integer id) {
        plantsUserService.updateLastLogin(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Cập nhật lần đăng nhập cuối cùng thành công")
                .build());
    }

    @GetMapping("/marketing-targets")
    public ResponseEntity<ApiResponse<java.util.List<PlantsUserDTO>>> getMarketingTargets(
            @RequestParam(required = false) Integer plantId,
            @RequestParam(required = false) String category) {
        
        java.util.List<PlantsUserDTO> targets;
        if (plantId != null) {
            targets = plantsUserService.getUsersForPlantMarketing(plantId);
        } else if (category != null && !category.trim().isEmpty()) {
            targets = plantsUserService.getUsersForCategoryMarketing(category);
        } else {
            targets = java.util.Collections.emptyList();
        }
        
        return ResponseEntity.ok(ApiResponse.<java.util.List<PlantsUserDTO>>builder()
                .code(200)
                .message("Lấy danh sách người dùng tiếp thị mục tiêu thành công")
                .result(targets)
                .build());
    }
}

