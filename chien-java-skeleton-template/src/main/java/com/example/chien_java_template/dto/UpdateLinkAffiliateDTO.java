package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Platform;
import com.example.chien_java_template.enums.Status;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateLinkAffiliateDTO {
    private String nhaCungCap;
    private String linkAffiliate;
    private String linkAnh;
    private BigDecimal giaGoc;
    private String moTa;
    private Status trangThai;
    private Platform nenTang;
    private BigDecimal phanTramHoaHong;
}

