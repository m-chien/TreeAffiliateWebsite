package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateDanhGiaDTO {
    private Integer diem;
    private String noiDung;
    private String linkAnh;
}

