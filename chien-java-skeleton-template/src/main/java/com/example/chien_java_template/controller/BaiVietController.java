package com.example.chien_java_template.controller;

import com.example.chien_java_template.dto.AdminBaiVietDTO;
import com.example.chien_java_template.dto.CreateBaiVietDTO;
import com.example.chien_java_template.dto.UpdateBaiVietDTO;
import com.example.chien_java_template.dto.BaiVietDTO;
import com.example.chien_java_template.exception.ApiResponse;
import com.example.chien_java_template.service.BaiVietService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bai-viet")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BaiVietController {

    private final BaiVietService baiVietService;

    @PostMapping
    public ResponseEntity<ApiResponse<BaiVietDTO>> createBaiViet(@RequestBody CreateBaiVietDTO createBaiVietDTO) {
        BaiVietDTO baiVietDTO = baiVietService.createBaiViet(createBaiVietDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<BaiVietDTO>builder().code(201).message("Tạo bài viết thành công").result(baiVietDTO).build());
    }

    @GetMapping("/chi-tiet/{id}")
    public ResponseEntity<ApiResponse<BaiVietDTO>> getBaiVietById(@PathVariable(value = "id") Integer id) {
        BaiVietDTO baiVietDTO = baiVietService.getBaiVietById(id);
        baiVietService.incrementView(id);
        return ResponseEntity.ok(ApiResponse.<BaiVietDTO>builder().code(200).message("Lấy bài viết thành công").result(baiVietDTO).build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BaiVietDTO>>> getAllBaiViet(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Page<BaiVietDTO> baiVietDTOPage = baiVietService.getAllBaiViet(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<BaiVietDTO>>builder().code(200).message("Lấy danh sách bài viết thành công").result(baiVietDTOPage).build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<BaiVietDTO>>> searchBaiViet(
            @RequestParam(value = "tieuDe") String tieuDe,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Page<BaiVietDTO> baiVietDTOPage = baiVietService.searchBaiVietByTitle(tieuDe, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<BaiVietDTO>>builder().code(200).message("Tìm kiếm bài viết thành công").result(baiVietDTOPage).build());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<Page<BaiVietDTO>>> getBaiVietByCategory(
            @PathVariable(value = "categoryId") Integer categoryId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Page<BaiVietDTO> baiVietDTOPage = baiVietService.getBaiVietByCategory(categoryId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<BaiVietDTO>>builder().code(200).message("Lấy bài viết theo danh mục thành công").result(baiVietDTOPage).build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<Page<BaiVietDTO>>> getBaiVietByUser(
            @PathVariable(value = "userId") Integer userId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Page<BaiVietDTO> baiVietDTOPage = baiVietService.getBaiVietByUser(userId, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<BaiVietDTO>>builder().code(200).message("Lấy bài viết theo người dùng thành công").result(baiVietDTOPage).build());
    }

    @GetMapping("/most-viewed")
    public ResponseEntity<ApiResponse<Page<BaiVietDTO>>> getMostViewedBaiViet(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Page<BaiVietDTO> baiVietDTOPage = baiVietService.getMostViewedBaiViet(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<BaiVietDTO>>builder().code(200).message("Lấy bài viết được xem nhiều nhất thành công").result(baiVietDTOPage).build());
    }

    @GetMapping("/newest")
    public ResponseEntity<ApiResponse<Page<BaiVietDTO>>> getNewestBaiViet(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Page<BaiVietDTO> baiVietDTOPage = baiVietService.getNewestBaiViet(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.<Page<BaiVietDTO>>builder().code(200).message("Lấy bài viết mới nhất thành công").result(baiVietDTOPage).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BaiVietDTO>> updateBaiViet(
            @PathVariable(value = "id") Integer id,
            @RequestBody UpdateBaiVietDTO updateBaiVietDTO) {
        BaiVietDTO baiVietDTO = baiVietService.updateBaiViet(id, updateBaiVietDTO);
        return ResponseEntity.ok(ApiResponse.<BaiVietDTO>builder().code(200).message("Cập nhật bài viết thành công").result(baiVietDTO).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBaiViet(@PathVariable(value = "id") Integer id) {
        baiVietService.deleteBaiViet(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().code(200).message("Xóa bài viết thành công").build());
    }

    // API dành riêng cho trang Admin Dashboard
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<Page<AdminBaiVietDTO>>> getAdminPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<AdminBaiVietDTO> adminPosts = baiVietService.getAdminBaiVietStats(pageable);

        return ResponseEntity.ok(ApiResponse.<Page<AdminBaiVietDTO>>builder()
                .code(200)
                .message("Lấy dữ liệu Admin thành công")
                .result(adminPosts)
                .build());
    }

    // Nút gắn cây cảnh vào bài viết
    @PostMapping("/{idBaiViet}/cay-canh/{idCayCanh}")
    public ResponseEntity<?> ganCayVaoBaiViet(@PathVariable Integer idBaiViet, @PathVariable Integer idCayCanh) {
        try {
            baiVietService.addCayCanhToBaiViet(idBaiViet, idCayCanh);
            return ResponseEntity.ok("Đã gắn cây vào bài viết thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    // Sửa Controller thành thế này để nhận thêm linkId
    @PostMapping("/{id}/click-affiliate")
    public ResponseEntity<?> incrementAffiliateClick(
            @PathVariable Integer id,
            @RequestParam(defaultValue = "1") Integer linkId) { // Mặc định là 1 nếu không truyền
        try {
            baiVietService.incrementAffiliateClick(id, linkId);
            return ResponseEntity.ok("Đã ghi nhận click affiliate");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
}