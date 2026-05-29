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
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "iduser", nullable = false)
    private PlantsUser plantsUser;

    @ManyToOne
    @JoinColumn(name = "idbaiviet")
    private BaiViet baiViet;

    @ManyToOne
    @JoinColumn(name = "idcaycanh")
    private CayCanh cayCanh;

    @Column(name = "loainoidung")
    @Enumerated(EnumType.STRING)
    private ContentType loaiNoiDung;

    @CreationTimestamp
    @Column(name = "NgayGui", nullable = false, updatable = false)
    private LocalDateTime ngayGui;

    @Column(name = "trangthai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;
}

