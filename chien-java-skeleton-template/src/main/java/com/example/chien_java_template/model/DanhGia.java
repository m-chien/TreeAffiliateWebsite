package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "DanhGia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDCayCanh", nullable = false)
    private CayCanh cayCanh;

    @ManyToOne
    @JoinColumn(name = "IDUser", nullable = false)
    private PlantsUser plantsUser;

    @Column(name = "NguoiDanhGia")
    private String nguoiDanhGia;

    @Column(name = "Diem")
    private Integer diem;

    @Column(name = "NoiDung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;

    @CreationTimestamp
    @Column(name = "NgayDang", nullable = false, updatable = false)
    private LocalDateTime ngayDang;

    @Column(name = "LinkAnh", columnDefinition = "NVARCHAR(MAX)")
    private String linkAnh;
}
