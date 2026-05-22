package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Status;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAffiliateOrderDTO {
    private Status trangThai;
    private BigDecimal hoaHong;
}

