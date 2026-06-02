package com.example.chien_java_template.dto;

import java.time.LocalDateTime;

public interface AdminBaiVietDTO {
    Long getId();
    String getTieuDe();
    String getTenTacGia();
    Long getLuotXem();
    Long getAffiliateClicks();
    String getTrangThai();
    LocalDateTime getNgayTao();
}