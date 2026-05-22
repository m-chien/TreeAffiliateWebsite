package com.example.chien_java_template.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserDTO {
    private String hoten;
    private String soDienThoai;
    private String avatar;
    private String vaiTro;
    private String trangThai;
}

