package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.HighlightType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateThongTinNoiBatDTO {
    private HighlightType loai;
    private String noiDung;
}

