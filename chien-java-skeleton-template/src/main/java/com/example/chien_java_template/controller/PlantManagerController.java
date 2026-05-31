package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.request.ManagedPlantRequest;
import com.example.chien_java_template.dto.response.ManagedPlantResponse;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.PlantManagerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/plants-manager")
@RequiredArgsConstructor
@CrossOrigin("*") // Mở CORS cho FE React gọi tạm
public class PlantManagerController {

    private final PlantManagerService plantManagerService;

    // FE Filter trực tiếp: /api/v1/admin/plants-manager?searchTerm=Monstera&platform=shopee
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ManagedPlantResponse>>> getAllPlants(
            @RequestParam(required = false, defaultValue = "") String searchTerm,
            @RequestParam(required = false, defaultValue = "all") String platform,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
            
        Page<ManagedPlantResponse> responses = plantManagerService.getManagedPlants(searchTerm, platform, PageRequest.of(page, size));
        
        return ResponseEntity.ok(ApiResponse.<Page<ManagedPlantResponse>>builder()
                .code(200)
                .message("Lấy danh sách quản lý cây Affiliate thành công")
                .result(responses)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ManagedPlantResponse>> createPlant(@RequestBody @Valid ManagedPlantRequest request) {
        ManagedPlantResponse response = plantManagerService.createPlant(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<ManagedPlantResponse>builder()
                        .code(201)
                        .message("Liên kết cây Affiliate mới thành công")
                        .result(response)
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ManagedPlantResponse>> updatePlant(
            @PathVariable Integer id,
            @RequestBody @Valid ManagedPlantRequest request) {
        ManagedPlantResponse response = plantManagerService.updatePlant(id, request);
        return ResponseEntity.ok(ApiResponse.<ManagedPlantResponse>builder()
                .code(200)
                .message("Chỉnh sửa thông số cây thành công")
                .result(response)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePlant(@PathVariable Integer id) {
        plantManagerService.deletePlant(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Ngắt liên kết SEO thành công")
                .build());
    }
}