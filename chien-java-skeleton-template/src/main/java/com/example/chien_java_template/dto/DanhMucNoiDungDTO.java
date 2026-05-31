package com.example.chien_java_template.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhMucNoiDungDTO {
    private Integer id;
    private String tenDanhMuc;
    private LocalDateTime ngayTao;
    private Long soLuongBaiViet;
    public DanhMucNoiDungDTO(Integer id, String tenDanhMuc, Long soLuongBaiViet) {
        this.id = id;
        this.tenDanhMuc = tenDanhMuc;
        this.soLuongBaiViet = soLuongBaiViet;
    }
}

