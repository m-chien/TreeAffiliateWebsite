package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.ContentType;
import com.example.chien_java_template.enums.Status;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateLichSuTiepThiDTO {
    private Integer userId;
    private Integer baiVietId;
    private Integer cayCanhId;
    private ContentType loaiNoiDung;
    private Status trangThai;
}

