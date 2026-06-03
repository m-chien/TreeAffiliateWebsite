package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateAffiliateOrderDTO;
import com.example.chien_java_template.dto.UpdateAffiliateOrderDTO;
import com.example.chien_java_template.dto.AffiliateOrderDTO;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.AffiliateOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // Import thêm thư viện này cho chức năng upload file

@RestController
@RequestMapping("/api/v1/affiliate-order")
@RequiredArgsConstructor
public class AffiliateOrderController {
    private final AffiliateOrderService affiliateOrderService;

    @PostMapping
    public ResponseEntity<ApiResponse<AffiliateOrderDTO>> createAffiliateOrder(@RequestBody CreateAffiliateOrderDTO createAffiliateOrderDTO) {
        AffiliateOrderDTO affiliateOrderDTO = affiliateOrderService.createAffiliateOrder(createAffiliateOrderDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<AffiliateOrderDTO>builder()
                        .code(201)
                        .message("Tạo đơn hàng affiliate thành công")
                        .result(affiliateOrderDTO)
                        .build());
    }

    // --- API MỚI: XỬ LÝ IMPORT TỪ FILE EXCEL HOẶC TEXT ---
    @PostMapping("/import")
    public ResponseEntity<ApiResponse<String>> importAffiliateData(
            @RequestParam("doiTac") String doiTac,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "rawData", required = false) String rawData) {
        try {
            if (file != null && !file.isEmpty()) {
                // Gọi sang Service để xử lý file Excel
                affiliateOrderService.importFromFile(file, doiTac);
            } else if (rawData != null && !rawData.trim().isEmpty()) {
                // Gọi sang Service để xử lý text dán vào
                affiliateOrderService.importFromText(rawData, doiTac);
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                        .code(400)
                        .message("Vui lòng chọn file hoặc dán dữ liệu!")
                        .build());
            }
            return ResponseEntity.ok(ApiResponse.<String>builder()
                    .code(200)
                    .message("Import dữ liệu affiliate thành công")
                    .result("Success")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<String>builder()
                            .code(500)
                            .message("Lỗi khi import: " + e.getMessage())
                            .build());
        }
    }
    // ------------------------------------------------------

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AffiliateOrderDTO>> getAffiliateOrderById(@PathVariable Integer id) {
        AffiliateOrderDTO affiliateOrderDTO = affiliateOrderService.getAffiliateOrderById(id);
        return ResponseEntity.ok(ApiResponse.<AffiliateOrderDTO>builder()
                .code(200)
                .message("Lấy đơn hàng affiliate thành công")
                .result(affiliateOrderDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AffiliateOrderDTO>>> getAllAffiliateOrder(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<AffiliateOrderDTO> affiliateOrderDTOPage = affiliateOrderService.getAllAffiliateOrder(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<AffiliateOrderDTO>>builder()
                .code(200)
                .message("Lấy danh sách đơn hàng affiliate thành công")
                .result(affiliateOrderDTOPage)
                .build());
    }

    @GetMapping("/link-affiliate/{linkAffiliateId}")
    public ResponseEntity<ApiResponse<Page<AffiliateOrderDTO>>> getAffiliateOrderByLinkAffiliate(
            @PathVariable Integer linkAffiliateId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<AffiliateOrderDTO> affiliateOrderDTOPage = affiliateOrderService.getAffiliateOrderByLinkAffiliate(linkAffiliateId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<AffiliateOrderDTO>>builder()
                .code(200)
                .message("Lấy đơn hàng affiliate theo link thành công")
                .result(affiliateOrderDTOPage)
                .build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<Page<AffiliateOrderDTO>>> getAffiliateOrderByStatus(
            @PathVariable Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<AffiliateOrderDTO> affiliateOrderDTOPage = affiliateOrderService.getAffiliateOrderByStatus(status, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<AffiliateOrderDTO>>builder()
                .code(200)
                .message("Lấy đơn hàng affiliate theo trạng thái thành công")
                .result(affiliateOrderDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AffiliateOrderDTO>> updateAffiliateOrder(
            @PathVariable Integer id,
            @RequestBody UpdateAffiliateOrderDTO updateAffiliateOrderDTO) {
        AffiliateOrderDTO affiliateOrderDTO = affiliateOrderService.updateAffiliateOrder(id, updateAffiliateOrderDTO);
        return ResponseEntity.ok(ApiResponse.<AffiliateOrderDTO>builder()
                .code(200)
                .message("Cập nhật đơn hàng affiliate thành công")
                .result(affiliateOrderDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAffiliateOrder(@PathVariable Integer id) {
        affiliateOrderService.deleteAffiliateOrder(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa đơn hàng affiliate thành công")
                .build());
    }
}