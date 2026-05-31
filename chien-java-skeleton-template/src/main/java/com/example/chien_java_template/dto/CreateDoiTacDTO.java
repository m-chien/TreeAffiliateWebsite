package com.example.chien_java_template.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDoiTacDTO {
    private String tenDoiTac;
    private String logoUrl;
    private String website;
    private String loaiHinh;
    private String trangThai;
    private LocalDate ngayBatDau;
    private Double hoaHong;
}
