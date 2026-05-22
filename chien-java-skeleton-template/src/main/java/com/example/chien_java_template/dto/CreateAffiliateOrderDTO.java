package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Platform;
import com.example.chien_java_template.enums.Status;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateAffiliateOrderDTO {
    private Integer linkAffiliateId;
    private Platform nenTang;
    private String maCode;
    private BigDecimal giaTriDonHang;
    private BigDecimal hoaHong;
}

