package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "HuongDanChamSoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HuongDanChamSoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDCayCanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "AnhSang", columnDefinition = "NVARCHAR(MAX)")
    private String anhSang;

    @Column(name = "CheDoNuoc", columnDefinition = "NVARCHAR(MAX)")
    private String cheDoNuoc;

    @Column(name = "DatVaDinhDuong", columnDefinition = "NVARCHAR(MAX)")
    private String datVaDinhDuong;

    @Column(name = "DoAnToan", columnDefinition = "NVARCHAR(MAX)")
    private String doAnToan;
}