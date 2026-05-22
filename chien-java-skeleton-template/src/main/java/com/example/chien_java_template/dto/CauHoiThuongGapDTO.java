package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CauHoiThuongGapDTO {
    private Integer id;
    private Integer cayCanhId;
    private String cauHoi;
    private String cauTraLoi;
}

