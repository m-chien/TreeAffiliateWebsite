package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "DoiTac")
public class DoiTac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "TenDoiTac", columnDefinition = "NVARCHAR(255)")
    private String tenDoiTac;

    @Column(name = "LogoUrl", columnDefinition = "NVARCHAR(MAX)")
    private String logoUrl;

    @Column(name = "Website", columnDefinition = "NVARCHAR(255)")
    private String website;

    @Column(name = "LoaiHinh", columnDefinition = "NVARCHAR(50)")
    private String loaiHinh;

    @Column(name = "TrangThai", columnDefinition = "NVARCHAR(50)")
    private String trangThai;

    @Column(name = "NgayBatDau")
    private LocalDate ngayBatDau;

    @Column(name = "HoaHong")
    private Double hoaHong;
}
