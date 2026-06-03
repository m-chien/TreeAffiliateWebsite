package com.example.chien_java_template.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class KhuyenMaiRequest {
    private String tenKhuyenMai;
    private BigDecimal phanTramGiam;
}
