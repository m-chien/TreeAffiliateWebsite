package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "huong_dan_cham_soc")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HuongDanChamSoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idcaycanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "anh_sang", columnDefinition = "NVARCHAR(MAX)")
    private String anhSang;

    @Column(name = "che_do_nuoc", columnDefinition = "NVARCHAR(MAX)")
    private String cheDoNuoc;

    @Column(name = "dat_va_dinh_duong", columnDefinition = "NVARCHAR(MAX)")
    private String datVaDinhDuong;

    @Column(name = "do_an_toan", columnDefinition = "NVARCHAR(MAX)")
    private String doAnToan;
}

