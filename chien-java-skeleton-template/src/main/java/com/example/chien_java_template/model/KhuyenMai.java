package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "KhuyenMai")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "TenKhuyenMai", nullable = false)
    private String tenKhuyenMai;

    @Column(name = "PhanTramGiam", precision = 5, scale = 2)
    private BigDecimal phanTramGiam;

    @ManyToMany(mappedBy = "khuyenMais")
    private List<CayCanh> cayCanhList;
}

