package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "plants_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantsUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "hoten")
    private String hoTen;

    @Column(name = "sodienthoai")
    private String soDienThoai;

    @Column(name = "matkhau")
    private String matKhau;

    @Column(name = "trangthai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;

    @CreationTimestamp
    @Column(name = "ngaytao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "vaitro")
    @Enumerated(EnumType.STRING)
    private UserRole vaiTro;

    @Column(name = "avatar", columnDefinition = "NVARCHAR(MAX)")
    private String avatar;

    @Column(name = "landangnhapcuoi")
    private LocalDateTime lanDangNhapCuoi;

    @OneToMany(mappedBy = "plantsUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BaiViet> baiViets;

    @OneToMany(mappedBy = "plantsUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DanhGia> danhGias;

    @OneToMany(mappedBy = "plantsUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LichSuTiepThi> lichSuTiepThis;

    @ManyToMany
    @JoinTable(
            name = "nguoi_dung_yeu_thich",
            joinColumns = @JoinColumn(name = "idnguoidung"),
            inverseJoinColumns = @JoinColumn(name = "idcaycanh")
    )
    private List<CayCanh> yeThichCayCanhList;

    @ManyToMany(mappedBy = "yeThichUsers")
    private List<BaiViet> yeThichBaiViets;
}

