package com.example.chien_java_template.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class ManagedPlantResponse {
    private String id;
    private String name;
    private String tenTiengAnh;
    private BigDecimal gia;
    private String giaThamKhao;
    private String category;
    private String anhSangCanThiet;
    private String kichThuoc;
    private Integer doKhoChamSoc;
    private Boolean anToanChoThuCung;
    private Boolean locKhongKhi;
    private String moTa;
    private Double commission;
    private String status;
    private String imageUrl;
}