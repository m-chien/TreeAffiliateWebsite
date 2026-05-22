package com.example.chien_java_template.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KhuyenMaiDTO {
    private Integer id;
    private String tenKhuyenMai;
    private BigDecimal phanTramGiam;
}

