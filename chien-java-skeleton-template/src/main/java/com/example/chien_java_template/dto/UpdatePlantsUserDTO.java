package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.enums.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePlantsUserDTO {
    private String hoTen;
    private String soDienThoai;
    private String avatar;
    private Status trangThai;
    private UserRole vaiTro;
}

