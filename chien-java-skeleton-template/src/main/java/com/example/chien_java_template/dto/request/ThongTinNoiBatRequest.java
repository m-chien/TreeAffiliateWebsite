package com.example.chien_java_template.dto.request;

import lombok.Data;

@Data
public class ThongTinNoiBatRequest {
    private String loai; // VD: "Ưu Điểm" hoặc "Nhược Điểm"
    private String noiDung;
}