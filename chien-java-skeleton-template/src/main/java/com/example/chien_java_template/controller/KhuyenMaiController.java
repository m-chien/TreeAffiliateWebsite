package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CauHoiThuongGapDTO;
import com.example.chien_java_template.dto.CreateKhuyenMaiDTO;
import com.example.chien_java_template.dto.UpdateKhuyenMaiDTO;
import com.example.chien_java_template.dto.KhuyenMaiDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.KhuyenMaiService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/khuyen-mai")
@RequiredArgsConstructor
public class KhuyenMaiController {
    private final KhuyenMaiService khuyenMaiService;

    @PostMapping
    public ResponseEntity<ApiResponse<KhuyenMaiDTO>> createKhuyenMai(@RequestBody CreateKhuyenMaiDTO createKhuyenMaiDTO) {
        KhuyenMaiDTO khuyenMaiDTO = khuyenMaiService.createKhuyenMai(createKhuyenMaiDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<KhuyenMaiDTO>builder()
                        .code(201)
                        .message("Tạo khuyến mãi thành công")
                        .result(khuyenMaiDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<KhuyenMaiDTO>> getKhuyenMaiById(@PathVariable Integer id) {
        KhuyenMaiDTO khuyenMaiDTO = khuyenMaiService.getKhuyenMaiById(id);
        return ResponseEntity.ok(ApiResponse.<KhuyenMaiDTO>builder()
                .code(200)
                .message("Lấy khuyến mãi thành công")
                .result(khuyenMaiDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<KhuyenMaiDTO>>> getAllKhuyenMai(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<KhuyenMaiDTO> khuyenMaiDTOPage = khuyenMaiService.getAllKhuyenMai(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<KhuyenMaiDTO>>builder()
                .code(200)
                .message("Lấy danh sách khuyến mãi thành công")
                .result(khuyenMaiDTOPage)
                .build());
    }

    @GetMapping("/cay-canh/{cayCanhId}")
    public ResponseEntity<ApiResponse<Page<KhuyenMaiDTO>>> getKhuyenMaiByCayCanh(
            @PathVariable Integer cayCanhId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<KhuyenMaiDTO> khuyenMaiDTOPage =
                khuyenMaiService.getKhuyenMaiByCayCanh(cayCanhId, PageRequest.of(page, size));

        return ResponseEntity.ok(ApiResponse.<Page<KhuyenMaiDTO>>builder()
                .code(200)
                .message("Lấy danh sách khuyến mãi theo cây cảnh thành công")
                .result(khuyenMaiDTOPage)
                .build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<KhuyenMaiDTO>> updateKhuyenMai(
            @PathVariable Integer id,
            @RequestBody UpdateKhuyenMaiDTO updateKhuyenMaiDTO) {
        KhuyenMaiDTO khuyenMaiDTO = khuyenMaiService.updateKhuyenMai(id, updateKhuyenMaiDTO);
        return ResponseEntity.ok(ApiResponse.<KhuyenMaiDTO>builder()
                .code(200)
                .message("Cập nhật khuyến mãi thành công")
                .result(khuyenMaiDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteKhuyenMai(@PathVariable Integer id) {
        khuyenMaiService.deleteKhuyenMai(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa khuyến mãi thành công")
                .build());
    }
}

