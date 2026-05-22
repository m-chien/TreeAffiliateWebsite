package com.example.chien_java_template.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhGiaDTO {
    private Integer id;
    private Integer cayCanhId;
    private Integer userId;
    private String nguoiDanhGia;
    private Integer diem;
    private String noiDung;
    private LocalDateTime ngayDang;
    private String linkAnh;
}

