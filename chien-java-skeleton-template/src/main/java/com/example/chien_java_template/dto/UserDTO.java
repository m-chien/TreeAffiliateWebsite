package com.example.chien_java_template.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String email;
    private String hoten;
    private String soDienThoai;
    private String trangThai;
    private LocalDateTime ngayTao;
    private String vaiTro;
    private String avatar;
    private LocalDateTime lanDangNhapCuoi;
}

