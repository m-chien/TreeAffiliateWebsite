package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateCayCanhDTO;
import com.example.chien_java_template.dto.UpdateCayCanhDTO;
import com.example.chien_java_template.dto.CayCanhDTO;
import com.example.chien_java_template.dto.request.UpdatePlantDetailsRequest;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.CayCanhService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cay-canh")
@RequiredArgsConstructor
public class CayCanhController {
    private final CayCanhService cayCanhService;

    @PostMapping
    public ResponseEntity<ApiResponse<CayCanhDTO>> createCayCanh(@RequestBody CreateCayCanhDTO createCayCanhDTO) {
        CayCanhDTO cayCanhDTO = cayCanhService.createCayCanh(createCayCanhDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<CayCanhDTO>builder()
                        .code(201)
                        .message("Tạo cây cảnh thành công")
                        .result(cayCanhDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CayCanhDTO>> getCayCanhById(@PathVariable Integer id) {
        CayCanhDTO cayCanhDTO = cayCanhService.getCayCanhById(id);
        cayCanhService.incrementView(id);
        return ResponseEntity.ok(ApiResponse.<CayCanhDTO>builder()
                .code(200)
                .message("Lấy cây cảnh thành công")
                .result(cayCanhDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CayCanhDTO>>> getAllCayCanh(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<CayCanhDTO> cayCanhDTOPage = cayCanhService.getAllCayCanh(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<CayCanhDTO>>builder()
                .code(200)
                .message("Lấy danh sách cây cảnh thành công")
                .result(cayCanhDTOPage)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<CayCanhDTO>>> searchCayCanh(
            @RequestParam String tenCay,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<CayCanhDTO> cayCanhDTOPage = cayCanhService.searchCayCanhByName(tenCay, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<CayCanhDTO>>builder()
                .code(200)
                .message("Tìm kiếm cây cảnh thành công")
                .result(cayCanhDTOPage)
                .build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<Page<CayCanhDTO>>> getCayCanhByStatus(
            @PathVariable Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<CayCanhDTO> cayCanhDTOPage = cayCanhService.getCayCanhByStatus(status, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<CayCanhDTO>>builder()
                .code(200)
                .message("Lấy cây cảnh theo trạng thái thành công")
                .result(cayCanhDTOPage)
                .build());
    }

    @GetMapping("/most-viewed")
    public ResponseEntity<ApiResponse<Page<CayCanhDTO>>> getMostViewedCayCanh(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<CayCanhDTO> cayCanhDTOPage = cayCanhService.getMostViewedCayCanh(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<CayCanhDTO>>builder()
                .code(200)
                .message("Lấy cây cảnh được xem nhiều nhất thành công")
                .result(cayCanhDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CayCanhDTO>> updateCayCanh(
            @PathVariable Integer id,
            @RequestBody UpdateCayCanhDTO updateCayCanhDTO) {
        CayCanhDTO cayCanhDTO = cayCanhService.updateCayCanh(id, updateCayCanhDTO);
        return ResponseEntity.ok(ApiResponse.<CayCanhDTO>builder()
                .code(200)
                .message("Cập nhật cây cảnh thành công")
                .result(cayCanhDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCayCanh(@PathVariable Integer id) {
        cayCanhService.deleteCayCanh(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa cây cảnh thành công")
                .build());
    }

    @PutMapping("/{id}/details")
    public ResponseEntity<ApiResponse<Void>> updatePlantDetails(
            @PathVariable Integer id,
            @RequestBody UpdatePlantDetailsRequest request) {
        cayCanhService.updatePlantDetails(id, request);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Lưu tất cả thông số phụ của cây cảnh thành công")
                .build());
    }
}