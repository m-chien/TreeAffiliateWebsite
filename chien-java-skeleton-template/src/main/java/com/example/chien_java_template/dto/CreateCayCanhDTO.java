package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Status;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCayCanhDTO {
    private String tenCay;
    private String tenTiengAnh;
    private BigDecimal gia;
    private String moTa;
    private String anh;
    private String giaThamKhao;
    private Boolean anToanChoThuCung;
    private String anhSangCanThiet;
    private Boolean locKhongKhi;
    private Integer doKhoChamSoc;
    private String kichThuoc;
}

