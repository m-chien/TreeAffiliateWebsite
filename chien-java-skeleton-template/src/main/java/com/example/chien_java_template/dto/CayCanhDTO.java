package com.example.chien_java_template.dto;

import com.example.chien_java_template.enums.Status;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List; // Thêm import này

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CayCanhDTO {
    private Integer id;
    private String tenCay;
    private String tenTiengAnh;
    private BigDecimal gia;
    private String moTa;
    private String anh;
    private Status trangThai;
    private BigDecimal mucTraHoaHong;
    private Float diemDanhGia;
    private Integer luotXem;
    private LocalDateTime ngayTao;
    private String giaThamKhao;
    private Boolean anToanChoThuCung;
    private String anhSangCanThiet;
    private Boolean locKhongKhi;
    private Integer doKhoChamSoc;
    private String kichThuoc;

    // ĐÂY LÀ PHẦN THÊM MỚI
    private List<String> danhMucList;
}