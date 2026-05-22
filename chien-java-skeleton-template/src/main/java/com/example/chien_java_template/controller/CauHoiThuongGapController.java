package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateCauHoiThuongGapDTO;
import com.example.chien_java_template.dto.UpdateCauHoiThuongGapDTO;
import com.example.chien_java_template.dto.CauHoiThuongGapDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.CauHoiThuongGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cau-hoi-thuong-gap")
@RequiredArgsConstructor
public class CauHoiThuongGapController {
    private final CauHoiThuongGapService cauHoiThuongGapService;

    @PostMapping
    public ResponseEntity<ApiResponse<CauHoiThuongGapDTO>> createCauHoiThuongGap(@RequestBody CreateCauHoiThuongGapDTO createCauHoiThuongGapDTO) {
        CauHoiThuongGapDTO cauHoiThuongGapDTO = cauHoiThuongGapService.createCauHoiThuongGap(createCauHoiThuongGapDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<CauHoiThuongGapDTO>builder()
                        .code(201)
                        .message("Tạo câu hỏi thường gặp thành công")
                        .result(cauHoiThuongGapDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CauHoiThuongGapDTO>> getCauHoiThuongGapById(@PathVariable Integer id) {
        CauHoiThuongGapDTO cauHoiThuongGapDTO = cauHoiThuongGapService.getCauHoiThuongGapById(id);
        return ResponseEntity.ok(ApiResponse.<CauHoiThuongGapDTO>builder()
                .code(200)
                .message("Lấy câu hỏi thường gặp thành công")
                .result(cauHoiThuongGapDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CauHoiThuongGapDTO>>> getAllCauHoiThuongGap(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<CauHoiThuongGapDTO> cauHoiThuongGapDTOPage = cauHoiThuongGapService.getAllCauHoiThuongGap(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<CauHoiThuongGapDTO>>builder()
                .code(200)
                .message("Lấy danh sách câu hỏi thường gặp thành công")
                .result(cauHoiThuongGapDTOPage)
                .build());
    }

    @GetMapping("/cay-canh/{cayCanhId}")
    public ResponseEntity<ApiResponse<Page<CauHoiThuongGapDTO>>> getCauHoiThuongGapByCayCanh(
            @PathVariable Integer cayCanhId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<CauHoiThuongGapDTO> cauHoiThuongGapDTOPage = cauHoiThuongGapService.getCauHoiThuongGapByCayCanh(cayCanhId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<CauHoiThuongGapDTO>>builder()
                .code(200)
                .message("Lấy câu hỏi thường gặp theo cây cảnh thành công")
                .result(cauHoiThuongGapDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CauHoiThuongGapDTO>> updateCauHoiThuongGap(
            @PathVariable Integer id,
            @RequestBody UpdateCauHoiThuongGapDTO updateCauHoiThuongGapDTO) {
        CauHoiThuongGapDTO cauHoiThuongGapDTO = cauHoiThuongGapService.updateCauHoiThuongGap(id, updateCauHoiThuongGapDTO);
        return ResponseEntity.ok(ApiResponse.<CauHoiThuongGapDTO>builder()
                .code(200)
                .message("Cập nhật câu hỏi thường gặp thành công")
                .result(cauHoiThuongGapDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCauHoiThuongGap(@PathVariable Integer id) {
        cauHoiThuongGapService.deleteCauHoiThuongGap(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa câu hỏi thường gặp thành công")
                .build());
    }
}

