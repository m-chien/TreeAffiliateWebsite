package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateBaiVietDTO {
    private String tieuDe;
    private String noiDung;
    private Integer thoiGianDoc;
    private Integer danhMucNoiDungId;
    private String trangThai;
}

