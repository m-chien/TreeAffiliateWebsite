package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateHuongDanChamSocDTO {
    private String anhSang;
    private String cheDoNuoc;
    private String datVaDinhDuong;
    private String doAnToan;
}

