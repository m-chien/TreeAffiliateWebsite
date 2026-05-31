package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateDanhMucNoiDungDTO;
import com.example.chien_java_template.dto.UpdateDanhMucNoiDungDTO;
import com.example.chien_java_template.dto.DanhMucNoiDungDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.DanhMucNoiDungService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/danh-muc-noi-dung")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DanhMucNoiDungController {
    private final DanhMucNoiDungService danhMucNoiDungService;

    @PostMapping
    public ResponseEntity<ApiResponse<DanhMucNoiDungDTO>> createDanhMucNoiDung(@RequestBody CreateDanhMucNoiDungDTO createDanhMucNoiDungDTO) {
        DanhMucNoiDungDTO danhMucNoiDungDTO = danhMucNoiDungService.createDanhMucNoiDung(createDanhMucNoiDungDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<DanhMucNoiDungDTO>builder()
                        .code(201)
                        .message("Tạo danh mục nội dung thành công")
                        .result(danhMucNoiDungDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DanhMucNoiDungDTO>> getDanhMucNoiDungById(@PathVariable Integer id) {
        DanhMucNoiDungDTO danhMucNoiDungDTO = danhMucNoiDungService.getDanhMucNoiDungById(id);
        return ResponseEntity.ok(ApiResponse.<DanhMucNoiDungDTO>builder()
                .code(200)
                .message("Lấy danh mục nội dung thành công")
                .result(danhMucNoiDungDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<DanhMucNoiDungDTO>>> getAllDanhMucNoiDung(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<DanhMucNoiDungDTO> danhMucNoiDungDTOPage = danhMucNoiDungService.getAllDanhMucNoiDung(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<DanhMucNoiDungDTO>>builder()
                .code(200)
                .message("Lấy danh sách danh mục nội dung thành công")
                .result(danhMucNoiDungDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DanhMucNoiDungDTO>> updateDanhMucNoiDung(
            @PathVariable Integer id,
            @RequestBody UpdateDanhMucNoiDungDTO updateDanhMucNoiDungDTO) {
        DanhMucNoiDungDTO danhMucNoiDungDTO = danhMucNoiDungService.updateDanhMucNoiDung(id, updateDanhMucNoiDungDTO);
        return ResponseEntity.ok(ApiResponse.<DanhMucNoiDungDTO>builder()
                .code(200)
                .message("Cập nhật danh mục nội dung thành công")
                .result(danhMucNoiDungDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDanhMucNoiDung(@PathVariable Integer id) {
        danhMucNoiDungService.deleteDanhMucNoiDung(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa danh mục nội dung thành công")
                .build());
    }

    @GetMapping("/with-count")
    public ResponseEntity<ApiResponse<List<DanhMucNoiDungDTO>>> getCategoriesWithCount() {
        List<DanhMucNoiDungDTO> result = danhMucNoiDungService.getAllCategoriesWithCount();
        return ResponseEntity.ok(ApiResponse.<List<DanhMucNoiDungDTO>>builder()
                .code(200)
                .message("Lấy danh sách chủ đề kèm số lượng thành công")
                .result(result)
                .build());
    }
}

