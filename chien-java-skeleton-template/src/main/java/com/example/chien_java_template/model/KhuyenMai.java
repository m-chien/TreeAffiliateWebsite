package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "khuyen_mai")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_khuyen_mai", nullable = false)
    private String tenKhuyenMai;

    @Column(name = "phan_tram_giam", precision = 5, scale = 2)
    private BigDecimal phanTramGiam;

    @ManyToMany(mappedBy = "khuyenMais")
    private List<CayCanh> cayCanhList;
}

