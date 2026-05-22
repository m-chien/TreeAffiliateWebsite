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
public class AffiliateOrderDTO {
    private Integer id;
    private Integer linkAffiliateId;
    private Platform nenTang;
    private String maCode;
    private BigDecimal giaTriDonHang;
    private BigDecimal hoaHong;
    private Status trangThai;
    private LocalDateTime ngayDat;
    private LocalDateTime ngayCapNhat;
}

