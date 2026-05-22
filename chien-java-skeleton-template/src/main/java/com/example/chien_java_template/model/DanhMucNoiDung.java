package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "danh_muc_noi_dung")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhMucNoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_danh_muc", nullable = false)
    private String tenDanhMuc;

    @CreationTimestamp
    @Column(name = "ngay_tao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @OneToMany(mappedBy = "danhMucNoiDung", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BaiViet> baiViets;
}

