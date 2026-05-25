package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "CayCanh")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CayCanh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "tenCay", nullable = false)
    private String tenCay;

    @Column(name = "tenTiengAnh")
    private String tenTiengAnh;

    @Column(name = "Gia", precision = 18, scale = 2)
    private BigDecimal gia;

    @Column(name = "moTa", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;

    @Column(name = "Anh", columnDefinition = "NVARCHAR(MAX)")
    private String anh;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private Status trangThai;

    @Column(name = "MucTraHoaHong", precision = 5, scale = 2)
    private BigDecimal mucTraHoaHong;

    @Column(name = "DiemDanhGia")
    private Float diemDanhGia;

    @Column(name = "LuotXem")
    private Integer luotXem;

    @CreationTimestamp
    @Column(name = "NgayTao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "GiaThamKhao")
    private String giaThamKhao;

    @Column(name = "AnToanChoThuCung")
    private Boolean anToanChoThuCung;

    @Column(name = "AnhSangCanThiet")
    private String anhSangCanThiet;

    @Column(name = "LocKhongKhi")
    private Boolean locKhongKhi;

    @Column(name = "DoKhoChamSoc")
    private Integer doKhoChamSoc;

    @Column(name = "KichThuoc")
    private String kichThuoc;

    @OneToMany(mappedBy = "cayCanh", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LinkAffiliate> linkAffiliates;

    @OneToMany(mappedBy = "cayCanh", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DanhGia> danhGias;

    @OneToMany(mappedBy = "cayCanh", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HuongDanChamSoc> huongDanChamSocs;

    @OneToMany(mappedBy = "cayCanh", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ThongTinNoiBat> thongTinNoiBats;

    @OneToMany(mappedBy = "cayCanh", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CauHoiThuongGap> cauHoiThuongGaps;

    @ManyToMany
    @JoinTable(
            name = "DanhMuc_CayCanh",
            joinColumns = @JoinColumn(name = "IDCayCanh"),
            inverseJoinColumns = @JoinColumn(name = "IDDanhMucCayCanh")
    )
    private List<DanhMucCayCanh> danhMucs;

    @ManyToMany
    @JoinTable(
            name = "CayCanh_KhuyenMai",
            joinColumns = @JoinColumn(name = "IDCayCanh"),
            inverseJoinColumns = @JoinColumn(name = "IDKhuyenMai")
    )
    private List<KhuyenMai> khuyenMais;

    @ManyToMany
    @JoinTable(
            name = "BaiViet_CayCanh",
            joinColumns = @JoinColumn(name = "IDCayCanh"),
            inverseJoinColumns = @JoinColumn(name = "IDBaiViet")
    )
    private List<BaiViet> baiViets;

    @ManyToMany
    @JoinTable(
            name = "NguoiDungYeuThich",
            joinColumns = @JoinColumn(name = "IDCayCanh"),
            inverseJoinColumns = @JoinColumn(name = "IDNguoiDung")
    )
    private List<PlantsUser> yeThichUsers;
}