package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.ContentType;
import com.example.chien_java_template.enums.Status;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LichSuTiepThiDTO {
    private Integer id;
    private Integer userId;
    private Integer baiVietId;
    private Integer cayCanhId;
    private ContentType loaiNoiDung;
    private LocalDateTime ngayGui;
    private Status trangThai;
}

