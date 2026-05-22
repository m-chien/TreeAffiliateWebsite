package com.example.chien_java_template.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhMucNoiDungDTO {
    private Integer id;
    private String tenDanhMuc;
    private LocalDateTime ngayTao;
}

