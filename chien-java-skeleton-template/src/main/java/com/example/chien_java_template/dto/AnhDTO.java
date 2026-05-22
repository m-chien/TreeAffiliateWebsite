package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnhDTO {
    private Integer id;
    private String tieuDe;
    private String linkAnh;
}

