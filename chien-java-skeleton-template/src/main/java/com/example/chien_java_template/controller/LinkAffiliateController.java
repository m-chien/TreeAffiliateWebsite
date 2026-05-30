package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.CreateLinkAffiliateDTO;
import com.example.chien_java_template.dto.UpdateLinkAffiliateDTO;
import com.example.chien_java_template.dto.LinkAffiliateDTO;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.LinkAffiliateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/link-affiliate")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LinkAffiliateController {
    private final LinkAffiliateService linkAffiliateService;

    @PostMapping
    public ResponseEntity<ApiResponse<LinkAffiliateDTO>> createLinkAffiliate(@RequestBody CreateLinkAffiliateDTO createLinkAffiliateDTO) {
        LinkAffiliateDTO linkAffiliateDTO = linkAffiliateService.createLinkAffiliate(createLinkAffiliateDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<LinkAffiliateDTO>builder()
                        .code(201)
                        .message("Tạo link affiliate thành công")
                        .result(linkAffiliateDTO)
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LinkAffiliateDTO>> getLinkAffiliateById(@PathVariable Integer id) {
        LinkAffiliateDTO linkAffiliateDTO = linkAffiliateService.getLinkAffiliateById(id);
        linkAffiliateService.incrementClick(id);
        return ResponseEntity.ok(ApiResponse.<LinkAffiliateDTO>builder()
                .code(200)
                .message("Lấy link affiliate thành công")
                .result(linkAffiliateDTO)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<LinkAffiliateDTO>>> getAllLinkAffiliate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LinkAffiliateDTO> linkAffiliateDTOPage = linkAffiliateService.getAllLinkAffiliate(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LinkAffiliateDTO>>builder()
                .code(200)
                .message("Lấy danh sách link affiliate thành công")
                .result(linkAffiliateDTOPage)
                .build());
    }

    @GetMapping("/cay-canh/{cayCanhId}")
    public ResponseEntity<ApiResponse<Page<LinkAffiliateDTO>>> getLinkAffiliateByCayCanh(
            @PathVariable Integer cayCanhId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LinkAffiliateDTO> linkAffiliateDTOPage = linkAffiliateService.getLinkAffiliateByCayCanh(cayCanhId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LinkAffiliateDTO>>builder()
                .code(200)
                .message("Lấy link affiliate theo cây cảnh thành công")
                .result(linkAffiliateDTOPage)
                .build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<Page<LinkAffiliateDTO>>> getLinkAffiliateByStatus(
            @PathVariable Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LinkAffiliateDTO> linkAffiliateDTOPage = linkAffiliateService.getLinkAffiliateByStatus(status, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LinkAffiliateDTO>>builder()
                .code(200)
                .message("Lấy link affiliate theo trạng thái thành công")
                .result(linkAffiliateDTOPage)
                .build());
    }

    @GetMapping("/vendor/{nhaCungCap}")
    public ResponseEntity<ApiResponse<Page<LinkAffiliateDTO>>> getLinkAffiliateByVendor(
            @PathVariable String nhaCungCap,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LinkAffiliateDTO> linkAffiliateDTOPage = linkAffiliateService.getLinkAffiliateByVendor(nhaCungCap, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LinkAffiliateDTO>>builder()
                .code(200)
                .message("Lấy link affiliate theo nhà cung cấp thành công")
                .result(linkAffiliateDTOPage)
                .build());
    }

    @GetMapping("/most-clicked")
    public ResponseEntity<ApiResponse<Page<LinkAffiliateDTO>>> getMostClickedLinkAffiliate(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LinkAffiliateDTO> linkAffiliateDTOPage = linkAffiliateService.getMostClickedLinkAffiliate(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<LinkAffiliateDTO>>builder()
                .code(200)
                .message("Lấy link affiliate được click nhiều nhất thành công")
                .result(linkAffiliateDTOPage)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LinkAffiliateDTO>> updateLinkAffiliate(
            @PathVariable Integer id,
            @RequestBody UpdateLinkAffiliateDTO updateLinkAffiliateDTO) {
        LinkAffiliateDTO linkAffiliateDTO = linkAffiliateService.updateLinkAffiliate(id, updateLinkAffiliateDTO);
        return ResponseEntity.ok(ApiResponse.<LinkAffiliateDTO>builder()
                .code(200)
                .message("Cập nhật link affiliate thành công")
                .result(linkAffiliateDTO)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLinkAffiliate(@PathVariable Integer id) {
        linkAffiliateService.deleteLinkAffiliate(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa link affiliate thành công")
                .build());
    }
}

