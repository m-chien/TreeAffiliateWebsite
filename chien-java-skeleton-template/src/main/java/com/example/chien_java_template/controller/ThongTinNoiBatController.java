package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateThongTinNoiBatDTO;
import com.example.chien_java_template.dto.UpdateThongTinNoiBatDTO;
import com.example.chien_java_template.dto.ThongTinNoiBatDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.ThongTinNoiBatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/thong-tin-noi-bat")
@RequiredArgsConstructor
public class ThongTinNoiBatController {
    private final ThongTinNoiBatService thongTinNoiBatService;

    @PostMapping
    public ResponseEntity<ApiResponse<ThongTinNoiBatDTO>> createThongTinNoiBat(@RequestBody CreateThongTinNoiBatDTO createThongTinNoiBatDTO) {
        ThongTinNoiBatDTO thongTinNoiBatDTO = thongTinNoiBatService.createThongTinNoiBat(createThongTinNoiBatDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<ThongTinNoiBatDTO>builder()
                        .code(201)
                        .message("Tạo thông tin nổi bật thành công")
                        .result(thongTinNoiBatDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ThongTinNoiBatDTO>> getThongTinNoiBatById(@PathVariable Integer id) {
        ThongTinNoiBatDTO thongTinNoiBatDTO = thongTinNoiBatService.getThongTinNoiBatById(id);
        return ResponseEntity.ok(ApiResponse.<ThongTinNoiBatDTO>builder()
                .code(200)
                .message("Lấy thông tin nổi bật thành công")
                .result(thongTinNoiBatDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ThongTinNoiBatDTO>>> getAllThongTinNoiBat(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ThongTinNoiBatDTO> thongTinNoiBatDTOPage = thongTinNoiBatService.getAllThongTinNoiBat(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<ThongTinNoiBatDTO>>builder()
                .code(200)
                .message("Lấy danh sách thông tin nổi bật thành công")
                .result(thongTinNoiBatDTOPage)
                .build());
    }

    @GetMapping("/cay-canh/{cayCanhId}")
    public ResponseEntity<ApiResponse<Page<ThongTinNoiBatDTO>>> getThongTinNoiBatByCayCanh(
            @PathVariable Integer cayCanhId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ThongTinNoiBatDTO> thongTinNoiBatDTOPage = thongTinNoiBatService.getThongTinNoiBatByCayCanh(cayCanhId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<ThongTinNoiBatDTO>>builder()
                .code(200)
                .message("Lấy thông tin nổi bật theo cây cảnh thành công")
                .result(thongTinNoiBatDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ThongTinNoiBatDTO>> updateThongTinNoiBat(
            @PathVariable Integer id,
            @RequestBody UpdateThongTinNoiBatDTO updateThongTinNoiBatDTO) {
        ThongTinNoiBatDTO thongTinNoiBatDTO = thongTinNoiBatService.updateThongTinNoiBat(id, updateThongTinNoiBatDTO);
        return ResponseEntity.ok(ApiResponse.<ThongTinNoiBatDTO>builder()
                .code(200)
                .message("Cập nhật thông tin nổi bật thành công")
                .result(thongTinNoiBatDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteThongTinNoiBat(@PathVariable Integer id) {
        thongTinNoiBatService.deleteThongTinNoiBat(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa thông tin nổi bật thành công")
                .build());
    }
}

