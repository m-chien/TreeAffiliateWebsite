package com.example.chien_java_template.dto.request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ManagedPlantRequest {
    private String name;               // Mapped từ formData.name (tenCay)
    private String tenTiengAnh;        // formData.tenTiengAnh
    private BigDecimal gia;            // formData.gia
    private String giaThamKhao;        // formData.giaThamKhao
    private String category;           // formData.category
    private String anhSangCanThiet;    // formData.anhSangCanThiet
    private String kichThuoc;          // formData.kichThuoc
    private Integer doKhoChamSoc;      // formData.doKhoChamSoc
    private Boolean anToanChoThuCung;  // formData.anToanChoThuCung
    private Boolean locKhongKhi;       // formData.locKhongKhi
    private String moTa;               // formData.moTa
    private Double commission;         // formData.commission (mucTraHoaHong)
    private String status;             // formData.status (trangThai)
    private String imageUrl;           // formData.imageUrl (anh)
}