package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Status;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateLichSuTiepThiDTO {
    private Status trangThai;
}

