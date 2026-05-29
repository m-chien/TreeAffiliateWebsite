package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.ContentType;
import com.example.chien_java_template.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuTiepThi")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LichSuTiepThi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDUser", nullable = false)
    private PlantsUser plantsUser;

    @ManyToOne
    @JoinColumn(name = "IDBaiViet")
    private BaiViet baiViet;

    @ManyToOne
    @JoinColumn(name = "IDCayCanh")
    private CayCanh cayCanh;

    @Column(name = "LoaiNoiDung")
    @Enumerated(EnumType.STRING)
    private ContentType loaiNoiDung;

    @CreationTimestamp
    @Column(name = "NgayGui", nullable = false, updatable = false)
    private LocalDateTime ngayGui;

    @Column(name = "TrangThai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;
}
