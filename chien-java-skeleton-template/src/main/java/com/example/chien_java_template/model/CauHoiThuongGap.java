package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cau_hoi_thuong_gap")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CauHoiThuongGap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idcaycanh", nullable = false)
    private CayCanh cayCanh;

    @Column(name = "cau_hoi", columnDefinition = "NVARCHAR(MAX)")
    private String cauHoi;

    @Column(name = "cau_tra_loi", columnDefinition = "NVARCHAR(MAX)")
    private String cauTraLoi;
}

