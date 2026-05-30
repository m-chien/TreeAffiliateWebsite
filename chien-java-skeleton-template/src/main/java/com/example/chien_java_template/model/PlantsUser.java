package com.example.chien_java_template.model;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "[User]")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantsUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "Hoten")
    private String hoTen;

    @Column(name = "soDienThoai")
    private String soDienThoai;

    @Column(name = "MatKhau")
    private String matKhau;

    @Column(name = "TrangThai")
    @Enumerated(EnumType.STRING)
    private Status trangThai;

    @CreationTimestamp
    @Column(name = "Ngaytao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "VaiTro")
    @Enumerated(EnumType.STRING)
    private UserRole vaiTro;

    @Column(name = "avatar", columnDefinition = "NVARCHAR(MAX)")
    private String avatar;

    @Column(name = "LanDangNhapCuoi")
    private LocalDateTime lanDangNhapCuoi;

    @OneToMany(mappedBy = "plantsUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BaiViet> baiViets;

    @OneToMany(mappedBy = "plantsUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DanhGia> danhGias;

    @OneToMany(mappedBy = "plantsUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LichSuTiepThi> lichSuTiepThis;

    @ManyToMany
    @JoinTable(name = "NguoiDungYeuThich", joinColumns = @JoinColumn(name = "IDNguoiDung"), inverseJoinColumns = @JoinColumn(name = "IDCayCanh"))
    private List<CayCanh> yeThichCayCanhList;

    @ManyToMany(mappedBy = "yeThichUsers")
    private List<BaiViet> yeThichBaiViets;
}
