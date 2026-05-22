package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Platform;
import com.example.chien_java_template.enums.Status;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkAffiliateDTO {
    private Integer id;
    private Integer cayCanhId;
    private String nhaCungCap;
    private String linkAffiliate;
    private String linkAnh;
    private BigDecimal giaGoc;
    private String moTa;
    private LocalDateTime ngayTao;
    private Status trangThai;
    private Platform nenTang;
    private BigDecimal phanTramHoaHong;
    private Integer luotClick;
}

