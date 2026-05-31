package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateDoiTacDTO;
import com.example.chien_java_template.dto.UpdateDoiTacDTO;
import com.example.chien_java_template.dto.DoiTacDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.DoiTacService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/doi-tac")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DoiTacController {
    private final DoiTacService doiTacService;

    @PostMapping
    public ResponseEntity<ApiResponse<DoiTacDTO>> createDoiTac(@RequestBody CreateDoiTacDTO createDoiTacDTO) {
        DoiTacDTO dto = doiTacService.createDoiTac(createDoiTacDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<DoiTacDTO>builder()
                        .code(201)
                        .message("Tạo đối tác thành công")
                        .result(dto)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DoiTacDTO>> getDoiTacById(@PathVariable Integer id) {
        DoiTacDTO dto = doiTacService.getDoiTacById(id);
        return ResponseEntity.ok(ApiResponse.<DoiTacDTO>builder()
                .code(200)
                .message("Lấy đối tác thành công")
                .result(dto)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<DoiTacDTO>>> getAllDoiTac(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        Page<DoiTacDTO> pageData = doiTacService.getAllDoiTac(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<DoiTacDTO>>builder()
                .code(200)
                .message("Lấy danh sách đối tác thành công")
                .result(pageData)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DoiTacDTO>> updateDoiTac(
            @PathVariable Integer id,
            @RequestBody UpdateDoiTacDTO updateDoiTacDTO) {
        DoiTacDTO dto = doiTacService.updateDoiTac(id, updateDoiTacDTO);
        return ResponseEntity.ok(ApiResponse.<DoiTacDTO>builder()
                .code(200)
                .message("Cập nhật đối tác thành công")
                .result(dto)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDoiTac(@PathVariable Integer id) {
        doiTacService.deleteDoiTac(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa đối tác thành công")
                .build());
    }
}
