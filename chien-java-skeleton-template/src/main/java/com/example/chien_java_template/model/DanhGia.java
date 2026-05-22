package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "danh_gia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idcaycanh", nullable = false)
    private CayCanh cayCanh;

    @ManyToOne
    @JoinColumn(name = "iduser", nullable = false)
    private PlantsUser plantsUser;

    @Column(name = "nguoidanhgia")
    private String nguoiDanhGia;

    @Column(name = "diem")
    private Integer diem;

    @Column(name = "noidung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;

    @CreationTimestamp
    @Column(name = "ngaydang", nullable = false, updatable = false)
    private LocalDateTime ngayDang;

    @Column(name = "linkanh", columnDefinition = "NVARCHAR(MAX)")
    private String linkAnh;
}

