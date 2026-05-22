package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cay_canh")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CayCanh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_cay", nullable = false)
    private String tenCay;

    @Column(name = "tentienganh")
    private String tenTiengAnh;

    @Column(name = "gia", precision = 18, scale = 2)
    private BigDecimal gia;

    @Column(name = "mo_ta", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;

    @Column(name = "anh", columnDefinition = "NVARCHAR(MAX)")
    private String anh;

    @Column(name = "trangthai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;

    @Column(name = "muc_tra_hoa_hong", precision = 5, scale = 2)
    private BigDecimal mucTraHoaHong;

    @Column(name = "diemdanhgia")
    private Float diemDanhGia;

    @Column(name = "luot_xem", columnDefinition = "INT DEFAULT 0")
    private Integer luotXem;

    @CreationTimestamp
    @Column(name = "ngay_tao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "giathamkhao")
    private String giaThamKhao;

    @Column(name = "antoanchothucung")
    private Boolean anToanChoThuCung;

    @Column(name = "anhsangcanthiet")
    private String anhSangCanThiet;

    @Column(name = "lockhongkhi")
    private Boolean locKhongKhi;

    @Column(name = "dokhochamsoc")
    private Integer doKhoChamSoc;

    @Column(name = "kichthuoc")
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
            name = "danh_muc_cay_canh",
            joinColumns = @JoinColumn(name = "idcaycanh"),
            inverseJoinColumns = @JoinColumn(name = "iddanhmuccaycanh")
    )
    private List<DanhMucCayCanh> danhMucs;

    @ManyToMany
    @JoinTable(
            name = "cay_canh_khuyen_mai",
            joinColumns = @JoinColumn(name = "idcaycanh"),
            inverseJoinColumns = @JoinColumn(name = "idkhuyenmai")
    )
    private List<KhuyenMai> khuyenMais;

    @ManyToMany
    @JoinTable(
            name = "bai_viet_cay_canh",
            joinColumns = @JoinColumn(name = "idcaycanh"),
            inverseJoinColumns = @JoinColumn(name = "idbaiviet")
    )
    private List<BaiViet> baiViets;

    @ManyToMany
    @JoinTable(
            name = "nguoi_dung_yeu_thich",
            joinColumns = @JoinColumn(name = "idcaycanh"),
            inverseJoinColumns = @JoinColumn(name = "idnguoidung")
    )
    private List<PlantsUser> yeThichUsers;
}

