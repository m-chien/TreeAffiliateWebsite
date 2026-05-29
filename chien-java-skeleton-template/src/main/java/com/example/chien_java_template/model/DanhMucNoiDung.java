package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "DanhMucNoiDung")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhMucNoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "tenDanhMuc", nullable = false)
    private String tenDanhMuc;

    @CreationTimestamp
    @Column(name = "ngayTao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @OneToMany(mappedBy = "danhMucNoiDung", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BaiViet> baiViets;
}
