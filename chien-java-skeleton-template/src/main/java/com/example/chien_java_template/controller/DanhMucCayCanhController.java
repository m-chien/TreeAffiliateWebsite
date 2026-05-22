package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateDanhMucCayCanhDTO;
import com.example.chien_java_template.dto.UpdateDanhMucCayCanhDTO;
import com.example.chien_java_template.dto.DanhMucCayCanhDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.DanhMucCayCanhService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/danh-muc-cay-canh")
@RequiredArgsConstructor
public class DanhMucCayCanhController {
    private final DanhMucCayCanhService danhMucCayCanhService;

    @PostMapping
    public ResponseEntity<ApiResponse<DanhMucCayCanhDTO>> createDanhMucCayCanh(@RequestBody CreateDanhMucCayCanhDTO createDanhMucCayCanhDTO) {
        DanhMucCayCanhDTO danhMucCayCanhDTO = danhMucCayCanhService.createDanhMucCayCanh(createDanhMucCayCanhDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<DanhMucCayCanhDTO>builder()
                        .code(201)
                        .message("Tạo danh mục cây cảnh thành công")
                        .result(danhMucCayCanhDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DanhMucCayCanhDTO>> getDanhMucCayCanhById(@PathVariable Integer id) {
        DanhMucCayCanhDTO danhMucCayCanhDTO = danhMucCayCanhService.getDanhMucCayCanhById(id);
        return ResponseEntity.ok(ApiResponse.<DanhMucCayCanhDTO>builder()
                .code(200)
                .message("Lấy danh mục cây cảnh thành công")
                .result(danhMucCayCanhDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<DanhMucCayCanhDTO>>> getAllDanhMucCayCanh(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<DanhMucCayCanhDTO> danhMucCayCanhDTOPage = danhMucCayCanhService.getAllDanhMucCayCanh(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<DanhMucCayCanhDTO>>builder()
                .code(200)
                .message("Lấy danh sách danh mục cây cảnh thành công")
                .result(danhMucCayCanhDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DanhMucCayCanhDTO>> updateDanhMucCayCanh(
            @PathVariable Integer id,
            @RequestBody UpdateDanhMucCayCanhDTO updateDanhMucCayCanhDTO) {
        DanhMucCayCanhDTO danhMucCayCanhDTO = danhMucCayCanhService.updateDanhMucCayCanh(id, updateDanhMucCayCanhDTO);
        return ResponseEntity.ok(ApiResponse.<DanhMucCayCanhDTO>builder()
                .code(200)
                .message("Cập nhật danh mục cây cảnh thành công")
                .result(danhMucCayCanhDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDanhMucCayCanh(@PathVariable Integer id) {
        danhMucCayCanhService.deleteDanhMucCayCanh(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa danh mục cây cảnh thành công")
                .build());
    }
}

