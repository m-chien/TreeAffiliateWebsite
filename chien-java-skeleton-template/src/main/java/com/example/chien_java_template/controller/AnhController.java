package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateAnhDTO;
import com.example.chien_java_template.dto.UpdateAnhDTO;
import com.example.chien_java_template.dto.AnhDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.AnhService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/anh")
@RequiredArgsConstructor
public class AnhController {
    private final AnhService anhService;

    @PostMapping
    public ResponseEntity<ApiResponse<AnhDTO>> createAnh(@RequestBody CreateAnhDTO createAnhDTO) {
        AnhDTO anhDTO = anhService.createAnh(createAnhDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<AnhDTO>builder()
                        .code(201)
                        .message("Tạo ảnh thành công")
                        .result(anhDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AnhDTO>> getAnhById(@PathVariable Integer id) {
        AnhDTO anhDTO = anhService.getAnhById(id);
        return ResponseEntity.ok(ApiResponse.<AnhDTO>builder()
                .code(200)
                .message("Lấy ảnh thành công")
                .result(anhDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AnhDTO>>> getAllAnh(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<AnhDTO> anhDTOPage = anhService.getAllAnh(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<AnhDTO>>builder()
                .code(200)
                .message("Lấy danh sách ảnh thành công")
                .result(anhDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AnhDTO>> updateAnh(
            @PathVariable Integer id,
            @RequestBody UpdateAnhDTO updateAnhDTO) {
        AnhDTO anhDTO = anhService.updateAnh(id, updateAnhDTO);
        return ResponseEntity.ok(ApiResponse.<AnhDTO>builder()
                .code(200)
                .message("Cập nhật ảnh thành công")
                .result(anhDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAnh(@PathVariable Integer id) {
        anhService.deleteAnh(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa ảnh thành công")
                .build());
    }
}

