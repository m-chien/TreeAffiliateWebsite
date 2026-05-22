package com.example.chien_java_template.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "[User]")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "Hoten")
    private String hoten;

    @Column(name = "soDienThoai")
    private String soDienThoai;

    @Column(name = "MatKhau")
    private String password;

    @Column(name = "TrangThai")
    private String trangThai;

    @CreationTimestamp
    @Column(name = "Ngaytao", nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "VaiTro")
    private String vaiTro;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "LanDangNhapCuoi")
    private LocalDateTime lanDangNhapCuoi;
}

