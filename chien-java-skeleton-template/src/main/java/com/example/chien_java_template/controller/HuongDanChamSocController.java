package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.UpdateHuongDanChamSocDTO;
import com.example.chien_java_template.dto.HuongDanChamSocDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.HuongDanChamSocService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/huong-dan-cham-soc")
@RequiredArgsConstructor
public class HuongDanChamSocController {
    private final HuongDanChamSocService huongDanChamSocService;

    @PostMapping
    public ResponseEntity<ApiResponse<HuongDanChamSocDTO>> createHuongDanChamSoc(@RequestBody CreateHuongDanChamSocDTO createHuongDanChamSocDTO) {
        HuongDanChamSocDTO huongDanChamSocDTO = huongDanChamSocService.createHuongDanChamSoc(createHuongDanChamSocDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<HuongDanChamSocDTO>builder()
                        .code(201)
                        .message("Tạo hướng dẫn chăm sóc thành công")
                        .result(huongDanChamSocDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<HuongDanChamSocDTO>> getHuongDanChamSocById(@PathVariable Integer id) {
        HuongDanChamSocDTO huongDanChamSocDTO = huongDanChamSocService.getHuongDanChamSocById(id);
        return ResponseEntity.ok(ApiResponse.<HuongDanChamSocDTO>builder()
                .code(200)
                .message("Lấy hướng dẫn chăm sóc thành công")
                .result(huongDanChamSocDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<HuongDanChamSocDTO>>> getAllHuongDanChamSoc(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<HuongDanChamSocDTO> huongDanChamSocDTOPage = huongDanChamSocService.getAllHuongDanChamSoc(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<HuongDanChamSocDTO>>builder()
                .code(200)
                .message("Lấy danh sách hướng dẫn chăm sóc thành công")
                .result(huongDanChamSocDTOPage)
                .build());
    }

    @GetMapping("/cay-canh/{cayCanhId}")
    public ResponseEntity<ApiResponse<HuongDanChamSocDTO>> getHuongDanChamSocByCayCanh(@PathVariable Integer cayCanhId) {
        HuongDanChamSocDTO huongDanChamSocDTO = huongDanChamSocService.getHuongDanChamSocByCayCanh(cayCanhId);
        return ResponseEntity.ok(ApiResponse.<HuongDanChamSocDTO>builder()
                .code(200)
                .message("Lấy hướng dẫn chăm sóc theo cây cảnh thành công")
                .result(huongDanChamSocDTO)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<HuongDanChamSocDTO>> updateHuongDanChamSoc(
            @PathVariable Integer id,
            @RequestBody UpdateHuongDanChamSocDTO updateHuongDanChamSocDTO) {
        HuongDanChamSocDTO huongDanChamSocDTO = huongDanChamSocService.updateHuongDanChamSoc(id, updateHuongDanChamSocDTO);
        return ResponseEntity.ok(ApiResponse.<HuongDanChamSocDTO>builder()
                .code(200)
                .message("Cập nhật hướng dẫn chăm sóc thành công")
                .result(huongDanChamSocDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHuongDanChamSoc(@PathVariable Integer id) {
        huongDanChamSocService.deleteHuongDanChamSoc(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa hướng dẫn chăm sóc thành công")
                .build());
    }
}

