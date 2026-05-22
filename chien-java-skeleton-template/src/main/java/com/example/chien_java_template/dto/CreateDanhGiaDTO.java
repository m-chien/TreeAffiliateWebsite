package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDanhGiaDTO {
    private Integer cayCanhId;
    private Integer userId;
    private String nguoiDanhGia;
    private Integer diem;
    private String noiDung;
    private String linkAnh;
}

