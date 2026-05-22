package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "danh_muc_cay_canh")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhMucCayCanh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_danh_muc", nullable = false)
    private String tenDanhMuc;

    @CreationTimestamp
    @Column(name = "ngay_tao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @ManyToMany(mappedBy = "danhMucs")
    private List<CayCanh> cayCanhList;
}

