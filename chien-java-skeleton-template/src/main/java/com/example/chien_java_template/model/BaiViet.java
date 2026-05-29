package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "BaiViet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BaiViet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "iddanhmucnoidung")
    private DanhMucNoiDung danhMucNoiDung;

    @ManyToOne
    @JoinColumn(name = "iduser", nullable = false)
    private PlantsUser plantsUser;

    @Column(name = "tieude", nullable = false)
    private String tieuDe;

    @Column(name = "noidung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;

    @Column(name = "luotxem", columnDefinition = "INT DEFAULT 0")
    private Integer luotXem;

    @Column(name = "thoigiandoc")
    private Integer thoiGianDoc;

    @CreationTimestamp
    @Column(name = "ngaytao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @ManyToMany
    @JoinTable(
            name = "Anh_BaiViet",
            joinColumns = @JoinColumn(name = "idbaiviet"),
            inverseJoinColumns = @JoinColumn(name = "idanh")
    )
    private List<Anh> anhList;

    @ManyToMany
    @JoinTable(
            name = "BaiViet_LinkAffiliate",
            joinColumns = @JoinColumn(name = "idbaiviet"),
            inverseJoinColumns = @JoinColumn(name = "idlinkaffiliate")
    )
    private List<LinkAffiliate> linkAffiliates;

    @ManyToMany(mappedBy = "baiViets")
    private List<CayCanh> cayCanhList;

    @ManyToMany
    @JoinTable(
            name = "BaiVietYeuThich",
            joinColumns = @JoinColumn(name = "idbaiviet"),
            inverseJoinColumns = @JoinColumn(name = "iduser")
    )
    private List<PlantsUser> yeThichUsers;
}
