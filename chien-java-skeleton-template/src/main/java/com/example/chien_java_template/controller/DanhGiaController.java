package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateDanhGiaDTO;
import com.example.chien_java_template.dto.UpdateDanhGiaDTO;
import com.example.chien_java_template.dto.DanhGiaDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.DanhGiaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/danh-gia")
@RequiredArgsConstructor
public class DanhGiaController {
    private final DanhGiaService danhGiaService;

    @PostMapping
    public ResponseEntity<ApiResponse<DanhGiaDTO>> createDanhGia(@RequestBody CreateDanhGiaDTO createDanhGiaDTO) {
        DanhGiaDTO danhGiaDTO = danhGiaService.createDanhGia(createDanhGiaDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<DanhGiaDTO>builder()
                        .code(201)
                        .message("Tạo đánh giá thành công")
                        .result(danhGiaDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DanhGiaDTO>> getDanhGiaById(@PathVariable Integer id) {
        DanhGiaDTO danhGiaDTO = danhGiaService.getDanhGiaById(id);
        return ResponseEntity.ok(ApiResponse.<DanhGiaDTO>builder()
                .code(200)
                .message("Lấy đánh giá thành công")
                .result(danhGiaDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<DanhGiaDTO>>> getAllDanhGia(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<DanhGiaDTO> danhGiaDTOPage = danhGiaService.getAllDanhGia(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<DanhGiaDTO>>builder()
                .code(200)
                .message("Lấy danh sách đánh giá thành công")
                .result(danhGiaDTOPage)
                .build());
    }

    @GetMapping("/cay-canh/{cayCanhId}")
    public ResponseEntity<ApiResponse<Page<DanhGiaDTO>>> getDanhGiaByCayCanh(
            @PathVariable Integer cayCanhId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<DanhGiaDTO> danhGiaDTOPage = danhGiaService.getDanhGiaByCayCanh(cayCanhId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<DanhGiaDTO>>builder()
                .code(200)
                .message("Lấy đánh giá theo cây cảnh thành công")
                .result(danhGiaDTOPage)
                .build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<Page<DanhGiaDTO>>> getDanhGiaByUser(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<DanhGiaDTO> danhGiaDTOPage = danhGiaService.getDanhGiaByUser(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<DanhGiaDTO>>builder()
                .code(200)
                .message("Lấy đánh giá theo người dùng thành công")
                .result(danhGiaDTOPage)
                .build());
    }

    @GetMapping("/cay-canh/{cayCanhId}/average")
    public ResponseEntity<ApiResponse<Double>> getAverageDiemByCayCanh(@PathVariable Integer cayCanhId) {
        Double averageDiem = danhGiaService.getAverageDiemByCayCanh(cayCanhId);
        return ResponseEntity.ok(ApiResponse.<Double>builder()
                .code(200)
                .message("Lấy điểm trung bình thành công")
                .result(averageDiem)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DanhGiaDTO>> updateDanhGia(
            @PathVariable Integer id,
            @RequestBody UpdateDanhGiaDTO updateDanhGiaDTO) {
        DanhGiaDTO danhGiaDTO = danhGiaService.updateDanhGia(id, updateDanhGiaDTO);
        return ResponseEntity.ok(ApiResponse.<DanhGiaDTO>builder()
                .code(200)
                .message("Cập nhật đánh giá thành công")
                .result(danhGiaDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDanhGia(@PathVariable Integer id) {
        danhGiaService.deleteDanhGia(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa đánh giá thành công")
                .build());
    }
}

