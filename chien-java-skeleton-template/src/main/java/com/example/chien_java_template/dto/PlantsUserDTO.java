package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.enums.UserRole;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantsUserDTO {
    private Integer id;
    private String email;
    private String hoTen;
    private String soDienThoai;
    private Status trangThai;
    private LocalDateTime ngayTao;
    private UserRole vaiTro;
    private String avatar;
    private LocalDateTime lanDangNhapCuoi;
    private java.util.List<String> favoriteCategories;
    private java.util.List<String> favoritePlants;
}

