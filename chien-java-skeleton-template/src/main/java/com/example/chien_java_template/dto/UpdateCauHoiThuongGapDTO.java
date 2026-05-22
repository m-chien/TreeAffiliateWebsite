package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCauHoiThuongGapDTO {
    private String cauHoi;
    private String cauTraLoi;
}

