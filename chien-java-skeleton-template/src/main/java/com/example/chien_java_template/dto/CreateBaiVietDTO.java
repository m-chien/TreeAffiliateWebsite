package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBaiVietDTO {
    private Integer danhMucNoiDungId;
    private Integer userId;
    private String tieuDe;
    private String noiDung;
    private Integer thoiGianDoc;
}

