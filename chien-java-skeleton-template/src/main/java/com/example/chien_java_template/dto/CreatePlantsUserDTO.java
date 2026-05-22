package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.enums.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePlantsUserDTO {
    private String email;
    private String hoTen;
    private String soDienThoai;
    private String matKhau;
}

