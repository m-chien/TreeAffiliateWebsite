package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.UpdateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.LichSuTiepThiDTO;
import com.example.chien_java_template.enums.ContentType;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.LichSuTiepThiService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/lich-su-tiep-thi")
@RequiredArgsConstructor
public class LichSuTiepThiController {
    private final LichSuTiepThiService lichSuTiepThiService;

    @PostMapping
    public ResponseEntity<ApiResponse<LichSuTiepThiDTO>> createLichSuTiepThi(@RequestBody CreateLichSuTiepThiDTO createLichSuTiepThiDTO) {
        LichSuTiepThiDTO lichSuTiepThiDTO = lichSuTiepThiService.createLichSuTiepThi(createLichSuTiepThiDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<LichSuTiepThiDTO>builder()
                        .code(201)
                        .message("Tạo lịch sử tiếp thị thành công")
                        .result(lichSuTiepThiDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LichSuTiepThiDTO>> getLichSuTiepThiById(@PathVariable Integer id) {
        LichSuTiepThiDTO lichSuTiepThiDTO = lichSuTiepThiService.getLichSuTiepThiById(id);
        return ResponseEntity.ok(ApiResponse.<LichSuTiepThiDTO>builder()
                .code(200)
                .message("Lấy lịch sử tiếp thị thành công")
                .result(lichSuTiepThiDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<LichSuTiepThiDTO>>> getAllLichSuTiepThi(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LichSuTiepThiDTO> lichSuTiepThiDTOPage = lichSuTiepThiService.getAllLichSuTiepThi(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LichSuTiepThiDTO>>builder()
                .code(200)
                .message("Lấy danh sách lịch sử tiếp thị thành công")
                .result(lichSuTiepThiDTOPage)
                .build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<Page<LichSuTiepThiDTO>>> getLichSuTiepThiByUser(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LichSuTiepThiDTO> lichSuTiepThiDTOPage = lichSuTiepThiService.getLichSuTiepThiByUser(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LichSuTiepThiDTO>>builder()
                .code(200)
                .message("Lấy lịch sử tiếp thị theo người dùng thành công")
                .result(lichSuTiepThiDTOPage)
                .build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<Page<LichSuTiepThiDTO>>> getLichSuTiepThiByStatus(
            @PathVariable Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LichSuTiepThiDTO> lichSuTiepThiDTOPage = lichSuTiepThiService.getLichSuTiepThiByStatus(status, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LichSuTiepThiDTO>>builder()
                .code(200)
                .message("Lấy lịch sử tiếp thị theo trạng thái thành công")
                .result(lichSuTiepThiDTOPage)
                .build());
    }

    @GetMapping("/content-type/{contentType}")
    public ResponseEntity<ApiResponse<Page<LichSuTiepThiDTO>>> getLichSuTiepThiByContentType(
            @PathVariable ContentType contentType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LichSuTiepThiDTO> lichSuTiepThiDTOPage = lichSuTiepThiService.getLichSuTiepThiByContentType(contentType, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LichSuTiepThiDTO>>builder()
                .code(200)
                .message("Lấy lịch sử tiếp thị theo loại nội dung thành công")
                .result(lichSuTiepThiDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LichSuTiepThiDTO>> updateLichSuTiepThi(
            @PathVariable Integer id,
            @RequestBody UpdateLichSuTiepThiDTO updateLichSuTiepThiDTO) {
        LichSuTiepThiDTO lichSuTiepThiDTO = lichSuTiepThiService.updateLichSuTiepThi(id, updateLichSuTiepThiDTO);
        return ResponseEntity.ok(ApiResponse.<LichSuTiepThiDTO>builder()
                .code(200)
                .message("Cập nhật lịch sử tiếp thị thành công")
                .result(lichSuTiepThiDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLichSuTiepThi(@PathVariable Integer id) {
        lichSuTiepThiService.deleteLichSuTiepThi(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa lịch sử tiếp thị thành công")
                .build());
    }
}

