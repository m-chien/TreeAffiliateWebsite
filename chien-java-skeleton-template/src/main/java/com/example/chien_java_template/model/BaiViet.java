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
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDDanhMucNoiDung")
    private DanhMucNoiDung danhMucNoiDung;

    @ManyToOne
    @JoinColumn(name = "IdUser", nullable = false)
    private PlantsUser plantsUser;

    @Column(name = "TieuDe", nullable = false)
    private String tieuDe;

    @Column(name = "NoiDung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;

    @Column(name = "LuotXem", columnDefinition = "INT DEFAULT 0")
    private Integer luotXem;

    @Column(name = "thoiGianDoc")
    private Integer thoiGianDoc;

    @CreationTimestamp
    @Column(name = "NgayTao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @ManyToMany
    @JoinTable(name = "Anh_BaiViet", joinColumns = @JoinColumn(name = "IDBaiViet"), inverseJoinColumns = @JoinColumn(name = "IDAnh"))
    private List<Anh> anhList;

    @ManyToMany
    @JoinTable(name = "BaiViet_LinkAffiliate", joinColumns = @JoinColumn(name = "IDBaiViet"), inverseJoinColumns = @JoinColumn(name = "IDLinkAffiliate"))
    private List<LinkAffiliate> linkAffiliates;

    @ManyToMany(mappedBy = "baiViets")
    private List<CayCanh> cayCanhList;

    @ManyToMany
    @JoinTable(name = "BaiVietYeuThich", joinColumns = @JoinColumn(name = "IDBaiViet"), inverseJoinColumns = @JoinColumn(name = "IDUser"))
    private List<PlantsUser> yeThichUsers;

    @Column(name = "TrangThai")
    private String trangThai;
}
